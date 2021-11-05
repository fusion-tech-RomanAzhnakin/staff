import styled, { css } from 'styled-components';

const StyledSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  width: ${({ isOpen, theme }) => (isOpen ? theme.sidebar.width.open : theme.sidebar.width.closed)};
  transition: ${({ theme }) => theme.transition};

  header { /* Sidebar header */
    background-color: ${({ theme }) => theme.colors.navbar.backgroundDark};
    height: ${({ theme }) => theme.header.minHeight};
    padding: 9px ${({ isOpen }) => (isOpen ? 35 : 24)}px;
    transition: ${({ theme }) => theme.transition};
    box-sizing: border-box;
    overflow: hidden;

    a { /* Home link around the logo image */
      display: flex;
      align-items: center;
    }

    a, img {
      height: 100%;
    }

    img {
      transition: ${({ theme }) => theme.transition};
    }
    
    .logo-circle {
      width: ${({ isOpen }) => (isOpen ? '0' : '100%')};
    }

    .logo {
      width: ${({ isOpen }) => (isOpen ? '100%' : '0')};
    }
  }

  ${({ isUser, theme }) => (isUser ? '' : css`
    bottom: unset;
    height: ${theme.header.minHeight};
    width: 100%;

    header {
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${({ theme }) => theme.colors.navbar.background};

      .logo-circle {
        width: 0;
      }

      a {
        padding 10px 0;
        box-sizing: border-box;
      }

      .logo {
        width: unset;
      }
    }
  `)}
`;

export default StyledSidebar;
