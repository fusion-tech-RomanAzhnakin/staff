import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Select from 'react-select';
import { Button, TextField } from '@material-ui/core';
import { RichTextBox, SelectWrapper } from 'ui';
import StyledWrapper from './StyledWrapper';

import { createSkill, updateSkill } from 'pages/Matrix/store/actions/skillActions';
import { updateOpenSkill } from 'pages/Matrix/store/actionCreators';
import { skillOptions } from 'pages/Matrix/constants';
import { OpenSkillType } from 'utils/types';

class SkillEdit extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: props.openSkill?.title || '',
      description: props.openSkill?.description || '',
      level: props.openSkill?.level || 'none',
    };
  }

  onChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  }

  onChangeDescription = (description) => {
    this.setState({ description });
  }

  onChangeLevel = (event) => {
    this.setState({ level: event.value });
  }

  submit = (event) => {
    event.preventDefault();

    if (!this.state.title.trim()) {
      return;
    }

    const { title, description, level } = this.state;
    const skill = { title, description, level };

    if (this.props.openSkill.id) {
      this.props.updateSkill(skill);
    } else {
      this.props.createSkill(skill);
    }

    this.close();
  }

  close = () => {
    if (!this.props.openSkill.id) {
      this.props.updateOpenSkill(null);

      return;
    }

    this.props.turnOffEditMode();
  }

  render() {
    return (
      <StyledWrapper>
        <div className="padding-wrapper">
          <div className="header">
            Навык
          </div>

          <form onSubmit={this.submit}>
            <div className="skill__label">
              Название
            </div>

            <TextField
              autoFocus
              className="skill__title-input"
              value={this.state.title}
              variant="outlined"
              onChange={this.onChangeTitle}
            />

            <div className="skill__label">
              Уровень
            </div>

            <SelectWrapper>
              <Select
                className="skill__level-selector"
                classNamePrefix="select"
                value={
                  skillOptions.find((item) => item.value === this.state.level)
                  || skillOptions[0]
                }
                options={skillOptions}
                onChange={this.onChangeLevel}
              />
            </SelectWrapper>

            <div className="skill__label">Описание</div>

            <RichTextBox
              value={this.state.description || ''}
              onChange={this.onChangeDescription}
            />

            <div className="buttons">
              <Button
                onClick={this.close}
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
        </div>
      </StyledWrapper>
    );
  }
}

SkillEdit.propTypes = {
  openSkill: OpenSkillType,
  groups: PropTypes.array,
  updateOpenSkill: PropTypes.func,
  createSkill: PropTypes.func,
  updateSkill: PropTypes.func,
  turnOffEditMode: PropTypes.func,
};

SkillEdit.defaultProps = {
  openSkill: {},
  groups: [],
  updateOpenSkill: () => null,
  createSkill: () => null,
  updateSkill: () => null
};

const connectFunction = connect(
  (store) => ({
    groups: store.matrix.groups,
    openSkill: store.matrix.openSkill,
  }),
  {
    updateOpenSkill,
    createSkill,
    updateSkill,
  },
);

export default connectFunction(SkillEdit);
