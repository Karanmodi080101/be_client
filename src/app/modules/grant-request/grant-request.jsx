import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AddTask from 'src/app/shared/components/add-task';
import { Pages } from 'src/app/shared/constants/routes';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import RightSideSkills from '../right-side-skills/right-side-skills';
import {
  ActionPlanHeader,
  Card,
  CardTitle,
  Duration
} from '../action-plan/action-plan.style';

import { Panel } from 'primereact/panel';

function GrantReq() {
  return (
    <div className='card-body'>
      <Card className='card border-0 mb-4' isFiltered={true}>
        <div className='card-body'>
          <CardTitle className='mb-3'>
            <span>Name of Employee</span>
          </CardTitle>
          <CardTitle className='mb-3'>
            <span>Requested Role</span>
            <div style={{ float: 'right' }}>
              <Button
                icon='pi pi-check'
                className='p-button-rounded p-button-success ml-2 p-mr-3'
              />
              <Button
                icon='pi pi-times'
                className='p-button-rounded p-button-success ml-2 p-mr-3'
              />
            </div>
          </CardTitle>
        </div>
      </Card>
      <Card className='card border-0 mb-4' isFiltered={true}>
        <div className='card-body'>
          <CardTitle className='mb-3'>
            <span>Name of Employee</span>
          </CardTitle>
          <CardTitle className='mb-3'>
            <span>Requested Role</span>
            <div style={{ float: 'right' }}>
              <Button
                icon='pi pi-check'
                className='p-button-rounded p-button-success ml-2 p-mr-3'
              />
              <Button
                icon='pi pi-times'
                className='p-button-rounded p-button-success ml-2 p-mr-3'
              />
            </div>
          </CardTitle>
        </div>
      </Card>
    </div>
  );
}

export default GrantReq;
