import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Card from './Card';
import EditableTitle from './EditableTitle';
import { RoleCheck } from 'utils/protector';

import {
  updateOpenSkill,
  updateRemovedItem,
  updateCurrentItem,
} from 'pages/Matrix/store/actionCreators';
import { renameSection } from 'pages/Matrix/store/actions/sectionActions';
import { skillLevels } from 'pages/Matrix/constants';
import EditRemoveButtons from './EditRemoveButtons';

class Section extends React.PureComponent {
  state = {
    isOpenCollapse: true,
    isTitleEditorOpened: false
  }

  openTitleEditor = (event) => {
    event.stopPropagation();

    this.setState({ isTitleEditorOpened: true });

    const { sectionIndex, groupIndex } = this.props;
    const { id, title } = this.props.section;

    this.props.updateCurrentItem({ id, title, sectionIndex, groupIndex });
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

    this.props.renameSection();

    this.closeTitleEditor();
  }

  toggleCollapse = () => {
    this.setState({ isOpenCollapse: !this.state.isOpenCollapse });
  };

  createSkill = (event) => {
    event.stopPropagation();

    if (this.props.currentItem) {
      this.props.updateCurrentItem(null);
    }

    const { groupIndex, sectionIndex } = this.props;

    this.props.updateOpenSkill({
      level: skillLevels.junior,
      groupIndex,
      sectionIndex
    });
  }

  deleteSection = (event) => {
    event.stopPropagation();

    const { id } = this.props.section;
    const { groupIndex, sectionIndex } = this.props;

    this.props.updateRemovedItem({ id, groupIndex, sectionIndex, type: 'section' });
  }

  getLevelSkills = () => this.props.section.matrix_skills
    .reduce((levelSkills, skill, index) => {
      switch (skill.level) {
        case 'junior':
          levelSkills[0].content.push({ skillIndex: index, skill });
          break;
        case 'middle':
          levelSkills[1].content.push({ skillIndex: index, skill });
          break;
        case 'senior':
          levelSkills[2].content.push({ skillIndex: index, skill });
          break;
        default:
          break;
      }

      return levelSkills;
    }, [
      { title: 'junior', content: [] },
      { title: 'middle', content: [] },
      { title: 'senior', content: [] }
    ]);

  onKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.changeTitle(event);
    }
    if (event.key === 'Escape') {
      this.closeTitleEditor();
    }
  }

  onClickTitle = (event) => {
    event.stopPropagation();
  }

  render() {
    return (
      <div className="section">
        <div
          onClick={this.toggleCollapse}
          className="header section__header"
        >
          <div className="header__left-side">
            <EditableTitle
              className="title title-input"
              title={this.props.section.title}
              open={this.state.isTitleEditorOpened}
              onSubmit={this.changeTitle}
              onBlur={this.closeTitleEditor}
              onKeyDown={this.onKeyDown}
              onChange={this.handleChangeTitle}
              value={this.props.currentItem?.title || ''}
              onClick={this.onClickTitle}
            />

            {this.props.godMode &&
              <EditRemoveButtons
                onClickEdit={this.openTitleEditor}
                onClickRemove={this.deleteSection}
              />
            }
          </div>

          <RoleCheck forRole="admin">
            {this.props.godMode &&
              <Button
                className="add-btn add-section-btn matrix-btn"
                onClick={this.createSkill}
              >
                + добавить навык
              </Button>
            }
          </RoleCheck>
        </div>

        <Collapse
          in={this.state.isOpenCollapse}
        >
          <div className="section__inner">
            {this.getLevelSkills()?.map((level) => (
              <div
                key={level.title}
                className="section__level"
              >
                <div className="section__level-title">
                  {level.title}
                </div>

                {level.content.map((item) => {
                  return (
                    <Card
                      key={item.skill.id}
                      id={item.skill.id}
                      title={item.skill.title}
                      skillIndex={item.skillIndex}
                      sectionIndex={this.props.sectionIndex}
                      groupIndex={this.props.groupIndex}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </Collapse>
      </div>
    );
  }
}

Section.propTypes = {
  role: PropTypes.string,
  title: PropTypes.string,
  groupIndex: PropTypes.number.isRequired,
  sectionIndex: PropTypes.number.isRequired,
  section: PropTypes.object.isRequired,
  currentItem: PropTypes.object,
  updateOpenSkill: PropTypes.func,
  updateRemovedItem: PropTypes.func,
  updateCurrentItem: PropTypes.func,
  renameSection: PropTypes.func,
  godMode: PropTypes.bool,
};

Section.defaultProps = {
  role: 'student',
  title: '',
  currentItem: null,
  updateOpenSkill: () => null,
  updateRemovedItem: () => null,
  updateCurrentItem: () => null,
  renameSection: () => null,
  godMode: false,
};

const connectFunction = connect(
  (store, props) => ({
    role: store.global.user.role,
    section: store.matrix.groups[props.groupIndex].matrix_sections[props.sectionIndex],
    currentItem: store.matrix.currentItem,
    godMode: store.matrix.godMode,
  }), {
    updateOpenSkill,
    updateRemovedItem,
    updateCurrentItem,
    renameSection,
  }
);

export default connectFunction(Section);
