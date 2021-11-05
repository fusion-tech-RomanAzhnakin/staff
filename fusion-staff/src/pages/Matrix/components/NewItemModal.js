import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Dialog, Button, TextField } from '@material-ui/core';

import { updateCurrentItem } from 'pages/Matrix/store/actionCreators';
import { createGroup } from 'pages/Matrix/store/actions/groupActions';
import { createSection } from 'pages/Matrix/store/actions/sectionActions';

import { types } from 'pages/Matrix/constants';
import styleConstants from 'pages/Matrix/styleConstants';

class NewItemModal extends Component {
  onChange = (e) => {
    this.props.updateCurrentItem({ ...this.props.currentItem, title: e.target.value });
  }

  onAccept = (e) => {
    e.preventDefault();

    const { type, title } = this.props.currentItem;

    if (!title.trim()) { return; }

    if (type === types.group) {
      this.props.createGroup();
      return;
    }

    this.props.createSection();
  }

  onClose = () => {
    this.props.updateCurrentItem(null);
  }

  render() {
    const type = this.props.currentItem?.type;
    const title = this.props.currentItem?.title;

    return (
      <StyledDialog
        open={Boolean(type)}
        onClose={this.onClose}
        classes={{ paper: 'paper' }}
      >
        <div className="header">
          {modalTitles[type]}
        </div>

        <form
          onSubmit={this.onAccept}
        >
          <TextField
            autoFocus
            className="input"
            placeholder="Название"
            value={title || ''}
            variant="outlined"
            onChange={this.onChange}
          />

          <div className="buttons">
            <Button
              onClick={this.onClose}
              variant="contained"
              className="neutral-btn matrix-btn"
            >
              Отменить
            </Button>

            <Button
              type="submit"
              variant="contained"
              className="primary-btn matrix-btn"
            >
              Сохранить
            </Button>
          </div>
        </form>
      </StyledDialog>
    );
  }
}

const modalTitles = {
  [types.group]: 'Новая группа',
  [types.section]: 'Новая секция',
};

const StyledDialog = styled(Dialog)`
  width: 100%;

  .paper {
    min-width: 600px;
    padding: 32px;
    border-radius: 2px;
  }

  .header {
    font-weight: 600;
    color: ${styleConstants.colors.text};
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .input {
    width: 100%;
  }

  .buttons {
    width: 100%;
    margin-top: 32px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .buttons > *:not(:last-child) {
    margin-right: 16px;
  }

  .matrix-btn {
    font-size: .9em;
  }
`;

NewItemModal.propTypes = {
  currentItem: PropTypes.object,
  updateCurrentItem: PropTypes.func,
  createGroup: PropTypes.func,
  createSection: PropTypes.func
};

NewItemModal.defaultProps = {
  updateCurrentItem: () => null,
  createGroup: () => null,
  createSection: () => null
};

const connectFunction = connect(
  (store) => ({
    currentItem: store.matrix.currentItem,
  }), {
    updateCurrentItem,
    createGroup,
    createSection
  }
);

export default connectFunction(NewItemModal);
