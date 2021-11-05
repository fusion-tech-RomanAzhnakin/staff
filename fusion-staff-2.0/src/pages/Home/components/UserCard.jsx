import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CallIcon from '@material-ui/icons/Call';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from 'ui/components/Avatar';
import StyledCard from 'pages/Home/components/UserCard.style';

import { getFullName } from 'utils/utils';
import { UserType } from 'utils/types';
import { routePaths, userTechRolesRu } from 'utils/constants';

const UserCard = ({ user }) => {
  const history = useHistory();

  const onUserClick = useCallback(() => {
    history.push(`${routePaths.common.user.createLink(user?.id)}`);
  }, [history, user]);

  const fullName = useMemo(() => getFullName(user, 'full'), [user]);

  return (
    <StyledCard className='userCard' variant="outlined" onClick={onUserClick}>
      <Avatar
        withTolltip={false}
        user={user}
        className="avatar"
        size="lg"
        scaleOnHover
        scaleValue={2}
      />

      <CardContent className='user-card__content'>
        <Tooltip title={fullName}>
          <Typography noWrap variant="h2">
            {fullName}
          </Typography>
        </Tooltip>

        <Tooltip title={user.email}>
          <Typography noWrap variant="h6">
            {user.email}
          </Typography>
        </Tooltip>

        {user.tech_role && (
          <Typography noWrap variant="h5">
            {userTechRolesRu[user.tech_role]}
          </Typography>
        )}
      </CardContent>

      <Box component="a" href={`tel:${user.phone}`}>
        <IconButton
          aria-label="call button"
          onClick={(event) => event.stopPropagation()}
        >
          <CallIcon color="primary" />
        </IconButton>
      </Box>
    </StyledCard>
  );
};

UserCard.propTypes = {
  user: UserType.isRequired,
};

export default UserCard;
