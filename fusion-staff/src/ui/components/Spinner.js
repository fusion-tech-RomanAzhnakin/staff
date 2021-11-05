import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

class Spinner extends PureComponent {
  render() {
    if (!this.props.show) { return null; }

    return (
      <StyledImg
        src={`${process.env.PUBLIC_URL}/spinner.svg`}
        alt="loader"
        id="global-spinner"
      />
    );
  }
}

const StyledImg = styled.img`
  position: fixed;
  top: calc(50% - 100px);
  left: calc(50% - 100px);
  z-index: 1000;
`;

Spinner.propTypes = {
  show: PropTypes.bool.isRequired
};

Spinner.defaultProps = {
};

const connectFunction = connect(
  (store) => ({
    show: store.global.spinner
  })
);

export default connectFunction(Spinner);
