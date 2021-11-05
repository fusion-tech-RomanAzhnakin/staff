import React, { PureComponent } from 'react';
import {
  object as yupObject,
  string as yupString,
} from 'yup';

import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import StyledForm from 'pages/Auth/components/StyledForm';

import { routePaths, defaultErrorMessage } from 'utils/constants';
import validationErrors from 'utils/validationErrors';
import { toast } from 'react-toastify';
import { forgotPassword } from 'api/authApi';

const initialValues = { email: '' };

const validation = yupObject().shape({
  email: yupString().required(validationErrors.requiredEmail),
});

class ForgotPassword extends PureComponent {
  onSubmit = async (
    values,
    { setSubmitting, setErrors },
  ) => {
    try {
      await forgotPassword(values.email);
      toast.success('Успех! Теперь проверь свою почту.');
    } catch (err) {
      if (err.status === 404) {
        return setErrors({ email: 'Email не найден' });
      }

      toast.error(defaultErrorMessage);
    } finally {
      setSubmitting(false);
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
              value={values.email}
              name="email"
              inputMode="email"
              onChange={handleChange}
              label="Email"
              fullWidth
              onBlur={handleBlur}
              error={Boolean(errors.email && touched.email)}
              helperText={errors.email}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Забыл пароль
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

export default ForgotPassword;
