import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Button, Collapse } from '@material-ui/core';
import Section from 'pages/Matrix/components/MatrixBody/components/Group/components/Section';
import StyledWrapper from './components/StyledWrapper';
import EditableTitle from './components/EditableTitle';
import { RoleCheck } from 'utils/protector';

import {
  updateCurrentItem,
  updateRemovedItem,
} from 'pages/Matrix/store/actionCreators';
import { renameGroup } from 'pages/Matrix/store/actions/groupActions';
import { types } from 'pages/Matrix/constants';
import EditRemoveButtons from './components/EditRemoveButtons';

class Group extends React.PureComponent {
  state = {
    isOpenCollapse: true,
    isTitleEditorOpened: false
  }

  openTitleEditor = (event) => {
    event.stopPropagation();

    this.setState({ isTitleEditorOpened: true });

    const { groupIndex } = this.props;
    const { id, title } = this.props.group;

    this.props.updateCurrentItem({ id, title, groupIndex });
  }

  closeTitleEditor = () => {
    this.setState({ isTitleEditorOpened: false });
  }

  handleChangeTitle = (event) => {
    this.props.updateCurrentItem({
      ...this.props.currentItem,
      title: event.target.value,
    });
  }

  changeTitle = (event) => {
    event.preventDefault();

    this.props.renameGroup();

    this.closeTitleEditor();
  }

  toggleCollapse = () => {
    this.setState({ isOpenCollapse: !this.state.isOpenCollapse });
  };

  createSection = (event) => {
    event.stopPropagation();

    this.props.updateCurrentItem({
      type: types.section,
      groupIndex: this.props.groupIndex,
      groupId: this.props.group.id
    });
  }

  deleteGroup = (event) => {
    event.stopPropagation();

    this.props.updateRemovedItem({
      id: this.props.group.id,
      type: 'group'
    });
  }

  onKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.changeTitle(event);
    }
    if (event.key === 'Escape') {
      this.closeTitleEditor();
    }
  }

  render = () => {
    return (
      <StyledWrapper>
        <div
          className="header group__header"
          onClick={this.toggleCollapse}
        >
          <div className="header__left-side">
            <EditableTitle
              className="title title-input"
              title={this.props.group?.title}
              open={this.state.isTitleEditorOpened}
              onSubmit={this.changeTitle}
              onBlur={this.closeTitleEditor}
              onKeyDown={this.onKeyDown}
              onChange={this.handleChangeTitle}
              value={this.props.currentItem?.title || ''}
              onClick={(event) => event.stopPropagation()}
            />

            {this.props.godMode &&
              <EditRemoveButtons
                onClickEdit={this.openTitleEditor}
                onClickRemove={this.deleteGroup}
              />
            }
          </div>

          <RoleCheck forRole="admin">
            {this.props.godMode &&
              <Button
                className="add-btn add-group-btn matrix-btn"
                onClick={this.createSection}
              >
                + добавить секцию
              </Button>
            }
          </RoleCheck>
        </div>

        <Collapse
          in={this.state.isOpenCollapse}
        >
          {this.props.group.matrix_sections.map((section, index) => {
            return (
              <Section
                key={section.id}
                sectionIndex={index}
                groupIndex={this.props.groupIndex}
              />
            );
          })}

        </Collapse>
      </StyledWrapper>
    );
  }
}

Group.propTypes = {
  role: PropTypes.string,
  title: PropTypes.string,
  match: PropTypes.object,
  groupIndex: PropTypes.number.isRequired,
  group: PropTypes.object,
  currentItem: PropTypes.object,
  updateCurrentItem: PropTypes.func,
  updateRemovedItem: PropTypes.func,
  renameGroup: PropTypes.func,
  godMode: PropTypes.bool,
};

Group.defaultProps = {
  role: 'student',
  title: '',
  match: null,
  updateCurrentItem: () => null,
  updateRemovedItem: () => null,
  renameGroup: () => null,
  godMode: false,
};

const connectFunction = connect(
  (store, props) => ({
    role: store.global.user.role,
    group: store.matrix.groups[props.groupIndex],
    currentItem: store.matrix.currentItem,
    godMode: store.matrix.godMode,
  }), {
    updateCurrentItem,
    updateRemovedItem,
    renameGroup
  }
);

export default connectFunction(Group);
