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
import { addGoal } from '../../core/actions/development-goals';

const buttonStyle = {
  fontSize: '16px !important',
  borderRadius: '40px',
  backgroundColor: '#666',
  color: 'white'
};

function AddGoalsDialog({ openDialog, closeDialog, showDialog, setResult }) {
  const handleSave = async (values) => {
    try {
      const devGoals = await addGoal(values);
      if (devGoals?.userId) {
        setResult(devGoals.devGoalsFields);
        closeDialog();
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      <button className='btn' style={buttonStyle} onClick={openDialog}>
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
          <AddGoalsForm handleSave={handleSave} />
        </DialogContent>
        {/* <DialogActions>
        </DialogActions> */}
      </Dialog>
    </Fragment>
  );
}

export default AddGoalsDialog;
