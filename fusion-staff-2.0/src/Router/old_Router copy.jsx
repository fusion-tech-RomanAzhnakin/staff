import React, { memo, lazy } from 'react';
import { useSelector } from 'react-redux';

import { Switch, Route } from 'react-router-dom';

import { routePaths } from 'utils/constants';
import lazyWrapper from 'utils/HOC/lazyWrapper';
import protector from 'utils/HOC/protector';
import titleSetter from 'utils/HOC/titleSetter';

const Page404 = lazyWrapper(lazy(() => import('pages/Page404')));
const Auth = lazyWrapper(lazy(() => import('pages/Auth')));
const Home = lazyWrapper(lazy(() => import('pages/Home')));
// const HrBoards = lazyWrapper(lazy(() => import('pages/HrBoards')));
const ErpDiagram = lazyWrapper(lazy(() => import('pages/ErpDiagram')));
const Articles = lazyWrapper(lazy(() => import('pages/Articles')));
const Account = lazyWrapper(lazy(() => import('pages/Account')));
const Staff = lazyWrapper(lazy(() => import('pages/Staff')));
const Requests = lazyWrapper(lazy(() => import('pages/Requests')));
const PortfolioBuilder = lazyWrapper(lazy(() => import('pages/documents/PortfolioBuilder')));
// const Projects = lazyWrapper(lazy(() => import('pages/Projects')));
// const CreateProject = lazyWrapper(lazy(() => import('pages/Projects/CreateProject')));

const Router = () => {
  const user = useSelector(({ main }) => main.user);

  if (!user) {
    return <Auth />;
  }

  return (
    <Switch>
      {protectedRoutes.map((route, index) => (
        <Route key={index} {...route} exact={route.exact ?? true} />
      ))}
    </Switch>
  );
};

// Default exact value – true
const routes = [
  {
    path: routePaths.home,
    component: Home,
    pageTitle: 'Добро пожаловать!',
  },
  // {
  //   path: routePaths.hrBoards,
  //   component: HrBoards,
  //   pageTitle: 'Custom Trello',
  //   roles: ['hr', 'admin'],
  // },
  {
    path: routePaths.diagram,
    component: ErpDiagram,
    pageTitle: 'ERP Диаграмма',
    roles: ['sales', 'admin'],
  },
  {
    path: routePaths.articles,
    component: Articles,
    pageTitle: 'Статьи',
  },
  {
    path: routePaths.sales.createPortfolio,
    component: PortfolioBuilder,
    pageTitle: 'Создание портфолио',
    roles: ['sales', 'admin'],
  },
  {
    path: routePaths.common.user.one,
    component: Account,
    pageTitle: 'Аккаунт',
  },
  {
    path: routePaths.staff,
    component: Staff,
    pageTitle: 'Сотрудники',
    roles: ['hr', 'admin', 'officeManager'],
  },
  {
    path: routePaths.common.createRequest,
    component: Requests,
    pageTitle: 'Создайте запрос',
  },
  // {
  //   path: routePaths.sales.projects,
  //   component: Projects,
  //   pageTitle: 'Проекты',
  //   roles: ['sales', 'admin'],
  // },
  // {
  //   path: routePaths.sales.createProject,
  //   component: CreateProject,
  //   pageTitle: 'Создать проект',
  //   roles: ['sales', 'admin'],
  // },
  {
    path: '/',
    exact: false,
    component: Page404,
    pageTitle: 'Страница не найдена',
  },
];

const protectedRoutes = routes.map((route) => {
  let { component } = route;
  if (route.roles) {
    component = protector(component, route.roles);
  }
  if (route.pageTitle) {
    component = titleSetter(component, route.pageTitle);
  }
  return { ...route, component };
});

export default memo(Router);
