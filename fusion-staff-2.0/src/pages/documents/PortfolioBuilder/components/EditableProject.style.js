import styled from 'styled-components';

const StyledContainer = styled.div`
  margin-bottom: 32px;

  .editable-project__title {
    margin-bottom: 16px;
  }

  .quill {
    margin-bottom: 16px;
  }

  .ql-toolbar {
    background-color: ${({ theme }) => theme.colors.mainText};
  }
`;

export default StyledContainer;
