import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    color: inherit;
    outline: none;
    list-style: none;
    font-family: inherit;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  html,
  body,
  #root {
    min-height: 100%;
  }

  html,
  body {
    display: flex;
  }

  body,
  #root {
    width: 100%;
  }

  #root {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-top: ${({ theme }) => theme.header.minHeight};
    transition: ${({ theme }) => theme.transition};
  }

  html {
    font-family: ${({ theme }) => theme.font.family.main};
    font-size: ${({ theme }) => theme.font.size.globalValue};
    color: ${({ theme }) => theme.colors.mainText};
    font-weight: ${({ theme }) => theme.font.weight.md};
    background-color: ${({ theme }) => theme.colors.pageBackground};
  }

  a {
    text-decoration: none;
  }

  input {
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    :-webkit-autofill,
    :-webkit-autofill:hover, 
    :-webkit-autofill:focus {
      box-shadow: 0 0 0 30px ${({ theme }) => theme.colors.pageBackground} inset;
      -webkit-text-fill-color: ${({ theme }) => theme.colors.mainText};
    }
  }

  *::selection {
    background-color: ${({ theme }) => theme.colors.primary.main};
    color: ${({ theme }) => theme.colors.primary.contrastText};
  }
`;
