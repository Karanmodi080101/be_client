import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import DialogAddSkill from './dialog-add-skill.jsx';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { BreadCrumb } from 'primereact/breadcrumb';
import './skill-modules.css';

const initialSkills = [
  {
    skill: 'Python',
    duration: '1 month',
    difficulty: 'easy',
    description:
      'Every stage comprises a few sub-stages for which we have set no time bounds, but small tasks to get you going to the next learning stage. We sincerely hope that the listed tutorials give you the best knowledge of Python! Let’s get going.',
    resources: 'geeksForGeeks',
    subModulesList: [
      {
        skill: 'Numpy',
        duration: '5 days',
        difficulty: 'easy',
        subModulesList: []
      },
      {
        skill: 'Pandas',
        duration: '15 days',
        difficulty: 'medium',
        subModulesList: []
      },
      {
        skill: 'Matplotlib',
        duration: '10 days',
        difficulty: 'easy',
        subModulesList: []
      }
    ]
  },
  {
    skill: 'Algorithms',
    duration: '2 months',
    difficulty: 'hard',
    description:
      "Basically, DSA is a very crucial thing in a software field as even in real world scenario as well. In day to day life, you may or may not be notice these, or even we don't have any idea related to it…",
    resources: 'https://cp-algorithms.com/',
    subModulesList: []
  },
  {
    skill: 'C++',
    duration: '1 month',
    difficulty: 'medium',
    description:
      "The first step of learning any language is to learn it's syntax , like you should know how to get input and output , what are variables ,datatypes , loops , decision statements and other fundamental concepts",
    resources: 'gfg',
    subModulesList: [
      {
        skill: 'Basic',
        duration: '5 days',
        difficulty: 'easy',
        subModulesList: []
      },
      {
        skill: 'OOPs Concepts',
        duration: '20 days',
        difficulty: 'hard',
        subModulesList: []
      },
      {
        skill: 'STL',
        duration: '5 days',
        difficulty: 'medium',
        subModulesList: []
      }
    ]
  }
];

const SkillModules = () => {
  const [skillArray, setSkillArray] = useState(initialSkills);
  const [path, setPath] = useState([
    { label: 'All Skills', url: '/skillModules' }
  ]);
  // const addSubmoduleButton = () => {
  //   return (
  //     <button type='button' icon='pi pi-cog' className='p-button-secondary'>
  //       Sub Modules
  //     </button>
  //   );
  // };

  const home = {
    icon: 'pi pi-home',
    url: '/skillModules'
  };

  const skillBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Skill</span>
        {rowData.skill}
      </React.Fragment>
    );
  };
  const durationBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Duration</span>
        {rowData.duration}
      </React.Fragment>
    );
  };
  const difficultyBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Difficulty</span>
        {rowData.difficulty}
      </React.Fragment>
    );
  };
  const descriptionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Description</span>
        {rowData.description}
      </React.Fragment>
    );
  };
  const resourcesBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Resources</span>
        {rowData.resources}
      </React.Fragment>
    );
  };
  return (
    <div>
      <h2 style={{ textAlign: 'left' }}>Skill Modules</h2>

      {/* <Router>
        <ul>
          <li></li>
        </ul>
      </Router> */}

      <DialogAddSkill skillArray={skillArray} setSkillArray={setSkillArray} />

      <BreadCrumb model={path} />
      <div className='datatable-responsive-demo'>
        <div className='card'>
          <DataTable
            value={skillArray}
            style={{ cursor: 'pointer' }}
            emptyMessage='No Skills Found'
            className='p-datatable-responsive-demo'
            onRowClick={(e) => {
              let selectedSkill = e.data.skill;
              skillArray.forEach((obj) => {
                if (obj.skill === selectedSkill) {
                  let myPath = path;
                  myPath.push({ label: obj.skill });
                  setPath(myPath);
                  setSkillArray(obj.subModulesList);
                }
              });
              // console.log(e.data.skill);
            }}
          >
            <Column style={{ width: '3em' }} />
            <Column field='skill' header='Skill' body={skillBodyTemplate} />
            <Column
              field='duration'
              header='Duration'
              body={durationBodyTemplate}
            />
            <Column
              field='difficulty'
              header='Difficulty'
              body={difficultyBodyTemplate}
            />
            <Column
              field='description'
              header='Description'
              body={descriptionBodyTemplate}
            />
            <Column
              field='resources'
              header='Resources'
              body={resourcesBodyTemplate}
            />
            {/* <Column body={addSubmoduleButton} /> */}
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default SkillModules;
