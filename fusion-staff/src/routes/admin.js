import { lazy } from 'react';

const StaffTable = lazy(() => import('pages/admin/StaffTable'));
const Internship = lazy(() => import('pages/admin/Internship'));
const AnnouncementsTable = lazy(() => import('pages/admin/AnnouncementsTable'));

export default [
  {
    path: '/staff',
    exact: true,
    component: StaffTable,
    role: ['hr', 'admin', 'officeManager'],
    pageTitle: 'Список сотрудников'
  }, {
    path: '/internship',
    exact: true,
    component: Internship,
    role: ['admin', 'mentor'],
    pageTitle: 'Стажировка'
  }, {
    path: '/announcements',
    exact: true,
    component: AnnouncementsTable,
    role: ['hr', 'admin'],
    pageTitle: 'Объявления'
  }
];
