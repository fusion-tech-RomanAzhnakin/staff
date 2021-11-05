import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { createSelector } from 'reselect';

import { dateToString } from 'utils';

import {
  Button,
  Collapse,
  Typography
} from '@material-ui/core';
import AccountField from './AccountField';
import EditAccount from './EditAccount';
import AdminWorkingFromForm from './AdminWorkingFromForm';
import Repos from './repos/Repos';
import { UserType } from 'utils/types';

class Info extends Component {
  phoneSelector = createSelector(
    (props) => props.user.phone,
    (phone) => {
      return phoneParser(phone);
    }
  );

  constructor(props) {
    super(props);
    this.state = {
      editInit: false
    };
  }

  editInit = () => {
    const { editInit: editState } = this.state;
    this.setState({
      editInit: !editState
    });
  };

  render() {
    return (
      <>
        <Collapse in={!this.state.editInit}>
          <ul>
            <AccountField title="Логин" value={this.props.user.login} />

            <AccountField title="Имя (en)" value={this.props.user.firstName} />
            <AccountField title="Имя (ru)" value={this.props.user.firstName_ru} />

            <AccountField title="Фамилия (en)" value={this.props.user.lastName} />
            <AccountField title="Фамилия (ru)" value={this.props.user.lastName_ru} />

            <AccountField title="Email" value={this.props.user.email} />
            {this.props.user.role !== 'student' && (
              <AccountField
                title="slack_name"
                value={this.props.user.slack_name}
              />
            )}
            {this.props.user.repo && (
              <StyledListItem>
                <Typography component="span">
                  <b>Репозитории: </b>

                  <Repos repos={this.props.user.repo} />
                </Typography>
              </StyledListItem>
            )}

            {this.props.user.phone && (
              <>
                <StyledListItem>
                  <Typography component="span">
                    <b>Телефон: </b>

                    <a href={`tel:${this.phoneSelector(this.props)}`}>
                      {this.props.user.phone}
                    </a>
                  </Typography>
                </StyledListItem>
              </>
            )}

            {(
              this.props.user.id === this.props.globalUser.id ||
              ['admin', 'sales'].includes(this.props.globalUser.role)
            )
              && (
                <AccountField
                  title="Дата рождения"
                  value={dateToString(this.props.user.DoB)}
                />
              )}

            {(this.props.user.workingFrom || this.props.globalUser.role === 'admin') && (
              <AccountField
                title="В компании"
                value={<AdminWorkingFromForm user={this.props.user} />}
              />
            )}

            <AccountField title="Информация" value={this.props.user.info} />

            {(this.props.user.additionalContactPhone || this.props.user.additionalContactType || this.props.user.additionalContactName) && (
              <AccountField title="Дополнительный контакт" value />
            )}

            <StyledAdditionalContact>
              {this.props.user.additionalContactPhone && (
                <>
                  <StyledListItem>
                    <Typography component="span">
                      <b>Телефон: </b>

                      <a href={`tel:${this.phoneSelector(this.props)}`}>
                        {this.props.user.additionalContactPhone}
                      </a>
                    </Typography>
                  </StyledListItem>
                </>
              )}

              {this.props.user.additionalContactName && (
                <AccountField title="Имя" value={this.props.user.additionalContactName} />
              )}

              {this.props.user.additionalContactType && (
                <AccountField title="Кем приходится" value={this.props.user.additionalContactType} />
              )}
            </StyledAdditionalContact>

          </ul>
        </Collapse>

        {this.props.user.status === 'registered' && (
          <b>
            Ваша заявка на регистрацию рассматривается администрацией.
            Пожалуйста, ожидайте.
          </b>
        )}

        {this.state.editInit
          ? (
            <br />
          )
          : (
            this.props.user.status !== 'registered' &&
            this.props.user.login === this.props.globalUser.login &&
            !this.state.editInit
          )
            ? (
              <Button
                onClick={this.editInit}
                style={{ textTransform: 'none' }}
                variant="outlined"
              >
                Редактировать
              </Button>
            )
            : null}
        <EditAccount
          show={this.state.editInit}
          close={this.editInit}
          user={this.props.globalUser}
          changeGlobalUser={this.props.changeGlobalUser}
        />
      </>
    );
  }
}

const phoneParser = (str) => {
  let number = '';
  for (let i = 0; i < str.length; i++) {
    if (
      (str[i] === '+' && i === 0) ||
      (!isNaN(parseFloat(str[i])) && isFinite(str[i]))
    ) {
      number += str[i];
    }
  }
  return number;
};

const StyledListItem = styled.li`
  margin-bottom: 4px;
`;

const StyledAdditionalContact = styled.li`
  padding-left: 15px;
`;

Info.propTypes = {
  user: UserType.isRequired,
  globalUser: UserType.isRequired,
  changeGlobalUser: PropTypes.func.isRequired
};

export default Info;
