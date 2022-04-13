import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { getCurrentReviewData } from 'src/app/core/actions/reviewer-report';
import { Pages } from 'src/app/shared/constants/routes';
import { getDevGoals } from '../../core/actions/development-goals';
import RightSideSkills from '../right-side-skills/right-side-skills';
import { goalListGeneration } from './development-goals.service';
import { Container } from './development-goals.style';
//import { getAllSkillModules } from '../../core/actions/skill-module';
import { setActionPlan } from '../../core/actions/action-plan';
import AddGoalsDialog from './add-goals-dialog';
import './development-goals.css';
import { getProfile } from '../../core/actions/profile';
import GoalTemplateDialogue from './goal-template-dialogue';
import axios from 'axios';
import moment from 'moment';
import ClipLoader from 'react-spinners/ClipLoader';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Badge } from '../review-report/review-report.style';
import ReviewBar from './ProgressBar/review-bar';

const DevelopmentGoals = ({
  // getCurrentProfile,
  auth: { user },
  profile: { profile }
  // getCurrentReviewData,
  // setDevGoals,
  // getDevGoals,
  // setActionPlan,
  // getAllSkillModules,
  // reviewerReport: { revDB },
  // actionPlan: { actionPlan, actionPlanLoading },
  // devGoals: { devGoals, devGoalsLoading, setDevGoalsFlag } //,
  //skillModule: { skills, skillLoading }
}) => {
  const [result, setResult] = useState([]);
  const [loaderVal, setloaderVal] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [showDialogTemp, setShowDialogTemp] = useState(false);
  const openDialog = () => setShowDialog(true);
  const openDialogTemp = () => setShowDialogTemp(true);
  const closeDialog = () => setShowDialog(false);
  const closeDialogTemp = () => setShowDialogTemp(false);
  let [spincolor, setColor] = useState(`'#ffffff'`);

  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [product, setProduct] = useState();
  const [skills, setSkills] = useState([]);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [devgoalId, setDevgoalId] = useState('');
  const toast = useRef(null);
  const [reviewScore, setReviewScore] = useState(80);
  const history = useHistory();

  const suggestedGoals = [
    {
      title: 'Machine Learning',
      showLearMore: false
    },
    {
      title: 'Get Better at Swift',
      showLearMore: true
    },
    {
      title: 'Designing',
      showLearMore: true
    },
    {
      title: 'Full Stack Develepoment',
      showLearMore: true
    }
  ];

  const onSubmit = async (e) => {
    console.log('selected goals', selectedGoals);
    const res = await axios.post('actionPlan', {
      empId: JSON.parse(sessionStorage.getItem('currentUser'))?.userId,
      modules: selectedGoals
    });
    console.log('response of devgoals', res);
    // setSelectedGoals(res.data.modules);
    history.push(Pages.actionPlan.link);
  };
  // let strengthsWF = revDB?.strengthWithFlags;
  // let AOI = revDB?.areaOfImprovement;
  // let teamTechStack = profile?.employmentInformation.teamTechStack;
  // let result = [];

  // if (profile && revDB) {
  //   let goalList = goalListGeneration(strengthsWF, AOI, teamTechStack);
  //   goalList.forEach((goal) => {
  //     let goalDict = {};
  //     goalDict['id'] = goal;
  //     goalDict['developmentGoals'] = 'Learn ' + goal;
  //     goalDict['isSelected'] = false;
  //     goalDict['requiredSupport'] = 'NA';
  //     goalDict['targetDate'] = 'NA';
  //     result.push(goalDict);
  //   });
  // }
  // const onSubmit = async () => {
  //   actionPlan.modules = [];
  //   selectedGoals.forEach((goal) => goals.push(goal.id));
  //   // if (selectedGoals.sort() !== devGoals.sort()) {
  //   //   devGoals = goals;
  //   // }
  //   setDevGoalsFlag = true;
  //   setDevGoals(user.empId, goals);
  //   let modules = [];
  //   selectedGoals.forEach((goal) => {
  //     // skills.forEach((skillModule) => {
  //     //   if (
  //     //     goal.id === skillModule.skill ||
  //     //     skillModule.child.includes(goal.id)
  //     //   ) {
  //     //     modules.push(skillModule);
  //     //   }
  //     // });
  //   });
  //   actionPlan.modules = modules;
  //   setActionPlan(profile.empId, modules);
  //   history.push(Pages.actionPlan.link);
  // };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const goalsData = await getDevGoals();
        setDevgoalId(goalsData._id);
        const profileData = await getProfile();
        console.log(profileData);
        if (profileData?.empId) {
          setSkills(profileData.employmentInformation.hardSkills);
        }
        if (goalsData?.userId) {
          setResult(
            goalsData.devGoalsFields.map((item) => ({
              ...item //,
              // targetDate: item.targetDate
              //   ? moment(item.targetDate).format('DD-MM-YYYY')
              //   : '',
              //assigneer: 'Manager'
            }))
          );
          setloaderVal(false);
          return;
        }
        console.log(goalsData);
      } catch (e) {
        console.log(e);
      }
      setloaderVal(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    fetchData(JSON.parse(sessionStorage.getItem('currentUser'))?.userId); //fetched from session storage
  }, []);

  // Fetching data from user's action plan and selecting the checkboxes
  const fetchData = async (userId) => {
    const res = await axios.get(`actionPlan/${userId}`);
    setSelectedGoals(res?.data?.modules);
  };

  useEffect(() => {
    console.log('working?');
  }, [result]);

  const goalsBodyTemplate = (rowData) => {
    return (
      <div className='limit-words'>
        <span className='p-column-title'>Development Goals</span>
        {rowData.devGoal}
      </div>
    );
  };

  const assignerBodyTemplate = (rowData) => {
    return (
      <div className='limit-words'>
        <span className='p-column-title'>Assigner</span>
        {/* {rowData.assigneer} */}
        Manager
      </div>
    );
  };

  const requiredSupportBodyTemplate = (rowData) => {
    return (
      <div className='limit-words'>
        <span className='p-column-title'>Required Support</span>
        {rowData.requiredSupport}
      </div>
    );
  };

  const targetBodyTemplate = (rowData) => {
    return (
      <div className='limit-words'>
        <span className='p-column-title'>Target</span>
        {rowData['targetDate']
          ? moment(rowData['targetDate']).format('DD-MM-YYYY')
          : ''}
      </div>
    );
  };

  const booleanChecker = (rowData) => {
    //return rowData['getVerified'] ? 'Pending' : 'Approved';
    return rowData['getVerified'];
  };
  const forRowDisable = (rowData) => {
    return rowData['getVerified'] === 'Pending' ? true : false;
  };
  const manageTargetDate = (rowData) => {
    return rowData['targetDate']
      ? moment(rowData['targetDate']).format('DD-MM-YYYY')
      : '';
  };
  const confirmdeletetask = (task) => {
    setProduct(task);
    setDeleteProductDialog(true);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const deletetask = () => {
    let _task = result.filter((val) => val._id !== product._id);
    //setResult(_task);
    // if (product?.id !== undefined) {
    //   axios.delete(`${APIRoutes.task.url}/${product.id}`).then((response) => {
    //     if (response?.data) {
    //       console.log('response?.data; ', response?.data);
    //       let _task = allTaskList.filter((val) => val.id !== product.id);
    //       //getTodaysTask(today);
    //       setAllTaskList(_task);
    //     }
    //   });
    // }
    axios
      .put(`devgoals/${devgoalId}`, {
        devGoalsFields: _task
      })
      .then((res) => {
        console.log(res);
        setResult(res.data.devGoalsFields);
      });
    setDeleteProductDialog(false);
    // setProduct('');
    toast?.current?.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Goal Deleted',
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
          //onClick={() => edittask(rowData)}
          disabled={rowData?.getVerified !== 'Pending' ? true : false}
        />
        <Button
          icon='pi pi-trash'
          className='p-button-rounded p-button-warning ml-2'
          onClick={() => confirmdeletetask(rowData)}
        />
      </React.Fragment>
    );
  };

  // const isRowSelectable = (event) => {
  //   const data = event.data;
  //   console.log('new data', data);
  //   return data?.getVerified !== 'Pending' ? true : false;
  //   //return isSelectable(data.quantity, 'quantity');
  // };

  // const rowClassName = (data) => {
  //   return data?.getVerified !== 'Pending' ? '' : 'p-disabled';
  // };

  const developementGoalsWrapper = (
    <Container>
      <Toast ref={toast} />
      <div
        className='card mb-3'
        style={{
          borderRadius: '10px',
          padding: '0px 10px'
        }}
      >
        <div className='row text-center'>
          <div className='col-md-5'>
            <h4 className='card-title font-weight-bold'>Goals Generated</h4>
          </div>
          <div className='col-md-3'>
            <GoalTemplateDialogue
              openDialog={openDialogTemp}
              closeDialog={closeDialogTemp}
              showDialog={showDialogTemp}
              skills={skills}
              setResult={setResult}
            />
          </div>
          <div className='col-md-3'>
            <AddGoalsDialog
              openDialog={openDialog}
              closeDialog={closeDialog}
              showDialog={showDialog}
              setResult={setResult}
            />
          </div>
        </div>
        <div className='mb-3 mx-3 datatable-responsive-demo'>
          {/* <div className='datatable-responsive-demo' position='relative'> */}
          <DataTable
            breakpoint='960px'
            value={result}
            selection={selectedGoals}
            onSelectionChange={(e) => setSelectedGoals(e.value)}
            dataKey='_id'
            className='p-datatable-responsive-demo'
            emptyMessage=''
            // isDataSelectable={isRowSelectable}
            // rowClassName={rowClassName}
          >
            <Column
              selectionMode='multiple'
              headerStyle={{
                backgroundColor: '#d8d8d8',
                color: 'black',
                width: '3em'
              }}
              // className='p-column-title'
            ></Column>
            <Column
              field='devGoal'
              header='Development Goals'
              headerStyle={{
                backgroundColor: '#d8d8d8',
                color: 'black'
              }}
              // className='p-column-title'
              // style={{ width: '22%' }}
              body={goalsBodyTemplate}
            ></Column>
            <Column
              field='assigneer'
              header='Assigner'
              // className='p-column-title'
              // style={{ width: '12%' }}
              headerStyle={{ backgroundColor: '#d8d8d8', color: 'black' }}
              // body={() => {
              //   return 'Manager';
              // }}
              body={assignerBodyTemplate}
            ></Column>
            <Column
              field='requiredSupport'
              header='Required Support'
              // style={{ width: '22%' }}
              // className='p-column-title'
              headerStyle={{ backgroundColor: '#d8d8d8', color: 'black' }}
              body={requiredSupportBodyTemplate}
            ></Column>
            <Column
              field='targetDate'
              header='Target Date'
              // style={{ width: '15%' }}
              // className='p-column-title'
              headerStyle={{ backgroundColor: '#d8d8d8', color: 'black' }}
              // body={manageTargetDate}
              body={targetBodyTemplate}
            ></Column>
            <Column
              field='getVerified'
              header='Status'
              // style={{ width: '12%' }}
              className='p-column-title'
              headerStyle={{ backgroundColor: '#d8d8d8', color: 'black' }}
              body={booleanChecker}
            ></Column>
            <Column
              header='Actions'
              headerStyle={{ backgroundColor: '#d8d8d8', color: 'black' }}
              body={actionBodyTemplate}
            ></Column>
          </DataTable>
          <div className='spinner'>
            <ClipLoader color={spincolor} loading={loaderVal} size={50} />
          </div>
          {/* </div> */}
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
                  Are you sure you want to delete <b>{product?.devGoal}</b>?
                </span>
              )}
            </div>
          </Dialog>
        </div>
        <div className='row'>
          <div className='col-12 text-center'>
            <button
              className='btn'
              style={{
                fontSize: '16px !important',
                padding: '11px 23px',
                borderRadius: '15px',
                color: 'white',
                backgroundColor: '#52a2ec'
              }}
              onClick={() => onSubmit()}
            >
              Generate Action Plan
            </button>
          </div>
        </div>
      </div>
      <div
        className='row py-3'
        style={{
          padding: '0px 10px'
        }}
      >
        <div
          className='col-md-6 col-sm-12 card'
          style={{
            borderRadius: '10px'
          }}
        >
          <h4 className='text-center font-weight-bold'>Suggested Goals</h4>
          {suggestedGoals.map((goal) => {
            return (
              <Alert variant='secondary'>
                <span className='font-weight-bold'>{goal.title}</span>
                <Badge
                  className='badge badge-pill mr-2'
                  style={{
                    border: '1px solid',
                    float: 'right',
                    backgroundColor: '#ebf5fe'
                  }}
                >
                  Learn More
                </Badge>
              </Alert>
            );
          })}
        </div>
        <div
          className='col-md-6 col-sm-12 card'
          style={{
            borderRadius: '10px'
          }}
        >
          <h4 className='text-center font-weight-bold'>
            Current Goal Progress
          </h4>
          <ReviewBar score={reviewScore} />
        </div>
      </div>
    </Container>
  );
  return (
    <div
      style={{
        borderRadius: '10px',
        padding: '0px 10px',
        backgroundColor: '#f5f6fb'
      }}
    >
      <RightSideSkills wrapper={developementGoalsWrapper} />
    </div>
  );
};
DevelopmentGoals.propTypes = {
  reviewerReport: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  flags: PropTypes.object.isRequired,
  actionPlan: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  skillModule: PropTypes.object.isRequired,
  devGoals: PropTypes.object.isRequired,
  setDevGoals: PropTypes.func.isRequired,
  getDevGoals: PropTypes.func.isRequired,
  getAllSkillModules: PropTypes.func.isRequired,
  setActionPlan: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  // reviewerReport: state.reviewerReport,
  profile: state.profile
  // devGoals: state.devGoals,
  // actionPlan: state.actionPlan,
  // skillModule: state.skillModule
});
export default connect(mapStateToProps, {
  // getCurrentReviewData,
  // getCurrentProfile
  // setDevGoals,
  // getDevGoals,
  //getAllSkillModules,
  // setActionPlan
})(DevelopmentGoals);
