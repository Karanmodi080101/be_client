import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import ProfileComponent from '../../modules/profile/profileComponent';

export const CreateProfile = () => {
  const [pending, setPending] = useState(true);
  let history = useHistory();

  const fetchuser = async () => {
    const res = await axios.get('me');
    console.log('user fetch', res);
    setinitialFormData({
      ...initialformData,
      empId: res?.data?.user?.userId
    });
    setPending(false);
    // const response = await axios.get('static');
    // console.log('response', response.data);
    // setdropdownData(response.data[0]);
  };

  useEffect(() => {
    fetchuser();
  }, []);

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
    currentProject: '',
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
    //window.location.reload();
    history.push('/dashboard');
  };

  return (
    <Fragment>
      <h1 className='medium text-primary text-center'>Create Profile</h1>
      {!pending ? (
        <ProfileComponent
          formData={initialformData}
          onSubmit={onSubmit}
          buttonName={'Create'}
        />
      ) : null}
    </Fragment>
  );
};
