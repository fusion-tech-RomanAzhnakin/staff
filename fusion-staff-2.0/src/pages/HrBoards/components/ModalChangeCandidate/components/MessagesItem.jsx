import React from 'react';
import PropTypes from 'prop-types';

import { Card } from '@material-ui/core';
import styled from 'styled-components';

import Avatar from 'ui/components/Avatar';
import { UserType } from 'utils/types';

const MessagesItem = (props) => {
  const { message, isAuthor, user } = props;

  return (

    <MessagesItemContainer author={isAuthor} >
      <Avatar className='avatar' user={user} />
      <Card className='message'>
        {message}
      </Card>
    </MessagesItemContainer >

  );
};

const MessagesItemContainer = styled.div`
  display:flex;
  align-items:flex-start;
  margin-bottom: 20px;
  position: relative;
  .avatar{
  position:absolute;
  right: ${({ author }) => author && 0};
  left:  ${({ author }) => !author && 0};
  }
  .message{
    width:100%;
    overflow-wrap: break-word;
    padding: 20px;
    margin-top: 0;
    margin-right:${({ author }) => (author && '50px') || '30px'};
    margin-left:${({ author }) => (!author && '50px') || '30px'};
    margin-bottom: 20px;
    background-color: #656565;
    border-radius: ${({ author }) => (author && '10px 0 10px 10px') || '0 10px 10px 10px'};
  }
`;
MessagesItem.propTypes = {
  message: PropTypes.string.isRequired,
  isAuthor: PropTypes.bool.isRequired,
  user: UserType.isRequired,
};

export default MessagesItem;
