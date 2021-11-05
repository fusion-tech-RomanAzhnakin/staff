import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { updateTaskStatusRequest } from 'api/studyTaskApi';

import { RoleCheck } from 'utils/protector';

import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Icon,
  Button,
  Typography
} from '@material-ui/core';

import SetDateModal from './SetDateModal';
import { getDayWord } from 'utils/wordHandler';

class UserStudyPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job: this.props.job,
      isFormModalOpen: false,
      type: 'start'
    };
  }

  updateData = async (data) => {
    try {
      const job = { ...this.state.job };

      const { data: plan_taskJob } = await updateTaskStatusRequest(
        job.plan_taskJob.id,
        data
      );
      job.plan_taskJob = plan_taskJob;

      this.setState({ job });
    } catch (err) {
      console.log(err);
    }
  };

  startJob = (e, date) => {
    if (e) {
      e.stopPropagation();
    }

    this.updateData({ startTask: date || new Date() });
  };

  endJob = (e, date) => {
    if (e) {
      e.stopPropagation();
    }

    this.updateData({ finishTask: date || new Date() });
  };

  restartJob = (e) => {
    if (e) {
      e.stopPropagation();
    }

    this.updateData({ startTask: null, finishTask: null });
  };

  handleFormModal = (type) => {
    this.setState(({ isFormModalOpen }) => ({
      isFormModalOpen: !isFormModalOpen,
      type: typeof type === 'string' ? type : 'start'
    }));
  };

  setDate = (date) => {
    if (this.state.type === 'start') {
      this.startJob(undefined, date);
    } else {
      this.endJob(undefined, date);
    }

    this.setState(({ isFormModalOpen }) => ({
      isFormModalOpen: !isFormModalOpen
    }));
  };

  delete = () => {
    this.props.onChange(this.props.index);
  };

  render() {
    const { job, isFormModalOpen, type } = this.state;
    const { title, description, plan_taskJob } = job;
    const start = this.state.job.plan_taskJob.startTask;
    const end = this.state.job.plan_taskJob.finishTask;
    const timeLimit = this.state.job.time_limits;
    const { isAdmin, edit, avgDay, countDay } = this.props;

    return (
      <StyledJob edit={edit ? 'edit' : undefined}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className="mainWrapper">
            <div className="statusAndNameWrapper">
              {start && !end ? (
                <InProgressIcon
                  className={`far fa${end ? '-check' : ''}-circle`}
                />
              ) : (
                <CompleteIcon
                  className={`far fa${end ? '-check' : ''}-circle`}
                />
              )}
              <Title>{title}</Title>
              <ButtonsContainer>
                {!isAdmin && (
                  <>
                    <Button
                      disabled={start}
                      onClick={this.startJob}
                      size="small"
                    >
                      Начать
                    </Button>
                    <Button
                      disabled={end || !start}
                      onClick={this.endJob}
                      size="small"
                    >
                      Закончить
                    </Button>
                  </>
                )}
                <RoleCheck forRole='admin'>
                  <Button
                    onClick={this.restartJob}
                    size="small"
                    disabled={!start}
                  >
                    Сброс
                  </Button>
                </RoleCheck>
              </ButtonsContainer>
            </div>
            {isAdmin && (
              <div className="status-task">
                {this.start && (
                  <p className="numOfDaysPassed">
                    {`${this.end ? 'Затрачено дней:  ' : 'Дней в работе: '
                    }${countDay}`}
                  </p>
                )}
                {!!avgDay && (
                  <p className="numOfDaysPassed">{`(в ср: ${avgDay})`}</p>
                )}
              </div>
            )}
            {edit && (
              <i
                className="fas fa-times-circle close-btn"
                onClick={this.delete}
              />
            )}
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <DetailsContainer>
            <RoleCheck forRole='admin'>
              {start && (
                <DatesContainer>
                  <>
                    <DateTitle>Дата начала:</DateTitle>
                    <Button
                      onClick={() => this.handleFormModal('start')}
                      size="small"
                    >
                      {start ? moment(start).format('DD.MM.YYYY') : ''}
                    </Button>
                  </>

                  {end && (
                    <>
                      <DateTitle>Дата окончания:</DateTitle>
                      <Button
                        onClick={() => this.handleFormModal('end')}
                        size="small"
                      >
                        {end ? moment(end).format('DD.MM.YYYY') : ''}
                      </Button>
                    </>
                  )}
                </DatesContainer>
              )}
            </RoleCheck>

            {description ? (
              <div>
                <ReactMarkdown
                  className="insertHTML"
                  source={description}
                  escapeHtml={false}
                />
                {timeLimit &&
                  <Typography>Время на выполнение: {timeLimit} {getDayWord(timeLimit)}</Typography>
                }
              </div>
            ) : (
              null
            )}
          </DetailsContainer>
        </ExpansionPanelDetails>
        {/* Using "isFormModalOpen" condition to run SetDateModal component's constructor
          on each opening */}
        {isFormModalOpen && (
          <SetDateModal
            open={isFormModalOpen}
            onClose={this.handleFormModal}
            data={plan_taskJob}
            type={type}
            setDate={this.setDate}
          />
        )}
      </StyledJob>
    );
  }
}

const ButtonsContainer = styled.div`
  @media (max-width: 500px) {
    width: 100%;
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Title = styled.span`
  margin-right: 10px;
`;

const DatesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;

  button:first-of-type {
    margin-right: 20px;
  }
`;

const DateTitle = styled.span`
  margin-right: 5px;
`;

const StyledJob = styled(ExpansionPanel)`
  && {
    border-radius: 4px;
  }

  border-top: 1px solid rgba(128, 128, 128, 0.2);
  margin-bottom: 5px;

  &::before {
    display: none;
  }

  & :last-child {
    right: ${(props) => (props.edit ? '40px' : '5px')};
  }
  .status-task {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .status-task :last-child {
    margin-left: 10px;
  }
  .numOfDaysPassed {
    margin: 0;
  }
  && .mainWrapper {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding-right: ${(props) => (props.edit ? '60px' : '30px')};
  }
  .statusAndNameWrapper {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  && :last-child .close-btn {
    top: 12px;
    left: unset;
    right: 8px;
    padding-right: 0;
  }
  & i {
    font-size: 30px;
    position: absolute;
    top: 50px;
    left: 5px;
    color: #5cb85c;
  }

  & .insertHTML ul {
    margin-top: 10px;
    list-style: initial;
    padding-left: 40px;
  }

  & b {
    margin-right: 20px;
    word-break: break-all;
    cursor: pointer;
  }

  & b:hover {
    text-decoration: underline;
  }
`;

const InProgressIcon = styled(Icon)`
  color: #ec971f;
  margin-right: 10px;
`;

const CompleteIcon = styled(Icon)`
  color: #5cb85c;
  margin-right: 10px;
`;

UserStudyPlan.propTypes = {
  job: PropTypes.objectOf(PropTypes.any).isRequired,
  isAdmin: PropTypes.bool,
  edit: PropTypes.bool,
  onChange: PropTypes.func,
  avgDay: PropTypes.number,
  countDay: PropTypes.number,
  index: PropTypes.number
};

UserStudyPlan.defaultProps = {
  edit: false,
  isAdmin: false,
  onChange: () => null,
  avgDay: 0,
  countDay: 0,
  index: 0
};

export default UserStudyPlan;
