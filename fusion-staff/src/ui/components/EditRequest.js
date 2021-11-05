import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Select from 'react-select';
import {
  TextField,
  Typography,
  Button,
  Checkbox,
  InputLabel,
  FormControlLabel,
} from '@material-ui/core';

import { getDate } from 'utils';

import SingleDate from './SingleDate';
import SeveralDates from './SeveralDates';
import DateRange from './DateRange';
import { UserType } from 'utils/types';

const connectFunction = connect((state) => ({
  globalUser: state.global.user
}));

class EditRequest extends Component {
  state = {
    dateEdit: false,
    isUnpaid: false,
    type: {},
    title: '',
    userComment: '',
    willCompensateHours: false,
    deniedComment: '',
    oldDate: {
      from: new Date(),
      dates: [new Date()],
      to: new Date(),
      enteredTo: new Date(),
      textRepresentation: '',
    },
    error: false
  };

  componentDidMount() {
    const {
      title,
      comment,
      is_unpaid: isUnpaid,
      type,
      willCompensateHours,
      deniedComment,
      dates,
      dateFrom,
      dateTo
    } = this.props.request;
    const date = {
      dateFrom,
      dateTo,
      dates
    };

    let typeLabel = typeName[type];

    if (!this.props.type === 'send') {
      typeLabel = typeLabel[0].toUpperCase() + typeLabel.slice(1);
    }
    this.setState({
      id: this.props.request.id,
      showCommentInput: false,
      showAskIfDeleteModal: false,
      comment: '',
      willCompensateHours,
      edit: false,
      type: {
        label: typeLabel,
        value: type
      },
      ...date,
      title,
      isUnpaid,
      userComment: comment || '',
      deniedComment: deniedComment || '',
      oldDate: {
        from: new Date(date.dateFrom),
        to: new Date(date.dateTo),
        dates: date.dates ? date.dates.map((date) => new Date(date)) : [],
        enteredTo: new Date(date.dateTo),
        textRepresentation: getDate(date, 'server')
      },
      error: false
    });
  }

  onChange = async (e) => {
    if (e.name === 'date') {
      this.setState({
        oldDate: null
      });
    }
    await this.setState({
      [e.target.name]: e.target.value
    });

    this.props.editingRequest(this.state);
  };

  onClickCheckbox = () => {
    this.setState({ isUnpaid: !this.state.isUnpaid });
    this.props.editingRequest({ isUnpaid: !this.state.isUnpaid });
  }

  selectChange = (type) => {
    this.editDateInit();
    this.onChange({
      target: {
        name: 'type',
        value: type
      }
    });
  };

  editDateInit = () => {
    this.setState({
      dateEdit: true
    });
  };

  onDateChoose = (date) => {
    this.onChange({
      target: {
        name: 'date',
        value: date
      }
    });
  };

