import React, { lazy, memo, useEffect, useMemo } from 'react';
import { connect, useDispatch } from 'react-redux';

import { withRouter, useLocation } from 'react-router-dom';
import Collapse from '@material-ui/core/Collapse';
import StyledPage from 'pages/Auth/Auth.style';

import lazyWrapper from 'utils/HOC/lazyWrapper';
import { routePaths } from 'utils/constants';
import { updatePageTitle } from 'store/main';

const SignIn = lazyWrapper(lazy(() => import('pages/Auth/components/SignIn')));
const SignUp = lazyWrapper(lazy(() => import('pages/Auth/components/SignUp')));
// const ForgotPassword = lazyWrapper(lazy(() => import('pages/Auth/components/ForgotPassword')));
// const ResetPassword = lazyWrapper(lazy(() => import('pages/Auth/components/ResetPassword')));

const Auth = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const openedForm = useMemo(() => formes.find((form) => {
    let isOpen = location?.pathname === form.path;
    if (form.path === '/') {
      isOpen = !notSignInRoutes.includes(location?.pathname || '/');
    }
    return isOpen;
  }), [location]);

  useEffect(() => {
    // dispatch(updatePageTitle(openedForm?.pageTitle)); // Return it will be necessary
    dispatch(updatePageTitle(''));
  });

  return (
    <StyledPage>
      {formes.map((form, index) => {
        const Component = form.component;

        return (
          <Collapse
            key={index}
            in={form.path === openedForm?.path}
            className="form-collapse"
          >
            <Component />
          </Collapse>
        );
      })}
    </StyledPage>
  );
};

const notSignInRoutes = [
  routePaths.auth.signUp,
  routePaths.auth.forgotPassword,
  routePaths.auth.resetPassword,
];
const formes = [
  {
    path: routePaths.auth.signUp,
    component: SignUp,
    exact: true,
    pageTitle: 'Регистрация',
  }, {
    path: '/',
    component: SignIn,
    exact: false,
    pageTitle: 'Вход',
  },
  //  {
  //   path: routePaths.auth.forgotPassword,
  //   component: ForgotPassword,
  //   exact: true,
  //   pageTitle: 'Восстановление пароля',
  // }, {
  //   path: routePaths.auth.resetPassword,
  //   component: ResetPassword,
  //   exact: true,
  //   pageTitle: 'Смена пароля',
  // },
];

const connectFunction = connect(null, { updatePageTitle });

export default connectFunction(withRouter(memo(Auth)));
