import React, { useState, useEffect, Fragment } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';

const CreateOrganization = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const [address, setAddress] = useState('');

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
      </div>
    </Fragment>
  );
};

export default CreateOrganization;
