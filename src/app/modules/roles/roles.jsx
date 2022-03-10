import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { TabView, TabPanel } from 'primereact/tabview';
import { Panel } from 'primereact/panel';
import { Divider } from 'primereact/divider';
import { InputSwitch } from 'primereact/inputswitch';
import axios from 'axios';
import './roles.css';

function Roles() {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [newRole, setNewRole] = useState('');
  const [editRole, setEditRole] = useState('Admin');
  const [newMember, setNewMember] = useState('');
  const [saveEditRoleButtonDisabled, setSaveEditRoleButtonDisabled] =
    useState(true); // Button disabled initially
  const [loadRoles, setLoadRoles] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [roleObjectList, setRoleObjectList] = useState([]);
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    if (loadRoles) {
      getAllRoles();
      setLoadRoles(false);
    }
  }, [loadRoles]);

  useEffect(() => {
    console.log('member list updated', memberList);
  }, [memberList]);

  const getAllRoles = () => {
    const organizationIdTemp = JSON.parse(sessionStorage.getItem('currentUser'))
      ?.organization?.organizationId;
    axios.get(`roles?organizationId=${organizationIdTemp}`).then((response) => {
      // console.log('roles', response.data.roles);
      setRoleObjectList(response.data.roles);
    });
  };

  const addNewRole = () => {
    if (newRole !== '') {
      axios
        .post('role', {
          roleName: newRole,
          organizationId: getOrgId(),
          memberCount: 0
        })
        .then((response) => {
          setNewRole('');
          setLoadRoles(true);
        });
    }
  };

  const permissionArray = [
    {
      heading: 'Skill Modules',
      permissions: [
        {
          permissionName: 'Create Skill',
          permissionDescription:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, dignissimos!',
          allowed: false
        },
        {
          permissionName: 'View all Skills',
          permissionDescription:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ratione provident, distinctio vero placeat qui veritatis amet minus consequuntur labore',
          allowed: true
        },
        {
          permissionName: 'Delete Skill',
          permissionDescription:
            'Lorem ipsum dolor, sit amet kirns consectetur cjdosnv cumque magni quis non modi. Deserunt',
          allowed: false
        }
      ]
    },
    {
      heading: 'Development Goals',
      permissions: [
        {
          permissionName: 'Dev Goals Create',
          permissionDescription:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, dignissimos!',
          allowed: true
        },
        {
          permissionName: 'Dev Goals Update',
          permissionDescription:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit',
          allowed: true
        },
        {
          permissionName: 'Delete Dev Goal',
          permissionDescription:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, dignissimos!',
          allowed: false
        }
      ]
    }
  ];

  const showDialog = () => {
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
  };

  const fetchMemberList = (rowData) => {
    console.log('rowdata', rowData);
    axios.get(`usersWithRole/${rowData._id}`).then((response) => {
      console.log('memberList', response.data.requiredUsers);
      setMemberList(response.data.requiredUsers);
    });
  };

  const removeFromOrganization = (param) => (e) => {
    // param is the argument you passed to the function
    // e is the event object that returned

    console.log(param.organizationId);

    axios.patch(`removeFromOrganization/${param.userId}`).then((response) => {
      console.log('user removed', response);
      let temp = [];
      // temp.filter((val) => val?.userId != response?.data?.user?.userId);
      memberList.forEach((obj) => {
        if (obj.userId !== param?.userId) {
          temp.push(obj);
        }
      });
      console.log('temp', temp);
      setMemberList(temp);
      setLoadRoles(true);
    });
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <button
          onClick={() => {
            showDialog();
            console.log('rowdata', rowData);
            setSelectedRow(rowData);
            setEditRole(rowData?.roleName);
            fetchMemberList(rowData);
          }}
          style={{ backgroundColor: 'white', border: 'none' }}
        >
          <img
            style={{ width: '25px' }}
            src='https://img.icons8.com/external-dreamstale-lineal-dreamstale/64/000000/external-right-arrow-arrows-dreamstale-lineal-dreamstale-5.png'
          />
        </button>
      </React.Fragment>
    );
  };

  const header = (
    <div className='table-header'>
      <div className='p-inputgroup'>
        <span className='p-inputgroup-addon'>
          <i className='pi pi-user'></i>
        </span>
        <InputText
          onChange={(e) => setNewRole(e.target.value)}
          placeholder='Add new Role'
          value={newRole}
        />
        <button className='p-inputgroup-addon' onClick={addNewRole}>
          Add
        </button>
      </div>
    </div>
  );

  const onRowSelect = (event) => {
    alert(`Name: ${event.data.name}`);
  };

  const getOrgId = () => {
    return JSON.parse(sessionStorage.getItem('currentUser'))?.organization
      .organizationId;
  };
  const getRoleId = () => {
    return JSON.parse(sessionStorage.getItem('currentUser'))?.organization
      .roleId;
  };
  return (
    <>
      <p>Organization id: {getOrgId()}</p>
      <p>Role id: {getRoleId()}</p>
      <div
        className='card'
        style={{ maxWidth: '40rem', margin: '2rem auto auto auto' }}
      >
        <DataTable
          header={header}
          value={roleObjectList}
          stripedRows
          responsiveLayout='scroll'
          // selectionMode='single'
          // selection={selectedRow}
          // onSelectionChange={(e) => {
          //   // setSelectedRow(e.value);
          //   console.log(e.value);
          // }}
          dataKey='_id'
        >
          <Column
            field='roleName'
            header='Role'
            style={{ textAlign: 'center' }}
          ></Column>
          <Column
            field='memberCount'
            header='Members'
            style={{ textAlign: 'center' }}
          ></Column>
          <Column
            field='_id'
            header='View / Modify'
            body={actionBodyTemplate}
            style={{ textAlign: 'center' }}
          />
        </DataTable>
      </div>

      <Dialog
        visible={dialogVisible}
        onHide={hideDialog}
        breakpoints={{ '960px': '75vw', '640px': '100vw' }}
        style={{ width: '50vw' }}
      >
        <TabView id='roles-tabview'>
          <TabPanel header='Role'>
            <div style={{ marginBottom: '1rem', marginTop: '1rem' }}>
              <strong>Role Name</strong>
            </div>
            <div style={{ marginBottom: '2rem' }}>
              <InputText
                value={editRole}
                onChange={(e) => {
                  setEditRole(e.target.value);
                  setSaveEditRoleButtonDisabled(false);
                }}
              />
            </div>

            <Button
              label='Save Changes'
              className='p-button-rounded roles-success-button'
              style={{ marginRight: '1rem' }}
              disabled={saveEditRoleButtonDisabled}
              onClick={() => {
                axios
                  .patch(`role/${selectedRow._id}`, {
                    roleName: editRole
                  })
                  .then((response) => {
                    console.log('roleName edited', response);
                    setLoadRoles(true);
                    setDialogVisible(false);
                  });
              }}
            />

            <Button
              label='Delete Role'
              className='p-button-rounded roles-danger-button'
              onClick={() => {
                axios.delete(`role/${selectedRow._id}`).then((response) => {
                  console.log('role deleted', response);
                  setLoadRoles(true);
                  setDialogVisible(false);
                });
              }}
            />
          </TabPanel>
          <TabPanel header='Permissions'>
            {permissionArray.map((item, index) => {
              return (
                <div>
                  <Panel
                    header={item.heading}
                    toggleable
                    collapsed='true'
                    id='roles-permissions-panel'
                  >
                    {item.permissions.map(function GetPermission(
                      permissionItem,
                      permissionIndex
                    ) {
                      const [permissionAllowed, setPermissionAllowed] =
                        useState(permissionItem.allowed);
                      return (
                        <div>
                          {' '}
                          <div className='flex'>
                            <div
                              style={{ color: 'black', marginBottom: '0.6rem' }}
                            >
                              <span>{permissionItem.permissionName}</span>
                              <span>
                                <InputSwitch
                                  style={{ float: 'right' }}
                                  checked={permissionAllowed}
                                  onChange={(e) =>
                                    setPermissionAllowed(e.value)
                                  }
                                />
                              </span>
                            </div>
                            <p
                              style={{
                                fontSize: '0.85rem',
                                maxWidth: '70%',
                                textAlign: 'justify'
                              }}
                            >
                              {permissionItem.permissionDescription}
                            </p>
                          </div>
                          <Divider type='solid' id='permissionsDivider' />
                        </div>
                      );
                    })}
                  </Panel>
                </div>
              );
            })}
          </TabPanel>
          <TabPanel header='Members'>
            <span className='p-input-icon-left'>
              <i className='pi pi-search' />
              <InputText
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
                placeholder='Search Member'
              />
              <Button label='Add Member' id='addMemberButton' />
            </span>
            <div style={{ marginTop: '2rem' }}>
              {memberList.map((member, memIndex) => (
                <div>
                  <div>
                    <span>{member.name}</span>
                    <span>
                      <Button
                        style={{ float: 'right' }}
                        icon='pi pi-times'
                        className='p-button-rounded roles-danger-button p-button-text'
                        id='cancel'
                        onClick={removeFromOrganization(member)}
                      />
                    </span>
                  </div>
                  <Divider type='solid' id='permissionsDivider' />
                </div>
              ))}
            </div>
          </TabPanel>
        </TabView>
      </Dialog>
    </>
  );
}

export default Roles;
