import React, { Fragment, useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogContent, IconButton, DialogTitle } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Container } from './development-goals.style';
import { setGoals } from '../../core/actions/development-goals';

const buttonStyle = {
  fontSize: '16px !important',
  borderRadius: '40px',
  backgroundColor: '#52a2ec',
  color: 'white'
};

const GoalTemplateDialogue = ({
  openDialog,
  closeDialog,
  showDialog,
  skills,
  setResult
}) => {
  const [selectedGoals, setSelectedGoals] = useState();
  const goalList = skills.map((skill, index) => ({
    id: index,
    devGoal: 'Learn ' + skill.label,
    requiredSupport: 'NA',
    targetDate: '',
    getVerified: 'Approved', //change maybe in future ...Temporary
    selected: false
  }));
  const handleSet = async () => {
    try {
      const devGoals = await setGoals(selectedGoals);
      if (devGoals?.userId) {
        setResult(devGoals.devGoalsFields);
        closeDialog();
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Fragment>
      <button className='btn' style={buttonStyle} onClick={openDialog}>
        Auto Goal Generation
      </button>
      <Dialog open={showDialog} onClose={closeDialog}>
        <DialogTitle>
          Goal Generation Template{' '}
          <IconButton style={{ float: 'right' }}>
            <CloseIcon onClick={closeDialog}></CloseIcon>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className='card border-0 mb-3'>
            <Container>
              <div className='p-datatable-responsive-demo'>
                <DataTable
                  value={goalList}
                  selection={selectedGoals}
                  onSelectionChange={(e) => setSelectedGoals(e.value)}
                  dataKey='id'
                  className='p-datatable-responsive-demo'
                >
                  <Column
                    selectionMode='multiple'
                    headerStyle={{ width: '3em' }}
                    className='p-column-title'
                  ></Column>
                  <Column
                    field='devGoal'
                    header='Development Goals'
                    className='p-column-title'
                    // style={{ width: '12%' }}
                  ></Column>
                  <Column field='assigneer' header='Assigneer'></Column>
                  <Column
                    field='requiredSupport'
                    header='Required Support'
                    className='p-column-title'
                  ></Column>
                  <Column
                    field='targetDate'
                    header='Target Date'
                    style={{ width: '17%' }}
                    className='p-column-title'
                  ></Column>
                </DataTable>
              </div>
              <button
                className='btn btn-primary-imatmi'
                style={{
                  ...buttonStyle,
                  marginTop: '8px'
                }}
                onClick={handleSet}
              >
                Add
              </button>
            </Container>
          </div>
        </DialogContent>
        {/* <DialogActions>
        </DialogActions> */}
      </Dialog>
    </Fragment>
  );
};

export default GoalTemplateDialogue;
