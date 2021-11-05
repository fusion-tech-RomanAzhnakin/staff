import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import moment from 'moment';
import { connect } from 'react-redux';
import { RoleCheck } from 'utils/protector';

import {
  Button,
  TextField,
  InputAdornment
} from '@material-ui/core';

import {
  SingleDate,
  SelectFromDB,
} from 'ui';

import { getFullName } from 'utils';
import { UserType } from 'utils/types';

class EnhancedForm extends React.Component {
  constructor(props) {
    super(props);
    const { data, user } = props;
    const hoursDiff = moment(data.end).diff(data.start, 'h');
    const minutesDiff = moment(data.end).subtract(hoursDiff, 'h').diff(data.start, 'm');

    this.state = {
      description: data.description || '',
      author: data.author || { label: getFullName(user), value: user.id },
      date: data.date || new Date(),
      hours: hoursDiff || '',
      minutes: minutesDiff || ''
    };
  }

  onDateChoose = (date) => { this.setState({ date }); };

  onAuthorChange = (author) => { this.setState({ author }); };

  onInputChange = ({ target: { name, value } }) => {
    if (name === 'hours') {
      if (+value > 23) { return toast.warn('Часы не могут быть больше 23'); }
      if (+value < 0) { return toast.warn('Часы не могут быть меньше 0'); }
    } else if (name === 'minutes') {
      if (+value > 59) { return toast.warn('Минуты не могут быть больше 59'); }
      if (+value < 0) { return toast.warn('Минуты не могут быть меньше 0'); }
    }
    if (['hours', 'minutes'].includes(name)) {
      console.log(value.replace(/[^0-9]/g, ''));
      return this.setState({ [name]: value.replace(/[^0-9]/g, '') });
    }

    return this.setState({ [name]: value });
  };

  getTime = () => {
    const { hours, minutes } = this.state;
    const start = moment().startOf('day');
    const end = start.clone().add({ hours, minutes }).toDate();

    return ({ start, end });
  };

  onSubmit = () => {
    if (!this.state.description) {
      return toast.warn('Заполните поле "Описание"');
    }

    if (!this.state.hours && !this.state.minutes) {
      return toast.warn('Введите время переработки');
    }

    const { start, end } = this.getTime();

    if (!this.state.hours && !this.state.minutes) {
      return toast.warn('Переработка не может быть пустой');
    }

    return this.props.submitForm({
      start,
      end,
      description: this.state.description,
      author: this.state.author,
      date: this.state.date,
      hours: this.state.hours,
      minutes: this.state.minutes
    });
  };

  render() {
    const momentDate = moment(this.state.date).utc().toDate();

    return (
      <StyledGrid>
        <div>
          <SingleDate
            selectedDate={momentDate}
            onDateChoose={this.onDateChoose}
            disabledDays={{ after: new Date() }}
          />
        </div>

        <div className="form">
          <div className="left-col">
            <div className="left-col-dates">
              <StyledTimeField
                name="hours"
                value={this.state.hours}
                type="number"
                variant="outlined"
                onChange={this.onInputChange}
                placeholder="0"
                InputProps={timeInputProps.hours}
              />
              <span className="dates-decide">−</span>
              <StyledTimeField
                name="minutes"
                value={this.state.minutes}
                type="number"
                variant="outlined"
                onChange={this.onInputChange}
                placeholder="0"
                InputProps={timeInputProps.minutes}
              />
            </div>

            <RoleCheck forRole='admin'>
              <div className="select">
                <label>Автор:</label>
                <SelectFromDB
                  change={this.onAuthorChange}
                  filter={{ notRole: 'student', status: 'active' }}
                  value={this.state.author}
                  class="col-md-9"
                  isMulti={false}
                  dataType="users"
                />
              </div>
            </RoleCheck>

            <StyledTextField
              name="description"
              value={this.state.description}
              onChange={this.onInputChange}
              margin="normal"
              variant="outlined"
              multiline={true}
              placeholder="Описание"
              required
              role={this.props.user.role}
            />
          </div>

          <div className="bottom-block">
            <Controls>
              <Button
                variant="contained"
                onClick={this.onSubmit}
                color="primary"
              >
                {this.props.data.id ? 'Изменить' : 'Добавить'}
              </Button>

              <Button
                variant="contained"
                className="close-btn"
                onClick={this.props.onClose}
              >
                Отмена
              </Button>
            </Controls>
          </div>
        </div>
      </StyledGrid>
    );
  }
}

const timeInputProps = {
  minutes: {
    endAdornment: <InputAdornment position="start">M</InputAdornment>,
    inputProps: { min: 0, max: 59 }
  },
  hours: {
    endAdornment: <InputAdornment position="start">H</InputAdornment>,
    inputProps: { min: 0, max: 23 }
  }
};

const StyledTextField = styled(TextField)`
  &&  {
    width: 100%;
    margin: 0;
  }
  
  && > div {
    padding: 15px 14px;
    textarea {
      overflow-y: auto;
      max-height: ${props => (props.role === 'admin' ? '120px' : '220px')};
    }
  }
`;

const StyledTimeField = styled(TextField)`
  &&  {
    margin: 0;
  }

  input {
      padding: 10.5px 14px;    
  }
`;

const StyledGrid = styled.div`
  & {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 76px;
    @media (max-width: 860px) {
    grid-template-columns: 1fr;
    grid-gap: 47px;
      &&& .modal-content-wrapper {
        padding: 23px 28px 40px 27px;
      }
      &&& .form {
        height: 100%;
      }
      &&& .bottom-block {
        margin-top:100px;
      }
    }
    @media (max-width: 425px) {
      &&& .form {
        width: 100%;
        padding: 0 20px;
      }
    }
  }

  .left-col-dates {
    text-align: center;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-gap: 17px;
  }

  .dates-decide {
    margin: auto;
  }

  #modal-title {
    text-align: center;
    text-transform: uppercase;
  }

  .modal-head {
    background: #F9F8FB;
    align-items: center;
    position: relative;
  }

  .bottom-block {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    &.controls {
      justify-content: space-between;
    }

    input {
      text-align: left;
    }
  }

  & img {
    width: 100%;
  }

  && .form {
    height: 388px;
    width: 334px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .project-description {
    & pre {
      color: rgba(0, 0, 0, 0.87);
    }
  }

  .modal-buttons {
    .decline-btn {
      margin-left: auto;
    }
  }

  .close-btn {
    color: white;
    background-color: #C4C4C4;
  }

  .select {
    background-color: inherit;
    label {
      display: block;
    }
  }

  .left-col {
    justify-content: space-between;
    flex-direction: row;

    > *:not(:last-of-type) {
      margin-bottom: 30px;
    }
  }
`;

const Controls = styled.div`
  display: grid;
  grid-template-columns: 53% 1fr;
  grid-gap: 15px;
  width: 100%;
  transition: 0.5s;
  opacity: 1;
`;

EnhancedForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.any),
  submitForm: PropTypes.func,
  user: UserType.isRequired
};

EnhancedForm.defaultProps = {
  data: {},
  submitForm: () => null,
};

const mapStateToProps = (state) => ({
  user: state.global.user
});

export default connect(mapStateToProps)(EnhancedForm);
