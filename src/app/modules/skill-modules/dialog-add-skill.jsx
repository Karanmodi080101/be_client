import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Chips } from 'primereact/chips';
import './dialog-add-skill.css';

const buttonStyle = {
  fontSize: '18px !important',
  padding: '11px 23px',
  borderRadius: '40px',
  float: 'right !important',
  width: '8rem'
};

const levels = [
  { name: 'Easy', code: 'easy' },
  { name: 'Medium', code: 'medium' },
  { name: 'Hard', code: 'hard' }
];

const initialValues = {
  title: '',
  duration: '',
  level: null,
  description: '',
  resources: ''
};

const DialogAddSkill = (props) => {
  const [displayBasic, setDisplayBasic] = useState(false);
  const [displayBasic2, setDisplayBasic2] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [displayMaximizable, setDisplayMaximizable] = useState(false);
  const [displayPosition, setDisplayPosition] = useState(false);
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [position, setPosition] = useState('center');

  const [title, setTitle] = useState(initialValues.title);
  const [duration, setDuration] = useState(initialValues.duration);
  const [level, setLevel] = useState(initialValues.level);
  const [description, setDescription] = useState(initialValues.description);
  const [resourcesLinks, setResources] = useState(initialValues.resources);

  const onLevelChange = (e) => {
    setLevel(e.value);
  };

  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
    displayBasic2: setDisplayBasic2,
    displayModal: setDisplayModal,
    displayMaximizable: setDisplayMaximizable,
    displayPosition: setDisplayPosition,
    displayResponsive: setDisplayResponsive
  };

  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label='Cancel'
          icon='pi pi-times'
          onClick={() => onHide(name)}
          className='p-button-text'
        />
        <Button
          type='submit'
          label='Add'
          icon='pi pi-check'
          onClick={handleSubmit}
        />
      </div>
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    props
      .handleAdd({
        title,
        level: level.name,
        description,
        resourcesLinks,
        duration
      })
      .then((data) => {
        setTitle(initialValues.title);
        setDuration(initialValues.duration);
        setLevel(initialValues.level);
        setDescription(initialValues.description);
        setResources(initialValues.resources);
      });
  };

  return (
    <div className='dialog-demo'>
      <div className='card'>
        <button
          onClick={() => onClick('displayMaximizable')}
          className='btn btn-primary-imatmi'
          style={buttonStyle}
        >
          Add Skill
        </button>
        <Dialog
          header='Add New Skill'
          visible={displayMaximizable}
          maximizable
          modal
          style={{ width: '50vw' }}
          footer={renderFooter('displayMaximizable')}
          onHide={() => onHide('displayMaximizable')}
        >
          <form onSubmit={handleSubmit}>
            <p className='p-m-0'>
              <br />
            </p>
            <span className='p-float-label'>
              <InputText
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor='title'>Title</label>
            </span>

            <p className='p-m-0'>
              <br />
            </p>
            <span className='p-float-label'>
              <InputText
                id='duration'
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
              <label htmlFor='duration'>Duration</label>
            </span>
            <br />
            <br />
            <Dropdown
              value={level}
              options={levels}
              onChange={onLevelChange}
              optionLabel='name'
              placeholder='Select a Level'
            />
            <br />
            <br />
            <h6> Description </h6>
            <InputTextarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              cols={30}
              autoResize
            />
            <h6> Resource links </h6>
            <Chips
              value={resourcesLinks}
              onChange={(e) => setResources(e.value)}
              separator=','
            />
          </form>
        </Dialog>
      </div>
    </div>
  );
};

export default DialogAddSkill;
