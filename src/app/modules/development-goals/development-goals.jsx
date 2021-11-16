import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
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
  const [showDialog, setShowDialog] = useState(false);
  const [showDialogTemp, setShowDialogTemp] = useState(false);
  const openDialog = () => setShowDialog(true);
  const openDialogTemp = () => setShowDialogTemp(true);
  const closeDialog = () => setShowDialog(false);
  const closeDialogTemp = () => setShowDialogTemp(false);

  const [skills, setSkills] = useState([]);
  const [selectedGoals, setSelectedGoals] = useState([]);

  const history = useHistory();

  const onSubmit = async () => {
    console.log('selected goals', selectedGoals);
    const res = await axios.post('actionPlan', {
      empId: JSON.parse(sessionStorage.getItem('currentUser'))?.userId,
      modules: selectedGoals
    });
    console.log('response of devgoals', res);
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
        const profileData = await getProfile();
        console.log(profileData);
        if (profileData?.empId) {
          setSkills(profileData.employmentInformation.hardSkills);
        }
        if (goalsData?.userId) {
          setResult(
            goalsData.devGoalsFields.map((item) => ({
              ...item,
              targetDate: item.targetDate
                ? moment(item.targetDate).format('DD-MM-YYYY')
                : '',
              assigneer: 'Manager'
            }))
          );
          return;
        }
        console.log(goalsData);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  const developementGoalsWrapper = (
    <>
      <div className='row'>
        <div className='col-12'>
          <h4 className='card-title font-weight-bold'>
            Goals Generated
            <AddGoalsDialog
              openDialog={openDialog}
              closeDialog={closeDialog}
              showDialog={showDialog}
              setResult={setResult}
            />
            <GoalTemplateDialogue
              openDialog={openDialogTemp}
              closeDialog={closeDialogTemp}
              showDialog={showDialogTemp}
              skills={skills}
              setResult={setResult}
            />
          </h4>
        </div>
      </div>
      <div className='card border-0 mb-3'>
        <Container>
          <div className='datatable-responsive-demo'>
            <DataTable
              value={result}
              selection={selectedGoals}
              onSelectionChange={(e) => setSelectedGoals(e.value)}
              dataKey='_id'
              className='p-datatable-responsive-demo'
            >
              <Column
                selectionMode='multiple'
                headerStyle={{ width: '3em' }}
                className='p-column-title'
              ></Column>
              <Column
                field='devGoal'
                header='Development Goals'
                className='p-column-title'
                style={{ width: '22%' }}
              ></Column>
              <Column
                field='assigneer'
                header='Assigner'
                className='p-column-title'
                style={{ width: '22%' }}
              ></Column>
              <Column
                field='requiredSupport'
                header='Required Support'
                className='p-column-title'
              ></Column>
              <Column
                field='targetDate'
                header='Target Date'
                style={{ width: '15%' }}
                className='p-column-title'
              ></Column>
            </DataTable>
          </div>
        </Container>
      </div>
      <div className='row'>
        <div className='col-12 text-center  '>
          <button
            className='btn btn-primary-imatmi'
            style={{
              fontSize: '18px !important',
              padding: '11px 23px',
              borderRadius: '40px'
            }}
            onClick={() => onSubmit()}
          >
            Generate Action Plan
          </button>
        </div>
      </div>
    </>
  );
  return (
    <>
      <RightSideSkills wrapper={developementGoalsWrapper} />
    </>
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
