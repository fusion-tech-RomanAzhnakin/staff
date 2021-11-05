import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const Modal = (props) => {
  const { onClose, title, children, open } = props;

  return (
    <StyledModal
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
    >
      <div className="modal__header">
        <IconButton
          color="primary"
          size="small"
          className="modal__close-btn"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </div>

      <DialogContent className="modal__content">
        <DialogTitle className="modal__title">{title}</DialogTitle>

        {children}
      </DialogContent>
    </StyledModal>
  );
};

const StyledModal = styled(Dialog)`
  & .MuiDialog-paper {
    position: relative;

    ${({ theme }) => theme.respond('sm', `
      width: 100%;
      margin: 0;
    `)};
  }

  .modal {
    &__content {
      overflow: hidden;
      padding: 20px 10px;
    }

    &__title {
      padding: 10px 0 15px;
    }

    &__close-btn {
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }
`;

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.element,
};

Modal.defaultProps = {
  open: false,
  onClose: () => null,
  title: '',
  children: null,
};

export default Modal;
