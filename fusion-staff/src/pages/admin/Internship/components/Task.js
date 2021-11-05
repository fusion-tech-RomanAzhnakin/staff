import styled from 'styled-components';

export const Task = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 57px;
  margin-bottom: 10px;
  cursor: pointer;

  border: ${props => (
    props.isIncludedInPlan ? '2px solid #5cb85c' : '1px solid #ccc'
  )};
  border-radius: 4px;

  .move-icon {
    cursor: move;
  }
`;

export default Task;
