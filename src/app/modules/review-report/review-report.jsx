import { Carousel } from 'primereact/carousel';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearProfile, getProfileById } from 'src/app/core/actions/profile';
import {
  getCurrentReviewDataById,
  getReviewerData
} from 'src/app/core/actions/reviewer-report';
import Drag from 'src/app/shared/components/drag';
import Drop from 'src/app/shared/components/drop';
import {
  DropEffect,
  hexColorCodes
} from 'src/app/shared/constants/global-constant';
import RightSideSkills from '../right-side-skills/right-side-skills';
import { Badge, CardHeader, CarouselDiv, Header } from './review-report.style';

//const employeeProfile = require('../../../assets/json/employee-profile.json');

const EmployeeReviewReport = ({
  getProfileById,
  getCurrentReviewDataById,
  getReviewerData,
  clearProfile,
  auth: { user },
  profile: { profile, profileLoading },
  reviewerReport: { revDB, reviewers, reviewLoading },
  match
}) => {
  const [reviewerReport, setReviewerReport] = useState(revDB);
  useEffect(() => {
    clearProfile();
    getProfileById(match.params.id);
    getCurrentReviewDataById(match.params.id);
    getReviewerData(match.params.id);
  }, [
    clearProfile,
    getCurrentReviewDataById,
    getProfileById,
    getReviewerData,
    match.params.id
  ]);

  const isManager = 1;

  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 5,
      numScroll: 5
    },
    {
      breakpoint: '873px',
      numVisible: 4,
      numScroll: 4
    },
    {
      breakpoint: '768px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '615px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '483px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  const feedbackProviderTemplate = (feedbackProvider) => {
    return (
      <>
        <div className='row text-center'>
          <div className='col-12'>
            <img
              src='https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359554__340.png'
              alt=''
              style={{ width: '130px' }}
            />
          </div>
          <div className='col-12'>
            <p className='font-weight-bold mb-0' style={{ fontSize: '16px' }}>
              {feedbackProvider.fullName.toUpperCase()}
            </p>
            <p className='font-weight-bold mb-0' style={{ fontSize: '14px' }}>
              {feedbackProvider.currentRole}
            </p>
            {/* <p style={{ fontSize: '12px' }}>
              Interaction: {feedbackProvider.interaction}
            </p> */}
          </div>
        </div>
      </>
    );
  };

  const updateListData = (value, listName) => {
    setReviewerReport((prevState) => {
      let nextState = { ...prevState };
      nextState[listName] = [...nextState[listName], value];
      return nextState;
    });
  };

  const reviewReportWrapper = (
    <Fragment>
      <>
        {/* Start Employee Profile */}
        <div className='row mx-0'>
          <Header className='col-12 px-0'>Employee Review Report</Header>
        </div>

        {/* Feedback Providers */}
        <div className='row mx-0'>
          <div className='col-12 px-0'>
            <CardHeader className='card-header pl-0'>
              Feedback Providers
            </CardHeader>
          </div>
          <div className='col-12 px-0'>
            <div
              className='card border-0'
              style={{
                backgroundColor: '#F9FAFF',
                borderRadius: '20px'
              }}
            >
              <CarouselDiv className='card-body px-0 pb-0'>
                <Carousel
                  value={reviewers}
                  itemTemplate={feedbackProviderTemplate}
                  responsiveOptions={responsiveOptions}
                  numVisible={6}
                  numScroll={1}
                  circular='true'
                ></Carousel>
              </CarouselDiv>
            </div>
          </div>
        </div>
        <div className='row mx-0 px-0 py-3 text-center align-items-start'>
          {/* Strength */}
          <div className='col-sm-6 col-12'>
            <CardHeader className='card-header text-left pl-0'>
              Strengths
            </CardHeader>
            <div
              className='card border-0'
              style={{
                backgroundColor: '#F9FAFF',
                borderRadius: '20px'
              }}
            >
              <Drop
                effect={DropEffect.Move}
                onItemDropped={(value) => {
                  updateListData(value, 'strengths');
                }}
              >
                <ul className='card-body'>
                  {revDB?.strengths
                    .concat(revDB?.strengthWithFlags)
                    // .sort((a, b) => a.length - b.length)
                    .map((item, index) => (
                      <Drag
                        className='mr-2'
                        value={item}
                        draggable={isManager}
                        effect={DropEffect.Move}
                      >
                        <Badge
                          key={item}
                          className='badge badge-pill'
                          style={{
                            color:
                              hexColorCodes[
                                (index % 2 ? index - 1 : index) %
                                  hexColorCodes?.length
                              ]?.hexCode,
                            border:
                              '1px solid ' +
                              hexColorCodes[
                                (index % 2 ? index - 1 : index) %
                                  hexColorCodes?.length
                              ]?.hexCode
                          }}
                        >
                          {item}
                        </Badge>
                      </Drag>
                    ))}
                </ul>
              </Drop>
            </div>
          </div>
          {/* Area of Improvement */}
          <div className='col-sm-6 col-12'>
            <CardHeader className='card-header text-left pl-0'>
              Areas of Improvement
            </CardHeader>
            <div
              className='card'
              className='card border-0'
              style={{
                backgroundColor: '#F9FAFF',
                borderRadius: '20px'
              }}
            >
              <Drop
                effect={DropEffect.Move}
                onItemDropped={(value) => {
                  updateListData(value, 'areaOfImprovement');
                }}
              >
                <ul className='card-body'>
                  {revDB?.areaOfImprovement
                    // .sort((a, b) => a.length - b.length)
                    .map((item, index) => (
                      <Drag
                        className='mr-2'
                        value={item}
                        draggable={isManager}
                        effect={DropEffect.Move}
                      >
                        <Badge
                          key={item}
                          className='badge badge-pill'
                          style={{
                            color:
                              hexColorCodes[
                                (index % 2 ? index - 1 : index) %
                                  hexColorCodes?.length
                              ]?.hexCode,
                            border:
                              '1px solid ' +
                              hexColorCodes[
                                (index % 2 ? index - 1 : index) %
                                  hexColorCodes?.length
                              ]?.hexCode
                          }}
                        >
                          {item}
                        </Badge>
                      </Drag>
                    ))}
                </ul>
              </Drop>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 text-center'>
            <Link to='/development-goal'>
              <button
                className='btn btn-primary-imatmi'
                style={{
                  fontSize: '18px !important',
                  padding: '11px 23px',
                  borderRadius: '40px'
                }}
              >
                Generate Goals
              </button>
            </Link>
          </div>
        </div>
      </>
    </Fragment>
  );

  return (
    <>
      <RightSideSkills wrapper={reviewReportWrapper} />
    </>
  );
};

EmployeeReviewReport.propTypes = {
  getCurrentReviewDataById: PropTypes.func.isRequired,
  getProfileById: PropTypes.func.isRequired,
  getReviewerData: PropTypes.func.isRequired,
  clearProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  reviewerReport: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  reviewerReport: state.reviewerReport
});
export default connect(mapStateToProps, {
  getCurrentReviewDataById,
  getProfileById,
  getReviewerData,
  clearProfile
})(EmployeeReviewReport);
