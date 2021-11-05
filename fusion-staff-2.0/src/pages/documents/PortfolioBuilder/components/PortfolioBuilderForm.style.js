import styled from 'styled-components';

const StyledForm = styled.form`
  .portfolio-builder-form__input {
    margin-bottom: 8px;
  }

  .portfolio-builder-form__select-title {
    margin: 8px 0 8px;
  }

  .portfolio-builder-form__select {
    margin-bottom: 16px;
  }

  .portfolio-builder-form__container {
    display: flex;
    justify-content: space-between;
    margin-top: 32px;
    padding: 0;
  }

  .portfolio-builder-form__btn {
    border-radius: 4px;
  }

  @media (max-width: ${({ theme }) => theme.screen.md}px) {
    .portfolio-builder-form__input {
      margin-top: 0;
    }
  }

  @media (max-width: ${({ theme }) => theme.screen.sm}px) {
    .portfolio-builder-form__btn {
      padding: 6px 12px;
    }
  }
`;

export default StyledForm;
