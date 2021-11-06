import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import DialogAddSkill from './dialog-add-skill.jsx';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { BreadCrumb } from 'primereact/breadcrumb';
import './skill-modules.css';
import {
  addSkill,
  deleteSkill,
  getSkill,
  getSkills
} from '../../core/actions/skill-modules';
import { Link } from 'react-router-dom';

const SkillModules = (props) => {
  const [skillArray, setSkillArray] = useState([]);
  const [father, setFather] = useState({});
  const parent = props.match.params.id;

  useEffect(() => {
    getSkills(parent).then((data) => {
      if (data.errors) {
        console.log(data.errors);
        return;
      }
      setSkillArray(data.skills);
      getSkill(parent).then((data) => {
        if (data.errors) {
          console.log(data.errors);
          return;
        }
        setFather(data.skill);
      });
    });
  }, [parent]);
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

  const handleAdd = async (values) => {
    try {
      const data = await addSkill(parent, values);
      if (data.errors) {
        return data.errors;
      }
      console.log(data);
      setSkillArray([...skillArray, data.skill]);
    } catch (e) {
      console.log(e);
      return [{ msg: 'Something Went Wrong' }];
    }
  };

  const handleDelete = (id) => {
    deleteSkill(id).then((data) => {
      if (data.errors) {
        console.log(data.errors);
        return;
      }
      setSkillArray(skillArray.filter((item) => item._id !== data.skill._id));
    });
  };

  const home = {
    icon: 'pi pi-home',
    url: '/skillModules'
  };

  const skillBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Skill</span>
        {rowData.title}
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
        {rowData.level}
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
        {rowData.resourcesLinks}
      </React.Fragment>
    );
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className='p-column-title'>Actions</span>
        <button
          onClick={() => {
            handleDelete(rowData._id);
          }}
          style={{
            background: 'white',
            outline: 'none',
            border: 'none',
            padding: '4px'
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
          >
            <path d='M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z' />
          </svg>
        </button>
        <button
          onClick={() => {
            props.history.push(`/skillmodules/${rowData._id}`);
          }}
          style={{
            background: 'white',
            outline: 'none',
            border: 'none',
            padding: '4px'
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
          >
            <path d='M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.21 0-4 1.791-4 4s1.79 4 4 4c2.209 0 4-1.791 4-4s-1.791-4-4-4zm-.004 3.999c-.564.564-1.479.564-2.044 0s-.565-1.48 0-2.044c.564-.564 1.479-.564 2.044 0s.565 1.479 0 2.044z' />
          </svg>
        </button>
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

      <DialogAddSkill handleAdd={handleAdd} />
      {parent !== 'parent' && parent !== 'null' && parent !== null && (
        <div style={{ padding: '8px', margin: '10px 0px' }}>
          <Link
            to={`/skillmodules/${
              father?.parentModule ? father.parentModule : 'parent'
            }`}
          >
            Go back to Parent : {father?.title}
          </Link>
        </div>
      )}
      {/* <BreadCrumb model={path} /> */}

      <div className='datatable-responsive-demo'>
        <div className='card'>
          <DataTable
            value={skillArray}
            style={{ cursor: 'pointer' }}
            emptyMessage='No Skills Found'
            className='p-datatable-responsive-demo'
            // onRowClick={(e) => {
            //   let selectedSkill = e.data._id;
            //   props.history.push(`/skillmodules/${selectedSkill}`);
            // }}
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
            <Column field='_id' header='Actions' body={actionBodyTemplate} />
            {/* <Column body={addSubmoduleButton} /> */}
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default SkillModules;
