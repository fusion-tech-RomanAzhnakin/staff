import styled from 'styled-components';

export default styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;

  > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.margin.formInput}px;
  }

  a {
    margin-top: -${({ theme }) => theme.margin.formInput * 0.7}px;
  }
`;
