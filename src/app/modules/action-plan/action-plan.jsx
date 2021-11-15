import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddTask from 'src/app/shared/components/add-task';
import { Pages } from 'src/app/shared/constants/routes';
//import { getActionPlanModules } from '../../core/actions/action-plan';
//import { getDevGoals } from '../../core/actions/development-goals';
//import { getAllSkillModules } from '../../core/actions/skill-module';
import RightSideSkills from '../right-side-skills/right-side-skills';
import {
  ActionPlanHeader,
  Card,
  CardTitle,
  Duration
} from './action-plan.style';
import Accordion from 'react-bootstrap/Accordion';
//import Button from 'react-bootstrap/Button';
import { Panel } from 'primereact/panel';
import { Toast } from 'primereact/toast';
import axios from 'axios';

const ActionPlan = ({
  auth: { user } //,
  //actionPlan: { actionPlan, actionPlanLoading },
  //devGoals: { devGoals },
  // getActionPlanModules,
  //getDevGoals
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(0);
  const [description, setDescription] = useState('');
  const [newDialog, setnewDialog] = useState(false);
  const toast = useRef(null);
  useEffect(() => {
    //getDevGoals(user?.userId); //empId changed to userId
    fetchData(JSON.parse(sessionStorage.getItem('currentUser'))?.userId); //fetched from session storage
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

  //let Result = [];

  const [Result, setResult] = useState([]);

  const fetchData = async (userId) => {
    const res = await axios.get(`actionPlan/${userId}`);
    console.log('actionPLan res', res?.data);
    setResult(res?.data?.modules);
    console.log('tp', Result);
  };

  useEffect(() => {
    console.log('Done!');
  }, [Result]);

  // let Result = [
  //   {
  //     id: 1,
  //     skill: 'Communication Skills',
  //     milestoneList: [
  //       {
  //         _id: 1,
  //         title: 'Getting Started with Public Speaking 😨',
  //         goal: 'Get over your fear',
  //         description:
  //           'In this module we tackle the one element that makes public speaking difficult: fear. Unlike writing a memo or designing a slide deck, presenting a speech puts you directly in front of an audience. Public speaking is wrapped up in the fear of immediate judgment and of lasting rejection.',
  //         duration: 2
  //       },
  //       {
  //         _id: 2,
  //         title: 'A Formula For Successful Presentation 🤓',
  //         goal: 'Learn the practical formula for successful presentations : Creaivity',
  //         description:
  //           'William establishes this structure, and then breaks down it down into modular elements, so the most complex presentations can be created easily, revised effectively, and delivered confidently. Still, no one-size-fits-all outline, no rigid set of rules, is capable of expressing your own personality and unlocking your own brilliance, and so William goes beyond the basic formula to teach you the secret ingredient to public speaking: creativity.',
  //         duration: 1
  //       }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     skill: 'Python',
  //     milestoneList: [
  //       {
  //         _id: 3,
  //         title: 'Getting Your Python On 🐍',
  //         goal: '',
  //         description:
  //           'In this module, you’ll learn about the different types of operating systems, and how you can get your python code ready to interact with the operating system. We’ll learn about getting your environment set up and installing additional Python modules that will help you along the way. We’ll rundown interpreted versus compiled language, and how they differ from each other. We’ll dive into the benefits of automation, and point out common pitfalls so you can avoid them. Finally, we’ll learn about Qwiklabs, which will be used for graded assessments..',
  //         duration: 3
  //       },
  //       {
  //         _id: 4,
  //         title: 'Managing Files with Python 📂',
  //         goal: '',
  //         description:
  //           'In this module, you’ll learn about reading and writing to files and the commands that will enable you to do this. We’ll learn the importance of managing files and how we can navigate through different directories. We’ll understand how to work with files and how there is a layer of abstraction between Python and the operating system. Finally, we’ll dive into learning about CSV files and how to best utilize them.',
  //         duration: 4
  //       }
  //     ]
  //   }
  // ];
  //let Result = [];
  // if (!actionPlanLoading && devGoals.goals) {
  //   actionPlan?.modules?.forEach((module) => {
  //     let newModule = {};
  //     let constant = 1;
  //     newModule.skill = module.skill;
  //     newModule.milestoneList = [];
  //     for (let i = 0; i < module.beginnerModule.length; i++) {
  //       let milestone = {};
  //       milestone.id = constant;
  //       constant++;
  //       milestone.title = module.beginnerModule[i];
  //       milestone.goal = '';
  //       milestone.description = '';
  //       milestone.duration = module.beginnerTime[i];
  //       newModule.milestoneList.push(milestone);
  //     }
  //     for (let i = 0; i < module.moderateModule.length; i++) {
  //       let milestone = {};
  //       milestone.id = constant;
  //       constant++;
  //       milestone.title = module.moderateModule[i];
  //       milestone.goal = '';
  //       milestone.description = '';
  //       milestone.duration = module.moderateTime[i];
  //       newModule.milestoneList.push(milestone);
  //     }
  //     for (let i = 0; i < module.advancedModule.length; i++) {
  //       let milestone = {};
  //       milestone.id = constant;
  //       constant++;
  //       milestone.title = module.advancedModule[i];
  //       milestone.goal = '';
  //       milestone.description = '';
  //       milestone.duration = module.advancedTime[i];
  //       newModule.milestoneList.push(milestone);
  //     }
  //     //Result.push(newModule);
  //   });
  // }

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
      <Toast ref={toast} />
      {Result?.map((actionPlan, i) => (
        <div>
          <Panel
            //header={actionPlan?.skill?.toUpperCase()}
            header={actionPlan?.developmentGoals?.toUpperCase()}
            toggleable
            collapsed='false'
          >
            {/* <Accordion>
            <ActionPlanHeader className='p-4'>
              <Accordion.Toggle
                as={ActionPlanHeader}
                variant='link'
                eventKey={i + 1}
              >
                {actionPlan.skill.toUpperCase()}
              </Accordion.Toggle>
            </ActionPlanHeader>
            <Accordion.Collapse eventKey={i + 1}> */}
            <section className='timeline'>
              <ul className='px-2'>
                {actionPlan?.milestoneList?.map((milestone, index) => (
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
                            userId={user.userId} //empId changed to userId
                            closeDialog={() => {
                              setOpenDialog(false);
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
                                detail:
                                  'Task added to google calender successfully',
                                life: 3000
                              });
                            }}
                          />
                        )}
                      </div>
                    </Card>
                  </li>
                ))}
              </ul>
            </section>
            {/* </Accordion.Collapse>
          </Accordion> */}
          </Panel>
        </div>
      ))}
      <br />
      <button
        className='btn btn-primary-imatmi btn-lg'
        onClick={() => {
          setnewDialog(true);
        }}
      >
        Add new Task
      </button>
      {newDialog && (
        <AddTask
          isVisible={newDialog}
          title=''
          durationInMinutes=''
          description=''
          userId={user.userId} //empId changed to userId
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
        />
      )}
    </>
  );

  return (
    <>
      {<RightSideSkills wrapper={actionPlanWrapper} />}
      {/* {devGoals.goals ? (
        <RightSideSkills wrapper={actionPlanWrapper} />
      ) : (
        <RightSideSkills wrapper={validationWrapper} />
      )} */}
    </>
  );
};
ActionPlan.propTypes = {
  auth: PropTypes.object.isRequired
  //actionPlan: PropTypes.object.isRequired,
  //devGoals: PropTypes.object.isRequired,
  //skillModule: PropTypes.object.isRequired,
  //getActionPlanModules: PropTypes.func.isRequired //,
  //getAllSkillModules: PropTypes.func.isRequired,
  //getDevGoals: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth //,
  //actionPlan: state.actionPlan,
  //devGoals: state.devGoals,
  //skillModule: state.skillModule
});
export default connect(mapStateToProps, {
  //getActionPlanModules //,
  //getDevGoals //,
  //getAllSkillModules
})(ActionPlan);
