import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Select from 'react-select';
import {
  Tabs,
  Tab,
} from '@material-ui/core';
import StyledWrapper from '../StyledWrapper';
import { SelectWrapper } from 'ui';

import { createUserSkill, updateUserSkill, selfSkillUpdate } from 'pages/Matrix/store/actions/userSkillActions';
import { knowledgeOptions, selfKnowledgeOptions } from 'pages/Matrix/constants';
import { UserType, OpenSkillType } from 'utils/types';
import Info from './components/Info';
import Comments from './components/Comments';

class SkillContent extends React.PureComponent {
  state = {
    selectedTab: 0,
    comment: '',
  }

  onChangeKnowledgeLevel = (event) => {
    // null because db don't have 'none' enum value
    const level = event.value === 'none' ? null : event.value;

    const { id } = this.props.userSkill;

    if (!id) {
      this.props.createUserSkill({
        user_id: this.props.selectedUser.value,
        matrix_skill_id: this.props.openSkill.id,
        knowledge_level: level,
      });

      return;
    }

    this.props.updateUserSkill({ knowledge_level: level });
  }

  onChangeSelfKnowledgeLevel = (newData) => {
    const level = newData?.value === 'none' ? null : newData?.value;

    this.props.selfSkillUpdate(level);
  }

  defaultKnowledgeLevel = () => {
    const level = this.props.userSkill.knowledge_level;

    return (knowledgeOptions.find((item) => item.value === level) || knowledgeOptions[0]);
  }

  defaultSlefKnowledgeLevel = () => {
    const level = this.props.userSkill.self_rating;

    return selfKnowledgeOptions.find((item) => item.value === level) || null;
  }

  changeTab = (event, newValue) => {
    this.setState({ selectedTab: newValue });
  }

  onChangeComment = (event) => {
    if (event) {
      this.setState({ comment: event.target.value });
      return;
    }

    this.setState({ comment: '' });
  }

  render() {
    const selectedUser = this.props.selectedUser;
    const { user, userSkill } = this.props;

    return (
      <StyledWrapper level={userSkill?.knowledge_level}>
        {selectedUser && (
          <>
            <div className="skill__line" />

            <div className="skill__header">
              <Tabs
                value={this.state.selectedTab}
                indicatorColor="primary"
                textColor="primary"
                onChange={this.changeTab}
              >
                <Tab label="Информация" />

                {(user.role === 'admin' || selectedUser?.value === user.id) &&
                  <Tab label="Сообщения" />
                }
              </Tabs>

              {user.role === 'admin' && (
                <SelectWrapper>
                  <Select
                    className="skill__knowledge-selector"
                    value={this.defaultKnowledgeLevel()}
                    options={knowledgeOptions}
                    onChange={this.onChangeKnowledgeLevel}
                    classNamePrefix="select"
                  />
                </SelectWrapper>
              )}
              {user.id === selectedUser.value && (
                <SelectWrapper>
                  <Select
                    placeholder="Самооценка"
                    className="skill__knowledge-selector"
                    value={this.defaultSlefKnowledgeLevel()}
                    options={selfKnowledgeOptions}
                    onChange={this.onChangeSelfKnowledgeLevel}
                    classNamePrefix="select"
                  />
                </SelectWrapper>
              )}
            </div>
          </>
        )}

        <div className="padding-wrapper">
          {this.state.selectedTab === 0 && (
            <Info
              id={this.props.id}
              turnOnEditMode={this.props.turnOnEditMode}
            />
          )}

          {(user.role === 'admin' || selectedUser.value === user?.id) && this.state.selectedTab === 1 && (
            <Comments
              id={this.props.id}
              comment={this.state.comment}
              onChangeComment={this.onChangeComment}
            />
          )}
        </div>
      </StyledWrapper>
    );
  }
}

SkillContent.propTypes = {
  user: UserType.isRequired,
  openSkill: OpenSkillType,
  groups: PropTypes.array,
  selectedUser: PropTypes.object,
  userSkill: PropTypes.object,
  createUserSkill: PropTypes.func,
  updateUserSkill: PropTypes.func,
  turnOnEditMode: PropTypes.func,
  selfSkillUpdate: PropTypes.func,
  id: PropTypes.number.isRequired,
};

SkillContent.defaultProps = {
  groups: [],
  userSkill: {},
  openSkill: {},
  createUserSkill: () => null,
  updateUserSkill: () => null,
  selfSkillUpdate: () => null,
};

const connectFunction = connect(
  (store, props) => ({
    user: store.global.user,
    openSkill: store.matrix.openSkill,
    groups: store.matrix.groups,
    selectedUser: store.matrix.selectedUser,
    userSkill: store.matrix.userSkills[props.id]
  }),
  {
    createUserSkill,
    updateUserSkill,
    selfSkillUpdate,
  }
);

export default connectFunction(SkillContent);
