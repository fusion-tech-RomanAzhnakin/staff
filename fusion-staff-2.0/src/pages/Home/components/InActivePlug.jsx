import React from 'react';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import MainPageContent from 'ui/components/MainPageContent';

const InActivePlug = () => {
  return (
    <StyledPlug>
      <Typography variant="h1">Пожалуйста, ожидайте подтверждения Вашего аккаунта.</Typography>
    </StyledPlug>
  );
};

const StyledPlug = styled(MainPageContent)`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    text-align: center;
    max-width: 600px;
  }
`;

export default InActivePlug;
