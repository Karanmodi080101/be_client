import react, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import Creatable from 'react-select/creatable';

// import './employeeInfo.css';

const Bestfit = (props) => {
  const [AllUsers, setAllUsers] = useState([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [filters1, setFilters1] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
    }
  });
  const [dropdownData, setdropdownData] = useState([]);
  const [dropdownEmployeeData, setdropdownEmployeeData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [selectedModel, setSelectedModel] = useState([]);

  useEffect(() => {
    getAllMembers();
  }, []);

  useEffect(() => {
    console.log('models', selectedEmployee, selectedModel);
  }, [selectedEmployee]);

  const getAllMembers = async () => {
    const res = await axios.get(`getAllUsers`);
    setAllUsers(res?.data);
    let tempobj = res?.data?.map((item) => {
      let temp = { label: item?.name, value: item?.userId };
      return temp;
    });
    console.log('tempobj', tempobj);
    setdropdownEmployeeData(tempobj);
    const response = await axios.get('static');
    console.log('response', response.data);
    setdropdownData(response.data[0]?.bestFit);
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
    // const filters = filtersMap[`${filtersKey}`].value;

    return (
      <span className='p-input-icon-left'>
        {/* <i className='pi pi-search' />
        <InputText
          type='search'
          value={filters['global'].value || ''}
          onChange={(e) => onGlobalFilterChange(e, filtersKey)}
          placeholder='Employee Search'
        /> */}
        <Creatable
          //   isMulti
          onChange={(value) => setSelectedEmployee(value)}
          options={dropdownEmployeeData}
          value={selectedEmployee}
        />
        <br />
        <Creatable
          //   isMulti
          onChange={(value) => setSelectedModel(value)}
          options={dropdownData}
          value={selectedModel}
        />
      </span>
    );
  };

  //   const onGlobalFilterChange = (event, filtersKey) => {
  //     const value = event.target.value;
  //     let filters = { ...filtersMap[filtersKey].value };
  //     filters['global'].value = value;

  //     filtersMap[filtersKey].callback(filters);
  //   };

  //   const filtersMap = {
  //     filters1: { value: filters1, callback: setFilters1 }
  //   };

  const header1 = renderHeader('filters1');

  return (
    <>
      <div className='container' style={{ background: '##f5f6fb' }}>
        <div className='row'>
          <div className='col-md-12 h4 font-weight-bold'>
            Employee Information
          </div>
        </div>
        <DataTable
          //   value={AllUsers}
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
            field='name'
            header='Name'
            sortable
          ></Column>
          {/* <Column
            headerStyle={{ color: '#5763a6' }}
            field='designation'
            header='Designation'
          ></Column> */}
          <Column
            headerStyle={{ color: '#5763a6' }}
            field='email'
            header='Email'
          ></Column>
          <Column
            headerStyle={{ color: '#5763a6' }}
            field='Performance score'
            header='Performance score'
          ></Column>
          {/* <Column
            headerStyle={{ color: '#5763a6' }}
            field='mobile'
            header='Mobile'
          ></Column> */}
          {/* <Column
            headerStyle={{ color: '#5763a6' }}
            field='gender'
            header='Gender'
          ></Column>
          <Column
            headerStyle={{ color: '#5763a6' }}
            field='team'
            header='Team'
          ></Column> */}
        </DataTable>
      </div>
    </>
  );
};

export default Bestfit;
