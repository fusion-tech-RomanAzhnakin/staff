import styled from 'styled-components';

import MainPageContent from 'ui/components/MainPageContent';

export default styled(MainPageContent)`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .form-collapse {
    width: 100%;
    max-width: 489px;
  }
`;