  render() {
    const {
      type,
      title,
      isUnpaid,
      userComment,
      deniedComment,
      oldDate,
      willCompensateHours,
      error,
      dateEdit
    } = this.state;
    const { globalUser } = this.props;
    const { role } = globalUser;
    return (
      <StyledForm>
        <div className="edit-request__input-field">
          <Typography gutterBottom noWrap>
            Тип заявки:
          </Typography>
          <Select
            value={type}
            options={role === 'officeManager' ? optionsForOfficeManager : options}
            onChange={this.selectChange}
            styles={style.select}
          />
        </div>

        {!dateEdit
          ? (
            <div className="edit-request__input-field">
              <Typography gutterBottom noWrap>
                Когда:
              </Typography>

              <div className="oldDate">
                {oldDate.textRepresentation}
                <Button variant="outlined" onClick={this.editDateInit}>
                  Изменить
                </Button>
              </div>
            </div>
          )
          : ['technical', 'documents', 'common'].includes(type.value) ? (
            <SingleDate
              userRole={globalUser.role}
              onDateChoose={this.onDateChoose}
              selectedDate={this.state.date || oldDate.to}
            />
          )
            : type.value === 'dayOff'
              ? (
                <SeveralDates
                  userRole={globalUser.role}
                  onDateChoose={this.onDateChoose}
                  dates={oldDate.dates}
                />
              )
              : (
                <DateRange
                  userRole={globalUser.role}
                  sendRequest={this.onDateChoose}
                  dates={oldDate}
                />
              )}
        {type.value === 'vacation' && (
          <InputLabel className="checkbox-label">
            <Checkbox
              name="isUnpaid"
              onChange={this.onClickCheckbox}
              checked={isUnpaid}
              color="primary"
            />
            Неоплачиваемый
          </InputLabel>
        )}
        <div className="edit-request__input-field">
          <Typography gutterBottom noWrap>
            Заголовок:
          </Typography>
          <TextField
            name="title"
            value={title}
            onChange={this.onChange}
            variant="outlined"
            style={{ width: '100%' }}
            required
          />
        </div>
        <div className="edit-request__input-field">
          <Typography gutterBottom noWrap>
            Комментарий:
          </Typography>
          <TextField
            name="userComment"
            multiline
            value={userComment}
            onChange={this.onChange}
            className="form-control"
            margin="normal"
            variant="outlined"
            style={{ width: '100%' }}
          />
        </div>

        {(type.value === 'dayOff' || type.value === 'timeOff') && (
          <div className="edit-request__input-field">
            <Typography gutterBottom noWrap>
              Планирую отработать:
            </Typography>

            <FormControlLabel
              control={
                <Checkbox
                  checked={willCompensateHours}
                  color="primary"
                  onChange={() => this.setState((state) => ({ willCompensateHours: !state.willCompensateHours }))}
                />
              }
            />
          </div>
        )}

        {this.props.request.status === 'denied' ? (
          <div className="edit-request__input-field">
            <Typography gutterBottom noWrap>
              Причина отказа:
            </Typography>

            <TextField
              name="deniedComment"
              multiline
              value={deniedComment}
              onChange={this.onChange}
              className="form-control"
              margin="normal"
              variant="outlined"
              style={{ width: '100%' }}
            />
          </div>
        ) : null}

        {error && (
          <div className="edit-request__input-field">
            <Typography gutterBottom noWrap className="error">
              ! Выберите даты !
            </Typography>
          </div>
        )}
      </StyledForm>
    );
  }
}

const style = {
  select: {
    control: (base) => ({
      ...base,
      boxShadow: 'none',
      borderColor: 'rgba(0, 0, 0, 0.2)',
      '&:hover': {
        borderColor: '#101010'
      }
    })
  }
};

const StyledForm = styled.form`
  & input {
    text-align: left;
  }
  && .checkbox-label{
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  & label,
  & .oldDate {
    display: flex;
    justify-content: space-between;
    line-height: 34px;
  }

  & .error {
    text-decoration: underline;
  }

  & .oldDate button {
    margin-left: 20px;
  }

  && .typeSelect {
    margin: 5px -15px;
  }

  & .deniedComment {
    margin-bottom: 0;
  }

  & .form-group {
    margin-bottom: -5px;
  }

  .edit-request__input-field {
    margin-bottom: 30px;
  }
`;

const options = [
  {
    label: 'Технический',
    value: 'technical'
  }, {
    label: 'Отгул',
    value: 'dayOff'
  }, {
    label: 'Отпуск',
    value: 'vacation'
  }, {
    label: 'Больничный',
    value: 'medical'
  }, {
    label: 'Бытовой',
    value: 'common'
  }, {
    label: 'Документы',
    value: 'documents'
  },
];

const optionsForOfficeManager = [
  {
    label: 'Технический',
    value: 'technical'
  }, {
    label: 'Бытовой',
    value: 'common'
  }, {
    label: 'Документы',
    value: 'documents'
  },
];

const typeName = {
  technical: 'технический',
  dayOff: 'отгул',
  vacation: 'отпуск',
  medical: 'больничный'
};

EditRequest.propTypes = {
  request: PropTypes.objectOf(PropTypes.any).isRequired,
  globalUser: UserType.isRequired,
  editingRequest: PropTypes.func,
  type: PropTypes.string
};

EditRequest.defaultProps = {
  editingRequest: () => null,
  type: 'send'
};

export default connectFunction(EditRequest);
