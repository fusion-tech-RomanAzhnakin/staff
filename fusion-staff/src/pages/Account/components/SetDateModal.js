import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import moment from 'moment';

import { PlanTaskJobType } from 'utils/types';

import { Button } from '@material-ui/core';
import { SingleDate, Modal } from 'ui';

class SetDateModal extends Component {
  constructor(props) {
    super(props);
    const { data, type } = props;

    this.state = {
      date: type === 'start' ? data.startTask : data.finishTask
    };
  }

  checkDates = (value) => {
    const {
      data: { startTask, finishTask },
      type
    } = this.props;

    if (type === 'start') {
      if (new Date(value) > new Date(finishTask) && finishTask) {
        toast.warn('Дата начала не может быть больше даты конца');
        return false;
      }
    }

    if (type === 'end') {
      if (new Date(value) < new Date(startTask)) {
        toast.warn('Дата конца не может быть меньше даты начала');
        return false;
      }
    }

    return true;
  };

  onDateChoose = (date) => {
    const check = this.checkDates(date);
    if (!check) {
      return;
    }

    this.setState({ date });
  };

  onSetDate = () => {
    this.props.setDate(this.state.date);
  };

  render() {
    const { date } = this.state;
    const { open, onClose, type } = this.props;
    const title = `Изменить дату ${type === 'start' ? 'начала' : 'окончания'}`;

    const momentDate = moment(date)
      .utc()
      .toDate();

    return (
      <Modal
        open={open}
        onClose={onClose}
        title={title}
      >
        <DateContainer>
          <SingleDate
            selectedDate={momentDate}
            onDateChoose={this.onDateChoose}
          />
        </DateContainer>
        <Controls>
          <StyledButton
            variant="contained"
            onClick={this.onSetDate}
            color="primary"
          >
            Сохранить
          </StyledButton>
          <StyledButton
            variant="contained"
            className="close-btn"
            onClick={onClose}
          >
            Отмена
          </StyledButton>
        </Controls>
      </Modal>
    );
  }
}

const StyledButton = styled(Button)`
  @media (max-width: 380px) {
    width: 100%;
    && {
      margin-bottom: 10px;
    }
    &&:last-child{
      margin-bottom: 0;
    }
  }
`;

const DateContainer = styled.div`
  margin-bottom: 35px;

  text-align: center;
`;

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

SetDateModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  setDate: PropTypes.func,
  data: PlanTaskJobType,
  type: PropTypes.oneOf(['start', 'end'])
};

SetDateModal.defaultProps = {
  open: false,
  onClose: () => null,
  setDate: () => null,
  data: {},
};

export default SetDateModal;
