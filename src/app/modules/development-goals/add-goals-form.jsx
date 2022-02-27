import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import DatePicker from '../../shared/components/date-picker';
import { Checkbox } from 'primereact/checkbox';

const buttonStyle = {
  fontSize: '18px !important',
  padding: '11px 23px',
  borderRadius: '40px',
  float: 'right'
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '95%',
      margin: theme.spacing(1)
    }
  }
}));

function AddGoalsForm({ handleSave }) {
  const initialValues = {
    devGoal: '',
    asignee: '',
    requiredSupport: '',
    targetDate: new Date(),
    getVerified: 'Pending'
  };
  const classes = useStyles();

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [forGetVerified, setForGetVerified] = useState(true);
  //const [checked, setChecked] = useState(true);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ('devGoal' in fieldValues) {
      temp.devGoal = fieldValues.devGoal ? '' : 'This field is required';
    }

    setErrors({
      ...temp
    });
    if (fieldValues === values) {
      return Object.values(temp).every((x) => x === '');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });

    validate({
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      alert('Form Validation Failed!');
      return;
    }
    console.log('check vals', values);
    handleSave(values);
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        label='Development Goal'
        name='devGoal'
        value={values.devGoal}
        onChange={handleInputChange}
        // error={errors.devGoal}
        variant='outlined'
        {...(errors.devGoal && {
          error: true,
          helperText: errors.devGoal
        })}
      />
      <TextField
        label='Assignee'
        name='asignee'
        value={values.asignee}
        onChange={handleInputChange}
        // error={errors.devGoal}
        variant='outlined'
        {...(errors.asignee && {
          error: true,
          helperText: errors.asignee
        })}
      />
      <TextField
        label='Required Support'
        name='requiredSupport'
        value={values.requiredSupport}
        onChange={handleInputChange}
        variant='outlined'
        multiline
        maxRows={4}
      />
      <DatePicker
        name='targetDate'
        label='Due Date'
        value={values.targetDate}
        onChange={handleInputChange}
      />
      <div className='p-field-checkbox mb-2 mt-2 ml-2'>
        <Checkbox
          //name='getVerified'
          inputId='binary'
          checked={forGetVerified} //{values.getVerified}
          onChange={(e) => {
            setForGetVerified(e.checked);
            setValues({
              ...values,
              getVerified: e.checked ? 'Pending' : 'Approved'
            });
          }}
          //onChange={handleInputChange}
        />
        <label className='mb-0' htmlFor='binary'>
          &nbsp;&nbsp;Get verfied by Manager
        </label>
      </div>
      <button className='btn btn-primary-imatmi' style={buttonStyle}>
        Add
      </button>
    </form>
  );
}

export default AddGoalsForm;
