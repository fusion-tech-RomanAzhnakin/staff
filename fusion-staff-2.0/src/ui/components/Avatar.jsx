import React, { memo, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import _random from 'lodash/random';
import { useHistory } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

import { UserType } from 'utils/types';
import { getFullName } from 'utils/utils';
import { routePaths, getDefaultAvatar } from 'utils/constants';

const backgroundColors = [
  '#D32F2F',
  '#F44336',
  '#E040FB',
  '#7C4DFF',
  '#303F9F',
  '#448AFF',
  '#0097A7',
  '#388E3C',
  '#F57C00',
];

const CustomAvatar = (props) => {
  const myUser = useSelector(({ main }) => main.user);
  const history = useHistory();

  const user = useMemo(
    () => (props.user || (props.me ? myUser : {})),
    [props.user, props.me, myUser],
  );

  const onClick = useCallback((...args) => {
    props.onClick(...args);

    if (props.linkToAccount) {
      history.push(routePaths.common.user.createLink(user.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.onClick, user, history, props.linkToAccount]);

  const defaultAvatar = useMemo(
    () => (props.defaultAvatar ? getDefaultAvatar() : null),
    [props.defaultAvatar],
  );

  const { avatar } = user;

  const thumbnail = useMemo(
    () => (user.avatarThumbnail || user.avatar),
    [user],
  );
  const src = useMemo(
    () => (props.size === 'sm' ? thumbnail : avatar),
    [props.size, thumbnail, avatar],
  );
  const fullName = useMemo(
    () => getFullName(user, 'full'),
    [user],
  );
  const initials = useMemo(
    () => getFullName(user, 'initials'),
    [user],
  );
  const backgroundColor = useMemo(
    () => backgroundColors[_random(0, backgroundColors.length - 1, false)],
    [],
  );

  const isAvatar = useMemo(() => Boolean(src || defaultAvatar), [src, defaultAvatar]);

  const openTolltip = useMemo(() => {
    if (props.withTolltip) { return; }

    return false;
  }, [props.withTolltip]);

  return (
    <Tooltip title={fullName} open={openTolltip}>
      <StyledAvatar
        variant="circular"
        className={props.className}
        src={src || defaultAvatar}
        size={props.size}
        background={backgroundColor}
        scaleonhover={props.scaleOnHover.toString()}
        scalevalue={props.scaleValue}
        isavatar={isAvatar.toString()}
        onClick={onClick}
      >
        {initials}
      </StyledAvatar>
    </Tooltip>
  );
};

const sizes = {
  sm: {
    size: 20,
    fontSize: 10,
  },
  md: {
    size: 40,
    fontSize: 23,
  },
  lg: {
    size: 60,
    fontSize: 32,
  },
  xlg: {
    size: 90,
    fontSize: 50,
  },
};

const StyledAvatar = styled(Avatar)`
  && {
    background-color: ${({ background, isavatar }) => (!isavatar === 'true' ? background : 'transparent')};
    color: ${({ theme }) => theme.colors.mainText};
    width: ${({ size }) => sizes[size].size}px;
    height: ${({ size }) => sizes[size].size}px;
    font-size: ${({ size }) => sizes[size].fontSize}px;
    transition: ${({ theme }) => theme.transition};

    :hover {
      transform: scale(${({ scaleonhover, scalevalue }) => (scaleonhover === 'true' ? scalevalue : '1')});
    }
  }
`;

CustomAvatar.propTypes = {
  user: UserType,
  className: PropTypes.string,
  onClick: PropTypes.func,
  me: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xlg']),
  linkToAccount: PropTypes.bool,
  withTolltip: PropTypes.bool,
  defaultAvatar: PropTypes.bool,
  scaleOnHover: PropTypes.bool,
  scaleValue: PropTypes.number,
};

CustomAvatar.defaultProps = {
  user: null,
  className: '',
  me: false,
  size: 'md',
  onClick: () => null,
  linkToAccount: false,
  withTolltip: true,
  defaultAvatar: false,
  scaleOnHover: false,
  scaleValue: 2,
};

export default memo(CustomAvatar);
