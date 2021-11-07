import React, { useState, Fragment } from 'react';
import AddGoalsForm from './add-goals-form';
import Dialog from '@material-ui/core/Dialog';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const buttonStyle = {
  fontSize: '18px !important',
  padding: '11px 23px',
  borderRadius: '40px',
  float: 'right'
};

function AddGoalsDialog({ addGoal }) {
  const [showDialog, setShowDialog] = useState(false);
  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);
  return (
    <Fragment>
      <button
        className='btn btn-primary-imatmi'
        style={buttonStyle}
        onClick={openDialog}
      >
        Add Goal
      </button>
      <Dialog open={showDialog} onClose={closeDialog}>
        <DialogTitle>
          Add goal{' '}
          <IconButton style={{ float: 'right' }}>
            <CloseIcon onClick={closeDialog}></CloseIcon>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <AddGoalsForm />
        </DialogContent>
        {/* <DialogActions>
        </DialogActions> */}
      </Dialog>
    </Fragment>
  );
}

export default AddGoalsDialog;
