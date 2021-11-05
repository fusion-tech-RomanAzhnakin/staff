import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import { Redirect } from 'react-router-dom';

import { routePaths } from 'utils/constants';

export const accessCheck = (user, roles) => {
  if (user && roles === 'any') { return true; }

  let required = [roles];
  if (Array.isArray(roles)) {
    required = roles;
  }

  return required.includes(user?.role || 'none');
};

const protector = (Page, roles) => memo(
  (props) => {
    const user = useSelector(({ main }) => main.user);

    const isRoleAccepted = accessCheck(user, roles);
    const isActive = user?.status === 'active';

    if (
      !isRoleAccepted ||
      (user && !isActive)
    ) {
      return <Redirect to={routePaths.home} />;
    }

    return <Page {...props} />;
  },
);

export const SimpleRoleChecker = (props) => {
  const user = useSelector(({ main }) => main.user);

  const isRoleAccepted = accessCheck(user, props.roles);
  const isActive = user?.status === 'active';

  if (!isRoleAccepted || !isActive) { return null; }

  return props.children;
};

export const RoleChecker = memo(SimpleRoleChecker); // SimpleRoleChecker with HOCs

export default protector;
