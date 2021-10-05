import axios from 'axios';
import React, { useState, useEffect, Fragment /*ListItem*/ } from 'react';
import {
  Select,
  MenuItem,
  // InputLabel,
  Chip
  //TagFacesIcon,
  //Paper
} from '@material-ui/core';
import { Badge } from '../../modules/review-report/review-report.style';

export const EditProfile = (props) => {
  const [data, setData] = useState({});
  const [pending, setPending] = useState(true);
  const [hardskillschipData, setHardskillsChipData] = useState([]);
  const [tempSkills, setTempSkills] = useState('');
  const [SoftskillschipData, setSoftskillsChipData] = useState([]);
  const [personalityMindAttrchipData, setPersonalityMindAttrChipData] =
    useState([]);
  const [teamchipData, setTeamChipData] = useState([]);
  const [teamtechstackchipData, setTeamtechstackChipData] = useState([]);

  const addval = () => {
    if (!hardskillschipData.includes(tempSkills) && tempSkills !== '')
      setHardskillsChipData((temp) => [...temp, tempSkills]);
    setTempSkills('');
  };

  const addnewval = () => {
    if (!hardskillschipData.includes(tempSkills) && tempSkills !== '')
      setHardskillsChipData((temp) => [...temp, tempSkills]);
    setTempSkills('');
  };

  const handleDeletehardSkills = (chipToDelete) => () => {
    setHardskillsChipData((chips) =>
      chips.filter((chip) => chip !== chipToDelete)
    );
  };

  const addvalsoft = () => {
    if (!SoftskillschipData.includes(tempSkills) && tempSkills !== '')
      setSoftskillsChipData((temp) => [...temp, tempSkills]);
    setTempSkills('');
  };

  const addnewvalsoft = () => {
    if (!SoftskillschipData.includes(tempSkills) && tempSkills !== '')
      setSoftskillsChipData((temp) => [...temp, tempSkills]);
    setTempSkills('');
  };

  const handleDeleteSoftSkills = (chipToDelete) => () => {
    setSoftskillsChipData((chips) =>
      chips.filter((chip) => chip !== chipToDelete)
    );
  };

  const addvalper = () => {
    if (!personalityMindAttrchipData.includes(tempSkills) && tempSkills !== '')
      setPersonalityMindAttrChipData((temp) => [...temp, tempSkills]);
    setTempSkills('');
  };

  const addnewvalper = () => {
    if (!personalityMindAttrchipData.includes(tempSkills) && tempSkills !== '')
      setPersonalityMindAttrChipData((temp) => [...temp, tempSkills]);
    setTempSkills('');
  };

  const handleDeletepersonalityMindAttr = (chipToDelete) => () => {
    setPersonalityMindAttrChipData((chips) =>
      chips.filter((chip) => chip !== chipToDelete)
    );
  };

  const addvalteam = () => {
    if (!teamchipData.includes(tempSkills) && tempSkills !== '')
      setTeamChipData((temp) => [...temp, tempSkills]);
    setTempSkills('');
  };

  const addnewvalteam = () => {
    if (!teamchipData.includes(tempSkills) && tempSkills !== '')
      setTeamChipData((temp) => [...temp, tempSkills]);
    setTempSkills('');
  };

  const handleDeleteteam = (chipToDelete) => () => {
    setTeamChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  const addvalteamtechstack = () => {
    if (!teamtechstackchipData.includes(tempSkills) && tempSkills !== '')
      setTeamtechstackChipData((temp) => [...temp, tempSkills]);
    setTempSkills('');
  };

  const addnewvalteamtechstack = () => {
    if (!teamtechstackchipData.includes(tempSkills) && tempSkills !== '')
      setTeamtechstackChipData((temp) => [...temp, tempSkills]);
    setTempSkills('');
  };

  const handleDeleteteamtechstack = (chipToDelete) => () => {
    setTeamtechstackChipData((chips) =>
      chips.filter((chip) => chip !== chipToDelete)
    );
  };

  const [formData, setFormData] = useState({
    empId: '',
    teamId: '',
    fullName: '',
    dob: '',
    birthPlace: '',
    gender: '',
    nationality: '',
    contactNumber: '',
    aboutMe: '',
    dateOfEmployment: '',
    currentRole: '',
    department: '',
    manager: '',
    managerName: '',
    workEx: '',
    isManager: 0,
    //team: [],
    //teamTechStack: [],
    currentProject: '' //,
    //hardSkills: [],
    //softSkills: [],
    //personalityMindAttr: []
  });

  const preteam = ['IMATMI', 'PICT'];

  const preteamTechStack = ['MERN Stack', 'WEB-DEVELOPMENT'];

  const prehardskills = [
    'Java',
    'Machine Learning',
    'Database',
    'Artificial Intelligence',
    'C++',
    'C',
    'C#',
    'SQL',
    'Python',
    'Computer Vision'
  ];

  const presoftskills = [
    'Listening',
    'Time Management',
    'Empathy',
    'Leader',
    'Taking Responsibility',
    'Patience',
    'Multitasking'
  ];

  const prepersonalityMindAttr = [
    'Aspiring',
    'Conscientiousness',
    'Confident',
    'Encouraging',
    'Immaginative',
    'Extrovert',
    'Creative'
  ];

  const handleChange = (e) => {
    // const arr = [
    //   'team',
    //   'teamTechStack',
    //   'hardSkills',
    //   'softSkills',
    //   'personalityMindAttr'
    // ];
    setFormData({
      ...formData,
      [e.target.name]:
        //arr.includes(e.target.name)
        //? e.target.value?.split(',').map((d) => d.trim())
        /*:*/ e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('date_changed', formData.dob);
    const res = await axios.post('post', {
      empId: formData.empId,
      teamId: formData.teamId,
      fullName: formData.fullName,
      dob: formData.dob,
      birthPlace: formData.birthPlace,
      gender: formData.gender,
      nationality: formData.nationality,
      contactNumber: formData.contactNumber,
      aboutMe: formData.aboutMe,
      dateOfEmployment: formData.dateOfEmployment,
      currentRole: formData.currentRole,
      department: formData.department,
      manager: formData.manager,
      managerName: formData.managerName,
      workEx: formData.workEx,
      isManager: formData.isManager,
      team: teamchipData, //formData.team,
      teamTechStack: teamtechstackchipData, //formData.teamTechStack,
      currentProject: formData.currentProject,
      hardSkills: hardskillschipData, //formData.hardSkills,
      softSkills: SoftskillschipData, //formData.softSkills,
      personalityMindAttr: personalityMindAttrchipData //formData.personalityMindAttr
    });
    console.log('response', res.data);
    window.location.reload();
  };

  const fetchdata = async () => {
    console.log('props2', props);
    const res = await axios.get(`user/${props.location.state}`);
    console.log('resme', res.data);
    setData(res.data);
  };

  useEffect(() => {
    fetchdata();
    console.log('hello');
  }, []);

  useEffect(() => {
    console.log('values fetched');
    console.log('data', data);
    //console.log('date_fetched', data?.personalInformation?.dob.split('T')[0]);
    setFormData({
      empId: data?.empId,
      teamId: data?.teamId,
      fullName: data?.personalInformation?.fullName,
      dob: data?.personalInformation?.dob,
      birthPlace: data?.personalInformation?.birthPlace,
      gender: data?.personalInformation?.gender,
      nationality: data?.personalInformation?.nationality,
      contactNumber: data?.personalInformation?.contactNumber,
      aboutMe: data?.personalInformation?.aboutMe,
      dateOfEmployment: data?.employmentInformation?.dateOfEmployment,
      currentRole: data?.employmentInformation?.currentRole,
      department: data?.employmentInformation?.department,
      manager: data?.employmentInformation?.manager,
      managerName: data?.employmentInformation?.managerName,
      workEx: data?.employmentInformation?.workEx,
      isManager: data?.employmentInformation?.isManager,
      //team: data?.employmentInformation?.team,
      //teamTechStack: data?.employmentInformation?.teamTechStack,
      currentProject: data?.employmentInformation?.currentProject //,
      //hardSkills: data?.employmentInformation?.hardSkills,
      //softSkills: data?.employmentInformation?.softSkills,
      //personalityMindAttr: data?.employmentInformation?.personalityMindAttr
    });
    setTeamChipData(data?.employmentInformation?.team);
    setTeamtechstackChipData(data?.employmentInformation?.teamTechStack);
    setHardskillsChipData(data?.employmentInformation?.hardSkills);
    setSoftskillsChipData(data?.employmentInformation?.softSkills);
    setPersonalityMindAttrChipData(
      data?.employmentInformation?.personalityMindAttr
    );
    setPending(false);
    //settingValues();
  }, [data]);

  useEffect(() => {
    console.log('formData', formData);
  }, [pending]);

  // useEffect(() => {
  //   console.log('tempHS', tempHS);
  // }, [tempHS]);

  // useEffect(() => {
  //   console.log('hardskillschipData', hardskillschipData);
  // }, [hardskillschipData]);

  return (
    <Fragment>
      <section className='container-login'>
        <h1 className='medium text-primary'>My Profile</h1>
        {/* <p className='lead'>
          <i className='fas fa-user'></i> Sign Into Your Account
        </p> */}
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <label>Employee Id</label>
            <input
              type='text'
              placeholder='Employee Id'
              name='empId'
              value={formData?.empId}
              onChange={(e) => handleChange(e)}
              required
              readOnly
            />
          </div>
          <div className='form-group'>
            <label>Team Id</label>
            <input
              type='text'
              placeholder='Team Id'
              name='teamId'
              value={formData?.teamId}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <label>Full Name</label>
            <input
              type='text'
              placeholder='Full Name'
              name='fullName'
              value={
                formData?.fullName
                // data?.personalInformation?.fullName
                //   ? data?.personalInformation?.fullName
                //   : 'empty'
              }
              onChange={(e) => handleChange(e)}
              //required
            />
          </div>
          <div className='form-group'>
            <label>DOB</label>
            <input
              type='date'
              placeholder='DOB'
              name='dob'
              value={formData?.dob?.toString().split('T')[0]}
              onChange={(e) => handleChange(e)}
              //required
            />
          </div>
          <div className='form-group'>
            <label>Birth Place</label>
            <input
              type='text'
              placeholder='Birth Place'
              name='birthPlace'
              value={formData?.birthPlace}
              onChange={(e) => handleChange(e)}
              //required
            />
          </div>
          <div className='form-group'>
            <label>Gender</label>
            <input
              type='text'
              placeholder='Gender'
              name='gender'
              value={formData?.gender}
              onChange={(e) => handleChange(e)}
              //required
            />
          </div>
          <div className='form-group'>
            <label>Nationality</label>
            <input
              type='text'
              placeholder='Nationality'
              name='nationality'
              value={formData?.nationality}
              onChange={(e) => handleChange(e)}
              //required
            />
          </div>
          <div className='form-group'>
            <label>Contact Number</label>
            <input
              type='text'
              placeholder='Contact Number'
              name='contactNumber'
              value={formData?.contactNumber}
              onChange={(e) => handleChange(e)}
              //required
            />
          </div>
          <div className='form-group'>
            <label>About Me</label>
            <input
              type='text'
              placeholder='About Me'
              name='aboutMe'
              value={formData?.aboutMe}
              onChange={(e) => handleChange(e)}
              //required
            />
          </div>
          <div className='form-group'>
            <label>Date of Employment</label>
            <input
              type='date'
              placeholder='Date of Employment'
              name='dateOfEmployment'
              value={formData?.dateOfEmployment?.toString().split('T')[0]}
              onChange={(e) => handleChange(e)}
              //required
            />
          </div>
          <div className='form-group'>
            <label>Current Role</label>
            <input
              type='text'
              placeholder='Current Role'
              name='currentRole'
              value={formData?.currentRole}
              onChange={(e) => handleChange(e)}
              //required
            />
          </div>
          <div className='form-group'>
            <label>Department</label>
            <input
              type='text'
              placeholder='Department'
              name='department'
              value={formData?.department}
              onChange={(e) => handleChange(e)}
              //required
            />
          </div>
          <div className='form-group'>
            <label>Manager</label>
            <input
              type='text'
              placeholder='Manager'
              name='manager'
              value={formData?.manager}
              onChange={(e) => handleChange(e)}
              //required
            />
          </div>
          <div className='form-group'>
            <label>Manager Name</label>
            <input
              type='text'
              placeholder='Manager Name'
              name='managerName'
              value={formData?.managerName}
              onChange={(e) => handleChange(e)}
              //required
            />
          </div>
          <div className='form-group'>
            <label>Work Experience</label>
            <input
              type='text'
              placeholder='Work Experience'
              name='workEx'
              value={formData?.workEx}
              onChange={(e) => handleChange(e)}
              //required
            />
          </div>

          <div className='form-group'>
            <label>Team</label>
            <br />
            <Select
              onChange={(e) => setTempSkills(e.target.value)}
              style={{ minWidth: '200px', textAlign: 'center' }}
            >
              {preteam.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
            <button name='add' type='button' onClick={addvalteam}>
              Add +
            </button>
            <br /> <br />
            <input
              type='text'
              placeholder='add new skill'
              name='addnewskill'
              style={{ width: '75%', display: 'inline-block' }}
              onChange={(e) => setTempSkills(e.target.value)}
            />
            <button name='add' type='button' onClick={addnewvalteam}>
              Add new +
            </button>
            <br />
            <ul className='card-body'>
              {teamchipData?.map((item) => (
                <Chip
                  label={item}
                  onDelete={
                    item === 'React' ? undefined : handleDeleteteam(item)
                  }
                  style={{
                    marginLeft: '1%',
                    marginRight: '1%',
                    marginTop: '1%',
                    marginBottom: '1%'
                  }}
                >
                  {item}
                </Chip>
              ))}
            </ul>
          </div>

          <div className='form-group'>
            <label>Team Tech Scack</label>
            <br />
            <Select
              onChange={(e) => setTempSkills(e.target.value)}
              style={{ minWidth: '200px', textAlign: 'center' }}
            >
              {preteamTechStack.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
            <button name='add' type='button' onClick={addvalteamtechstack}>
              Add +
            </button>
            <br /> <br />
            <input
              type='text'
              placeholder='add new skill'
              name='addnewskill'
              style={{ width: '75%', display: 'inline-block' }}
              onChange={(e) => setTempSkills(e.target.value)}
            />
            <button name='add' type='button' onClick={addnewvalteamtechstack}>
              Add new +
            </button>
            <br />
            <ul className='card-body'>
              {teamtechstackchipData?.map((item) => (
                <Chip
                  label={item}
                  onDelete={
                    item === 'React'
                      ? undefined
                      : handleDeleteteamtechstack(item)
                  }
                  style={{
                    marginLeft: '1%',
                    marginRight: '1%',
                    marginTop: '1%',
                    marginBottom: '1%'
                  }}
                >
                  {item}
                </Chip>
              ))}
            </ul>
          </div>

          <div className='form-group'>
            <label>Is Manager</label>
            <input
              type='text'
              placeholder='Is Manager'
              name='isManager'
              value={formData?.isManager}
              onChange={(e) => handleChange(e)}
              //required
            />
          </div>
          <div className='form-group'>
            <label>Current Project</label>
            <input
              type='text'
              placeholder='Current Project'
              name='currentProject'
              value={formData?.currentProject}
              onChange={(e) => handleChange(e)}
              //required
            />
          </div>
          <div className='form-group'>
            <label>Hard Skills</label>
            <br />
            <Select
              onChange={(e) => setTempSkills(e.target.value)}
              style={{ minWidth: '200px', textAlign: 'center' }}
            >
              {prehardskills.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
            <button name='add' type='button' onClick={addval}>
              Add +
            </button>
            <br /> <br />
            <input
              type='text'
              placeholder='add new skill'
              name='addnewskill'
              style={{ width: '75%', display: 'inline-block' }}
              onChange={(e) => setTempSkills(e.target.value)}
            />
            <button name='add' type='button' onClick={addnewval}>
              Add new +
            </button>
            <br />
            <ul className='card-body'>
              {hardskillschipData?.map((item) => (
                <Chip
                  label={item}
                  onDelete={
                    item === 'React' ? undefined : handleDeletehardSkills(item)
                  }
                  style={{
                    marginLeft: '1%',
                    marginRight: '1%',
                    marginTop: '1%',
                    marginBottom: '1%'
                  }}
                >
                  {item}
                </Chip>
              ))}
            </ul>
          </div>

          <div className='form-group'>
            <label>Soft Skills</label>
            <br />
            <Select
              onChange={(e) => setTempSkills(e.target.value)}
              style={{ minWidth: '200px', textAlign: 'center' }}
            >
              {presoftskills.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
            <button name='add' type='button' onClick={addvalsoft}>
              Add +
            </button>
            <br /> <br />
            <input
              type='text'
              placeholder='add new skill'
              name='addnewskill'
              style={{ width: '75%', display: 'inline-block' }}
              onChange={(e) => setTempSkills(e.target.value)}
            />
            <button name='add' type='button' onClick={addnewvalsoft}>
              Add new +
            </button>
            <br />
            <ul className='card-body'>
              {SoftskillschipData?.map((item) => (
                <Chip
                  label={item}
                  onDelete={
                    item === 'React' ? undefined : handleDeleteSoftSkills(item)
                  }
                  style={{
                    marginLeft: '1%',
                    marginRight: '1%',
                    marginTop: '1%',
                    marginBottom: '1%'
                  }}
                >
                  {item}
                </Chip>
              ))}
            </ul>
          </div>

          <div className='form-group'>
            <label>Personality & Mind Attributes</label>
            <br />
            <Select
              onChange={(e) => setTempSkills(e.target.value)}
              style={{ minWidth: '200px', textAlign: 'center' }}
            >
              {prepersonalityMindAttr.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
            <button name='add' type='button' onClick={addvalper}>
              Add +
            </button>
            <br /> <br />
            <input
              type='text'
              placeholder='add new skill'
              name='addnewskill'
              style={{ width: '75%', display: 'inline-block' }}
              onChange={(e) => setTempSkills(e.target.value)}
            />
            <button name='add' type='button' onClick={addnewvalper}>
              Add new +
            </button>
            <br />
            <ul className='card-body'>
              {personalityMindAttrchipData?.map((item) => (
                <Chip
                  label={item}
                  onDelete={
                    item === 'React'
                      ? undefined
                      : handleDeletepersonalityMindAttr(item)
                  }
                  style={{
                    marginLeft: '1%',
                    marginRight: '1%',
                    marginTop: '1%',
                    marginBottom: '1%'
                  }}
                >
                  {item}
                </Chip>
              ))}
            </ul>
          </div>
          {/* {Object.keys(
            data?.personalInformation ? data?.personalInformation : {} //TODO: convert the array field in dropdown
          ).map((key) => (
            <div className='form-group'>
              <label>{key}</label>
              <input
                type={key === 'dob' ? 'date' : 'text'}
                placeholder={key}
                name={key}
                defaultValue={
                  key === 'dob'
                    ? data?.personalInformation?.dob.split('T')[0]
                    : data?.personalInformation[key]
                    ? data?.personalInformation[key]
                    : 'loading'
                }
                onChange={(e) => onChange(e)}
              />
            </div>
          ))} */}
          {/* {Object.keys(
            data?.employmentInformation ? data?.employmentInformation : {}
          ).map((key) => (
            <div className='form-group'>
              <label>{key}</label>
              <input
                type={key === 'dateOfEmployment' ? 'date' : 'text'}
                placeholder={key}
                name={key}
                defaultValue={
                  key === 'dateOfEmployment'
                    ? data?.employmentInformation?.dateOfEmployment.split(
                        'T'
                      )[0]
                    : data?.employmentInformation[key]
                    ? data?.employmentInformation[key]
                    : 'loading'
                }
                onChange={(e) => handleChange(e)}
              />
            </div>
          ))} */}
          <input type='submit' className='btn btn-primary' value='Update' />
        </form>
      </section>
    </Fragment>
  );
};
