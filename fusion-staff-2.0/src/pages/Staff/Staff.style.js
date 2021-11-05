import styled from 'styled-components';

import MainPageContent from 'ui/components/MainPageContent';

export default styled(MainPageContent)`
  table thead th {
    text-align: center;
    cursor: pointer;

    &:first-child {
      width: 100%;
      text-align: left;
    }

    .no-active {
      transition: ${({ theme }) => theme.transition};
      opacity: 0.3;
    }
  }

  table tbody tr {
    transition: ${({ theme }) => theme.transition};
    cursor: pointer;

    :hover {
      background-color: ${({ theme }) => theme.colors.navbar.background};
    }

    p {
      width: fit-content;
    }

    button {
      margin-right: 18px;
      width: 26px;
      height: 26px;
      box-sizing: content-box;
    }

    .dev {
      color: #449d44;
      font-size: 35px;
    }

    svg {
      font-size: 26px;
    }
  }

  .select-width {
    min-width: 200px;
  }

  label {
    margin-bottom: 5px;
  }

  .fitlers {
    max-width: 1500px;
    margin-bottom: 20px;
  }

  .divider {
    width: 100%;
    margin: 10px 0;
  }
`;
