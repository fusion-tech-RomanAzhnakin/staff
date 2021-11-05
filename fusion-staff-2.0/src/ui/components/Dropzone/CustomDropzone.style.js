import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  .drop-zone__zone {
    cursor: pointer;
    display: flex;
    height: 10rem;
    border: 2px dashed
      ${({ theme }) => theme.colors.primaryGray};

    .drop-zone__content {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
    }
  }

  .drop-zone__file-list {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
  }
`;

export const CustomListFileItem = styled.div`
  display: flex;
  height: 1.8rem;
  align-items: center;

  .list-item__text {
    margin-right: 5px;
  }

  .list-item__close-icon {
    color: ${({ theme }) => theme.colors.redMain};
    cursor: pointer;
    font-weight: bold;
  }
`;
