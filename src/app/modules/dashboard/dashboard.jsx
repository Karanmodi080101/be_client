import axios from 'axios';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  clearProfile,
  getCurrentProfile,
  getDirectReports
} from 'src/app/core/actions/profile';
import Spinner from 'src/app/layout/spinner';
import { APIRoutes, Pages } from 'src/app/shared/constants/routes';
import actionPlanLogo from 'src/assets/images/action-plan.svg';
import cPlusPlus from 'src/assets/images/c++.svg';
import goalsLogo from 'src/assets/images/goals.svg';
import pythonLogo from 'src/assets/images/python.svg';
import reviewReportLogo from 'src/assets/images/review-report.svg';
import skipNextCircle from 'src/assets/images/skip-next-circle.svg';
import { DashboardCalendarStyle, TaskTableStyle } from './dashboard.style';
import { Toast } from 'primereact/toast';
import AddTask from 'src/app/shared/components/add-task';
import './dashboard.css';

const Dashboard = ({
  getCurrentProfile,
  getDirectReports,
  clearProfile,
  auth: { user },
  profile: { profile, profileLoading, directReports, isManager }
}) => {
  useEffect(() => {
    clearProfile();
    getCurrentProfile().then((res) => console.log('res', res)); //printing the data returned by getCurrentProfile
    getDirectReports();
    getTodaysTask(today);
    getAllTasks();
  }, [clearProfile, getCurrentProfile, getDirectReports]);

  const [today, setToday] = useState(new Date());
  const [taskList, setTaskList] = useState([]);
  const [allTaskList, setAllTaskList] = useState([]);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [product, setProduct] = useState();
  const [editing, setEditing] = useState();
  const toast = useRef(null);
  const [newDialog, setnewDialog] = useState(false);
  const [newdata, setNewdata] = useState(false);
  const getTodaysTask = (dateValue) => {
    axios
      .get(`${APIRoutes.taskByDate.url}?selectedDate=${dateValue.toString()}`)
      .then((response) => {
        let allTasks = [];
        response.data.forEach((task) => {
          allTasks.push({
            id: task._id,
            title: task.title,
            startDate: new Date(task.startDate),
            endDate: new Date(task.endDate),
            notes: task?.description,
            assignedToId: task?.assignedToId,
            status: task?.status
          });
        });
        setTaskList(allTasks);
        console.log('taskList: ', taskList);
      });
  };

  useEffect(() => {
    console.log('check tasklist', taskList);
  }, [taskList]);

  useEffect(() => {
    console.log('check alltasklist', allTaskList);
  }, [allTaskList]);

  useEffect(() => {
    getAllTasks();
    getTodaysTask(today);
    setNewdata(false);
    console.log('chill');
  }, [newdata]);

  // useEffect(() => {
  //   console.log('RIP', allTaskList);
  // }, [newDialog]);

  let getAllTasks = () => {
    axios.get(APIRoutes.task.url).then((response) => {
      let allTasks = [];
      response.data.forEach((task) => {
        allTasks.push({
          id: task._id,
          title: task.title,
          startDate: new Date(task.startDate).toLocaleDateString(
            'en-US',
            DATE_OPTIONS
          ),
          endDate: new Date(task.endDate).toLocaleDateString(
            'en-US',
            DATE_OPTIONS
          ),
          start_Date: new Date(task.startDate),
          end_Date: new Date(task.endDate),
          notes: task?.description,
          assignedFrom: 'Hong Clukey',
          status: task?.status, //'In Progress',
          assignedToId: task?.assignedToId
        });
      });

      setAllTaskList(allTasks);
    });
  };

  const getTimeFormat = (dateString) => {
    const result = new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
    return result;
  };

  const evalutionResult = [
    {
      id: 1,
      title: 'Review Report',
      icon: reviewReportLogo,
      link: Pages.empReviewReport.link + '/' + user?.empId
    },
    {
      id: 2,
      title: 'Goals',
      icon: goalsLogo,
      link: Pages.developmentGoal.link
    },
    {
      id: 3,
      title: 'Action Plan',
      icon: actionPlanLogo,
      link: Pages.actionPlan.link
    }
  ];
  // const [today, setToday] = useState(new Date());
  const DATE_OPTIONS = { year: 'numeric', month: 'long', day: 'numeric' };
  const setDate = (value) => {
    setToday(value);
    getTodaysTask(new Date(value));
  };

  const edittask = (task) => {
    //setAllTaskList({ ...task });
    console.log('in edittask', task);
    setEditing(task);
    //setProductDialog(true);
    setnewDialog(true);
  };

  const confirmdeletetask = (task) => {
    setProduct(task);
    setDeleteProductDialog(true);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const deletetask = () => {
    let _task = allTaskList.filter((val) => val.id !== product.id);
    setAllTaskList(_task);
    if (product?.id !== undefined) {
      axios.delete(`${APIRoutes.task.url}/${product.id}`).then((response) => {
        if (response?.data) {
          console.log('response?.data; ', response?.data);
          let _task = allTaskList.filter((val) => val.id !== product.id);
          getTodaysTask(today);
          setAllTaskList(_task);
        }
      });
    }
    setDeleteProductDialog(false);
    // setProduct('');
    toast?.current?.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Task Deleted',
      life: 3000
    });
  };

  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label='No'
        icon='pi pi-times'
        className='p-button-text'
        onClick={hideDeleteProductDialog}
      />
      <Button
        label='Yes'
        icon='pi pi-check'
        className='p-button-text'
        onClick={deletetask}
      />
    </React.Fragment>
  );

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon='pi pi-pencil'
          className='p-button-rounded p-button-success p-mr-2'
          onClick={() => edittask(rowData)}
        />
        <Button
          icon='pi pi-trash'
          className='p-button-rounded p-button-warning ml-2'
          onClick={() => confirmdeletetask(rowData)}
        />
      </React.Fragment>
    );
  };

  const footer = () => {
    return (
      <>
        <Toast ref={toast} />
        <div className='row mx-0'>
          <div className='col-12'>
            <div
              className='row'
              style={{ backgroundColor: '#fff', borderRadius: '10px' }}
            >
              <div className='col-12 task-heading'>
                {today.toLocaleDateString('en-US', DATE_OPTIONS)}
              </div>
              <div
                className='col-12'
                style={{
                  textAlign: 'left',
                  fontSize: '13px',
                  lineHeight: '18px',
                  fontWeight: '500'
                }}
              >
                {taskList.length ? (
                  <ul className='mx-3'>
                    {taskList.map((task) => (
                      <li key={task._id} style={{ listStyleType: 'disc' }}>
                        {getTimeFormat(task.startDate)} to
                        {getTimeFormat(task.endDate)} - {task?.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className='text-center my-2'>No Task Today !!!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const titleBodyTemplate = (rowData) => {
    return (
      <div className='limit-words'>
        <span className='p-column-title'>Tasks</span>
        {rowData.title}
      </div>
    );
  };

  const assignedFromBodyTemplate = (rowData) => {
    return (
      <div className='limit-words'>
        <span className='p-column-title'>Assigned By</span>
        {rowData.assignedFrom}
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <div className='limit-words'>
        <span className='p-column-title'>Status</span>
        {rowData.status}
      </div>
    );
  };

  const startDateBodyTemplate = (rowData) => {
    return (
      <div className='limit-words'>
        <span className='p-column-title'>Start Date</span>
        {rowData.startDate}
      </div>
    );
  };

  const endDateBodyTemplate = (rowData) => {
    return (
      <div className='limit-words'>
        <span className='p-column-title'>End Date</span>
        {rowData.endDate}
      </div>
    );
  };

  return user === null ? (
    <Spinner />
  ) : (
    <div style={{ padding: '10px' }}>
      <div className='row mx-0'>
        <h4 style={{ fontWeight: 'bold' }}>Dashboard</h4>
      </div>
      <div className='row mx-0 align-items-start'>
        {/* Calender */}
        <div className='col-md-4 col-sm-6 col-12'>
          <div className='row'>
            <div className='col-12'>
              <h5 className='dashbord-subheading'>Calender</h5>
            </div>
          </div>
          <div className='row mx-0'>
            <div className='col-12 pb-0'>
              <DashboardCalendarStyle className='text-center overflow-auto'>
                <Calendar
                  inline
                  value={today}
                  onChange={(e) => setDate(e.value)}
                  footerTemplate={footer}
                ></Calendar>
              </DashboardCalendarStyle>
            </div>
          </div>
        </div>
        {/* Other Details */}
        <div className='col-md-8 col-sm-6 col-12'>
          <div className='row'>
            <div className='col-12 d-flex'>
              <span>
                <h5 className='dashbord-subheading'>Learning Today</h5>
              </span>
              <button className='btn btn-primary ml-auto dashbord-button'>
                Rollover
              </button>
              <button className='btn btn-primary ml-2 mr-0 dashbord-button'>
                Add Goal
              </button>
            </div>
          </div>
          <div className='row mt-3'>
            <div className='col-sm-6 col-12'>
              <div
                className='card border-0 row p-3 bg-light m-0'
                style={{ height: '130px' }}
              >
                <span className='col-4'>
                  <img src={pythonLogo} alt='' height='40px' />
                </span>
                <span className='col-8 text-dashboard'>Python Programming</span>
              </div>
            </div>
            <div className='col-md-3 col-12'>
              <div
                className='card border-0 row p-1 bg-light m-0'
                style={{ height: '130px' }}
              >
                <div className='col-12 text-dashboard p-1 text-center'>
                  Python 2
                </div>
                <div className='col-12 text-dashboard p-1 text-center'>
                  <img src={skipNextCircle} alt='' height='30px' />
                </div>
                <div className='col-12 text-dashboard p-1 text-center'>
                  Up Next
                </div>
              </div>
            </div>
            <div className='col-md-3 col-12'>
              <div
                className='card border-0 row p-1 bg-light m-0'
                style={{ height: '130px' }}
              >
                <div className='col-12 text-dashboard p-1 text-center'>C++</div>
                <div className='col-12 text-dashboard p-1 text-center'>
                  <img src={cPlusPlus} alt='' height='30px' />
                </div>
                <div className='col-12 text-dashboard p-1 text-center'>
                  Suggested
                </div>
              </div>
            </div>
          </div>
          <div className='row mt-3'>
            <div className='col-12 d-flex'>
              <span>
                <h5 className='dashbord-subheading'>Evaluation Results</h5>
              </span>
            </div>
          </div>
          <div className='row mt-3'>
            {evalutionResult.map((item, index) => {
              return (
                <div className='col-md-4 col-sm-6 col-12' key={item.id}>
                  <Link
                    to={item.link}
                    className='card border-0 row p-1 bg-light m-0'
                  >
                    <div className='col-12 text-dashboard p-1 text-center'>
                      <img src={item.icon} alt='' height='104px' />
                    </div>
                    <div className='col-12 text-dashboard p-1 text-center'>
                      {item.title}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className='datatable-responsive-demo'>
        <DataTable
          value={allTaskList}
          dataKey='id'
          paginator
          paginatorTemplate='CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
          rows={5}
          rowsPerPageOptions={[5, 10, 20, 50]}
          className='p-datatable-responsive-demo'
        >
          <Column
            field='title'
            header='Tasks'
            sortable
            body={titleBodyTemplate}
          ></Column>
          <Column
            field='assignedFrom'
            header='Assigned By'
            sortable
            body={assignedFromBodyTemplate}
          ></Column>
          <Column
            field='status'
            header='Status'
            sortable
            body={statusBodyTemplate}
          ></Column>
          <Column
            field='startDate'
            header='Start Date'
            sortable
            body={startDateBodyTemplate}
          ></Column>
          <Column
            field='endDate'
            header='End Date'
            sortable
            body={endDateBodyTemplate}
          ></Column>
          <Column body={actionBodyTemplate}></Column>
        </DataTable>
      </div>
      <Dialog
        visible={deleteProductDialog}
        style={{ width: '450px' }}
        header='Confirm'
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className='confirmation-content'>
          <i
            className='pi pi-exclamation-triangle p-mr-3'
            style={{ fontSize: '2rem' }}
          />
          {product && (
            <span className='ml-2'>
              Are you sure you want to delete <b>{product.name}</b>?
            </span>
          )}
        </div>
      </Dialog>
      {newDialog && (
        <AddTask
          isVisible={newDialog}
          title={editing?.title}
          durationInMinutes=''
          startDate={editing?.start_Date}
          endDate={editing?.end_Date}
          description={editing?.notes}
          userId={editing?.assignedToId} //empId changed to userId
          edits='true'
          taskId={editing?.id}
          status={editing?.status}
          closeDialog={() => {
            setnewDialog(false);
          }}
          AddSuccess={() => {
            toast?.current?.show({
              severity: 'success',
              summary: 'Successful',
              detail: 'Task created successfully',
              life: 3000
            });
          }}
          setGoogle={() => {
            toast?.current?.show({
              severity: 'success',
              summary: 'Successful',
              detail: 'Task added to google calender successfully',
              life: 3000
            });
          }}
          forReRender={() => {
            setNewdata(true);
          }}
        />
      )}
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  clearProfile: PropTypes.func.isRequired,
  getDirectReports: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});
export default connect(mapStateToProps, {
  getCurrentProfile,
  clearProfile,
  getDirectReports
})(Dashboard);
