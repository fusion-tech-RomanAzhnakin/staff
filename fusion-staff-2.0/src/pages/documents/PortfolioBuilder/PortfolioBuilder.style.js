import styled from 'styled-components';

const StyledMain = styled.main`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 0 30px 30px;
  
  @media (max-width: ${({ theme }) => theme.screen.md}px) {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 0 15px 15px;
  }
`;

export default StyledMain;
