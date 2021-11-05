import React, { useState } from 'react';
import { useFormik } from 'formik';
import { object as yupObject, ref, string as yupString } from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import StyledComponent from 'pages/Account/components/UserInfo/components/ChangePassword.style';

import { toggleLoader } from 'store/main';
import { passwordValidation } from 'utils/validation';
import { defaultErrorMessage, validationErrorName } from 'utils/constants';
import validationErrors from 'utils/validationErrors';
import userApi from 'api/userApi';

const validation = yupObject().shape({
  password: passwordValidation
    .notOneOf([ref('oldPassword'), null], 'Пароль совпадает со старым'),
  retryPassword: yupString().equals([ref('password')], 'Пароль не совпадает'),
  oldPassword: yupString().required(validationErrors.requiredPassword),
});

const ChangePassword = (props) => {
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);
  const user = useSelector(({ userAccount }) => userAccount.user);
  const dispatch = useDispatch();

  const {
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    touched,
    isValid,
    setErrors,
    setSubmitting,
    resetForm,
  } = useFormik({
    initialValues: {
      oldPassword: '',
      password: '',
      retryPassword: '',
    },
    validationSchema: validation,
    onSubmit: async () => {
      try {
        dispatch(toggleLoader(true));
        await userApi.changePassword(user.id, values);
        props.toggleEdit();
        toast.success('Успех! Ваш пароль изменен');
        setIsCollapseOpen(!isCollapseOpen);
        resetForm();
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

  return (
    <StyledComponent>
      <Button
        className="user-form__button"
        variant="contained"
        onClick={() => setIsCollapseOpen(!isCollapseOpen)}
      >
        Сменить пароль
      </Button>

      <Collapse in={isCollapseOpen}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item sm={12} xs={12}>
              <TextField
                type="password"
                value={values.oldPassword}
                name="oldPassword"
                onChange={handleChange}
                label="Текущий пароль"
                onBlur={handleBlur}
                fullWidth
                error={Boolean(touched.oldPassword && errors.oldPassword)}
                helperText={errors.oldPassword}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                type="password"
                value={values.password}
                name="password"
                onChange={handleChange}
                label="Новый пароль"
                onBlur={handleBlur}
                fullWidth
                error={Boolean(touched.password && errors.password)}
                helperText={errors.password}
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <TextField
                type="password"
                value={values.retryPassword}
                name="retryPassword"
                onChange={handleChange}
                label="Подтверждение пароля"
                onBlur={handleBlur}
                error={Boolean(touched.retryPassword && errors.retryPassword)}
                helperText={errors.retryPassword}
                fullWidth
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <Button
                className="user-form__button"
                variant="contained"
                type="submit"
                disabled={!isValid}
                fullWidth
              >
                Сохранить новый пароль
            </Button>
            </Grid>
          </Grid>
        </form>
      </Collapse>
    </StyledComponent>
  );
};

ChangePassword.propTypes = {
  toggleEdit: PropTypes.func,
};

ChangePassword.defaultProps = {
  toggleEdit: () => null,
};

export default ChangePassword;
