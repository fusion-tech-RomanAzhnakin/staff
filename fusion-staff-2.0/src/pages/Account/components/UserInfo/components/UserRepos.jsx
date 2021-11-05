import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';

const UserRepos = (props) => {
  const addRepo = () => {
    const newRepos = [...props.repos, ''];
    props.changeRepos(newRepos);
  };

  const removeRepo = (index) => {
    const newRepos = [...props.repos];
    newRepos.splice(index, 1);
    props.changeRepos(newRepos);
  };

  return (
    <div>
      <Fab
        className="user-repo__button"
        color="primary"
        aria-label="Add"
        size="small"
        onClick={addRepo}
      >
        <AddIcon />
      </Fab>

      {props.repos.map((repo, index) => (
        <Grid container key={index}>
          <Grid item sm={11} xs={11}>
            <TextField
              fullWidth
              name={`repo.${index}`}
              value={repo}
              onChange={props.handleChange}
              error={Boolean(props.touched && props.errors?.[index])}
              helperText={props.errors?.[index]}
            />
          </Grid>

          <Grid item sm={1} xs={1}>
            <IconButton
              aria-label="Delete"
              onClick={() => removeRepo(index)}
              className="delete_button"
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

UserRepos.propTypes = {
  changeRepos: PropTypes.func,
  handleChange: PropTypes.func,
  repos: PropTypes.arrayOf(PropTypes.string),
  touched: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  errors: PropTypes.arrayOf(PropTypes.string),
};

UserRepos.defaultProps = {
  changeRepos: () => null,
  handleChange: () => null,
  repos: [],
  errors: [],
  touched: {},
};

export default UserRepos;
