import React, { useState, useEffect, Fragment } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { AutoComplete } from 'primereact/autocomplete';

import axios from 'axios';

const CreateOrganization = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const [address, setAddress] = useState('');
  const [userArray, setUserArray] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState('');
  const [selectedAdmins, setSelectedAdmins] = useState([]);

  const type = [
    { name: 'Private', code: 'private' },
    { name: 'Goverment', code: 'goverment' },
    { name: 'Non Profit', code: 'nonProfit' }
  ];

  const onTypeChange = (e) => {
    setSelectedType(e.value);
  };

  const formElementStyle = {
    width: '22rem',
    marginBottom: '2rem'
  };

  const searchUser = (event) => {
    setTimeout(() => {
      let userEmails = [];
      userArray.forEach((item) => {
        userEmails.push(item[0]);
      });
      let _filteredUsers;
      if (!event.query.trim().length) {
        _filteredUsers = [...userEmails];
      } else {
        _filteredUsers = userEmails.filter((user) => {
          return user.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }

      setFilteredUsers(_filteredUsers);
    }, 250);
  };

  const onSubmit = async (e) => {
    let adminIdList = [];
    selectedAdmins.forEach((admin) => {
      userArray.forEach((user) => {
        user[0] === admin && adminIdList.push(user[1]);
      });
    });

    const org = {
      name: name,
      email: email,
      organizationType: selectedType.name,
      address: address,
      admins: adminIdList
    };

    const response = await axios.post('organizations', org);
    // If organization already exists, display the message from server

    // console.log(response);
  };

  useEffect(() => {
    let isMounted = true;
    axios.get('users').then((response) => {
      let tempUserArray = [];

      response.data.users.forEach((item) => {
        tempUserArray.push([item.email, item.userId]);
      });
      if (isMounted) {
        setUserArray(tempUserArray);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Fragment>
      <h1 className='medium text-primary text-center'>Create Organization</h1>

      <div style={{ width: '25rem', margin: 'auto', padding: '1rem' }}>
        <h5>Name</h5>
        <InputText
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={formElementStyle}
        />

        <h5>Email</h5>
        <InputText
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={formElementStyle}
        />

        <div className='dropdown-demo'>
          <h5>Type</h5>
          <Dropdown
            value={selectedType}
            options={type}
            onChange={onTypeChange}
            optionLabel='name'
            placeholder='Select a Type'
            style={formElementStyle}
          />
        </div>

        <h5>Address</h5>
        <InputTextarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={5}
          cols={30}
          style={formElementStyle}
        />

        <h5>Select Organization Admin</h5>
        <span className='p-fluid'>
          <AutoComplete
            multiple
            dropdown
            value={selectedAdmins}
            suggestions={filteredUsers}
            completeMethod={searchUser}
            onChange={(e) => setSelectedAdmins(e.value)}
          />
        </span>

        <button
          className='btn btn-primary-imatmi'
          style={{ marginTop: '2rem', marginLeft: '0rem', width: '22rem' }}
          onClick={() => onSubmit()}
        >
          Submit
        </button>
      </div>
    </Fragment>
  );
};

export default CreateOrganization;
