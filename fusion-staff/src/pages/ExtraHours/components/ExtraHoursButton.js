import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Grid, Button } from '@material-ui/core';

import { RoleCheck } from 'utils/protector';

class ExtraHoursButton extends Component {
  render() {
    const { handleCreateModal, isEmpty, handleCalculateModal } = this.props;

    return (
      <>
      <ButtonContainer>
        <Grid item xs={12}>
          <StyledButton
            onClick={handleCreateModal}
            variant="outlined"
            style={isEmpty ? extraButtonColor : extraButton}
          >
            Добавить переработку
          </StyledButton>
        </Grid>
      </ButtonContainer>
      <RoleCheck forRole='admin'>
      <ButtonContainer>
        <Grid item xs={12}>
          <StyledButton
            onClick={handleCalculateModal}
            variant="outlined"
            style={isEmpty ? extraButtonColor : extraButton}
          >
            Посчитать
          </StyledButton>
        </Grid>
      </ButtonContainer>
      </RoleCheck>
      </>
    );
  }
}

ExtraHoursButton.propTypes = {
  handleCreateModal: PropTypes.func,
  handleCalculateModal: PropTypes.func,
  isEmpty: PropTypes.bool
};

ExtraHoursButton.defaultProps = {
  isEmpty: null,
  handleCreateModal: () => null,
  handleCalculateModal: () => null
};

const ButtonContainer = styled.div`
  margin-right: 25px;
  margin-bottom: 5px;
  @media (max-width: 400px) {
    margin-right: 0;
  }
  @media (max-width: 566px) {
    margin-bottom: 10px;
  }
`;

const StyledButton = styled(Button)`
  & {
    margin-bottom: 20px;
    border: 1px solid #a79db1;
    font-size: 14px;
    font-style: normal;
    && {
      font-weight: bold;
      line-height: 19px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      padding: 9.5px 32px;
    }
  }
`;

const extraButtonColor = {
  backgroundColor: '#B163FF',
  color: '#fff'
};
const extraButton = {
  backgroundColor: '#e5e5e5',
  color: '#7b7b7b'
};

export default ExtraHoursButton;
