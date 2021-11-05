import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styled from 'styled-components';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

import {
  Typography,
  TextField
} from '@material-ui/core';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import {
  RadioTwoPicker,
  RichTextBox,
  DatePicker
} from 'ui';
import SelectWrapper from 'ui/components/SelectWrapper';
import { taskJobLevelOptions } from 'utils/constants';

class TaskEditForm extends Component {
  onDescriptionChange = (value) => {
    this.props.onChange({
      target: {
        name: 'description',
        value
      }
    });
  };

  render() {
    return (
      <>
        <Typography variant="h6" id="modal-title" gutterBottom>
          Название:
        </Typography>
        <TextField
          name="title"
          value={this.props.title}
          onChange={this.props.onChange}
          margin="normal"
          variant="outlined"
          required
          autoFocus
          fullWidth
        />

        <Typography variant="h6" id="modal-title" gutterBottom>
          Отведённое время:
        </Typography>
        <StyledTimeInput>
          <StyledTimeTextField
            name="timeLimit"
            value={this.props.timeLimit}
            onChange={this.props.onChange}
            variant="outlined"
            margin="normal"
            type="number"
            required
          />
          <Typography variant="h6">
            дней
          </Typography>
        </StyledTimeInput>

        <Typography variant="h6" id="modal-title" gutterBottom>
          Уровень:
        </Typography>
          <SelectWrapper>
            <Select
              className="select__task-level"
              value={this.props.level}
              options={taskJobLevelOptions}
              onChange={this.props.changeLevel}
            />
          </SelectWrapper>

        <Typography gutterBottom noWrap>
          <b>Описание:</b>
        </Typography>
        <RichTextBox
          value={this.props.description}
          onChange={this.onDescriptionChange}
        />
        {!this.props.isStudent && (
          <>
            <StyledDate>
              <RadioTwoPicker
                value={this.props.hidden}
                onChange={this.props.changeSee}
                firstValue="hidden"
                firstLabel="Не показывать"
                secondValue="see"
                secondLabel="Показывать"
              />
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                  label="Дата"
                  value={this.props.visitDate}
                  onChange={this.props.changeTime}
                />
              </MuiPickersUtilsProvider>
            </StyledDate>
          </>
        )}
      </>
    );
  }
}

const StyledTimeTextField = styled(TextField)`
  width: 100px;

  && {
    margin-right: 15px;
  }
`;


const StyledTimeInput = styled.div`
  display: flex;
  align-items: center;
`;

const StyledDate = styled.div`
  display: flex;
`;

TaskEditForm.propTypes = {
  timeLimit: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  level: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
  onChange: PropTypes.func,
  isStudent: PropTypes.bool,
  hidden: PropTypes.string,
  changeSee: PropTypes.func,
  visitDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.instanceOf(moment)
  ]),
  changeTime: PropTypes.func,
  changeLevel: PropTypes.func
};

TaskEditForm.defaultProps = {
  title: '',
  description: '',
  onChange: () => null,
  isStudent: true,
  hidden: 'see',
  changeSee: () => null,
  changeTime: () => null,
  visitDate: new Date()
};

export default TaskEditForm;
