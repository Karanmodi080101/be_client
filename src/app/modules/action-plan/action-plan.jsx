import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddTask from 'src/app/shared/components/add-task';
import { Pages } from 'src/app/shared/constants/routes';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import { Ripple } from 'primereact/ripple';

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
import EditTask from './edit-task';

const ActionPlan = ({
  auth: { user } //,
  //actionPlan: { actionPlan, actionPlanLoading },
  //devGoals: { devGoals },
  // getActionPlanModules,
  //getDevGoals
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openNewTaskDialog, setOpenNewTaskDialog] = useState(false);
  const [difficulty, setDifficulty] = useState('');
  const [subtaskId, setSubtaskId] = useState('');
  const [milestoneObjectId, setMilestoneObjectId] = useState('');
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState(0);
  const [description, setDescription] = useState('');
  const [newDialog, setnewDialog] = useState(false);
  const [product, setProduct] = useState();
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [allTaskList, setAllTaskList] = useState([]);

  const toast = useRef(null);
  useEffect(() => {
    //getDevGoals(user?.userId); //empId changed to userId
    fetchData(JSON.parse(sessionStorage.getItem('currentUser'))?.userId); //fetched from session storage
  }, []);

  useEffect(() => {
    fetchData(JSON.parse(sessionStorage.getItem('currentUser'))?.userId); //fetched from session storage
  }, [openEditDialog]);

  useEffect(() => {
    fetchData(JSON.parse(sessionStorage.getItem('currentUser'))?.userId); //fetched from session storage
  }, [openNewTaskDialog]);

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
    console.log('Done!', Result);
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
  const confirmdeletetask = (del_id) => {
    setProduct(del_id);
    console.log('Shweth', del_id);
    setDeleteProductDialog(true);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const deletetask = () => {
    console.log('Shweth del', product);
    let arr = [...Result];
    try {
      Result.forEach((mod, i) => {
        const elementIndex = mod?.milestoneList.findIndex(
          (item) => item._id.toString() === product
        );
        if (elementIndex >= 0) {
          //let newArray = [...mod?.milestoneList];
          // console.log('check', arr[i].milestoneList[elementIndex]?.isActive);
          let varAct = arr[i].milestoneList[elementIndex]['isActive'];
          arr[i].milestoneList[elementIndex]['isActive'] = !varAct;
          //let _task = newArray.filter((val) => val._id !== product);
          // console.log('Shweth upd task', _task);
          // arr[i] = {
          //   ...arr[i],
          //   milestoneList: _task
          // };
          console.log('arr', arr);
          // setResult(arr);
          throw 'Time to end the loop';
        }
      });
    } catch (e) {
      console.log('loop ended == ', e);
    }

    setDeleteProductDialog(false);

    axios
      .put('EditActionPlan', {
        empId: JSON.parse(sessionStorage.getItem('currentUser'))?.userId,
        modules: arr
      })
      .then((response) => {
        if (response?.data) {
          console.log(response.data);
          toast?.current?.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Task skipped successfully',
            life: 3000
          });

          console.log('skip done!');
        }
      });
    setResult(arr);
  };

  const template = (options) => {
    const toggleIcon = options.collapsed
      ? 'pi pi-chevron-down'
      : 'pi pi-chevron-up';
    const className = `${options.className} p-jc-start`;
    const titleClassName = `${options.titleClassName} p-pl-1`;

    console.log('tss', options);

    return (
      <div className={className}>
        <span>{options.props.header}</span>
        {!options?.collapsed ? (
          <Button
            // icon='pi pi-pencil'
            className='p-button-rounded p-button-success ml-2 p-mr-3'
            display={options?.collapsed}
            onClick={() => {
              setOpenNewTaskDialog(true);
              setTitle('');
              setDuration('');
              setDescription('');
              setDifficulty('');
              setMilestoneObjectId(options.props?.id);
            }}
          >
            Add Task to action plan
          </Button>
        ) : null}
        <button
          className={options.togglerClassName}
          onClick={options.onTogglerClick}
        >
          <span className={toggleIcon}></span>
          <Ripple />
        </button>
        {openNewTaskDialog && (
          <EditTask
            isVisible={openNewTaskDialog}
            title={title}
            durationInMinutes={duration}
            description={description}
            difficulty={difficulty}
            userId={user.userId} //empId changed to userId
            milestoneobjectId={milestoneObjectId}
            edits='false'
            closeNewTaskDialog={() => {
              setOpenNewTaskDialog(false);
            }}
            NewTaskSuccess={() => {
              toast?.current?.show({
                severity: 'success',
                summary: 'Successful',
                detail: 'Task added successfully',
                life: 3000
              });
            }}
          />
        )}
      </div>
    );
  };

  // const template = (temp) => {
  //   return (
  //     <React.Fragment>
  //       <p>{temp}</p>
  //       <Button
  //         // icon='pi pi-pencil'
  //         className='p-button-rounded p-button-success ml-2 p-mr-3'
  //       >
  //         Add Task to action plan
  //       </Button>
  //     </React.Fragment>
  //   );
  // };

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
            header={actionPlan?.devGoal?.toUpperCase()}
            id={actionPlan?._id}
            headerTemplate={template}
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
                    <Card
                      className='card border-0 mb-4'
                      isFiltered={milestone.isActive}
                    >
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
                        <React.Fragment>
                          <Button
                            icon='pi pi-pencil'
                            className='p-button-rounded p-button-success ml-2 p-mr-3'
                            onClick={() => {
                              setOpenEditDialog(true);
                              setTitle(milestone?.title);
                              setDuration(milestone?.duration);
                              setDescription(milestone?.description);
                              setDifficulty(milestone?.level);
                              setSubtaskId(milestone?._id);
                            }}
                          />
                          <Button
                            icon='pi pi-trash'
                            className='p-button-rounded p-button-warning ml-2'
                            onClick={() => confirmdeletetask(milestone?._id)}
                          />
                        </React.Fragment>
                        {/* dialog pop up */}
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
                                Are you sure you want to delete{' '}
                                <b>{product.name}</b>?
                              </span>
                            )}
                          </div>
                        </Dialog>
                        {/* dialog pop up */}
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
                        {openEditDialog && (
                          <EditTask
                            isVisible={openEditDialog}
                            title={title}
                            durationInMinutes={duration}
                            description={description}
                            difficulty={difficulty}
                            userId={user.userId} //empId changed to userId
                            edits='true'
                            subtaskId={subtaskId}
                            closeEditDialog={() => {
                              setOpenEditDialog(false);
                            }}
                            EditSuccess={() => {
                              toast?.current?.show({
                                severity: 'success',
                                summary: 'Successful',
                                detail: 'Task edited successfully',
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
