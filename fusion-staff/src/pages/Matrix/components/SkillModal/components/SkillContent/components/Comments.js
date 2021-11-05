import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import { TextField, Button } from '@material-ui/core';
import { RoleCheck } from 'utils/protector';

import { createComment } from 'pages/Matrix/store/actions/commentActions';
import { getAvatar } from 'utils';

class Comments extends Component {
  input = React.createRef();

  submitComment = (event) => {
    event.preventDefault();

    if (this.props.comment.trim().length > 0) {
      this.props.createComment(this.props.comment);
    }

    this.props.onChangeComment();
  }

  onKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      this.submitComment(event);
    }
  }

  render() {
    const { userSkill } = this.props;

    return (
      <>
        {userSkill?.matrix_skill_comments?.map((comment) => {
          const user = this.props.usersList.find((user) => user.value === comment.created_by);

          return (
          <React.Fragment key={comment.id}>
            <div
              className="skill__comment"
            >
              {comment.text}
            </div>

            <div className="skill__comment-description">
              <img
                className="skill__comment-avatar"
                src={getAvatar(user)}
                alt=""
              />
              {user.label},&nbsp;
              {moment(comment.updatedAt).calendar().toLowerCase()}
            </div>
          </React.Fragment>
          );
        })}

        {!userSkill?.matrix_skill_comments?.length &&
          <div className="skill__comment-blank">
            Пока сообщений нет
          </div>
        }

        <RoleCheck forRole="admin">
          <form
            onSubmit={this.submitComment}
          >
            <TextField
              className="skill__comment-input"
              value={this.props.comment}
              label="Комментарий"
              variant="outlined"
              onChange={this.props.onChangeComment}
              multiline
              inputRef={this.input}
              onKeyDown={this.onKeyDown}
            />

            <div className="buttons">
              <Button
                type="submit"
                variant="contained"
                className="primary-btn matrix-btn"
              >
                Отправить комментарий
              </Button>
            </div>
          </form>
        </RoleCheck>
      </>
    );
  }
}

Comments.propTypes = {
  userSkill: PropTypes.object,
  createComment: PropTypes.func,
  id: PropTypes.number,
  comment: PropTypes.string,
  onChangeComment: PropTypes.func,
  usersList: PropTypes.array,
};

Comments.defaultProps = {
  createComment: () => null,
  comment: '',
  onChangeComment: () => null,
  usersList: [],
};

const connectFunction = connect(
  (store, props) => ({
    userSkill: store.matrix.userSkills[props.id],
    usersList: store.matrix.usersList,
  }), {
    createComment
  }
);

export default connectFunction(Comments);
