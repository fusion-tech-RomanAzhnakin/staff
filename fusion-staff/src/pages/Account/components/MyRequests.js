import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RequestInfo from './RequestInfo';

class MyRequests extends Component {
  render() {
    return (
      <>
        {!this.props.requests.length ? (
          <b>Нет заявок</b>
        ) : (
          <>
            {this.props.requests.map((request) => {
              return <RequestInfo
                key={request.id}
                request={request}
                updateEntitiesState={this.props.updateEntitiesState}
              />;
            })}
          </>
        )}
      </>
    );
  }
}

MyRequests.propTypes = {
  requests: PropTypes.arrayOf(PropTypes.any),
  updateEntitiesState: PropTypes.func,
};

MyRequests.defaultProps = {
  requests: null,
  updateEntitiesState: () => null,
};

export default MyRequests;
