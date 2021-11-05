import styled from 'styled-components';

const TasksHeader = styled.div`
  position: relative;

  & .form__wrapper {
    display: flex;
    margin-top: 10px;
    margin-bottom: 5px;
    padding-left: 6px;
    padding-bottom: 7px;
    border-bottom: 1px solid rgba(224, 224, 224, 1);
  }
  
  .mentors-container {
    padding: 0 6px;
    border-bottom: 1px solid rgba(224, 224, 224, 1);
    padding-bottom: 10px;
    margin-bottom: 5px;
  }

  .title-search {
    flex-grow: 1;
  }

  && {
    .title-input {
    input {
      padding: 8px;
      line-height: 24px;
    }

    &.focused {

      fieldset {
        border: solid 2px rgb(159, 63, 255);
      }
      
      fieldset:hover {
        border: solid 2px rgb(159, 63, 255);
      }
    }
    &.focused:hover:not {

      fieldset {
        border-color: rgb(159, 63, 255);
      }
    }
  }
  }

  & h2 {
    margin: 0;
    padding: 17px 0;
    font-size: 16px;
    font-family: "Noto Sans";
    font-weight: 400;
    color: rgba(0, 0, 0, 0.54);
    text-align: center;
    border-bottom: 1px solid rgba(224, 224, 224, 1);
    margin-bottom: 10px;
  }
  
  & .create-task__btn {
    position: absolute;
    top: 28px;
    left: 10px;
    transform: translateY(-15px);
    color: rgba(0, 0, 0, 0.54);
    width: 30px;
    height: 30px; 
    font-size: 20px;
    font-weight: 600;
    background: none;
    border: 2px solid rgba(0, 0, 0, 0.54);
    border-radius: 50%;
    cursor: pointer;
    transition: 0.05s;

    &:hover {
      opacity: 0.5;
    }
  }
`;

export default TasksHeader;
