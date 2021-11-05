import styled from 'styled-components';

export default styled.form`
  max-width: 600px;

  .ql-toolbar.ql-snow {
    background-color: ${({ theme }) => theme.colors.mainText};
  }

  .project-field-title {
    margin-bottom: 10px;
  }

  .user-repo__button {
    margin: 10px 0;
  }
`;
