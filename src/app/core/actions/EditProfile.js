import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react';

export const EditProfile = (props) => {
  const [data, setData] = useState({});

  const [formData, setFormData] = useState({
    empId: '',
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
    currentProject: '',
    hardSkills: [],
    softSkills: [],
    personalityMindAttr: []
  });

  const onChange = (e) => {
    const arr = [
      'team',
      'teamTechStack',
      'hardSkills',
      'softSkills',
      'personalityMindAttr'
    ];
    setFormData({
      ...formData,
      [e.target.name]: arr.includes(e.target.name)
        ? e.target.value?.split(',').map((d) => d.trim())
        : e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('date_changed', formData.dob);
    const res = await axios.post('post', {
      empId: formData.empId,
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
      team: formData.team,
      teamTechStack: formData.teamTechStack,
      currentProject: formData.currentProject,
      hardSkills: formData.hardSkills,
      softSkills: formData.softSkills,
      personalityMindAttr: formData.personalityMindAttr
    });
    console.log('response', res.data);
    window.location.reload();
  };

  const fetchdata = async () => {
    console.log('props2', props);
    const res = await axios.get(`user/${props.location.state}`);
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
      empId: data.empId,
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
      team: data?.employmentInformation?.team,
      teamTechStack: data?.employmentInformation?.teamTechStack,
      currentProject: data?.employmentInformation?.currentProject,
      hardSkills: data?.employmentInformation?.hardSkills,
      softSkills: data?.employmentInformation?.softSkills,
      personalityMindAttr: data?.employmentInformation?.personalityMindAttr
    });
    //settingValues();
  }, [data]);

  return (
    <Fragment>
      <section className='container-login'>
        <h1 className='medium text-primary'>My Profile</h1>
        {/* <p className='lead'>
          <i className='fas fa-user'></i> Sign Into Your Account
        </p> */}
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <label>EmpId</label>
            <input
              type='text'
              placeholder='EmpId'
              name='empId'
              value={data?.empId ? data?.empId : 'heloo'}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          {Object.keys(
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
          ))}
          {Object.keys(
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
                onChange={(e) => onChange(e)}
              />
            </div>
          ))}
          <input type='submit' className='btn btn-primary' value='Update' />
        </form>
      </section>
    </Fragment>
  );
};
