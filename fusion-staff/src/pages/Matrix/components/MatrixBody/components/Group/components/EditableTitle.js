import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class EditableTitle extends Component {
  render() {
    const {
      title,
      open,
      onSubmit,
      onBlur,
      onKeyDown,
      onChange,
      onClick,
      value,
    } = this.props;

    return (
      <StyledWrapper>
        {!open &&
          <div className="title">
            {title}
          </div>
        }

        {open &&
          <form onSubmit={onSubmit}>
            <input
              className="title title__input"
              autoFocus
              type="text"
              onBlur={onBlur}
              onKeyDown={onKeyDown}
              onChange={onChange}
              value={value}
              onClick={onClick}
            />
          </form>
        }
      </StyledWrapper>
    );
  }
}

const StyledWrapper = styled.div`
  .title {
    padding: 0 16px;
    font-family: 'Montserrat';
    font-weight: 600;
    font-size: 16px;
    line-height: 19.5px;
    text-transform: uppercase;
  }

  .title__input {
    margin: 0 8px;
    padding-left: 8px;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
    height: 32px;
  }
`;

EditableTitle.propTypes = {
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  onSubmit: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
  value: PropTypes.string,
};

EditableTitle.defaultProps = {
  onBlur: () => null,
  onChange: () => null,
  onClick: () => null,
  onKeyDown: () => null,
  onSubmit: () => null,
  open: false,
  title: '',
  value: ''
};

export default EditableTitle;
