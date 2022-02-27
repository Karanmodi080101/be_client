import react, { useState, useEffect } from 'react';
import axios from 'axios';
import { OrderList } from 'primereact/orderlist';

import './employeeInfo.css';

const EmployeeInfo = (props) => {
  const [AllUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getAllMembers();
  }, []);

  const getAllMembers = async () => {
    const res = await axios.get(`getAllUsers`);
    console.log('all members', res?.data);
    setAllUsers(res?.data);
  };

  const itemTemplate = (item) => {
    return (
      <>
        <div className='row product-item'>
          <div className='col-md-6'>
            <p>{item.name}</p>
          </div>
          <div className='col-md-6'>
            <p>{item.email}</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className='container'>
      <div className='orderlist-demo'>
        <div className='card'>
          <OrderList
            value={AllUsers}
            header='Employees'
            listStyle={{ height: '100%' }}
            dataKey='_id'
            itemTemplate={itemTemplate}
          ></OrderList>
        </div>
      </div>
    </div>
  );
};

export default EmployeeInfo;
