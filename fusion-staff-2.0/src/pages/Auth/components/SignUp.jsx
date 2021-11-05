import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { object as yupObject } from 'yup';

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
import validation from 'utils/validation';
import { RouterPropType } from 'utils/types';

const initialValues = {
  email: '',
  login: '',
  phone: '',
  password: '',
};

const validationShape = yupObject().shape({
  email: validation.email,
  login: validation.login,
  phone: validation.phone,
  password: validation.password,
});

class SignUp extends PureComponent {
  onSubmit = async (
    values,
    { setSubmitting, setErrors },
  ) => {
    try {
      const user = await authApi.signUp(values);

      this.props.updateUser(user);
      this.props.history.push(routePaths.home);
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
        validationSchema={validationShape}
        onSubmit={this.onSubmit}
      >
        {({ values, handleSubmit, handleBlur, handleChange, errors, touched }) => (
          <StyledForm onSubmit={handleSubmit}>
            <TextField
              value={values.email}
              name="email"
              error={Boolean(errors.email && touched.email)}
              helperText={errors.email}
              inputMode="email"
              onChange={handleChange}
              label="Email"
              fullWidth
              onBlur={handleBlur}
              autoFocus
            />

            <TextField
              value={values.login}
              name="login"
              error={Boolean(errors.login && touched.login)}
              helperText={errors.login}
              onChange={handleChange}
              label="Логин"
              fullWidth
              onBlur={handleBlur}
            />

            <TextField
              value={values.phone}
              name="phone"
              error={Boolean(errors.phone && touched.phone)}
              helperText={errors.phone}
              onChange={handleChange}
              label="Телефон"
              fullWidth
              onBlur={handleBlur}
            />

            <TextField
              value={values.password}
              name="password"
              error={Boolean(errors.password && touched.password)}
              helperText={errors.password}
              type="password"
              onChange={handleChange}
              label="Пароль"
              fullWidth
              onBlur={handleBlur}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Зарегистрироваться
            </Button>

            <Link component={RouterLink} to={routePaths.auth.signIn}>
              <Typography>
                Войти
              </Typography>
            </Link>
          </StyledForm>
        )}
      </Formik>
    );
  }
}

SignUp.propTypes = {
  history: RouterPropType.isRequired,
  updateUser: PropTypes.func.isRequired,
};

const connectFunction = connect(null, { updateUser });

export default connectFunction(withRouter(SignUp));
