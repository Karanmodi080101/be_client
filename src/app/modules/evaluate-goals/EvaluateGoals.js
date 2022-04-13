import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { OrderList } from 'primereact/orderlist';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const EvaluateGoals = (props) => {
  const [allGoals, setAllGoals] = useState([]);
  const [devGoals, setDevGoals] = useState([]);
  const [userId, setUserId] = useState('');
  const [devgoalId, setDevgoalId] = useState('');
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [filters1, setFilters1] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    }
  });

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

  const paginatorTemplate = {
    layout: 'PrevPageLink PageLinks NextPageLink CurrentPageReport',
    PrevPageLink: (options) => {
      return (
        <button
          type='button'
          className={options.className}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className='p-3'>Previous</span>
          <Ripple />
        </button>
      );
    },
    NextPageLink: (options) => {
      return (
        <button
          type='button'
          className={options.className}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className='p-3'>Next</span>
          <Ripple />
        </button>
      );
    },
    PageLinks: (options) => {
      if (
        (options.view.startPage === options.page &&
          options.view.startPage !== 0) ||
        (options.view.endPage === options.page &&
          options.page + 1 !== options.totalPages)
      ) {
        const className = classNames(options.className, { 'p-disabled': true });

        return (
          <span className={className} style={{ userSelect: 'none' }}>
            ...
          </span>
        );
      }

      return (
        <button
          type='button'
          className={options.className}
          onClick={options.onClick}
        >
          {options.page + 1}
          <Ripple />
        </button>
      );
    },
    CurrentPageReport: (options) => {
      return (
        <span
          className='mx-3'
          style={{ color: '##5763a6', userSelect: 'none' }}
        ></span>
      );
    }
  };

  const onCustomPage = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const renderHeader = (filtersKey) => {
    const filters = filtersMap[`${filtersKey}`].value;

    return (
      <span className='p-input-icon-left'>
        <i className='pi pi-search' />
        <InputText
          type='search'
          value={filters['global'].value || ''}
          onChange={(e) => onGlobalFilterChange(e, filtersKey)}
          placeholder='Goal Search'
        />
      </span>
    );
  };

  const onGlobalFilterChange = (event, filtersKey) => {
    const value = event.target.value;
    let filters = { ...filtersMap[filtersKey].value };
    filters['global'].value = value;

    filtersMap[filtersKey].callback(filters);
  };

  const filtersMap = {
    filters1: { value: filters1, callback: setFilters1 }
  };

  const header1 = renderHeader('filters1');

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

  const targetDateTemplate = (item) => {
    return (
      <div>
        <span>{item.targetDate.substr(0, 10)}</span>
      </div>
    );
  };

  const requiredSupportBodyTemplate = (item) => {
    return (
      <div className='limit-words'>
        <span>{item?.requiredSupport}</span>
      </div>
    );
  };

  const actionBodyTemplate = (item) => {
    return (
      <React.Fragment>
        <Button
          // icon='pi pi-pencil'
          className='p-button-rounded p-button-success p-mr-2'
          onClick={() => changeStatus(item?._id, 'Approved')}
        >
          Accept
        </Button>
        <Button
          // icon='pi pi-trash'
          className='p-button-rounded p-button-warning ml-2'
          onClick={() => changeStatus(item?._id, 'Rejected')}
        >
          Reject
        </Button>
      </React.Fragment>
    );
  };

  // const itemTemplate = (item) => {
  //   return (
  //     <>
  //       <div className='row'>
  //         {/* <div className='col-md-3'>
  //           <p>{item.devGoal}</p>
  //         </div>
  //         <div className='col-md-3'>
  //           <p>{item.targetDate.substr(0, 10)}</p>
  //         </div>
  //         <div className='col-md-3'>
  //           {/* <p>{userId}</p> */}
  //         {/* <p>{item?.getVerified}</p>
  //         </div> */}
  //         <div className='col-md-6 text-center  '>
  //           <button
  //             className='btn btn-primary-imatmi'
  //             style={{
  //               fontSize: '18px !important',
  //               borderRadius: '40px'
  //             }}
  //             onClick={() => changeStatus(item?._id, 'Approved')}
  //           >
  //             Accept
  //           </button>

  //           <button
  //             className='btn btn-primary-imatmi'
  //             style={{
  //               fontSize: '18px !important',
  //               borderRadius: '40px'
  //             }}
  //             onClick={() => changeStatus(item?._id, 'Rejected')}
  //           >
  //             Reject
  //           </button>
  //         </div>
  //       </div>
  //     </>
  //   );
  // };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12 h4 font-weight-bold'>
          Pending Development Goals
        </div>
      </div>
      <DataTable
        value={devGoals}
        paginator
        paginatorTemplate={paginatorTemplate}
        first={first}
        rows={rows}
        onPage={onCustomPage}
        header={header1}
        filters={filters1}
        onFilter={(e) => setFilters1(e.filters)}
      >
        <Column
          headerStyle={{ color: '#5763a6' }}
          field='devGoal'
          header='Goal'
          sortable
        ></Column>
        <Column
          headerStyle={{ color: '#5763a6' }}
          field='targetDate'
          header='Target Date'
          body={targetDateTemplate}
        ></Column>
        <Column
          headerStyle={{ color: '#5763a6' }}
          field='requiredSupport'
          header='Required Support'
          body={requiredSupportBodyTemplate}
        ></Column>
        <Column
          headerStyle={{ color: '#5763a6' }}
          field='getVerified'
          header='Verification Status'
        ></Column>
        <Column
          headerStyle={{ color: '#5763a6' }}
          field='action'
          header='Action'
          body={actionBodyTemplate}
        ></Column>
      </DataTable>
      {/* <OrderList
        value={devGoals}
        header='Pending DevGoals'
        listStyle={{ height: 'auto' }}
        dataKey='_id'
        itemTemplate={itemTemplate}
      ></OrderList> */}
    </div>
  );
};

export default EvaluateGoals;
