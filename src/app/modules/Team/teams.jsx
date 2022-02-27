import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { OrderList } from 'primereact/orderlist';
import Creatable from 'react-select/creatable';
// import { ProductService } from '../service/ProductService';
import '../Team/teams.css';

const Teams = () => {
  const [teamList, setTeamList] = useState([]);
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [displayMaximizable, setDisplayMaximizable] = useState(false);
  const [position, setPosition] = useState('center');
  const [teamId, setTeamId] = useState('');
  const [teamName, setTeamName] = useState('');
  const [id, setId] = useState(
    JSON.parse(sessionStorage.getItem('currentUser'))?.userId
  );
  // const [products, setProducts] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [memberData, setMemberData] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);

  useEffect(() => {
    getMyTeams();
    getAllMembers();
  }, []);

  useEffect(() => {
    console.log('new team added');
  }, [teamList]);

  useEffect(() => {
    console.log('all members fetched');
  }, [memberData]);

  const getMyTeams = async () => {
    const res = await axios.get(`teams/${id}`);
    console.log('all teams', res?.data);
    setTeamList(res?.data);
  };

  const getAllMembers = async () => {
    const res = await axios.get(`getAllUsers`);
    console.log('all members', res?.data);
    setMemberData(res?.data);
  };

  const dialogFuncMap = {
    displayMaximizable: setDisplayMaximizable,
    displayResponsive: setDisplayResponsive
  };

  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };

  const renderFooter = (name) => {
    if (name === 'displayMaximizable') {
      return (
        <div>
          <Button
            label='Apply Changes'
            onClick={() => {
              onHide(name);
              applyingMembers();
            }}
            autofocus
          />
        </div>
      );
    }
    return (
      <div>
        <Button
          label='No'
          icon='pi pi-times'
          onClick={() => onHide(name)}
          className='p-button-text'
        />
        <Button
          label='Yes'
          icon='pi pi-check'
          onClick={() => {
            onHide(name);
            handleSubmit();
          }}
          autoFocus
        />
      </div>
    );
  };

  const applyingMembers = async () => {
    let temp = filteredList[0];
    temp['teamMembers'] = filteredMembers;
    console.log('new temp', temp);
    const res = await axios.patch(`teams/${temp?.teamId}`, temp);
    console.log('jam kya?', res);
  };

  const handleSubmit = async () => {
    const newTeam = {
      teamId: teamId,
      teamName: teamName,
      teamManagerID: id
    };
    console.log('newteam', newTeam);
    const res = await axios.post('teams', newTeam);
    console.log('response after', res.data);
    getMyTeams();
    setTeamId('');
    setTeamName('');
  };

  const itemTemplate = (item) => {
    return (
      <div className='product-item'>
        <div className='image-container'>
          <img
            src={`images/product/${item?.image}`}
            onError={(e) =>
              (e.target.src =
                'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
            }
            alt={item?.name}
          />
        </div>
        <div className='product-list-detail'>
          <h5 className='mb-2'>
            {item?.teamId ? item?.teamId : item?.name ? item?.name : ''}
          </h5>
          <h6 className='mb-2'>
            {item?.teamName ? item?.teamName : item?.userId ? item?.userId : ''}
          </h6>
          {/* <i className='pi pi-tag product-category-icon'></i> */}
          {/* <span className='product-category'>{item.category}</span> */}
        </div>
        <div className='product-list-action'>
          {item?.teamId ? (
            <Button
              label='Manage Team'
              onClick={() => {
                //onClick('displayMaximizable');
                TeamMembersList(item?.teamId);
              }}
              autoFocus
            ></Button>
          ) : item?.name ? (
            <Button //this button currently only for show
              label='Remove'
              // onClick={() => {
              //   //onClick('displayMaximizable');
              //   TeamMembersList(item?.teamId);
              // }}
              autoFocus
            ></Button>
          ) : (
            ''
          )}

          {/* <h6 className='mb-2'>{item.teamName}</h6> */}
          {/* <span
            className={`product-badge status-${item.inventoryStatus.toLowerCase()}`}
          >
            {item.inventoryStatus}
          </span> */}
        </div>
      </div>
    );
  };

  useEffect(() => {
    console.log('yo', filteredList);
    //setFilteredMembers(filteredList[0]?.teamMembers);
  }, [filteredList]);

  useEffect(() => {
    console.log('yo don', filteredMembers);
  }, [filteredMembers]);

  const TeamMembersList = (id) => {
    onClick('displayMaximizable');
    let temp = teamList.filter((val) => val.teamId === id);
    setFilteredList(temp);
    // setFilteredList(teamList.filter((val) => val.teamId === id));
    console.log('hi', temp);
    setFilteredMembers(temp[0]?.teamMembers);
    // console.log('hello', filteredMembers);

    // return (
    //   <Dialog
    //     header='Team members'
    //     visible={displayMaximizable}
    //     maximizable
    //     modal
    //     style={{ width: '50vw' }}
    //     footer={renderFooter('displayMaximizable')}
    //     onHide={() => onHide('displayMaximizable')}
    //   >
    //     <p className='m-0'>
    //       <br />
    //     </p>
    //     <ul>
    //       {filteredList[0]?.teamMembers?.forEach((data) => {
    //         <>
    //           <li>{data?.Name}</li>
    //           <li>{data?.salary}</li>
    //         </>;
    //       })}
    //     </ul>
    //   </Dialog>
    // );
  };

  return (
    <div className='ml-5 mt-5 mr-5'>
      <Button
        label='Create New Team'
        icon='pi pi-external-link'
        onClick={() => onClick('displayResponsive')}
      />
      <Dialog
        header='Create New Team'
        visible={displayResponsive}
        onHide={() => onHide('displayResponsive')}
        breakpoints={{ '960px': '75vw' }}
        style={{ width: '50vw' }}
        footer={renderFooter('displayResponsive')}
      >
        <form onSubmit={handleSubmit}>
          <p className='p-m-0'>
            <br />
          </p>
          <span className='p-float-label'>
            <InputText
              id='teamId'
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
            />
            <label htmlFor='teamId'>Team Id</label>
          </span>
          <p className='p-m-0'>
            <br />
          </p>
          <span className='p-float-label'>
            <InputText
              id='teamName'
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            <label htmlFor='teamName'>Team Name</label>
          </span>
        </form>
      </Dialog>
      <br />
      <br />

      <div className='orderlist-demo'>
        <div className='card'>
          <OrderList
            value={teamList}
            header='My Teams'
            dragdrop
            listStyle={{ height: 'auto' }}
            dataKey='teamId'
            itemTemplate={itemTemplate}
            onChange={(e) => setTeamList(e.value)}
          ></OrderList>
        </div>
      </div>

      <Dialog
        header='Team members'
        visible={displayMaximizable}
        maximizable
        modal
        style={{ width: '50vw' }}
        footer={renderFooter('displayMaximizable')}
        onHide={() => onHide('displayMaximizable')}
      >
        <p className='m-0'>
          <br />
        </p>
        <Creatable
          isMulti
          onChange={(value) => setFilteredMembers(value)}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.name}
          options={memberData}
          value={filteredMembers}
        />
        <br />
        <br />
        <div className='orderlist-demo'>
          <div className='card'>
            <OrderList
              value={filteredMembers}
              header='Team Members'
              dragdrop
              listStyle={{ height: 'auto' }}
              dataKey='userId' //userId should be here
              itemTemplate={itemTemplate}
              //onChange={(e) => setTeamList(e.value)}
            ></OrderList>
          </div>
        </div>
        {/* {filteredList[0]?.teamMembers?.map((data) => (
          <ul>
            <li>{data?.Name}</li>
            <li>{data?.salary}</li>
          </ul>
        ))} */}
      </Dialog>

      {/* <h4>My Teams</h4> */}

      {/* {teamList?.map((data) => (
        <ul>
          <li>{data?.teamId}</li>
          <li>{data?.teamName}</li>
        </ul>
      ))} */}
    </div>
  );
};

export default Teams;
