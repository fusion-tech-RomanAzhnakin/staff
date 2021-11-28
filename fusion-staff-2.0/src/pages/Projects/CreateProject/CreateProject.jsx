import React, { useMemo } from 'react';
import Select from 'react-select';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoader } from 'store/main';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { object as yupObject, string as yupString } from 'yup';

import SelectWrapper from 'ui/components/SelectWrapper';
import { CustomStyles } from 'ui/components/CustomSelectComponents';
import RichTextBox from 'ui/components/RichTextBox';
import InputLabel from '@material-ui/core/InputLabel';
import { Button, TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { defaultErrorMessage, requiredErrorMessage } from 'utils/constants';
import { getFullName } from 'utils/utils';
import projectApi from 'api/projectApi';
import CreateProjectStyleWrapper from './CreateProject.style';

const validation = yupObject().shape({
  title: yupString().required(requiredErrorMessage),
  href: yupString().url('Невалидный url'),
});

const CreateProject = () => {
  const location = useLocation();
  const { technologies, usersList } = useSelector((state) => state.enums);
  const dispatch = useDispatch();
  const history = useHistory();
  const { projectsList } = useSelector((state) => state.projects);

  const convertDataToSubmit = (values) => {
    const roles = [...values.role];
    if (roles[roles.length - 1].title === '' && roles[roles.length - 1].text === '') {
      roles.splice(roles.length - 1, 1);
    }
    return {
      ...values,
      role: (roles) ? JSON.stringify(roles) : [],
      user_id: values.user_id && values.user_id.map((user) => user.id),
      technologies_id:
        values.technologies_id &&
        values.technologies_id.map((technologies) => technologies.id),
    };
  };

  const getTechnologies = () => {
    const result = projectsList[location.state].technologies.map((item) => {
      return (
        { label: item.title, id: item.id });
    });
    return result;
  };

  const getUsers = () => {
    const arrUsers = projectsList[location.state].user.map((item) => { return { label: getFullName(item, 'full', 'eng'), id: item.id }; });
    return arrUsers;
  };

  const {
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    touched,
    setSubmitting,
    setFieldValue,
  } = useFormik({
    initialValues: {
      title: (typeof location.state === 'number') ? projectsList[location.state].title : '',
      href: (typeof location.state === 'number') ? projectsList[location.state].href : '',
      description: (typeof location.state === 'number') ? projectsList[location.state].description : '',
      description_ru: (typeof location.state === 'number') ? projectsList[location.state].description_ru : '',
      role: (typeof location.state === 'number' && projectsList[location.state].role)
        ? projectsList[location.state].role
        : [
          {
            title: '',
            text: '',
          },
        ],
      technologies_id: (typeof location.state === 'number') ? getTechnologies() : [],
      user_id: (typeof location.state === 'number') ? getUsers() : [],
      images: [],
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      try {
        const dataToSubmit = convertDataToSubmit(values);
        dispatch(toggleLoader(true));
        if (typeof location.state !== 'number') {
          await projectApi.create(dataToSubmit);
          toast.success('Успех! Проект добавлен');
        } else {
          dataToSubmit.id = projectsList[location.state].id;
          await projectApi.edit(dataToSubmit);
          toast.success('Успех! Проект отредактирован');
        }
        history.goBack();
      } catch (err) {
        toast.error(defaultErrorMessage);
      } finally {
        setSubmitting(false);
        dispatch(toggleLoader(false));
      }
    },
  });

  const options = useMemo(
    () => ({
      technologiesOption:
        technologies &&
        technologies.map((technologie) => ({
          value: technologie.title,
          label: technologie.title,
          id: technologie.id,
        })),
      developersOption:
        usersList &&
        Object.values(usersList).map((user) => ({
          value: user.login,
          label: user.login,
          id: user.id,
        })),
    }),
    [technologies, usersList],
  );

  const onSelectChange = (value, data) => {
    handleChange({ target: { value, name: data.name } });
  };

  const handleAddRole = () => {
    const lenRolesArray = values.role.length;
    if (lenRolesArray === 0) {
      setFieldValue('role', [{ title: '', text: '' }]);
      return;
    }
    if (values.role[lenRolesArray - 1].title !== '') {
      setFieldValue('role', [...values.role, { title: '', text: '' }]);
    }
  };

  const handleDeleteRole = (index) => {
    // if (values.role.length > 0) {
    const roles = [...values.role];
    roles.splice(index, 1);
    setFieldValue('role', [...roles, { title: '', text: '' }]);
    // }
  };

  return (
    <CreateProjectStyleWrapper>
      <form className="create-project__content" onSubmit={handleSubmit}>
        <Grid className="create-project__inputs">
          {simpleInputs.map((input, index) => (
            <TextField
              key={`${input.name}${index}`}
              value={values[input.name]}
              name={input.name}
              label={input.label}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              error={Boolean(touched[input.name] && errors[input.name])}
              helperText={touched[input.name] && errors[input.name]}
            />
          ))}
        </Grid>
        <RichTextBox
          name="description"
          label="Описание на английском:"
          value={values.description}
          onChange={handleChange}
        />
        <RichTextBox
          name="description_ru"
          label="Описание на русском:"
          value={values.description_ru}
          onChange={handleChange}
        />
        <Grid className="create-project__roles">
          {
            values.role.map((role, index) => (
              <RichTextBox
                key={`role${index}`}
                name={`role[${index}].text`}
                value={role.text}
                onChange={handleChange}
                label={index === 0 ? <p>Роли на проекте:</p> : <></>}
              >
                <TextField
                  value={role.title}
                  name={`role[${index}].title`}
                  label="Роль"
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => handleDeleteRole(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </InputAdornment>
                    ,
                  }}
                />
                <InputLabel>Описание роли:</InputLabel>
              </RichTextBox>
            ))}
          <Grid className="create-project__roles__add-button-container">
            <Button variant="contained" color="primary" onClick={handleAddRole}>
              Добавить роль
            </Button>
          </Grid>
        </Grid>

        <Grid container className="create-project__selects">
          {selects.map((select, index) => (
            <SelectWrapper
              key={`${select.name}${index}`}
              className="form-input-item select-wrapper"
            >
              <Grid item >
                <Select
                  value={values[select.name]}
                  placeholder={select.placeholder}
                  // hideSelectedOptions={false}
                  classNamePrefix="select"
                  isMulti
                  isClearable={true}
                  closeMenuOnSelect={false}
                  options={options[select.optionName]}
                  onChange={onSelectChange}
                  styles={CustomStyles}
                  name={select.name}
                />
              </Grid>
            </SelectWrapper>
          ))}
        </Grid>

        <Grid container className="create-project__selects">
          <Grid item className="form-input-item select-wrapper">
            <Button variant="contained" color="primary" fullWidth type="submit">
              Сохранить проект
            </Button>
          </Grid>

          <Grid item className="form-input-item select-wrapper">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => history.goBack()}
            >
              Назад
            </Button>
          </Grid>
        </Grid>
      </form>
    </CreateProjectStyleWrapper>
  );
};

const simpleInputs = [
  {
    name: 'title',
    label: 'Название проекта',
  },
  {
    name: 'href',
    label: 'Ссылка на проект',
  },
];

const selects = [
  {
    name: 'technologies_id',
    placeholder: 'Технологии',
    optionName: 'technologiesOption',
  },
  {
    name: 'user_id',
    placeholder: 'Разработчики',
    optionName: 'developersOption',
  },
];

export default CreateProject;
