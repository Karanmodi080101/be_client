import React, { useState, useEffect } from 'react';
import { Steps } from 'primereact/steps';
import { Card } from 'primereact/card';
import { AutoComplete } from 'primereact/autocomplete';
import './JoinOrganization.css';

import axios from 'axios';

function JoinOrganization() {
  const items = [{ label: 'Select Organization' }, { label: 'Select Role' }];
  const [organizationArray, setOrganizationArray] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [filteredOrganizations, setFilteredOrganizations] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [roleArray, setRoleArray] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [filteredRoles, setFilteredRoles] = useState('');
  const [requestSent, setRequestSent] = useState(false);

  const searchOrganization = (event) => {
    setTimeout(() => {
      let organizationList = [];
      organizationArray.forEach((item) => {
        organizationList.push(item[0]);
      });
      let _filteredOrganizations;
      if (!event.query.trim().length) {
        _filteredOrganizations = [...organizationList];
      } else {
        _filteredOrganizations = organizationList.filter((org) => {
          return org.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }

      setFilteredOrganizations(_filteredOrganizations);
    }, 250);
  };

  useEffect(() => {
    axios.get('organizations').then((response) => {
      let tempOrganizationArray = [];
      console.log(response);
      response.data.organizations.forEach((item) => {
        tempOrganizationArray.push([item.name, item._id]);
      });
      setOrganizationArray(tempOrganizationArray);
    });
  }, []);

  const searchRole = (event) => {
    setTimeout(() => {
      let roleList = [];
      roleArray.forEach((roleItem) => {
        roleList.push(roleItem[0]);
      });
      let _filteredRoles;
      if (!event.query.trim().length) {
        _filteredRoles = [...roleList];
      } else {
        _filteredRoles = roleList.filter((roleItem) => {
          return roleItem.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }

      setFilteredRoles(_filteredRoles);
    }, 250);
  };

  const nextClicked = () => {
    setActiveIndex(1);
    let requiredOrganizationId;
    organizationArray.forEach((org) => {
      if (org[0] === selectedOrganization) {
        requiredOrganizationId = org[1];
      }
    });

    axios
      .get('roles', {
        params: {
          organizationId: requiredOrganizationId
        }
      })
      .then((response) => {
        let tempRoleArray = [];
        response.data.roles.forEach((role) => {
          tempRoleArray.push([role.roleName, role._id]);
        });
        console.log(response);
        setRoleArray(tempRoleArray);
      });
  };

  const onSubmit = async (e) => {
    let requiredOrganizationId;
    organizationArray.forEach((org) => {
      if (org[0] === selectedOrganization) {
        requiredOrganizationId = org[1];
      }
    });

    let requiredRoleId;
    roleArray.forEach((role) => {
      if (role[0] === selectedRole) {
        requiredRoleId = role[1];
      }
    });

    const request = {
      organizationId: requiredOrganizationId,
      roleId: requiredRoleId,
      userId: JSON.parse(sessionStorage.getItem('currentUser'))?.userId
    };

    const response = await axios.post('request', request);

    console.log(response);

    setRequestSent(true);
  };

  return (
    <>
      <div style={{ marginTop: '5rem' }}>
        {requestSent ? (
          <h2 style={{ textAlign: 'center' }}>
            Your request has been sent successfully
          </h2>
        ) : (
          <>
            <Card style={{ width: '35rem', margin: 'auto' }}>
              <div>
                <Steps
                  model={items}
                  activeIndex={activeIndex}
                  readOnly={false}
                />
              </div>
              {activeIndex === 0 && (
                <>
                  <div style={{ marginTop: '3rem', marginLeft: '10rem' }}>
                    <AutoComplete
                      dropdown
                      value={selectedOrganization}
                      suggestions={filteredOrganizations}
                      completeMethod={searchOrganization}
                      onChange={(e) => setSelectedOrganization(e.value)}
                    />
                  </div>
                  <div style={{ marginTop: '3.5rem', marginLeft: '14rem' }}>
                    <button
                      className='btn btn-primary-imatmi'
                      onClick={nextClicked}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
              {activeIndex === 1 && (
                <>
                  <div style={{ marginTop: '3rem', marginLeft: '10rem' }}>
                    <AutoComplete
                      dropdown
                      value={selectedRole}
                      suggestions={filteredRoles}
                      completeMethod={searchRole}
                      onChange={(e) => setSelectedRole(e.value)}
                    />
                  </div>
                  <div style={{ marginTop: '3.5rem', marginLeft: '14rem' }}>
                    <button
                      className='btn btn-primary-imatmi'
                      onClick={onSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </>
              )}
            </Card>
          </>
        )}
      </div>
    </>
  );
}

export default JoinOrganization;
