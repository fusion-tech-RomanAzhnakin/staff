/* eslint-disable class-methods-use-this */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Group from './components/Group';

class MatrixBody extends React.Component {
  render() {
    return (
      <>
        {this.props.groups.map((group, index) => (
          <Group
            key={group.id}
            groupIndex={index}
          />
        ))}
      </>
    );
  }
}

MatrixBody.propTypes = {
  groups: PropTypes.array
};

MatrixBody.defaultProps = {
  groups: []
};

const connectFunction = connect(
  (store) => ({
    groups: store.matrix.groups
  })
);

export default connectFunction(MatrixBody);
