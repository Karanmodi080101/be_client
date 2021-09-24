import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddTask from 'src/app/shared/components/add-task';
import { Pages } from 'src/app/shared/constants/routes';
import { getActionPlanModules } from '../../core/actions/action-plan';
import { getDevGoals } from '../../core/actions/development-goals';
//import { getAllSkillModules } from '../../core/actions/skill-module';
import RightSideSkills from '../right-side-skills/right-side-skills';
import {
  ActionPlanHeader,
  Card,
  CardTitle,
  Duration
} from './action-plan.style';

const ActionPlan = ({
  auth: { user },
  actionPlan: { actionPlan, actionPlanLoading },
  devGoals: { devGoals },
  getActionPlanModules,
  getDevGoals
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(0);
  const [description, setDescription] = useState('');
  useEffect(() => {
    getDevGoals(user?.empId);
  }, []);
  // if (!actionPlan.modules) {
  //   getActionPlanModules(user?.empId);
  // }
  // if (skillLoading === false && devGoals.goals) {
  //   skills.forEach((module) => {
  //     if (devGoals.goals.includes(module.skill)) {
  //       actionPlan.modules.push(module);
  //     }
  //   });
  // }
  let Result = [];
  if (!actionPlanLoading && devGoals.goals) {
    actionPlan?.modules?.forEach((module) => {
      let newModule = {};
      let constant = 1;
      newModule.skill = module.skill;
      newModule.milestoneList = [];
      for (let i = 0; i < module.beginnerModule.length; i++) {
        let milestone = {};
        milestone.id = constant;
        constant++;
        milestone.title = module.beginnerModule[i];
        milestone.goal = '';
        milestone.description = '';
        milestone.duration = module.beginnerTime[i];
        newModule.milestoneList.push(milestone);
      }
      for (let i = 0; i < module.moderateModule.length; i++) {
        let milestone = {};
        milestone.id = constant;
        constant++;
        milestone.title = module.moderateModule[i];
        milestone.goal = '';
        milestone.description = '';
        milestone.duration = module.moderateTime[i];
        newModule.milestoneList.push(milestone);
      }
      for (let i = 0; i < module.advancedModule.length; i++) {
        let milestone = {};
        milestone.id = constant;
        constant++;
        milestone.title = module.advancedModule[i];
        milestone.goal = '';
        milestone.description = '';
        milestone.duration = module.advancedTime[i];
        newModule.milestoneList.push(milestone);
      }
      Result.push(newModule);
    });
  }
  const validationWrapper = (
    <div className='text-center'>
      <div className='mb-2'>
        No development goals selected. Click here to select development goals.
      </div>
      <Link to={Pages.developmentGoal.link}>
        <button
          className='btn btn-primary-imatmi m-1'
          style={{
            fontSize: '18px !important',
            padding: '11px 23px',
            borderRadius: '40px'
          }}
        >
          Goals
        </button>
      </Link>
    </div>
  );
  const actionPlanWrapper = (
    <>
      {Result.map((actionPlan) => (
        <div>
          <ActionPlanHeader className='p-4'>
            {actionPlan.skill.toUpperCase()}
          </ActionPlanHeader>
          <section className='timeline'>
            <ul className='px-2'>
              {actionPlan.milestoneList.map((milestone, index) => (
                <li key={milestone._id} component='div'>
                  <Card className='card border-0 mb-4'>
                    <div className='card-body'>
                      <CardTitle className='mb-3'>
                        <span>{milestone.title}</span>
                        <Duration className='float-right text-muted'>
                          <i className='bi bi-stopwatch'></i>{' '}
                          {milestone.duration} Minutes
                        </Duration>
                      </CardTitle>
                      {milestone.goal ? (
                        <h5 className='card-subtitle mb-3'>
                          Goal: {milestone.goal}
                        </h5>
                      ) : (
                        ''
                      )}
                      <div className='card-text mb-4'>
                        Description: {milestone.description}
                      </div>
                      {/* <Link to='/calender'></Link> */}
                      <button
                        className='btn btn-primary-imatmi btn-lg'
                        onClick={() => {
                          setOpenDialog(true);
                          setTitle(milestone?.title);
                          setDuration(milestone?.duration);
                          setDescription(milestone?.description);
                        }}
                      >
                        Add Activity to Calendar
                      </button>
                      {openDialog && (
                        <AddTask
                          isVisible={openDialog}
                          title={title}
                          durationInMinutes={duration}
                          description={description}
                          empId={user.empId}
                          closeDialog={() => {
                            setOpenDialog(false);
                          }}
                        />
                      )}
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          </section>
        </div>
      ))}
    </>
  );

  return (
    <>
      {devGoals.goals ? (
        <RightSideSkills wrapper={actionPlanWrapper} />
      ) : (
        <RightSideSkills wrapper={validationWrapper} />
      )}
    </>
  );
};
ActionPlan.propTypes = {
  auth: PropTypes.object.isRequired,
  actionPlan: PropTypes.object.isRequired,
  devGoals: PropTypes.object.isRequired,
  skillModule: PropTypes.object.isRequired,
  getActionPlanModules: PropTypes.func.isRequired,
  getAllSkillModules: PropTypes.func.isRequired,
  getDevGoals: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  actionPlan: state.actionPlan,
  devGoals: state.devGoals,
  skillModule: state.skillModule
});
export default connect(mapStateToProps, {
  getActionPlanModules,
  getDevGoals //,
  //getAllSkillModules
})(ActionPlan);
