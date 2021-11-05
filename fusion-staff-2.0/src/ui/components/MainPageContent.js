import styled from 'styled-components';

export default styled.main`
  padding: 30px;
  min-height: 100%;
  box-sizing: border-box;

  @media (max-width: ${({ theme }) => theme.screen.md}px) {
    padding: 15px;
  }
`;
