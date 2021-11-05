import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  margin-top: 16px;
  flex-direction: column;

  .pdf-viewer__wrapper {
    text-align: center;
  }

  .pdf-viewer__download-btn {
    padding: 0;
    border-radius: 4px;
  }

  .pdf-viewer__link {
    padding: 6px 16px;
    width: 100%;
  }

  #my-pdf {
    display: flex;

    &, canvas {
      width: 100% !important;
      height: auto !important;
    }
  }

  @media (max-width: ${({ theme }) => theme.screen.md}px) {
    margin-top: 0;
  }
`;

export default StyledContainer;
