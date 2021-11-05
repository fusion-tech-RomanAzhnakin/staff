import React, { memo } from 'react';
import styled from 'styled-components';

import config from 'config';
import { connectGlobalUser } from 'store/connections';
import { UserType } from 'utils/types';
import { userRoles } from 'utils/constants';
// vvv links icons vvv
import articleIcon from '../images/article-icon.svg';
import calendarIcon from '../images/calendar-icon.svg';
import gearIcon from '../images/gear-icon.svg';
import humanIcon from '../images/human-icon.svg';
// import infoIcon from '../images/info-icon.svg';
import megaphoneIcon from '../images/megaphone-icon.svg';
import notebookIcon from '../images/notebook-icon.svg';
import peopleIcon from '../images/people-icon.svg';
import sandClockIcon from '../images/sand-clock-icon.svg';
import suitcaseIcon from '../images/suitcase-icon.svg';
import crmIcon from '../images/crm-icon.svg';
import cvIcon from '../images/cv-icon.svg';
import managerIcon from '../images/manager-icon.svg';
import portfolioIcon from '../images/portfolio-icon.svg';
import adminIcon from '../images/admin-icon.svg';
import requestCalendarIcon from '../images/request-calendar-icon.svg';
import matrixIcon from '../images/matrix-icon.svg';
import logoIcon from '../../../images/logo--simple.svg';
// ^^^ links icons ^^^

import NavItem from './NavItem';
import LinksGroup from './LinksGroup';

const NavLinks = ({ user }) => {
  if (user?.status !== 'active') { return <StyledNav />; }

  return (
    <StyledNav>
      {links.map((link) => {
        if (!link.links) {
          return (
            <NavItem
              key={link.to}
              {...link}
            />
          );
        }

        return (
          <LinksGroup
            key={link.title}
            role={user.role}
            {...link}
          />
        );
      })}
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  overflow: hidden;
  min-height: max-content;
  flex-shrink: 0;
`;

const links = [
  {
    title: 'Домой',
    to: '/',
    icon: logoIcon,
    exact: true,
    mobileonly: true
  }, {
    title: 'Мой Профиль',
    to: '/account',
    icon: humanIcon
  }, {
    title: 'Статьи',
    to: '/articles',
    icon: articleIcon
  }, {
    title: 'Переработки',
    to: '/extra',
    forRole: userRoles.filter((role) => !['admin', 'student'].includes(role)),
    icon: sandClockIcon
  }, {
    title: 'Календарь',
    to: '/calendar',
    forRole: userRoles.filter((role) => !['admin', 'student'].includes(role)),
    icon: calendarIcon
  }, {
    title: 'CRM',
    to: config.crm,
    externalLink: true,
    icon: crmIcon
  }, {
    title: 'Матрица Компетенций',
    to: '/matrix',
    forRole: ['user', 'sales', 'mentor'],
    icon: matrixIcon
  }, {
    title: 'Менеджмент',
    forRole: ['sales', 'admin'],
    icon: managerIcon,
    links: [
      {
        title: 'Создать портфолио',
        to: '/portfolio_builder',
        icon: portfolioIcon
      }, {
        title: 'Создать резюме',
        to: '/cv_builder',
        icon: cvIcon
      }, {
        title: 'Проекты',
        to: '/projects',
        icon: suitcaseIcon
      }, {
        title: 'Календарь заявок',
        to: '/requestsList',
        forRole: 'sales',
        icon: requestCalendarIcon
      }
    ]
  }, {
    title: 'Администрирование',
    forRole: ['hr', 'admin', 'officeManager'],
    icon: adminIcon,
    links: [
      {
        title: 'Сотрудники',
        to: '/staff',
        icon: peopleIcon
      }, {
        title: 'Заявки',
        to: '/requestsList',
        icon: notebookIcon
      }, {
        title: 'Стажировка',
        to: '/internship',
        forRole: 'admin',
        icon: gearIcon,
      }, {
        title: 'Объявления',
        to: '/announcements',
        forRole: ['admin', 'hr'],
        icon: megaphoneIcon
      }, {
        title: 'Переработки',
        to: '/extra',
        forRole: 'admin',
        icon: sandClockIcon
      }, {
        title: 'Матрица Компетенций',
        to: '/matrix',
        icon: matrixIcon
      }
    ]
  }, {
    title: 'Стажировка',
    to: '/internship',
    icon: notebookIcon,
    forRole: 'mentor'
  }
];

NavLinks.propTypes = {
  user: UserType.isRequired,
};

NavLinks.defaultProps = {
  user: undefined
};

export default connectGlobalUser(memo(NavLinks));
