/* eslint-disable no-console */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import {
  object as yupObject,
  string as yupString,
} from 'yup';

import { Formik } from 'formik';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import StyledForm from 'pages/Auth/components/StyledForm';

import { updateUser } from 'store/main';
import authApi from 'api/authApi';
import { routePaths, defaultErrorMessage, validationErrorName } from 'utils/constants';
import { isDev } from 'config';
import validationErrors from 'utils/validationErrors';

const initialValues = {
  username: isDev ? 'staff_admin@email.com' : '',
  password: isDev ? 'asdasd' : '',
};

const validation = yupObject().shape({
  username: yupString().required('Введи логин или email'),
  password: yupString().required(validationErrors.requiredPassword),
});

class SignIn extends PureComponent {
  onSubmit = async (
    values,
    { setSubmitting, setErrors },
  ) => {
    try {
      const user = await authApi.signIn(values);

      this.props.updateUser(user);
    } catch (err) {
      setSubmitting(false);

      const isValidationError = err?.data?.name === validationErrorName;

      if (isValidationError) {
        return err.data.errors.forEach(({ path, message }) => {
          setErrors({ [path]: message });
        });
      }

      toast.error(defaultErrorMessage);
    }
  }

  render() {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={this.onSubmit}
      >
        {({ values, handleSubmit, handleBlur, handleChange, errors, touched }) => (
          <StyledForm onSubmit={handleSubmit}>
            <TextField
              value={values.username}
              name="username"
              inputMode="email"
              onChange={handleChange}
              label="Email или логин"
              fullWidth
              onBlur={handleBlur}
              error={Boolean(touched.username && errors.username)}
              helperText={errors.username}
              autoFocus
            />

            <TextField
              value={values.password}
              name="password"
              type="password"
              onChange={handleChange}
              label="Пароль"
              fullWidth
              onBlur={handleBlur}
              error={Boolean(touched.password && errors.password)}
              helperText={errors.password}
            />

            {/* <Link component={RouterLink} to={routePaths.auth.forgotPassword}>
              <Typography>
                Забыл пароль?
              </Typography>
            </Link> */}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Войти
            </Button>

            <Link component={RouterLink} to={routePaths.auth.signUp}>
              <Typography>
                Зарегистрироваться
              </Typography>
            </Link>
          </StyledForm>
        )}
      </Formik>
    );
  }
}

SignIn.propTypes = {
  updateUser: PropTypes.func.isRequired,
};

const connectFunction = connect(null, { updateUser });

export default withRouter(connectFunction(SignIn));
