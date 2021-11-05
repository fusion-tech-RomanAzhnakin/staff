import styled from 'styled-components';

export default styled.div`
  .select__control {
    box-shadow: none;
    min-width: 195px;
    border-color: rgba(0, 0, 0, 0.2);
    border-radius: 2px;

    :hover {
      border-color: #101010;
    }
  }

  .select__option--is-focused {
    background-color: #F3F2F3;
  }

  .select__option:active {
    background-color: #CFC9D6;
  }

  .select__option--is-selected {
    background-color: ${({ theme }) => theme.colors.primary};
  }
  
  .select__task-level {
    margin: 16px 0 8px 0;
    width:50%;
  }
`;
