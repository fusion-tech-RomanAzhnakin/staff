import styled from 'styled-components';

export default styled.div`
  max-width: 600px;
  margin-top: ${({ theme }) => theme.margin.formInput}px;

  form {
    margin-top: 20px;
  }

  .user-form__button {
    width: 100%;
    max-width: 200px;
  }

  @media (max-width: ${({ theme }) => theme.screen.sm}px) {
    .user-form__button {
      max-width: none;
    }
  }
`;
