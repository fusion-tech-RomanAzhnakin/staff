import styled from 'styled-components';

export default styled.div`
  display: grid;
  grid-template-columns: minmax(5rem, 1fr) repeat(9, minmax(min-content, 17rem)) minmax(
      5rem,
      1fr
    );
  grid-auto-rows: min-content;

  .create-project__content {
    margin-top: 2rem;
    grid-column: 2 / 6;

    ${({ theme }) => theme.respond('lg', 'grid-column: 2 / 8;')}
    ${({ theme }) => theme.respond('md', 'grid-column: 2 / 11;')}
    
    display: flex;
    flex-direction: column;

    .create-project__inputs {
      display: flex;

      div:first-child {
        margin-right: 2rem;
      }
    }

    label {
      margin-bottom: 0.5rem;
    }

    .ql-toolbar.ql-snow {
      background-color: ${({ theme }) => theme.colors.mainText};
    }

    .ql-container {
      height: auto;
    }

    .MuiFormControl-root {
      margin-bottom: 1rem;
    }

    & > :not(label) {
      margin-bottom: 3rem;
    }

    .create-project__roles {
      display: flex;
      flex-direction: column;

      &__add-button-container {
        flex-grow: 1;
        display: flex;
        justify-content: flex-end;
        margin-top: 1rem;
      }
    }

    .create-project__selects {
      display: grid;
      width: 100%;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;

    }

    .create-project__buttons {
      display: flex;

      button:first-child {
        margin-right: 2rem;
      }
    }
  }
`;
