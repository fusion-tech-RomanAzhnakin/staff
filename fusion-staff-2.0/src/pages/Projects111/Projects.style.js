import styled from 'styled-components';

export default styled.div`
  display: grid;
  grid-template-columns: minmax(2rem, 1fr) repeat(9, minmax(min-content, 17rem)) minmax(
      2rem,
      1fr
    );
  grid-auto-rows: min-content;

  .projects__controll-buttons {
    margin-top: 2rem;
    display: grid;
    grid-column: 2 / 11;
    grid-template-columns: repeat(9, 1fr);

    .controll-buttons__left {
      grid-column: 1 / 5;
      display: flex;

      ${({ theme }) => theme.respond('sm', 'grid-column: 1 / 6')}

      button:first-child {
        margin-right: 1rem;
      }
    }

    .controll-buttons__right {
      grid-column: 8/-1;
    }
  }

  .projects__tabel {
    margin-top: 1rem;
    grid-column: 2 / 11;
    margin-bottom: 1rem;
  }
`;
