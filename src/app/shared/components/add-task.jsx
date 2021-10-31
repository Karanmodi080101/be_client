import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import moment from 'moment';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useEffect, useState, useRef } from 'react';
import ShowToast from 'src/app/shared/components/toast';
import { APIRoutes } from 'src/app/shared/constants/routes';
import styled from 'styled-components';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
// import { GoogleCalender } from '../../core/actions/GoogleCalender';

const TransparentBg = styled.div`
  .p-dialog-mask.p-component-overlay {
    background-color: transparent !important;
  }

  .p-dialog {
    border-radius: 3px;
    box-shadow: 2px 2px 2px 0px grey;
    border: 1px solid grey;
  }
`;

const AddTask = (props) => {
  // console.log('props from addtask', props);
  const dateFormat = 'yyyy-MM-DDThh:mm';
  const getDateInFormat = (givenDate = new Date()) => {
    return moment(givenDate).format(dateFormat);
  };

  let tempDate = new Date();
  tempDate.setMinutes(tempDate.getMinutes() + props?.durationInMinutes);
  const [title, setTitle] = useState(props.title.toString());
  const [description, setDescription] = useState(props.description.toString());
  const [startDate, setStartDate] = useState(
    props?.startDate ? getDateInFormat(props?.startDate) : getDateInFormat()
  );
  const [endDate, setEndDate] = useState(
    props?.endDate ? getDateInFormat(props?.endDate) : getDateInFormat(tempDate)
  );
  const [assignedToId, setAssignedToId] = useState(props.userId); //changed from empId to userId
  const [isShowToast, SetIsShowToast] = useState(false);
  const [checked, setChecked] = useState(false);
  const [dropdownData, setdropdownData] = useState([]);
  const [status, setStatus] = useState(props.status);
  const toast = useRef(null);
  // const [displaytime, setdisplaytime] = useState(false);
  // const [forpopup, setforpopup] = useState(false);

  // useEffect(() => {
  //   console.log('checked', checked);
  // }, [checked]);
  const fetch = async () => {
    const response = await axios.get('static');
    console.log('response', response.data);
    setdropdownData(response.data[0]);
  };

  useEffect(() => {
    fetch();
  }, []);

  // useEffect(() => {
  //   console.log('showtoast aaya');
  // }, [isShowToast]);

  const GoogleCalender = (task) => {
    console.log('googleCalender', task);
    var gapi = window.gapi;

    var CLIENT_ID =
      '829368560485-lipam7v7fklnt69il47vtl74su1vg5fo.apps.googleusercontent.com';
    var API_KEY = 'AIzaSyD7tqL8K2h_246Xf8Oqb6-rDfipSjvwULk';
    var DISCOVERY_DOCS = [
      'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'
    ];
    var SCOPES = 'https://www.googleapis.com/auth/calendar.events';

    //const handleClick = () => {
    gapi.load('client:auth2', () => {
      console.log('loaded client');

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      });

      gapi.client.load('calendar', 'v3', () =>
        console.log('bam!', gapi.auth2.getAuthInstance().isSignedIn.get())
      );

      if (
        !gapi.auth2.getAuthInstance().isSignedIn.get() ||
        sessionStorage?.getItem('googleIsSigned') === 'false'
      ) {
        gapi.auth2
          .getAuthInstance()
          .signIn()
          .then(() => {
            sessionStorage.setItem('googleIsSigned', true);
            console.log('in auth');
            var event = {
              summary: task?.title, //'Awesome Event!',
              //location: '800 Howard St., San Francisco, CA 94103',
              description: task?.description, //'Really great refreshments',
              start: {
                dateTime: task?.startDate, //'2021-10-19T09:00:00-07:00',
                timeZone: 'Asia/Calcutta'
              },
              end: {
                dateTime: task?.endDate, //'2021-10-21T17:00:00-07:00',
                timeZone: 'Asia/Calcutta'
              },
              //recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
              // attendees: [
              //   { email: 'lpage@example.com' },
              //   { email: 'sbrin@example.com' }
              // ],
              reminders: {
                useDefault: false,
                overrides: [
                  { method: 'email', minutes: 24 * 60 },
                  { method: 'popup', minutes: 10 }
                ]
              }
            };

            var request = gapi.client.calendar.events.insert({
              calendarId: 'primary',
              resource: event
            });

            request.execute((event) => {
              console.log(event);
              //window.open(event.htmlLink);
              props.setGoogle();
            });
          });
      } else {
        console.log('sessionStorage', sessionStorage);
        console.log('in auth else');
        var event = {
          summary: task?.title,
          description: task?.description,
          start: {
            dateTime: task?.startDate,
            timeZone: 'Asia/Calcutta'
          },
          end: {
            dateTime: task?.endDate,
            timeZone: 'Asia/Calcutta'
          },
          reminders: {
            useDefault: false,
            overrides: [
              { method: 'email', minutes: 24 * 60 },
              { method: 'popup', minutes: 10 }
            ]
          }
        };

        var request = gapi.client.calendar.events.insert({
          calendarId: 'primary',
          resource: event
        });

        request.execute((event) => {
          console.log(event);
          //window.open(event.htmlLink);
          props.setGoogle();
        });
      }
    });
  };

  const renderFooter = () => {
    return (
      <div>
        <Button
          label='No'
          icon='pi pi-times'
          onClick={props.closeDialog}
          className='p-button-text'
        />
        <Button label='Yes' icon='pi pi-check' onClick={createTask} autoFocus />
      </div>
    );
  };

  // const ShowToaster = () => {
  //   //SetIsShowToast(false);
  //   return (
  //     <ShowToast
  //       severity='success'
  //       summary='Success'
  //       detail='The task was created successfully.'
  //     />
  //   );
  // };

  // const AddToGoogleCalender = () => {
  //   //SetIsShowToast(false);
  //   return (
  //     <ShowToast
  //       severity='success'
  //       summary='Success'
  //       detail='The task was added to google calender successfully.'
  //     />
  //   );
  // };

  const createTask = () => {
    const newTask = {
      title: title,
      description: description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      assignedToId: assignedToId,
      status: status
    };
    console.log('naya wala', newTask);
    if (props?.edits !== 'true') {
      axios.post(APIRoutes.task.url, newTask).then((response) => {
        props.AddSuccess();
        props.closeDialog();
        //console.log('in');
      });
    } else {
      axios
        .put(`${APIRoutes.task.url}/${props.taskId}`, newTask)
        .then((response) => {
          if (response?.data) {
            console.log(response.data);
            toast?.current?.show({
              severity: 'success',
              summary: 'Successful',
              detail: 'Task created successfully',
              life: 3000
            });
            props.AddSuccess();
            props.closeDialog();
            props.forReRender();
            //SetIsShowToast(true);
            console.log('editing done!');
          }
        });
    }
    if (checked) GoogleCalender(newTask);
  };

  return (
    <>
      <Toast ref={toast} />
      <TransparentBg>
        <Dialog
          header='Header'
          visible={props.isVisible}
          onHide={props.closeDialog}
          position='left'
          style={{ width: '540px' }}
          footer={renderFooter}
          baseZIndex={1000}
        >
          <div className='row'>
            <div className='col-12'>
              <label>Details</label>
              <br />
              <InputText
                className='w-100'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className='col-12'>
              <div className='row'>
                <div className='col-sm-6 col-12'>
                  <TextField
                    id='datetime-local'
                    label='Start Time'
                    type='datetime-local'
                    defaultValue={startDate}
                    onChange={(e) =>
                      setStartDate(getDateInFormat(e.target.value))
                    }
                    // className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </div>
                <div className='col-sm-6 col-12'>
                  <TextField
                    id='datetime-local'
                    label='End Time'
                    type='datetime-local'
                    defaultValue={endDate}
                    onChange={(e) =>
                      setEndDate(getDateInFormat(e.target.value))
                    }
                    // className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='col-12'>
              <Dropdown
                value={status}
                options={dropdownData?.Status}
                onChange={(e) => setStatus(e.value)}
                //optionLabel='name'
                placeholder='Select status'
              />
            </div>
            <div className='col-12'>
              <label>Description</label>
              <br />
              <InputTextarea
                className='w-100'
                rows={5}
                cols={30}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                autoResize
              />
            </div>
            <div className='col-12'>
              <div className='p-field-checkbox'>
                <Checkbox
                  inputId='binary'
                  checked={checked}
                  onChange={(e) => setChecked(e.checked)}
                />
                <label className='mb-0' htmlFor='binary'>
                  &nbsp;&nbsp;Add to Google Calendar
                </label>
              </div>
            </div>
          </div>
        </Dialog>
      </TransparentBg>
      {/* {isShowToast ? <ShowToaster /> : null}
      {isGoogleShowToast ? <AddToGoogleCalender /> : null} */}
    </>
  );
};

export default AddTask;
