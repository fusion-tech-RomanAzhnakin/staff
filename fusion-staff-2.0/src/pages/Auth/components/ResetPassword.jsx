import React, { PureComponent } from 'react';
import { object as yupObject } from 'yup';
import Url from 'urls-tool';

import { Formik } from 'formik';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import StyledForm from 'pages/Auth/components/StyledForm';

import { routePaths, defaultErrorMessage } from 'utils/constants';
import { passwordValidation } from 'utils/validation';
import { toast } from 'react-toastify';
import { resetPassword } from 'api/authApi';
import { RouterPropType } from 'utils/types';

const initialValues = { password: '' };

const validation = yupObject().shape({
  password: passwordValidation,
});

class ResetPassword extends PureComponent {
  showError = () => {
    toast.error('Не валидная ссылка');
    this.props.history.push(routePaths.auth.forgotPassword);
  }

  onSubmit = async (
    values,
    { setSubmitting },
  ) => {
    try {
      const token = Url.getParams().token;
      if (!token) {
        return this.showError();
      }

      await resetPassword({
        token,
        password: values.password,
      });
      toast.success('Успех! Теперь можешь пользоваться новым паролем');
      this.props.history.push(routePaths.auth.signIn);
    } catch (err) {
      setSubmitting(false);

      if ([400, 404].includes(err.status)) {
        return this.showError();
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
              value={values.password}
              name="password"
              onChange={handleChange}
              label="Пароль"
              fullWidth
              onBlur={handleBlur}
              error={Boolean(errors.password && touched.password)}
              helperText={errors.password}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Изменить пароль
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

ResetPassword.propTypes = {
  history: RouterPropType.isRequired,
};

export default withRouter(ResetPassword);
