import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { FormControl, InputLabel, Input, Box } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import PersonIcon from '@material-ui/icons/Person';

import socketMessage from 'utils/socket-constant';
import MessagesItem from './MessagesItem';

const MessagesForm = () => {
  const user_id = useSelector(({ main }) => main.user.id);
  const candidate_id = useSelector(({ hrBoards }) => hrBoards.openCandidate.id);
  const socket = useSelector(({ hrBoards }) => hrBoards.socket);
  const messages = useSelector(({ hrBoards }) => hrBoards.openCandidate.messages);
  const usersList = useSelector(({ enums }) => enums.usersList);

  const [chatMessages, setChatMessages] = useState(messages);
  const [newMessage, setNewMessage] = useState('');

  const chat = useRef(null);

  useEffect(() => {
    chat.current.scrollIntoView();
  });

  useEffect(() => {
    setChatMessages(messages);
  }, [messages]);

  const handleSendMessage = () => {
    socket.emit(socketMessage.PUT_MESSAGE, {
      message: newMessage,
      candidate_id,
      author_id: user_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    setNewMessage('');
  };

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };
  return (

    <MessagesContainer>

      <div className='chatContainer'>

        {
          chatMessages.map((messageData) => {
            return <MessagesItem
              key={messageData.id}
              user={usersList[messageData.author_id]}
              isAuthor={messageData.author_id === user_id}
              message={messageData.message} />;
          })
        }

        <div ref={chat} />
      </div>
      <Box className='chatInput' display="block">
        <FormControl>
          <PersonIcon
            className='personIcon' />
          <InputLabel htmlFor='my-input'>Сообщение</InputLabel>
          <Input
            multiline
            id='my-input'
            aria-describedby='my-helper-text'
            value={newMessage}
            onChange={handleNewMessageChange}
          />
          <SendIcon
            onClick={handleSendMessage}
            className='sendIcon' />
        </FormControl>
      </Box>

    </MessagesContainer>

  );
};

const MessagesContainer = styled.div`
display:flex;
flex-direction: column;
justify-content:flex-end;
align-items: stretch;
padding:10px;
height: 755px;

  .chatContainer{
    justify-self:stretch;
    display:flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;
    padding: 10px;
    overflow:'hidden' !important;
  }
  .chatContainer::-webkit-scrollbar {
  display: none;
  
  .chatInput{
    padding:5px;
    z-index:1;
    padding: 10px;
  }
  
}
  .MuiFormControl-root{
     width:100%;
    position: relative;
      .MuiInput-root{
        padding-left:35px;
      }
    }
    .sendIcon{
      position: absolute;
      top: 18px;
      right: 0;
      margin-right: 6px;
      cursor: pointer;
    }
    .MuiInputLabel-root{
      position: absolute;
      left: 35px; 
    }
    .personIcon{
      position: absolute;
      top: 18px;
      margin-left:5px;
      z-index:3;
      cursor: pointer;
    }
`;

export default (MessagesForm);
