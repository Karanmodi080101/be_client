import React from 'react';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const convertToDefaultEventParameter = (name, value) => ({
  target: {
    name,
    value
  }
});

export default function DatePicker(props) {
  const { name, value, label, onChange } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant='inline'
        inputVariant='outlined'
        label={label}
        format='dd/MM/yyyy'
        name={name}
        value={value}
        onChange={(date) =>
          onChange(convertToDefaultEventParameter(name, date))
        }
      ></KeyboardDatePicker>
    </MuiPickersUtilsProvider>
  );
}
