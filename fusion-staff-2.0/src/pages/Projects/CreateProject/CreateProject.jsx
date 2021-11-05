import React, { useMemo } from 'react';
import Select from 'react-select';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLoader } from 'store/main';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { object as yupObject, string as yupString } from 'yup';

import SelectWrapper from 'ui/components/SelectWrapper';
import { CustomStyles } from 'ui/components/CustomSelectComponents';
import RichTextBox from 'ui/components/RichTextBox';
import InputLabel from '@material-ui/core/InputLabel';
import { Button, TextField, Grid } from '@material-ui/core';

import { defaultErrorMessage, requiredErrorMessage } from 'utils/constants';
import projectApi from 'api/projectApi';
import CreateProjectStyleWrapper from './CreateProject.style';

const validation = yupObject().shape({
  title: yupString().required(requiredErrorMessage),
  href: yupString().url('Невалидный url'),
});

const CreateProject = () => {
  const { technologies, usersList } = useSelector((state) => state.enums);
  const dispatch = useDispatch();
  const history = useHistory();

  const convertDataToSubmit = (values) => {
    return {
      ...values,
      role: values.role && values.role.map((role) => JSON.stringify(role)),
      user_id: values.user_id && values.user_id.map((user) => user.id),
      technologies_id:
        values.technologies_id &&
        values.technologies_id.map((technologies) => technologies.id),
    };
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
      title: '',
      href: '',
      description: '',
      description_ru: '',
      role: [
        {
          title: '',
          text: '',
        },
      ],
      technologies_id: [],
      user_id: [],
      images: [],
    },
    validationSchema: validation,
    onSubmit: async (values) => {
      try {
        const dataToSubmit = convertDataToSubmit(values);
        dispatch(toggleLoader(true));
        await projectApi.create(dataToSubmit);
        toast.success('Успех! Проект добавлен');
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

  const addRoleFields = () => {
    const lenRolesArray = values.role.length;
    if (values.role[lenRolesArray - 1].title !== '') {
      setFieldValue('role', [...values.role, { title: '', text: '' }]);
    }
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
                />
                <InputLabel>Описание роли:</InputLabel>
              </RichTextBox>
            ))}
          <Grid className="create-project__roles__add-button-container">
            <Button variant="contained" color="primary" onClick={addRoleFields}>
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
              Добавить проект
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
