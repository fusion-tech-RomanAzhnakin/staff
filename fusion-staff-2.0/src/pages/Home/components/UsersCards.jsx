import React from 'react';
import { useSelector } from 'react-redux';

import UserCard from './UserCard';
import StyledContainer from './UsersCards.style';

const UsersCards = () => {
  const usersList = useSelector((state) => state.enums.usersList);

  if (!usersList) { return null; }

  return (
    <StyledContainer>
      {Object.values(usersList).map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </StyledContainer>
  );
};

export default UsersCards;
