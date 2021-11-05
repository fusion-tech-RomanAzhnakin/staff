import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ConfirmModal } from 'ui';
import MatrixHead from 'pages/Matrix/components/MatrixHead';
import MatrixBody from 'pages/Matrix/components/MatrixBody';
import NewItemModal from 'pages/Matrix/components/NewItemModal';
import SkillModal from 'pages/Matrix/components/SkillModal';

import { updateRemovedItem } from 'pages/Matrix/store/actionCreators';
import { removeGroup, getGroups } from 'pages/Matrix/store/actions/groupActions';
import { removeSection } from 'pages/Matrix/store/actions/sectionActions';
import { removeSkill } from 'pages/Matrix/store/actions/skillActions';
import styleConstants from 'pages/Matrix/styleConstants';
import { types } from 'pages/Matrix/constants';

class Matrix extends Component {
  componentDidMount() {
    this.props.getGroups();
  }

  closeConfirm = () => this.props.updateRemovedItem(null)

  removeItem = () => {
    switch (this.props.removedItem.type) {
      case types.group:
        return this.props.removeGroup();
      case types.section:
        return this.props.removeSection();
      case types.skill:
        return this.props.removeSkill();
      default:
        return null;
    }
  }

  render() {
    return (
      <>
        <StyledMatrix>
          <MatrixHead />
          <MatrixBody />
        </StyledMatrix>

        <ConfirmModal
          open={Boolean(this.props.removedItem?.id)}
          onClose={this.closeConfirm}
          onAccept={this.removeItem}
        />

        <SkillModal />

        <NewItemModal />
      </>
    );
  }
}

const StyledMatrix = styled.div`
  padding: 40px;
  color: ${styleConstants.colors.text};

  .matrix-btn {
    font-size: .9rem;
  }
`;

Matrix.propTypes = {
  removedItem: PropTypes.object,
  getGroups: PropTypes.func,
  removeGroup: PropTypes.func,
  removeSection: PropTypes.func,
  removeSkill: PropTypes.func,
  updateRemovedItem: PropTypes.func,
};

Matrix.defaultProps = {
  getGroups: () => null,
  removeGroup: () => null,
  removeSection: () => null,
  removeSkill: () => null,
  updateRemovedItem: () => null,
};

const connectFunction = connect(
  (store) => ({
    removedItem: store.matrix.removedItem,
  }),
  {
    getGroups,
    removeGroup,
    removeSection,
    removeSkill,
    updateRemovedItem,
  }
);

export default connectFunction(Matrix);
