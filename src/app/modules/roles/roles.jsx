import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { TabView, TabPanel } from 'primereact/tabview';
import { Panel } from 'primereact/panel';
import { Divider } from 'primereact/divider';
import { InputSwitch } from 'primereact/inputswitch';
import './roles.css';

function Roles() {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [newRole, setNewRole] = useState('');
  const [editRole, setEditRole] = useState('Admin');
  const [newMember, setNewMember] = useState('');
  const [saveEditRoleButtonDisabled, setSaveEditRoleButtonDisabled] =
    useState(true); // Button disabled initially
  const [roleTable, setRoleTable] = useState([
    {
      role: 'Admin',
      memberCount: 3
    },
    {
      role: 'Manager',
      memberCount: 7
    },
    {
      role: 'Employee',
      memberCount: 35
    }
  ]);

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

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <button
          onClick={showDialog}
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
        <button
          className='p-inputgroup-addon'
          onClick={() => {
            let currRoleTable = roleTable;
            currRoleTable.push({
              role: newRole,
              memberCount: 0
            });
            setRoleTable(currRoleTable);
            setNewRole('');
          }}
        >
          Add
        </button>
      </div>
    </div>
  );

  const memberList = [
    'Chirag Patil',
    'Vimal Galani',
    'Aniket Rathod',
    'Piyush Bansal',
    'Shweth Shetty'
  ];

  return (
    <>
      <div
        className='card'
        style={{ maxWidth: '40rem', margin: '2rem auto auto auto' }}
      >
        <DataTable
          header={header}
          value={roleTable}
          stripedRows
          responsiveLayout='scroll'
        >
          <Column
            field='role'
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
            />

            <Button
              label='Delete Role'
              className='p-button-rounded roles-danger-button'
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
              {memberList.map((memberName, memIndex) => (
                <div>
                  <div>
                    <span>{memberName}</span>
                    <span>
                      <Button
                        style={{ float: 'right' }}
                        icon='pi pi-times'
                        className='p-button-rounded roles-danger-button p-button-text'
                        id='cancel'
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
