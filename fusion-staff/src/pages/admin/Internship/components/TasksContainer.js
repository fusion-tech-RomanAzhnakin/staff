import styled from 'styled-components';

const TasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 32%;
  overflow: auto;
  border: 1px solid #e0e0e0;

  & .opacity-ghost {
    background-color: lightgray;

    & button{
      display: none;
    }
  }

  & .smooth-dnd-container {
    flex-grow: 1;
    margin-bottom: 5px;
    padding: 5px;
    border: 1px solid transparent;
  }
  @media (max-width: 1300px) {
    margin-right: 20px;
    min-width: 300px;
    overflow: unset;
  }
  &::last-child {
    @media (max-width: 1300px) {
      margin-right: 0;
    }
  }
`;

export default TasksContainer;
