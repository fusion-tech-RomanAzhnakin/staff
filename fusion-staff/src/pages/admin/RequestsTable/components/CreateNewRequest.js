import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Select from 'react-select';
import moment from 'moment';

import { newRequestRequest } from 'api/userRequestApi';
import { getModalStyle } from 'utils';

import {
  Typography,
  Paper,
  Modal,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import {
  DateRange,
  SingleDate,
  SelectFromDB
} from 'ui';
import { UserType } from 'utils/types';

const connectFunction = connect((state) => ({
  globalUser: state.global.user
}));

const getInitialDate = () => ({ from: null, to: null });

class CreateNewRequest extends Component {
  state = {
    user: [],
    type: {
      label: 'Техническая',
      value: 'technical'
    },
    date: null,
    title: '',
    comment: '',
    willCompensateHours: false,
    error: false
  };

  onUserSelect = (user) => {
    this.setState({
      user: user || [],
    });
  };

  typeChange = (type) => {
    const { value } = type;
    const date = ['medical', 'vacation'].includes(value) ? getInitialDate() : null;
    this.setState({ type, date });
  };

  onDateChoose = (date) => {
    this.setState({
      date
    });
  };

  onRangeDateChoose = (date) => {
    this.setState({
      date: {
        ...this.state.date,
        ...date,
      }
    });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submit = async () => {
    const data = { ...this.state };
    const { date = {}, type, title, comment } = data;

    if (['technical', 'common', 'documents', 'dayOff'].includes(type.value)) {
      data.dateTo = moment(date).format();
      data.dateFrom = null;
      data.dates = null;
    }

    if (['medical', 'vacation'].includes(type.value)) {
      const to = date.to || date.from;
      data.dateFrom = moment(date.from).format();
      data.dateTo = moment(to).format();
      data.dates = null;
    }

    if (!data.user.length || !type.value || !date || !title || !comment) {
      this.setState({
        error: true
      });
      return;
    }
    try {
      this.setState({
        user: [],
        type: {},
        date: null,
        title: '',
        comment: '',
        willCompensateHours: false,
        error: false
      });
      delete data.error;
      data.from = { id: data.user[0].value };
      delete data.user;
      data.type = data.type.value;

      await newRequestRequest(data);
      this.props.onHide();
      this.props.statusChange();
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { user, type, title, comment, willCompensateHours, error, date } = this.state;
    const { globalUser } = this.props;
    return (
      <StyledModal open={this.props.show} onClose={this.props.onHide}>
        <StyledPaper style={getModalStyle()}>
          <div className="create-project__input-field">
            <Typography gutterBottom noWrap>
              Автор:
            </Typography>
            <SelectFromDB
              dataType="users"
              change={this.onUserSelect}
              value={user}
            />
          </div>
          <div className="create-project__input-field">
            <Typography gutterBottom noWrap>
              Тип заявки:
            </Typography>
            <Select
              value={type}
              options={typeOptions}
              onChange={this.typeChange}
              styles={style.select}
            />
          </div>
          {type.value && (
            <>
              {['technical', 'common', 'documents'].includes(type.value)
                ? (
                  <SingleDate
                    userRole={globalUser.role}
                    onDateChoose={this.onDateChoose}
                    selectedDate={date}
                  />
                )
                : type.value === 'dayOff'
                  ? (
                    <SingleDate
                      userRole={globalUser.role}
                      onDateChoose={this.onDateChoose}
                      selectedDate={this.state.date}
                    />
                  )
                  : (
                    <DateRange
                      userRole={globalUser.role}
                      sendRequest={this.onRangeDateChoose}
                      dates={date}
                    />
                  )}
            </>
          )}
          <div className="create-project__input-field">
            <Typography gutterBottom noWrap>
              Заголовок:
            </Typography>

            <TextField
              name="title"
              value={title}
              onChange={this.onChange}
              margin="normal"
              variant="outlined"
              style={{ width: '100%' }}
              required
            />
          </div>
          <div className="create-project__input-field">
            <Typography gutterBottom noWrap>
              Комментарий:
            </Typography>

            <TextField
              className="form-control"
              name="comment"
              value={comment}
              onChange={this.onChange}
              margin="normal"
              variant="outlined"
              style={{ width: '100%', marginBottom: '10px', fontSize: '15px' }}
              multiline
              required
            />
          </div>

          {(type.value === 'dayOff' || type.value === 'timeOff') && (
            <div>
              <FormControlLabel
                label="Планирую отработать"
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

          {error && (
            <>
              <hr />
              <Typography gutterBottom noWrap>
                ! Заполните обязательные поля (автор, тип, дата, заголовок, комментарий) !
              </Typography>
            </>
          )}
          <div className="modal-buttons">
            <Button className="accept-btn" onClick={this.submit}>
              Создать
            </Button>
            <Button className="decline-btn" onClick={this.props.onHide}>
              Закрыть
            </Button>
          </div>
        </StyledPaper>
      </StyledModal>
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

const StyledModal = styled(Modal)`
  & input {
    text-align: left;
  }

  & label {
    line-height: 34px;
  }

  & .submitButton {
    float: left;
  }

  & .comment {
    margin-bottom: 0;
  }

  .modal-buttons {
    display: flex;
    margin-top: 20px;
    & .decline-btn {
      margin-left: auto;
    }
  }
  .create-project__input-field {
    margin-bottom: 25px;
  }
`;

const StyledPaper = styled(Paper)`
  position: fixed;
  padding: 20px;
  font-size: 16px;
  min-width: 700px;
  max-height: 865px;
  overflow-y: scroll;

  @media (max-width: 701px) {
    min-width: auto;
    width: 98%;
  }
`;

const typeOptions = [
  {
    label: 'Техническая',
    value: 'technical'
  },
  {
    label: 'Бытовая',
    value: 'common'
  },
  {
    label: 'Документы',
    value: 'documents'
  },
  {
    label: 'Отгул',
    value: 'dayOff'
  },
  {
    label: 'Отпуск',
    value: 'vacation'
  },
  {
    label: 'Больничный',
    value: 'medical'
  }
];

CreateNewRequest.propTypes = {
  statusChange: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  globalUser: UserType.isRequired,
};

export default connectFunction(CreateNewRequest);
