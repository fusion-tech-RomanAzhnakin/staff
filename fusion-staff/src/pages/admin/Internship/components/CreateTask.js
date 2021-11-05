import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  Paper,
  Modal,
  Button
} from '@material-ui/core';
import TaskEditForm from 'pages/admin/Internship/components/TaskEditForm';

import { createTaskRequest } from 'api/studyTaskApi';
import { getModalStyle } from 'utils';
import { UserType } from 'utils/types';

class CreateTask extends Component {
  state = {}

  componentDidMount() {
    this.refreshState();
  }

  refreshState = () => {
    this.setState({
      title: '',
      description: '',
      hidden: 'see',
      timeLimit: 0,
      visitDate: new Date(),
      level: null
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onChangeDate = (visitDate) => {
    this.setState({ visitDate });
  };

  onTaskLevelChange = (level) => {
    this.setState({ level });
  };

  onSubmit = async () => {
    try {
      const { title, description, timeLimit, level } = this.state;
      await createTaskRequest({
        title,
        description,
        level: level?.value || null,
        timeLimit: timeLimit ? +timeLimit : null
      });
      this.refreshState();
      this.props.onHide(true);
      this.props.getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  handleChange = (event) => {
    this.setState({ hidden: event.target.value });
  };

  onHide = (successSubmit = false, errors = false) => {
    this.refreshState();
    this.props.onHide(successSubmit, errors);
  };

  render() {
    const { show, isStudent } = this.props;
    const {
      timeLimit,
      title,
      description,
      hidden,
      visitDate,
      level
    } = this.state;

    return (
      <StyledModal open={show} onClose={this.onHide}>
        <StyledPaper style={getModalStyle()}>
          <TaskEditForm
            title={title}
            description={description}
            onChange={this.onChange}
            time={timeLimit}
            level={level}
            hidden={hidden}
            isStudent={isStudent}
            changeSee={this.handleChange}
            visitDate={visitDate}
            changeTime={this.onChangeDate}
            changeLevel={this.onTaskLevelChange}
          />
          <div className="modal-buttons">
            <Button className="accept-btn" onClick={this.onSubmit}>
              Создать
            </Button>

            <Button
              className="decline-btn"
              onClick={this.onHide}
            >
              Отмена
            </Button>
          </div>
        </StyledPaper>
      </StyledModal>
    );
  }
}

const StyledModal = styled(Modal)`
  & .left-btn {
    float: left;
  }

  & label {
    line-height: 34px;
  }

  & input {
    text-align: left;
  }

  & .quill {
    margin-top: 10px;
  }

  margin-top: 5%;

  & img {
    width: 100%;
  }
  & button {
    margin-top: 10px;
  }
  .project-description {
    margin-bottom: 20px;

    & pre {
      color: rgba(0, 0, 0, 0.87);
      padding-left: 10px;
    }
  }
  .modal-buttons {
    display: flex;
    margin-top: 20px;
    & .decline-btn {
      margin-left: auto;
    }
  }
`;

const StyledPaper = styled(Paper)`
  position: fixed;
  padding: 20px;
  font-size: 16px;
  min-width: 700px;
  max-height: 600px;
  overflow-y: scroll;

  @media (max-width: 701px) {
    min-width: auto;
    width: 98%;
  }
`;

CreateTask.propTypes = {
  onHide: PropTypes.func,
  show: PropTypes.bool,
  getTasks: PropTypes.func,
  isStudent: PropTypes.bool,
  globalUser: UserType.isRequired
};

CreateTask.defaultProps = {
  show: false,
  onHide: () => null,
  getTasks: () => null,
  isStudent: true
};

export default CreateTask;