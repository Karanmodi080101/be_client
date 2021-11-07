import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import DatePicker from '../../shared/components/date-picker';
import { addGoal } from '../../core/actions/development-goals';

const buttonStyle = {
  fontSize: '18px !important',
  padding: '11px 23px',
  borderRadius: '40px',
  float: 'right'
};

const initialValues = {
  devGoal: '',
  asignee: '',
  reqSupport: '',
  targetDate: new Date()
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '95%',
      margin: theme.spacing(1)
    }
  }
}));

function AddGoalsForm() {
  const classes = useStyles();

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    if ('devGoal' in fieldValues) {
      temp.devGoal = fieldValues.devGoal ? '' : 'This field is required';
    }
    if ('asignee' in fieldValues) {
      temp.asignee = fieldValues.asignee ? '' : 'This field is required';
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
      alert('Form incomplete');
      return;
    }
    try {
      const devGoal = await addGoal(values);
      alert('Goal added Successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
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
        name='reqSupport'
        value={values.reqSupport}
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
      <button
        className='btn btn-primary-imatmi'
        style={buttonStyle}
        // onClick={() => onSubmit()}
      >
        Add
      </button>
    </form>
  );
}

export default AddGoalsForm;
