import styled from 'styled-components';

import MainPageContent from 'ui/components/MainPageContent';

export default styled(MainPageContent)`
  table tbody tr {
    transition: ${({ theme }) => theme.transition};
    cursor: pointer;

    :hover {
      background-color: ${({ theme }) => theme.colors.navbar.background};
    }
  }

  label {
    margin-bottom: 5px;
  }

  .filterHead {
    margin-bottom: 10px;
  }

  .tabelPagination {
    margin-bottom: 15px;
    margin-top: 15px;
  }

  .containerFilter {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .buttonClearFilter {
    margin: 8px;
    justify-content: flex-end;
  }

  @media (max-width: 480px) {
    .containerFilter {
      display: block;
      flex-direction: column;
      margin-bottom: 10px;
      align-items: flex-start;
    }

    .containerInner {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
    }

    .modalTechnologies {
      position: 'absolute';
      top: '50%';
      left: '50%';
      transform: 'translate(-50%, -50%)';
      width: 400;
      background-color: 'background.paper';
      border: '2px solid #000';
      box-shadow: 24;
      /* p: 4; */
  }
  }
`;
