import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Select from 'react-select';

import { UserType } from 'utils/types';
import {
  getMentors,
  updateCurrentMentor,
  updateMentor
} from '../store/actions';

class MentorSelect extends Component {
  state = {
    mentors: null,
  }

  async componentDidMount() {
    await this.props.getMentors();
  }

  async componentDidUpdate(prevProps) {
    const { mentors_objects, currentUser, updateCurrentMentor } = this.props;

    if (prevProps.mentors_objects.length !== mentors_objects.length) {
      const mentors = [{
        label: 'Не назначен',
        value: null
      }].concat(this.prepareMentorsArray(mentors_objects));
      this.setState({
        mentors
      });

      if (currentUser) {
        const currentMentor = mentors_objects.find(mentor => {
          return mentor.id === currentUser.mentor_id;
        });
        updateCurrentMentor(currentMentor);
      }
    }

    if (
      (!prevProps.currentUser && currentUser) ||
      (currentUser && prevProps.currentUser.id !== currentUser.id)
    ) {
      const currentMentor = mentors_objects.find(mentor => {
        return mentor.id === currentUser.mentor_id;
      });
      updateCurrentMentor(currentMentor);
    }
  }

  typeChange = async (data) => {
    const { currentUser, updateMentor, refreshUserList } = this.props;

    if (data.value === null) {
      await updateMentor(currentUser.id, null);
      refreshUserList();
      return;
    }

    const mentor = {
      id: Number(data.value),
      firstName: data.label.split(' ')[0],
      lastName: data.label.split(' ')[1],
    };
    await updateMentor(currentUser.id, mentor);
    refreshUserList();
  }

  prepareMentorsArray = (arr) => {
    return arr.map(mentor => {
      return ({
        label: `${mentor.firstName} ${mentor.lastName}`,
        value: `${mentor.id}`
      });
    });
  }

  render() {
    const { currentUser, currentMentor } = this.props;
    const { mentors } = this.state;

    let type = {
      value: null,
      label: 'Не назначен'
    };
    if (currentMentor) {
      type = {
        value: Number(currentMentor.id),
        label: `${currentMentor.firstName} ${currentMentor.lastName}`
      };
    }

    if (!mentors) return null;

    return (
      <div className="mentors-container">
        <Select
          value={currentUser ? type : null}
          options={mentors}
          onChange={this.typeChange}
          isDisabled={!currentUser}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.internship.currentUser,
  currentMentor: state.internship.currentMentor,
  mentors_objects: state.internship.mentors,
});

export default connect(mapStateToProps,
  { getMentors, updateCurrentMentor, updateMentor })(MentorSelect);

MentorSelect.propTypes = {
  getMentors: PropTypes.func,
  refreshUserList: PropTypes.func,
  updateCurrentMentor: PropTypes.func,
  updateMentor: PropTypes.func,
  currentUser: UserType,
  currentMentor: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
  mentors_objects: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      avatar: PropTypes.string,
      avatarThumbnail: PropTypes.string,
      login: PropTypes.string,
      role: PropTypes.string,
      status: PropTypes.string,
      id: PropTypes.number,
      mentor_id: PropTypes.number,
    })
  )
};
