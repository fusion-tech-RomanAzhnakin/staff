import React, { useEffect } from 'react';
import {
  object as yupObject,
  string as yupString,
  array as yupArray,
  date as yupDate,
} from 'yup';
import { useFormik } from 'formik';
import MomentUtils from '@date-io/moment';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';
import { toast } from 'react-toastify';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import RichTextBox from 'ui/components/RichTextBox';
import StyledForm from 'pages/Account/components/UserInfo/components/UserForm.style';
import UserFormRow from 'pages/Account/components/UserInfo/components/UserFormRow';
import UserRepos from 'pages/Account/components/UserInfo/components/UserRepos';

import { updateUser, toggleLoader } from 'store/main';
import { setUser } from 'pages/Account/store/reducer';
import { defaultErrorMessage, validationErrorName, DOB_FORMAT } from 'utils/constants';
import {
  loginValidation,
  phoneValidation,
  emailValidation,
} from 'utils/validation';

import userApi from 'api/userApi';

moment.locale('ru');

const validation = yupObject().shape({
  login: loginValidation,
  phone: phoneValidation,
  email: emailValidation,
  slack_name: yupString(),
  firstName: yupString(),
  firstName_ru: yupString(),
  lastName: yupString(),
  lastName_ru: yupString(),
  education: yupString(),
  education_ru: yupString(),
  info: yupString(),
  repo: yupArray().of(yupString().url('Не валидный url')),
  DoB: yupDate()
    .nullable(),
});

const UserForm = (props) => {
  const user = useSelector(({ userAccount }) => userAccount.user);
  const dispatch = useDispatch();

  const {
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    touched,
    setValues,
    setErrors,
    setSubmitting,
  } = useFormik({
    initialValues: {
      login: '',
      phone: '',
      slack_name: '',
      email: '',
      firstName: '',
      firstName_ru: '',
      lastName: '',
      lastName_ru: '',
      education: '',
      education_ru: '',
      info: '',
      repo: [],
      DoB: '',
    },
    validationSchema: validation,
    onSubmit: async () => {
      try {
        dispatch(toggleLoader(true));
        const updateData = await userApi.update(user.id, values);
        dispatch(updateUser(updateData));
        dispatch(setUser(updateData));
        toast.success('Успех! Ваши данные изменены');
        props.toggleEdit();
      } catch (err) {
        const isValidationError = err?.data?.name === validationErrorName;

        if (isValidationError) {
          return err.data.errors.forEach(({ path, message }) => {
            setErrors({ [path]: message });
          });
        }

        toast.error(defaultErrorMessage);
      } finally {
        setSubmitting(false);
        dispatch(toggleLoader(false));
      }
    },
  });

  useEffect(() => {
    setValues({
      login: user.login || '',
      phone: user.phone || '',
      slack_name: user.slack_name || '',
      email: user.email || '',
      firstName: user.firstName || '',
      firstName_ru: user.firstName_ru || '',
      lastName: user.lastName || '',
      lastName_ru: user.lastName_ru || '',
      education: user.education || '',
      education_ru: user.education_ru || '',
      info: user.info || '',
      DoB: user.DoB ? moment(user.DoB) : null,
      repo: user.repo || [],
    });
  }, [user, setValues]);

  const changeRepos = (newRepos) => {
    setValues({
      ...values,
      repo: newRepos,
    });
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        {simpleInputs.map((input) => (
          <UserFormRow key={input.name}>
            <TextField
              value={values[input.name]}
              name={input.name}
              onChange={handleChange}
              label={input.label}
              onBlur={handleBlur}
              error={Boolean(touched[input.name] && errors[input.name])}
              helperText={errors[input.name]}
              autoFocus={input.autoFocus}
              fullWidth
            />
          </UserFormRow>
        ))}

        <UserFormRow>
          <MuiPickersUtilsProvider utils={MomentUtils} libInstance={moment} locale="ru">
            <DatePicker
              variant="inline"
              fullWidth
              label="Дата рождения"
              format={DOB_FORMAT}
              value={values.DoB}
              maxDate={moment().subtract(18, 'y').toDate()}
              autoOk
              onChange={(date) => {
                handleChange({ target: { value: date, name: 'DoB' } });
              }}
            />
          </MuiPickersUtilsProvider>
        </UserFormRow>

        <Grid item md={12} xs={12}>
          <Typography variant="h2" className="user-info__label">
            Добавить репозиториЙ
          </Typography>

          <UserRepos
            repos={values.repo}
            handleChange={handleChange}
            changeRepos={changeRepos}
            touched={touched.repo}
            errors={errors.repo}
          />
        </Grid>

        <Grid item sm={12} xs={12}>
          <RichTextBox
            name="education_ru"
            value={values.education_ru}
            label="Образование (ru)"
            onChange={handleChange}
          />
        </Grid>

        <Grid item sm={12} xs={12}>
          <RichTextBox
            name="education"
            value={values.education}
            label="Образование (en)"
            onChange={handleChange}
          />
        </Grid>

        <Grid item md={12} sm={12} xs={12}>
          <TextField
            value={values.info}
            name="info"
            onChange={handleChange}
            onBlur={handleBlur}
            label="Информация"
            fullWidth
            multiline
          />
        </Grid>

        <Grid item md={6} sm={6} xs={6}>
          <Button
            className="user-form__button"
            variant="contained"
            type="submit"
          >
            Принять
          </Button>
        </Grid>

        <Grid item md={6} sm={6} xs={6} justify="flex-end" container>
          <Button
            className="user-form__button"
            variant="contained"
            onClick={props.toggleEdit}
          >
            Отмена
          </Button>
        </Grid>
      </Grid>
    </StyledForm>
  );
};

const simpleInputs = [
  {
    name: 'login',
    label: 'Логин',
    autoFocus: true,
  },
  {
    name: 'email',
    label: 'Email',
  },
  {
    name: 'slack_name',
    label: 'Slake Name',
  },
  {
    name: 'phone',
    label: 'Телефон',
  },
  {
    name: 'firstName_ru',
    label: 'Имя (ru)',
  },
  {
    name: 'firstName',
    label: 'Имя (en)',
  },
  {
    name: 'lastName_ru',
    label: 'Фамилия (ru)',
  },
  {
    name: 'lastName',
    label: 'Фамилия (en)',
  },
];

UserForm.propTypes = {
  toggleEdit: PropTypes.func,
};

UserForm.defaultProps = {
  toggleEdit: () => null,
};

export default UserForm;
