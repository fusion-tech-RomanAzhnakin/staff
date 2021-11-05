import React, { useMemo } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import Select from 'react-select';
import SelectWrapper from 'ui/components/SelectWrapper';
import { CustomStyles } from 'ui/components/CustomSelectComponents';
import { object as yupObject, string as yupString } from 'yup';
import RichTextBox from 'ui/components/RichTextBox';
import { useDispatch, useSelector } from 'react-redux';
import CustomDropZone from 'ui/components/Dropzone';
import { toggleLoader } from 'store/main';
import { toast } from 'react-toastify';
import { defaultErrorMessage, requiredErrorMessage } from 'utils/constants';
import { useHistory } from 'react-router-dom';
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
      technology_id:
        values.technology_id &&
        values.technology_id.map((technology) => technology.id),
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
      technology_id: [],
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

  const changeFiles = (files) => {
    handleChange({ target: { value: files, name: 'images' } });
  };

  const addRoleFields = () => {
    setFieldValue('role', [...values.role, { title: '', text: '' }]);
  };

  return (
    <CreateProjectStyleWrapper>
      <form className="create-project__content" onSubmit={handleSubmit}>
        <div className="create-project__inputs">
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
        </div>
        <RichTextBox
          name="description"
          label="Описание:"
          value={values.description}
          onChange={handleChange}
        />
        <RichTextBox
          name="description_ru"
          label="Описание на русском:"
          value={values.description_ru}
          onChange={handleChange}
        />
        <div className="create-project__roles">
          {values.role.length > 0 &&
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
              </RichTextBox>
            ))}
          <div className="create-project__roles__add-button-container">
            <Button variant="contained" color="primary" onClick={addRoleFields}>
              Добавить роль
            </Button>
          </div>
        </div>
        <div className="create-project__selects">
          {selects.map((select, index) => (
            <SelectWrapper
              key={`${select.name}${index}`}
              className="form-input-item select-wrapper"
            >
              <Select
                placeholder={select.placeholder}
                hideSelectedOptions={false}
                classNamePrefix="select"
                isMulti
                isClearable={false}
                options={options[select.optionName]}
                onChange={onSelectChange}
                styles={CustomStyles}
                name={select.name}
              />
            </SelectWrapper>
          ))}
        </div>
        <CustomDropZone
          label="Custom label"
          files={values.images}
          changeFiles={changeFiles}
        />

        <div className="create-project__buttons">
          <Button variant="contained" color="primary" fullWidth type="submit">
            Добавить проект
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => history.goBack()}
          >
            Назад
          </Button>
        </div>
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
    name: 'technology_id',
    placeholder: 'используемые технологии',
    optionName: 'technologiesOption',
  },
  {
    name: 'user_id',
    placeholder: 'Разработчики',
    optionName: 'developersOption',
  },
];

export default CreateProject;
