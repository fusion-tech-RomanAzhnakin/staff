import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Dialog } from '@material-ui/core';
import SkillContent from './components/SkillContent';
import SkillEdit from './components/SkillEdit';

import { updateOpenSkill } from 'pages/Matrix/store/actionCreators';
import { OpenSkillType } from 'utils/types';

class SkillDialog extends Component {
  state = {
    isEdit: false
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.openSkill !== this.props.openSkill &&
      this.props.openSkill !== null
    ) {
      this.setState({ isEdit: !this.props.openSkill?.id });
    }
  }

  onClose = () => {
    this.props.updateOpenSkill(null);
  }

  turnOnEditMode = () => this.setState({ isEdit: true })

  turnOffEditMode = () => this.setState({ isEdit: false })

  render() {
    const openSkill = this.props.openSkill;

    return (
      <StyledDialog
        scroll="body"
        open={Boolean(openSkill)}
        onClose={this.onClose}
        classes={{ root: 'root', paper: 'paper' }}
      >
        {this.state.isEdit
          ? (
            <SkillEdit
              turnOffEditMode={this.turnOffEditMode}
            />
          ) : (
            <SkillContent
              id={openSkill?.id}
              turnOnEditMode={this.turnOnEditMode}
            />
          )}
      </StyledDialog>
    );
  }
}

const StyledDialog = styled(Dialog)`
  .paper {
    min-width: 780px;
    border-radius: 2px;
  }
`;

SkillDialog.propTypes = {
  openSkill: OpenSkillType,
  updateOpenSkill: PropTypes.func,
  edit: PropTypes.bool,
};

SkillDialog.defaultProps = {
  openSkill: null,
  updateOpenSkill: () => null,
};

const connectFunction = connect(
  (store) => ({
    openSkill: store.matrix.openSkill,
  }),
  {
    updateOpenSkill,
  }
);

export default connectFunction(SkillDialog);
