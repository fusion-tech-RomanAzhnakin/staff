import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { darken } from 'polished';

import HomeIcon from '@material-ui/icons/Home';
import TableChartIcon from '@material-ui/icons/TableChart';
import WebIcon from '@material-ui/icons/Web';
import WorkIcon from '@material-ui/icons/Work';
import PeopleIcon from '@material-ui/icons/People';
// import FolderSharedIcon from '@material-ui/icons/FolderShared';
import PeopleStaff from '@material-ui/icons/PeopleAlt';
import LinkItem from 'ui/containers/Sidebar/components/LinkItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EqualizerIcon from '@material-ui/icons/Equalizer';
// import ViewColumnIcon from '@material-ui/icons/ViewColumn';

import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { logOut } from 'utils';
import config from 'config';
import theme from 'ui/styles/StyledComponentsTheme/themes/main';
import { routePaths } from 'utils/constants';
import { toggleSidebar } from 'store/main/reducer';

const NavMenu = (props) => {
  const isSidebarOpen = useSelector(({ main }) => main.isSidebarOpen);
  const dispatch = useDispatch();

  const onItemClick = useCallback(() => {
    if (props.isTablet) {
      dispatch(toggleSidebar(false));
    }
  }, [props.isTablet, dispatch]);

  return (
    <StyledMain isSidebarOpen={isSidebarOpen || props.isTablet}>
      <nav>
        {navList.map((item) => (
          <LinkItem
            key={item.to || item.href}
            isTablet={props.isTablet}
            onClick={onItemClick}
            {...item}
          />
        ))}
      </nav>

      <p className="log-out-item" onClick={logOut}>
        <FontAwesomeIcon icon={faSignOutAlt} />

        <span className="nav-item-title">Выход</span>
      </p>
    </StyledMain>
  );
};

const navList = [
  {
    to: routePaths.home,
    title: 'Домой',
    icon: <HomeIcon />,
    onlyForTablets: true,
  },
  {
    href: config.crmUrl,
    target: '_blank',
    title: 'CRM',
    icon: <TableChartIcon />,
  },
  {
    href: config.oldStaffUrl,
    target: '_blank',
    title: 'Старый Staff',
    icon: <PeopleIcon />,
  },
  {
    to: routePaths.articles,
    title: 'Статьи',
    icon: <WebIcon />,
  },
  // {
  //   to: routePaths.hrBoards,
  //   title: 'Boards',
  //   icon: <ViewColumnIcon />,
  //   roles: ['hr', 'admin'],
  // },
  {
    to: routePaths.sales.projects,
    title: 'Проекты',
    icon: <WorkIcon />,
    roles: ['sales', 'admin'],
  },
  {
    to: routePaths.diagram,
    title: 'ERP Диаграмма',
    icon: <EqualizerIcon />,
    roles: ['sales', 'admin'],
  },
  {
    to: routePaths.staff,
    title: 'Сотрудники',
    icon: <PeopleStaff />,
    roles: ['hr', 'admin', 'officeManager'],
  },
  // {
  //   to: routePaths.sales.createPortfolio,
  //   title: 'Создание Портфолио',
  //   icon: <FolderSharedIcon />,
  //   roles: ['sales', 'admin'],
  // },
];

const padding = 15;
const iconWidth = +theme.sidebar.width.closed.replace(/px/, '') - padding * 2;
const StyledMain = styled.main`
  background-color: ${({ theme }) => theme.colors.navbar.background};
  color: ${({ theme }) => theme.colors.navbar.text};
  flex-direction: column;
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  padding: ${padding}px 0;
  overflow: hidden;
  overflow-y: auto;

  .log-out-item {
    cursor: pointer;
    margin-top: 40px;
  }

  .log-out-item,
  a {
    display: flex;
    align-items: center;
    transition: ${({ theme }) => theme.transition};
    padding: 10px ${padding}px;
    padding-right: 40px;

    :hover {
      background-color: ${({ theme }) => darken(0.05, theme.colors.navbar.background)};
    }
  }

  .nav-item-title {
    transition: ${({ theme }) => theme.transition};
    opacity: ${({ isSidebarOpen }) => (isSidebarOpen ? 1 : 0)};
    white-space: nowrap;
  }

  .current-link {
    color: ${({ theme }) => theme.colors.primary.main};
    svg {
      fill: ${({ theme }) => theme.colors.primary.main};
    }
  }

  && svg {
    cursor: pointer;
    fill: ${({ theme }) => theme.colors.navbar.text};
    transition: ${({ theme }) => theme.transition};
    margin-right: 15px;

    ${({ isSidebarOpen }) => (!isSidebarOpen
    ? css`
            width: ${iconWidth}px;
            min-width: ${iconWidth}px;
            height: ${iconWidth}px;
            max-height: 40px;
          `
    : css`
            width: 30px;
            min-width: 30px;
            height: 30px;
            max-height: 30px;
          `)};
  }
`;

NavMenu.propTypes = {
  isTablet: PropTypes.bool,
};

NavMenu.defaultProps = {
  isTablet: false,
};

export default memo(NavMenu);
