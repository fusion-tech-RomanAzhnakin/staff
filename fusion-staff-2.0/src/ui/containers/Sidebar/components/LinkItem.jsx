import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import { RoleChecker } from 'utils/HOC/protector';
import { userRolesList } from 'utils/constants';

const LinkItem = (props) => {
  const { Component, componentProps } = useMemo(() => {
    let Component;
    let componentProps;

    if (props.to) {
      Component = NavLink;
      componentProps = {
        to: props.to,
        activeClassName: 'current-link',
        exact: true,
      };
    } else {
      Component = 'a';
      componentProps = {
        to: props.to || '',
        href: props.href,
        target: '_blank',
        rel: 'noopener noreferrer',
      };
    }

    return {
      Component,
      componentProps,
    };
  }, [props.to, props.href]);

  if (props.onlyForTablets && !props.isTablet) {
    return null;
  }

  return (
    <RoleChecker roles={props.roles || 'any'}>
      <Component {...componentProps} onClick={props.onClick}>
        {props.icon}

        <span className="nav-item-title">
          {props.title}
        </span>
      </Component>
    </RoleChecker>
  );
};

LinkItem.propTypes = {
  icon: PropTypes.node,
  to: PropTypes.string,
  title: PropTypes.string,
  href: PropTypes.string,
  roles: PropTypes.oneOfType([
    PropTypes.oneOf([...userRolesList, 'any', 'none']),
    PropTypes.arrayOf(
      PropTypes.oneOf([...userRolesList, 'any', 'none']),
    ),
  ]),
  onlyForTablets: PropTypes.bool,
  isTablet: PropTypes.bool,
  onClick: PropTypes.func,
};

LinkItem.defaultProps = {
  icon: <InsertLinkIcon />,
  to: '',
  title: '',
  roles: 'any',
  href: '',
  onlyForTablets: false,
  isTablet: false,
  onClick: () => null,
};

export default memo(LinkItem);
