import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ColumnTitle from './ColumnTitle';

import { TableHead, TableRow, TableCell } from '@material-ui/core';

import { RoleCheck } from 'utils/protector';

class Head extends Component {
  render() {
    return (
      <TableHead>
        <Row>
          <ColumnTitle
            applySort={this.props.applySort}
            select={this.props.select}
            value="lastName"
            title="Имя"
            className="lastName border_right"
          />

          <ColumnTitle
            applySort={this.props.applySort}
            select={this.props.select}
            title="Email"
            value="email"
            className="email border_right"
          />

          <ColumnTitle
            applySort={this.props.applySort}
            select={this.props.select}
            title="Разработчик"
            value="isDev"
            className="isDev border_right"
          />

          <ColumnTitle
            applySort={this.props.applySort}
            select={this.props.select}
            title="Роль"
            value="role"
            className="role border_right"
          />

          <ColumnTitle
            applySort={this.props.applySort}
            select={this.props.select}
            title="Должность"
            value="tech_role"
            className="role border_right"
          />

          <ColumnTitle
            applySort={this.props.applySort}
            select={this.props.select}
            title="Статус"
            value="status"
            className="status border_right"
          />

          <RoleCheck forRole={['admin', 'sales', 'hr']}>
            <TableCell>Действия</TableCell>
          </RoleCheck>
        </Row>
      </TableHead>
    );
  }
}

const Row = styled(TableRow)`
  && th {
    font-size: 16px;
    text-align: center;
    padding: 0;
  }

  && .border_right {
    border-right: 1px solid #e0e0e0;
  }
  && .DoB {
    padding: 0 29px;
  }
`;

Head.propTypes = {
  select: PropTypes.string,
  applySort: PropTypes.func.isRequired,
};

Head.defaultProps = {
  select: 'ID',
};

export default Head;
