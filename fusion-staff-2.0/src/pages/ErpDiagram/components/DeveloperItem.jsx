import React from 'react';

import StyledDeveloperItem from './DeveloperItem.style';
import Avatar from '../../../ui/components/Avatar';

import { UserType } from '../../../utils/types';

const Group = (props) => {
  const user = props.group;

  return (
    <StyledDeveloperItem>
      <Avatar
        user={user}
        size="sm"
        className="dev-avatar"
        linkToAccount
        scaleOnHover
        scaleValue={2}
      />
      {user.fullName}
    </StyledDeveloperItem>
  );
};

Group.propTypes = {
  group: UserType.isRequired,
};

export default Group;
