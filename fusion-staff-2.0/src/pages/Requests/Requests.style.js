import styled from 'styled-components';
import MainPageContent from 'ui/components/MainPageContent';

export const StyledMainPageContent = styled(MainPageContent)`
  display: flex;
  justify-content: start;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;
