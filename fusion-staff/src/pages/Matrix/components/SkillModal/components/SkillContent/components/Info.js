import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { updateRemovedItem } from 'pages/Matrix/store/actionCreators';
import { UserType, OpenSkillType, SelectedUserType } from 'utils/types';
import { knowledgeLevels } from 'pages/Matrix/constants';

class Info extends Component {
  onClickEdit = () => {
    this.props.turnOnEditMode();
  }

  onClickDelete = () => {
    const { id, skillIndex, sectionIndex, groupIndex } = this.props.openSkill;

    this.props.updateRemovedItem({
      type: 'skill',
      id,
      skillIndex,
      sectionIndex,
      groupIndex
    });
  }

  render() {
    const { openSkill, user, userSkill } = this.props;

    return (
      <>
        <div className="skill__title">
          {openSkill?.title}
        </div>

        <ReactMarkdown
          className="skill__description"
          source={openSkill?.description}
          escapeHtml={false}
        />

        <div className="skill__footer">
          <div>
            Уровень: <span>{openSkill?.level}</span>
          </div>

          {user.role !== 'admin' && this.props.selectedUser.value &&
            <div>
              Навык: <span>{
                knowledgeLevels[userSkill?.knowledge_level]
                || knowledgeLevels.none
              }</span>
            </div>
          }

          {user.role === 'admin' && this.props.godMode &&
            <div className="buttons skill__icons">
              <DeleteIcon onClick={this.onClickDelete} />
              <EditIcon onClick={this.onClickEdit} />
            </div>
          }
        </div>
      </>
    );
  }
}

Info.propTypes = {
  openSkill: OpenSkillType,
  user: UserType.isRequired,
  selectedUser: SelectedUserType,
  id: PropTypes.number,
  userSkill: PropTypes.object,
  turnOnEditMode: PropTypes.func,
  updateRemovedItem: PropTypes.func,
  godMode: PropTypes.bool,
};

Info.defaultProps = {
  openSkill: {},
  updateRemovedItem: () => null,
  godMode: false,
};

const connectFunction = connect(
  (store, props) => ({
    openSkill: store.matrix.openSkill,
    user: store.global.user,
    selectedUser: store.matrix.selectedUser,
    userSkill: store.matrix.userSkills[props.id],
    godMode: store.matrix.godMode,
  }), {
    updateRemovedItem,
  }
);

export default connectFunction(Info);
