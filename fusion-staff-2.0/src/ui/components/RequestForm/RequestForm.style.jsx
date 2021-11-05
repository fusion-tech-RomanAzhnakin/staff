import styled from 'styled-components';

export const StyledForm = styled.form`
  width: 350px;
  display: flex;
  flex-direction: column;
  max-width: 100%;

  .form-input-item {
    margin-bottom: ${({ theme }) => theme.margin.formInput}px;
  }

  .select-wrapper {
    z-index: 2;
  }
`;
