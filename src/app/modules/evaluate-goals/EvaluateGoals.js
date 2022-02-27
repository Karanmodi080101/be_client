import react, { useState, useEffect } from 'react';
import axios from 'axios';
import { OrderList } from 'primereact/orderlist';

const EvaluateGoals = (props) => {
  const [allGoals, setAllGoals] = useState([]);
  const [devGoals, setDevGoals] = useState([]);
  const [userId, setUserId] = useState('');
  const [devgoalId, setDevgoalId] = useState('');

  useEffect(() => {
    getAllDevGoals();
  }, []);

  useEffect(() => {
    console.log('hua kya?');
  }, [devGoals]);

  const getAllDevGoals = async () => {
    const res = await axios.get(`devGoals`);
    console.log('checking', res?.data);
    setDevgoalId(res?.data?._id);
    setAllGoals(res?.data?.devGoalsFields);
    const temp = res?.data?.devGoalsFields.filter(
      (g) => g.getVerified === 'Pending'
    );
    setDevGoals(temp);
    setUserId(res?.data?.userId);
  };

  const changeStatus = (id, tempstr) => {
    let tempGoals = allGoals;
    tempGoals.forEach((data) => {
      if (data?._id === id) data['getVerified'] = tempstr;
    });
    console.log('tempGoals', tempGoals);
    //setDevGoals(tempGoals);
    axios
      .put(`devgoals/${devgoalId}`, {
        devGoalsFields: tempGoals
      })
      .then((res) => {
        console.log(res);
        setDevGoals(
          res.data.devGoalsFields.filter((g) => g.getVerified === 'Pending')
        );
      });
  };

  // const ConfirmProductDialogFooter = (
  //   <React.Fragment>
  //     <Button
  //       label='No'
  //       icon='pi pi-times'
  //       className='p-button-text'
  //       onClick={}
  //     />
  //     <Button
  //       label='Yes'
  //       icon='pi pi-check'
  //       className='p-button-text'
  //       onClick={}
  //     />
  //   </React.Fragment>
  // );

  const itemTemplate = (item) => {
    return (
      <>
        <div className='row product-item'>
          <div className='col-md-3'>
            <p>{item.devGoal}</p>
          </div>
          <div className='col-md-3'>
            <p>{item.targetDate.substr(0, 10)}</p>
          </div>
          <div className='col-md-3'>
            {/* <p>{userId}</p> */}
            <p>{item?.getVerified}</p>
          </div>
          <div className='col-md-3 text-center  '>
            <button
              className='btn btn-primary-imatmi'
              style={{
                fontSize: '18px !important',
                borderRadius: '40px'
              }}
              onClick={() => changeStatus(item?._id, 'Approved')}
            >
              Accept
            </button>

            <button
              className='btn btn-primary-imatmi'
              style={{
                fontSize: '18px !important',
                borderRadius: '40px'
              }}
              onClick={() => changeStatus(item?._id, 'Rejected')}
            >
              Reject
            </button>
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
            value={devGoals}
            header='Pending DevGoals'
            listStyle={{ height: 'auto' }}
            dataKey='_id'
            itemTemplate={itemTemplate}
          ></OrderList>
        </div>
      </div>
    </div>
  );
};

export default EvaluateGoals;
