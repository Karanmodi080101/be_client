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
import { set } from 'date-fns/esm';
//import { indexOf } from '~/app/core/interceptors';

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

const EditTask = (props) => {
  //console.log('props from editTask', props);

  const [title, setTitle] = useState(props.title.toString());
  const [description, setDescription] = useState(props.description.toString());
  const [duration, setDuration] = useState(props.durationInMinutes);
  const [difficulty, setDifficulty] = useState(props.difficulty);
  const [edit_id, seteditID] = useState('');
  const [pending, setPending] = useState(true);
  const [assignedToId, setAssignedToId] = useState(props.userId); //changed from empId to userId
  const [isShowToast, SetIsShowToast] = useState(false);
  const [dropdownData, setdropdownData] = useState([]);
  const [status, setStatus] = useState(props.status);
  const toast = useRef(null);
  // const check = useRef(true);

  const [Result, setResult] = useState([]);

  const fetchData = async (userId) => {
    const res = await axios.get(`actionPlan/${userId}`);
    console.log('actionPLan res', res?.data);
    seteditID(res?.data?._id);
    setResult(res?.data?.modules);
    console.log('tp', Result);
  };

  useEffect(() => {
    console.log('Done!');
  }, [Result]);

  // useEffect(() => {
  //   if (!check.current) {
  //     console.log('Finally!', Result);

  //     //editaskAPI();
  //   } else check.current = false;
  // }, [pending]);

  const fetch = async () => {
    const response = await axios.get('static');
    console.log('response', response.data);
    setdropdownData(response.data[0]);
  };

  useEffect(() => {
    fetch();
    fetchData(JSON.parse(sessionStorage.getItem('currentUser'))?.userId); //fetched from session storage
  }, []);

  const renderFooter = () => {
    return (
      <div>
        <Button
          label='No'
          icon='pi pi-times'
          onClick={
            props?.closeEditDialog
              ? props?.closeEditDialog
              : props?.closeNewTaskDialog
          }
          className='p-button-text'
        />
        <Button label='Yes' icon='pi pi-check' onClick={editTask} autoFocus />
      </div>
    );
  };

  // const isPresent = (item) => {
  //   if (item._id.toString() === props?.subtaskId) return indexOf(item);
  // };

  const editTask = () => {
    const newTask = {
      title: title,
      description: description,
      // assignedToId: assignedToId,
      level: difficulty,
      duration: duration,
      isActive: true
    };
    console.log('naya wala', newTask);
    let arr = [...Result];
    if (props?.edits !== 'true') {
      const elementIndex = Result.findIndex(
        (item) => item._id.toString() === props?.milestoneobjectId
      );
      arr[elementIndex]?.milestoneList.push(newTask);
      console.log('arr', arr);
      axios
        .put('EditActionPlan', {
          empId: JSON.parse(sessionStorage.getItem('currentUser'))?.userId,
          modules: arr
        })
        .then((response) => {
          if (response?.data) {
            console.log(response.data);
            props.NewTaskSuccess();
            props.closeNewTaskDialog();
            //props.forReRender();
            //SetIsShowToast(true);
            console.log('addition done!');
          }
        });
    } else {
      try {
        Result.forEach((mod, i) => {
          const elementIndex = mod?.milestoneList.findIndex(
            (item) => item._id.toString() === props?.subtaskId
          );
          if (elementIndex >= 0) {
            let newArray = [...mod?.milestoneList];
            console.log('naya hai waha', newArray);
            console.log('check ', elementIndex);
            newArray[elementIndex] = {
              ...newArray[elementIndex],
              title: title,
              description: description,
              duration: duration,
              level: difficulty
            };
            console.log('check changes', newArray);
            arr[i] = {
              ...arr[i],
              milestoneList: newArray
            };
            console.log('arr', arr);
            // setResult(arr);
            throw 'Time to end the loop';
          }
        });
      } catch (e) {
        console.log('loop ended == ', e);
      }
      // setPending(false);
      axios
        .put('EditActionPlan', {
          empId: JSON.parse(sessionStorage.getItem('currentUser'))?.userId,
          modules: arr
        })
        .then((response) => {
          if (response?.data) {
            console.log(response.data);
            props.EditSuccess();
            props.closeEditDialog();
            //props.forReRender();
            //SetIsShowToast(true);
            console.log('editing done!');
          }
        });
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <TransparentBg>
        <Dialog
          header='Header'
          visible={props.isVisible}
          onHide={
            props?.closeEditDialog
              ? props?.closeEditDialog
              : props?.closeNewTaskDialog
          }
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
              <Dropdown
                value={difficulty}
                options={dropdownData?.Difficulty}
                onChange={(e) => setDifficulty(e.value)}
                //optionLabel='name'
                placeholder='Select difficulty'
              />
            </div>
            <div className='col-12'>
              <label>Duration</label>
              <br />
              <InputText
                className='w-100'
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
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
          </div>
        </Dialog>
      </TransparentBg>
      {/* {isShowToast ? <ShowToaster /> : null}
      {isGoogleShowToast ? <AddToGoogleCalender /> : null} */}
    </>
  );
};

export default EditTask;
