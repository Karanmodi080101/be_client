import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react';
import { Select, MenuItem, Chip } from '@material-ui/core';
// import { Badge } from '../../modules/review-report/review-report.style';
import { useHistory } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { City, Country } from 'country-state-city';
import Creatable from 'react-select/creatable';

export const CreateProfile = () => {
  //   const [data, setData] = useState({});
  //   const [pending, setPending] = useState(true);
  // const [hardskillschipData, setHardskillsChipData] = useState([]);
  // const [tempSkills, setTempSkills] = useState('');
  // const [SoftskillschipData, setSoftskillsChipData] = useState([]);
  // const [personalityMindAttrchipData, setPersonalityMindAttrChipData] =
  //   useState([]);
  // const [teamchipData, setTeamChipData] = useState([]);
  // const [teamtechstackchipData, setTeamtechstackChipData] = useState([]);
  let history = useHistory();

  // const addval = () => {
  //   if (!hardskillschipData.includes(tempSkills) && tempSkills !== '')
  //     setHardskillsChipData((temp) => [...temp, tempSkills]);
  //   setTempSkills('');
  // };

  // const addnewval = () => {
  //   if (!hardskillschipData.includes(tempSkills) && tempSkills !== '')
  //     setHardskillsChipData((temp) => [...temp, tempSkills]);
  //   setTempSkills('');
  // };

  // const handleDeletehardSkills = (chipToDelete) => () => {
  //   setHardskillsChipData((chips) =>
  //     chips.filter((chip) => chip !== chipToDelete)
  //   );
  // };

  // const addvalsoft = () => {
  //   if (!SoftskillschipData.includes(tempSkills) && tempSkills !== '')
  //     setSoftskillsChipData((temp) => [...temp, tempSkills]);
  //   setTempSkills('');
  // };

  // const addnewvalsoft = () => {
  //   if (!SoftskillschipData.includes(tempSkills) && tempSkills !== '')
  //     setSoftskillsChipData((temp) => [...temp, tempSkills]);
  //   setTempSkills('');
  // };

  // const handleDeleteSoftSkills = (chipToDelete) => () => {
  //   setSoftskillsChipData((chips) =>
  //     chips.filter((chip) => chip !== chipToDelete)
  //   );
  // };

  // const addvalper = () => {
  //   if (!personalityMindAttrchipData.includes(tempSkills) && tempSkills !== '')
  //     setPersonalityMindAttrChipData((temp) => [...temp, tempSkills]);
  //   setTempSkills('');
  // };

  // const addnewvalper = () => {
  //   if (!personalityMindAttrchipData.includes(tempSkills) && tempSkills !== '')
  //     setPersonalityMindAttrChipData((temp) => [...temp, tempSkills]);
  //   setTempSkills('');
  // };

  // const handleDeletepersonalityMindAttr = (chipToDelete) => () => {
  //   setPersonalityMindAttrChipData((chips) =>
  //     chips.filter((chip) => chip !== chipToDelete)
  //   );
  // };

  // const addvalteam = () => {
  //   if (!teamchipData.includes(tempSkills) && tempSkills !== '')
  //     setTeamChipData((temp) => [...temp, tempSkills]);
  //   setTempSkills('');
  // };

  // const addnewvalteam = () => {
  //   if (!teamchipData.includes(tempSkills) && tempSkills !== '')
  //     setTeamChipData((temp) => [...temp, tempSkills]);
  //   setTempSkills('');
  // };

  // const handleDeleteteam = (chipToDelete) => () => {
  //   setTeamChipData((chips) => chips.filter((chip) => chip !== chipToDelete));
  // };

  // const addvalteamtechstack = () => {
  //   if (!teamtechstackchipData.includes(tempSkills) && tempSkills !== '')
  //     setTeamtechstackChipData((temp) => [...temp, tempSkills]);
  //   setTempSkills('');
  // };

  // const addnewvalteamtechstack = () => {
  //   if (!teamtechstackchipData.includes(tempSkills) && tempSkills !== '')
  //     setTeamtechstackChipData((temp) => [...temp, tempSkills]);
  //   setTempSkills('');
  // };

  // const handleDeleteteamtechstack = (chipToDelete) => () => {
  //   setTeamtechstackChipData((chips) =>
  //     chips.filter((chip) => chip !== chipToDelete)
  //   );
  // };

  const fetchuser = async () => {
    const res = await axios.get('me');
    console.log('user fetch', res);
    setFormData({
      ...formData,
      empId: res?.data?.user?.userId
    });
  };

  useEffect(() => {
    fetchuser();
  }, []);

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
    team: [],
    teamTechStack: [],
    currentProject: '', //,
    hardSkills: [],
    softSkills: [],
    personalityMindAttr: []
  });

  const preteam = [
    { label: 'IMATMI', value: 1 },
    { label: 'PICT', value: 2 }
  ];

  const preteamTechStack = [
    { label: 'MERN Stack', value: 1 },
    { label: 'WEB-DEVELOPMENT', value: 2 }
  ];
  //TODO - add to database, and fetch from database.
  const prehardskills = [
    { label: 'Java', value: 1 },
    { label: 'Machine Learning', value: 2 },
    { label: 'Database', value: 3 },
    { label: 'Artificial Intelligence', value: 4 },
    { label: 'C++', value: 5 },
    { label: 'C', value: 6 },
    { label: 'C#', value: 7 },
    { label: 'SQL', value: 8 },
    { label: 'Python', value: 9 },
    { label: 'Computer Vision', value: 10 }
  ];

  const presoftskills = [
    { label: 'Listening', value: 1 },
    { label: 'Time Management', value: 2 },
    { label: 'Empathy', value: 3 },
    { label: 'Leader', value: 4 },
    { label: 'Taking Responsibility', value: 5 },
    { label: 'Patience', value: 6 },
    { label: 'Multitasking', value: 7 }
  ];

  const prepersonalityMindAttr = [
    { label: 'Aspiring', value: 1 },
    { label: 'Conscientiousness', value: 2 },
    { label: 'Confident', value: 3 },
    { label: 'Encouraging', value: 4 },
    { label: 'Immaginative', value: 5 },
    { label: 'Extrovert', value: 6 },
    { label: 'Creative', value: 7 }
  ];

  const gendervalue = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
    { label: 'Prefer not to say', value: 'Prefer not to say' }
  ];

  const nationalityvalue = [
    { label: 'Indian', value: 'Indian' },
    { label: 'Australian', value: 'Australian' },
    { label: 'Chinese', value: 'Chinese' },
    { label: 'American', value: 'American' }
  ];

  const cityvalue = [
    { label: 'Pune', value: 'Pune' },
    { label: 'New York', value: 'New York' },
    { label: 'Nagpur', value: 'Nagpur' },
    { label: 'London', value: 'London' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('date_changed', formData);
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
      team: formData.team, //formData.team,
      teamTechStack: formData.teamTechStack, //formData.teamTechStack,
      currentProject: formData.currentProject,
      hardSkills: formData.hardSkills, //formData.hardSkills,
      softSkills: formData.softSkills, //formData.softSkills,
      personalityMindAttr: formData.personalityMindAttr //formData.personalityMindAttr
    });
    console.log('response', res.data);
    //window.location.reload();
    history.push('/dashboard');
  };

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
              //onChange={(e) => handleChange(e)}
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
              //value={formData?.teamId}
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
              //value={
              //formData?.fullName
              // data?.personalInformation?.fullName
              //   ? data?.personalInformation?.fullName
              //   : 'empty'
              //}
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
              //value={formData?.dob?.toString().split('T')[0]}
              onChange={(e) => handleChange(e)}
              //required
            />
          </div>
          <div className='form-group'>
            <label>Birth Place</label>
            <br />
            <Dropdown
              value={formData?.birthPlace}
              options={cityvalue} //{City.getCitiesOfCountry('IN')}
              onChange={(e) => handleChange(e)}
              optionLabel='label'
              name='birthPlace'
              filter
              showClear
              filterBy='label'
              placeholder='Select a City'
              //valueTemplate={selectedCountryTemplate}
              //itemTemplate={countryOptionTemplate}
            />
            {/* <input
              type='text'
              placeholder='Birth Place'
              name='birthPlace'
              //value={formData?.birthPlace}
              onChange={(e) => handleChange(e)}
              //required
            /> */}
          </div>
          <div className='form-group'>
            <label>Gender</label>
            <br />
            <Dropdown
              value={formData?.gender}
              options={gendervalue}
              name='gender'
              onChange={(e) => handleChange(e)}
              placeholder='Select gender'
            />
            {/* <input
              type='text'
              placeholder='Gender'
              name='gender'
              //value={formData?.gender}
              onChange={(e) => handleChange(e)}
              //required
            /> */}
          </div>
          <div className='form-group'>
            <label>Nationality</label>
            <br />
            {/* <input
              type='text'
              placeholder='Nationality'
              name='nationality'
              //value={formData?.nationality}
              onChange={(e) => handleChange(e)}
              //required
            /> */}
            <Dropdown
              value={formData?.nationality}
              options={nationalityvalue} //{Country.getAllCountries()}
              onChange={(e) => handleChange(e)}
              name='nationality'
              optionLabel='label'
              filter
              showClear
              filterBy='label'
              placeholder='Select a Nationality'
              //valueTemplate={selectedCountryTemplate}
              //itemTemplate={countryOptionTemplate}
            />
          </div>
          <div className='form-group'>
            <label>Contact Number</label>
            <input
              type='text'
              placeholder='Contact Number'
              name='contactNumber'
              //value={formData?.contactNumber}
              onChange={(e) => handleChange(e)}
              //required
            />
          </div>
          <div className='form-group'>
            <label>About Me</label>
            <textarea
              type='text'
              placeholder='About Me'
              name='aboutMe'
              //value={formData?.aboutMe}
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
              //value={formData?.dateOfEmployment?.toString().split('T')[0]}
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
              //value={formData?.currentRole}
              onChange={(e) => handleChange(e)}
              readOnly
              //required
            />
          </div>
          <div className='form-group'>
            <label>Department</label>
            <input
              type='text'
              placeholder='Department'
              name='department'
              //value={formData?.department}
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
              //value={formData?.manager}
              onChange={(e) => handleChange(e)}
              //required
              readOnly
            />
          </div>
          <div className='form-group'>
            <label>Manager Name</label>
            <input
              type='text'
              placeholder='Manager Name'
              name='managerName'
              //value={formData?.managerName}
              onChange={(e) => handleChange(e)}
              //required
              readOnly
            />
          </div>
          <div className='form-group'>
            <label>Work Experience</label>
            <input
              type='text'
              placeholder='Work Experience'
              name='workEx'
              //value={formData?.workEx}
              onChange={(e) => handleChange(e)}
              //required
            />
          </div>

          <div className='form-group'>
            <label>Team</label>
            <br />
            <Creatable
              isMulti
              onChange={(value) =>
                setFormData({
                  ...formData,
                  team: value
                })
              }
              options={preteam}
              value={formData?.team}
            />
            {/* <Select
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
            </ul> */}
          </div>

          <div className='form-group'>
            <label>Team Tech Scack</label>
            <br />
            <Creatable
              isMulti
              onChange={(value) =>
                setFormData({
                  ...formData,
                  teamTechStack: value
                })
              }
              options={preteamTechStack}
              value={formData?.teamTechStack}
            />
            {/* <Select
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
            </ul> */}
          </div>

          <div className='form-group'>
            <label>Is Manager</label>
            <input
              type='text'
              placeholder='Is Manager'
              name='isManager'
              //value={formData?.isManager}
              onChange={(e) => handleChange(e)}
              //required
              readOnly
            />
          </div>
          <div className='form-group'>
            <label>Current Project</label>
            <input
              type='text'
              placeholder='Current Project'
              name='currentProject'
              //value={formData?.currentProject}
              onChange={(e) => handleChange(e)}
              //required
              readOnly
            />
          </div>
          <div className='form-group'>
            <label>Hard Skills</label>
            <br />
            <Creatable
              isMulti
              onChange={(value) =>
                setFormData({
                  ...formData,
                  hardSkills: value
                })
              }
              options={prehardskills}
              value={formData?.hardSkills}
            />
            {/* <Select
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
            </ul> */}
          </div>

          <div className='form-group'>
            <label>Soft Skills</label>
            <br />
            <Creatable
              isMulti
              onChange={(value) =>
                setFormData({
                  ...formData,
                  softSkills: value
                })
              }
              options={presoftskills}
              value={formData?.softSkills}
            />
            {/* <Select
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
            </ul> */}
          </div>

          <div className='form-group'>
            <label>Personality & Mind Attributes</label>
            <br />
            <Creatable
              isMulti
              onChange={(value) =>
                setFormData({
                  ...formData,
                  personalityMindAttr: value
                })
              }
              options={prepersonalityMindAttr}
              value={formData?.personalityMindAttr}
            />
            {/* <Select
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
            </ul> */}
          </div>
          <input type='submit' className='btn btn-primary' value='Create' />
        </form>
      </section>
    </Fragment>
  );
};
