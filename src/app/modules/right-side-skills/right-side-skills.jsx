import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getProfileById, getCurrentProfile } from '../../core/actions/profile';
import {
  Badge,
  CardHeader,
  ProfileImage
} from '../review-report/review-report.style';
import { Pages } from '../../shared/constants/routes';
import { Link } from 'react-router-dom';

const RightSideSkills = ({
  auth: { user },
  profile: { profile, profileLoading, directReports, isManager },
  //getProfileById,
  wrapper,
  uid
}) => {
  const [obj, setObj] = useState({});

  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem('currentUser'))?.userId)
      getProfileById(
        JSON.parse(sessionStorage.getItem('currentUser'))?.userId
      ).then((res) => {
        setObj(res);
        //console.log('resinfinite', res);
      });
  }, []);

  useEffect(() => {
    console.log('myobj2', obj);
  }, [obj]);
  // const managerName = props?.profile?.profile?.employmentInformation?.manager
  //   ? getUserNameFromEmpId(
  //       props?.profile?.profile?.employmentInformation?.manager
  //     )
  //   : 'Not Assigned';
  // function componentWillMount() {

  // }

  const skills = [
    {
      id: 1,
      title: 'Hard skills',
      field: 'hardSkills',
      color: '#4A90E2'
    },
    {
      id: 2,
      title: 'Soft Skills',
      field: 'softSkills',
      color: '#FB9542'
    },
    {
      id: 3,
      title: 'Personality & Mind Attributes',
      field: 'personalityMindAttr',
      color: '#143560'
    }
  ];

  return (
    <Fragment>
      <>
        {/* Start Employee Profile */}
        <div className='row m-0 align-items-start'>
          <div className='col-md-9 col-sm-12' style={{ padding: '10px 20px' }}>
            <div
              className='card border-0 mb-2 '
              style={{
                borderRadius: '20px',
                backgroundColor: '#F9FAFF'
              }}
            >
              <div className='row d-flex mx-0 py-2'>
                <div className='col-md-3 col-sm-6 col-12 px-3 text-center'>
                  <ProfileImage
                    src='https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359554__340.png'
                    alt=''
                  />
                </div>
                <div className='col-md-9 col-sm-6 col-12'>
                  <div className='row mx-0 p-0 d-block'>
                    <h4 className='font-weight-bold mb-1'>
                      {obj?.personalInformation?.fullName}
                      <Link
                        className='edit-profile-icon'
                        to={{ pathname: Pages.EditProfile.link, state: uid }}
                      >
                        <button>
                          <i class='fas fa-edit' />
                        </button>
                      </Link>
                    </h4>

                    <li>{obj?.employmentInformation?.currentRole}</li>
                  </div>
                  <div className='row mx-0 p-0'>
                    <div className='col-md-4 col-sm-6 col-12 vertical-separater'>
                      <li className='mb-2'>
                        <MailIcon className='mr-2' />
                        {obj?.personalInformation?.email}
                      </li>
                      <li className='mb-2'>
                        <PhoneIcon className='mr-2' />
                        {obj?.personalInformation?.contactNumber}
                      </li>
                    </div>
                    <div className='col-md-8 col-sm-6 col-12 text-left'>
                      <li className='mb-2'>
                        Goals:{'  '}
                        {obj?.employmentInformation?.goals ?? 'NA'}
                      </li>
                      <li className='mb-2'>
                        Manager:{'  '}
                        {obj?.employmentInformation?.manager ?? 'NA'}
                      </li>
                      {/* <Link to={Pages.developmentGoal.link}>
                        <button className='btn btn-primary-imatmi m-1'>
                          Goals
                        </button>
                      </Link>
                      <Link to={Pages.actionPlan.link}>
                        <button className='btn btn-primary-imatmi m-1'>
                          Action Plan
                        </button>
                      </Link>
                      <Link
                        to={
                          Pages.empReviewReport.link +
                          '/' +
                          props.auth.user.empId
                        }
                      >
                        <button className='btn btn-primary-imatmi m-1'>
                          Report
                        </button>
                      </Link> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <>
              {/* Router-Outlet */}
              {wrapper}
            </>
          </div>
          <div
            className='col-md-3 col-sm-12 px-3'
            // , position: 'fixed', right: '0'
            style={{ background: '#F9FAFF' }}
          >
            {skills.map((record) => (
              <div
                key={record.id}
                className='card border-0 mb-4'
                style={{
                  background: 'transparent',
                  borderRadius: '20px'
                }}
              >
                <CardHeader
                  className='card-header'
                  style={{ fontWeight: 'bold' }}
                >
                  {record?.title}
                </CardHeader>
                <ul className='card-body'>
                  {obj?.employmentInformation?.[record.field]
                    .sort((a, b) => a.length - b.length)
                    .map((item) => (
                      <Badge
                        className='badge badge-pill mr-2'
                        style={{
                          color: record?.color,
                          border: '1px solid ' + record?.color
                        }}
                      >
                        {item.label} {/*Single Change did it item.label*/}
                      </Badge>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        {/* <div className='row'>
          <div className='col-12 text-center'>
            <Link to='/update-profile'>
              <Button
                size='lg'
                style={{
                  backgroundColor: '#384e63',
                  borderRadius: '10px',
                  borderColor: '#384e63'
                }}
              >
                Edit
              </Button>
            </Link>
          </div>
        </div> */}
      </>
    </Fragment>
  );
};

RightSideSkills.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(mapStateToProps, {
  getProfileById
})(RightSideSkills);
