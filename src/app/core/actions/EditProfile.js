import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react';
import ProfileComponent from '../../modules/profile/profileComponent';

export const EditProfile = (props) => {
  const [pending, setPending] = useState(true);

  const [initialformData, setinitialFormData] = useState({
    empId: '',
    teamId: '',
    fullName: '',
    dob: '',
    birthCountry: '',
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

  const onSubmit = async (e, formData) => {
    e.preventDefault();
    console.log('date_changed', formData);
    const res = await axios.post('post', {
      empId: formData.empId,
      teamId: formData.teamId,
      fullName: formData.fullName,
      dob: formData.dob,
      birthCountry: formData.birthCountry,
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
    window.location.reload();
  };

  const fetchdata = async () => {
    const res = await axios.get(`user/${props.location.state}`);
    console.log('resme', res.data);
    const data = res.data;
    console.log('data', data);
    setinitialFormData({
      empId: data?.empId,
      teamId: data?.teamId,
      fullName: data?.personalInformation?.fullName,
      dob: data?.personalInformation?.dob,
      birthCountry: data?.personalInformation?.birthCountry,
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
      currentProject: data?.employmentInformation?.currentProject, //,
      hardSkills: data?.employmentInformation?.hardSkills,
      softSkills: data?.employmentInformation?.softSkills,
      personalityMindAttr: data?.employmentInformation?.personalityMindAttr
    });
    setPending(false);
    //setData(res.data);
    // const response = await axios.get('static');
    // console.log('response', response.data);
    // setdropdownData(response.data[0]);
    // setTemp(false);
  };

  useEffect(() => {
    fetchdata();
    console.log('hello');
  }, []);

  useEffect(() => {
    // console.log('initialformData', initialformData);
    // console.log('profileData', profileData);
  }, [pending]);

  return (
    <Fragment>
      <h1 className='medium text-primary text-center'>My Profile</h1>
      {!pending ? (
        <ProfileComponent
          formData={initialformData}
          onSubmit={onSubmit}
          buttonName={'Update'}
        />
      ) : null}
    </Fragment>
  );
};
