import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Url from 'urls-tool';

import MessageIcon from 'ui/images/message-icon.svg';

import { updateOpenSkill } from 'pages/Matrix/store/actionCreators';
import styleConstants from 'pages/Matrix/styleConstants';
import { UserType, SkillType } from 'utils/types';

class Card extends React.PureComponent {
  componentDidMount() {
    if (this.props.skill?.id === +Url.getParams().object.skill) {
      this.openSkill();
    }
  }

  openSkill = () => {
    const { title, groupIndex, sectionIndex, skillIndex } = this.props;

    this.props.updateOpenSkill({
      title,
      groupIndex,
      skillIndex,
      sectionIndex,
      ...this.props.skill,
      edit: false
    });
  }

  render() {
    return (
      <StyledCard
        onClick={this.openSkill}
        level={this.props.userSkill?.knowledge_level}
        self_rating={this.props.userSkill?.self_rating}
      >
        {this.props.skill?.title}

        {(
          this.props.user?.role === 'admin' ||
          this.props.user?.id === this.props.selectedUser?.value
        ) &&
          this.props.userSkill?.matrix_skill_comments?.length > 0 &&
          (
            <div className="messages">
              <img src={MessageIcon} alt="icon" />

              {this.props.userSkill?.matrix_skill_comments.length}
            </div>
          )}
      </StyledCard>
    );
  }
}

const StyledCard = styled.div`
  margin: 0;
  padding: 0;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 2px;
  box-shadow: ${styleConstants.shadows.main}${({ self_rating }) => (!self_rating ? '' : `, ${styleConstants.shadows[self_rating]}, ${styleConstants.shadows.gap}`)};
  cursor: pointer;
  background: ${({ level }) => {
    switch (level) {
      case 'high':
        return styleConstants.gradients.high;
      case 'low':
        return styleConstants.gradients.low;
      default:
        return styleConstants.gradients.none;
    }
  }};

  &:hover {
    box-shadow: ${styleConstants.shadows.main}, ${styleConstants.shadows.hover}${({ self_rating }) => (!self_rating ? '' : `, ${styleConstants.shadows[self_rating]}, ${styleConstants.shadows.gap}`)};
  }

  .messages {
    margin-top: 12px;
    font-size: 14px;

    & > img {
      position: relative;
      bottom: -5px;
      margin-right: 8px;
    }
  }
`;

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  groupIndex: PropTypes.number.isRequired,
  sectionIndex: PropTypes.number.isRequired,
  skillIndex: PropTypes.number.isRequired,
  user: UserType.isRequired,
  skill: SkillType.isRequired,
  selectedUser: PropTypes.object,
  userSkill: PropTypes.object,
  updateOpenSkill: PropTypes.func,
};

Card.defaultProps = {
  title: '',
  skill: null,
  userSkill: null,
  updateOpenSkill: () => null,
};

const connectFunction = connect(
  (store, props) => ({
    user: store.global.user,
    skill: store.matrix.groups[props.groupIndex].matrix_sections[props.sectionIndex].matrix_skills[props.skillIndex],
    selectedUser: store.matrix.selectedUser,
    userSkill: store.matrix.userSkills[props.id]
  }),
  {
    updateOpenSkill,
  }
);

export default withRouter(connectFunction(Card));
