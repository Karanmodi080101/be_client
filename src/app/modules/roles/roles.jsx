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
import { AutoComplete } from 'primereact/autocomplete';
import axios from 'axios';
import _ from 'lodash';
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
  const [allPermissionsInOrg, setAllPermissionsInOrg] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState();
  const [allMembersInOrg, setAllMembersInOrg] = useState([]);
  const [rowPermissions, setRowPermissions] = useState([]);

  useEffect(() => {
    fetchAllPermissions();
  }, []);

  useEffect(() => {
    if (loadRoles) {
      getAllRoles();
      setLoadRoles(false);
    }
  }, [loadRoles]);

  useEffect(() => {
    console.log('member list updated', memberList);
    fetchAllMembersInOrg();
  }, [memberList]);

  useEffect(() => {
    // fetchAllPermissions();
    getAllRoles();
    console.log('rowPermissions', rowPermissions);
    console.log('selectedRow', selectedRow);
  }, [rowPermissions, selectedRow]);

  // useEffect(() => {
  //   console.log('selectedRow', selectedRow);
  // }, [selectedRow]);

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
          memberCount: 0,
          permissionIds: []
        })
        .then((response) => {
          setNewRole('');
          setLoadRoles(true);
        });
    }
  };

  const showDialog = () => {
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
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

  // Syntax for "allPermissionsInOrg" array 👇
  // [
  //   {
  //     heading: '',
  //     permissions: [
  //       { permissionId:'', permissionName: '', permissionDescription: '', allowed: true }
  //     ]
  //   }
  // ];

  const fetchAllPermissions = () => {
    axios.get('permissions').then((response) => {
      let receivedPermissionList = response?.data?.permissions;
      console.log('permissions', receivedPermissionList);

      let tempPermissionArray = [];

      receivedPermissionList.forEach((permissionObj) => {
        let [resource, operation] = _.split(permissionObj.permissionName, '_');
        let requiredHeading = _.startCase(resource);
        let requiredOperation = _.startCase(operation);
        let permissionPushed = false;
        tempPermissionArray.forEach((perObj) => {
          if (requiredHeading === perObj?.heading) {
            perObj?.permissions?.push({
              permissionId: permissionObj._id,
              permissionName: `${requiredHeading} - ${requiredOperation}`,
              permissionDescription: permissionObj?.description,
              allowed: false
            });
            permissionPushed = true;
          }
        });
        if (permissionPushed === false) {
          tempPermissionArray.push({
            heading: requiredHeading,
            permissions: [
              {
                permissionId: permissionObj._id,
                permissionName: `${requiredHeading} - ${requiredOperation}`,
                permissionDescription: permissionObj?.description,
                allowed: false
              }
            ]
          });
        }
      });
      console.log('complete permission array', tempPermissionArray);
      setAllPermissionsInOrg(tempPermissionArray);
    });
  };

  const handlePermissionToggle = (permissionObjInput) => (e) => {
    console.log('permissionObjInput', permissionObjInput);
    // let allowedValue = permissionObjInput?.allowed;
    let allowedValue = rowPermissions.includes(
      permissionObjInput?.permissionId
    );
    // console.log('allowedValue', allowedValue);
    let finalPermissionArray = [];
    if (allowedValue === true) {
      selectedRow?.permissionIds.forEach((perId) => {
        if (perId !== permissionObjInput?.permissionId) {
          finalPermissionArray.push(perId);
        }
      });
    } else {
      finalPermissionArray = selectedRow?.permissionIds;
      finalPermissionArray?.push(permissionObjInput?.permissionId);
    }
    console.log('finalPermissionArray', finalPermissionArray);
    console.log('Aniket', selectedRow);
    axios
      .patch(`role/${selectedRow._id}`, {
        permissionIds: finalPermissionArray
      })
      .then((response) => {
        console.log('toggleResponse', response?.data?.role?.permissionIds);
        setSelectedRow({
          ...selectedRow,
          permissionIds: response?.data?.role?.permissionIds
        });
        // setRowPermissions(finalPermissionArray);
        setRowPermissions(response?.data?.role?.permissionIds);
        // setLoadRoles(true);
      });
  };

  const displayRoleSpecificPermissions = (rowData) => {
    // console.log(allPermissionsInOrg, rowData.permissionIds);
    let tempAllPermissionsInOrg = allPermissionsInOrg;

    tempAllPermissionsInOrg?.forEach((permissionGroup) => {
      permissionGroup?.permissions.forEach((perm) => {
        console.log(perm);
        rowData?.permissionIds?.forEach((permId) => {
          if (permId === perm.permissionId) {
            perm.allowed = true;
          }
        });
      });
    });

    console.log('halo', tempAllPermissionsInOrg);
    setAllPermissionsInOrg(tempAllPermissionsInOrg);
  };

  const fetchMemberList = (rowData) => {
    console.log('rowdata', rowData);
    axios.get(`usersWithRole/${rowData._id}`).then((response) => {
      console.log('memberList', response.data.requiredUsers);
      setMemberList(response.data.requiredUsers);
    });
  };

  const fetchAllMembersInOrg = () => {
    let currOrganizationId = getOrgId();
    axios
      .get(`usersWithOrganization/${currOrganizationId}`)
      .then((response) => {
        console.log('membersInOrg', response.data.requiredUsers);
        setAllMembersInOrg(response.data.requiredUsers);
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
            displayRoleSpecificPermissions(rowData);
            setRowPermissions(rowData?.permissionIds);
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

  const searchMember = (event) => {
    setTimeout(() => {
      let myMemberList = [];
      allMembersInOrg.forEach((item) => {
        myMemberList.push(item.email);
      });
      let _filteredMembers;
      if (!event.query.trim().length) {
        _filteredMembers = [...myMemberList];
      } else {
        _filteredMembers = myMemberList.filter((memberEmail) => {
          return memberEmail
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredMembers(_filteredMembers);
    }, 250);
  };

  const addMemberClicked = () => {
    console.log(newMember);
    let newMemberObj;
    allMembersInOrg.forEach((orgMember) => {
      if (orgMember.email === newMember) {
        newMemberObj = orgMember;
      }
    });
    // 1. decrement member count of the person's previous role
    let previousRoleId = newMemberObj?.organization?.roleId;
    let newRoleId = selectedRow?._id;
    let previousRoleMemberCount;
    let newRoleMemberCount;
    roleObjectList.forEach((roleObj) => {
      if (roleObj?._id === previousRoleId) {
        previousRoleMemberCount = roleObj?.memberCount;
      } else if (roleObj?._id === newRoleId) {
        newRoleMemberCount = roleObj?.memberCount;
      }
    });
    previousRoleMemberCount--;
    axios
      .patch(`role/${previousRoleId}`, {
        memberCount: previousRoleMemberCount
      })
      .then((response) => {
        console.log('previous row member count reduced');

        // 2. Update the new role of user
        const myOrganization = {
          organizationId: newMemberObj?.organization?.organizationId,
          roleId: selectedRow?._id
        };
        let newUserObj;
        axios
          .patch(`users/${newMemberObj.userId}`, {
            organization: myOrganization
          })
          .then((response) => {
            newUserObj = response.data.user;
            console.log('new person --> ', response.data.user);
            console.log('addded new person', response);

            // 3. Increment member count of the person's new role
            newRoleMemberCount++;
            axios
              .patch(`role/${newRoleId}`, {
                memberCount: newRoleMemberCount
              })
              .then((response) => {
                console.log('memberCount of new row incremented');
                setLoadRoles(true);
                setMemberList([...memberList, newUserObj]);
                console.log(memberList);
                setNewMember('');
              });
          });
      });
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
            {allPermissionsInOrg.map((item, index) => {
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
                      return (
                        <div>
                          {' '}
                          <div className='flex'>
                            <div
                              style={{ color: 'black', marginBottom: '0.6rem' }}
                            >
                              <span>
                                {permissionItem.permissionName}{' '}
                                {rowPermissions.includes(
                                  permissionItem?.permissionId
                                )
                                  ? 1
                                  : 0}
                              </span>
                              <span>
                                <InputSwitch
                                  style={{ float: 'right' }}
                                  checked={rowPermissions.includes(
                                    //to check presence
                                    permissionItem?.permissionId
                                  )}
                                  onChange={handlePermissionToggle(
                                    permissionItem
                                  )}
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

              <AutoComplete
                dropdown
                value={newMember}
                suggestions={filteredMembers}
                completeMethod={searchMember}
                onChange={(e) => setNewMember(e.value)}
              />

              <Button
                label='Add Member'
                id='addMemberButton'
                onClick={addMemberClicked}
              />
            </span>
            <div style={{ marginTop: '2rem' }}>
              {memberList?.map((member, memIndex) => (
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
