import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';

export default styled.div`

  .user-info {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 20px 20px;
    margin-bottom: 40px;
    word-break: break-word;

    & > *:nth-child(odd) {
      text-align: right;
    }

    & > *:nth-child(even) {
      width: fit-content;
    }
  }

  .user-info__row {
    margin-bottom: ${({ theme }) => theme.margin.formInput}px;
  }

  .user-info__url {
    transition: ${({ theme }) => theme.transition};
    width: fit-content;

    :hover {
      opacity: 0.6;
    }
  }

  .user-info__repo:not(:last-child) {
    margin-bottom: 10px;
  }

  .user-form__button {
    width: 100%;
    max-width: 200px;
  }

  @media (max-width: ${({ theme }) => theme.screen.sm}px) {
    .user-info {
      grid-template-columns: 35% 1fr;
    }

    .user-form__button {
      max-width: none;
    }
  }
`;
