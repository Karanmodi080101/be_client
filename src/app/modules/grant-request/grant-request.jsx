import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Card, CardTitle } from '../action-plan/action-plan.style';

import axios from 'axios';

function GrantReq() {
  const [requestArray, setRequestArray] = useState([]);
  const [loadData, setLoadData] = useState(true);

  const getOrgId = () => {
    return JSON.parse(sessionStorage.getItem('currentUser'))?.organization
      .organizationId;
  };

  useEffect(() => {
    if (loadData) {
      getRequests();
    }
    setLoadData(false);
  }, [loadData]);

  const getRequests = async () => {
    const organizationIdTemp = JSON.parse(sessionStorage.getItem('currentUser'))
      ?.organization?.organizationId;
    const response = await axios.get(
      `requests?organizationId=${organizationIdTemp}`
    );
    console.log(response.data);
    let tempRequestArray = [];

    for (const item of response.data.requests) {
      if (item.status === 'pending') {
        let itemRoleName = await axios.get(`roles/${item.roleId}`);
        let itemUser = await axios.get(`users/${item.userId}`);

        tempRequestArray.push([
          item?.roleId,
          itemRoleName?.data?.role?.roleName,
          item.userId,
          itemUser.data.user.name,
          item._id
        ]);
      }
    }

    setRequestArray(tempRequestArray);
  };

  let acceptRequest = (myRequest) => (e) => {
    axios
      .post('grantAccess', {
        requestid: myRequest[4],
        status: 'accepted'
      })
      .then((response) => {
        console.log('grantAccess', response);
        setLoadData(true);
      });
  };

  let rejectRequest = (requestId) => (e) => {
    axios
      .patch(`requests/${requestId}`, {
        status: 'rejected'
      })
      .then((response) => {
        console.log(response);
        setLoadData(true);
      });
  };

  return (
    <div className='card-body'>
      {requestArray?.map((myRequest) => {
        return (
          <Card className='card border-0 mb-4' isFiltered={true}>
            <div className='card-body'>
              <CardTitle className='mb-3'>
                <span>{myRequest[3]}</span>
              </CardTitle>
              <CardTitle className='mb-3'>
                <span>{myRequest[1]}</span>
                <div style={{ float: 'right' }}>
                  <Button
                    icon='pi pi-check'
                    className='p-button-rounded p-button-success ml-2 p-mr-3'
                    onClick={acceptRequest(myRequest)}
                  />
                  <Button
                    icon='pi pi-times'
                    className='p-button-rounded p-button-success ml-2 p-mr-3'
                    onClick={rejectRequest(myRequest[4])}
                  />
                </div>
              </CardTitle>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default GrantReq;
