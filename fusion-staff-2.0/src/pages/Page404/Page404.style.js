import styled from 'styled-components';

import MainPageContent from 'ui/components/MainPageContent';

export default styled(MainPageContent)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 1;
  flex-direction: column;

  h1 {
    font-size: 5rem;
  }

  h3 {
    font-size: 2rem;
  }
`;
