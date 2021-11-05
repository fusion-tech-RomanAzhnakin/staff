import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmModal = (props) => {
  const { onClose, onAccept, title, content, open } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onAccept} color="primary" autoFocus>
            Подтвердить
          </Button>
          <Button onClick={onClose} color="primary">
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ConfirmModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onAccept: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.string,
};

ConfirmModal.defaultProps = {
  open: false,
  onClose: () => null,
  onAccept: () => null,
  title: 'Удалить элемент',
  content: 'Вы действительно хотите удалить этот элемент?',
};

export default ConfirmModal;
