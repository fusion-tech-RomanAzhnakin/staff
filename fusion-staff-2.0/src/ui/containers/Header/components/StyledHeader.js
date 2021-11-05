import styled from 'styled-components';

export default styled.header`
  position: fixed;
  z-index: 10;
  top: 0;
  left: ${({ isOpen, theme }) => (isOpen ? theme.sidebar.width.open : theme.sidebar.width.closed)};
  right: 0;
  background-color: ${({ theme }) => theme.colors.navbar.background};
  color: ${({ theme }) => theme.colors.navbar.text};
  height: ${({ theme }) => theme.header.minHeight};
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: ${({ theme }) => theme.transition};
  padding: 0 30px;

  .page-title {
    font-family: ${({ theme }) => theme.font.family.secondary};
    font-weight: ${({ theme }) => theme.font.weight.lg};
    font-size: ${({ theme }) => theme.font.size.md};
    line-height: 20px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .burger-icon {
    cursor: pointer;
  }

  nav {
    display: flex;
    align-items: center;

    > *:not(:last-child) {
      margin-right: 20px;
    }
  }

  @media (max-width: ${({ theme }) => theme.screen.md}px) {
    left: 0;
    padding: 0 15px;

    nav > *:not(:last-child) {
      margin-right: 15px;
    }
  }
`;
