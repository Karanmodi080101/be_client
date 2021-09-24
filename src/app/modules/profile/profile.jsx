import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { hexColorCodes } from 'src/app/shared/constants/global-constant';
import { getProfileById } from '../../core/actions/profile';
import { Badge, CardHeader } from '../review-report/review-report.style';
import RightSideSkills from '../right-side-skills/right-side-skills';

const Profile = (props) => {
  useEffect(() => {
    props.getProfileById(props.auth.user.empId);
  }, []);
  const userManagerName = props?.profile?.profile?.employmentInformation
    ?.managerName
    ? props?.profile?.profile?.employmentInformation?.managerName
    : 'Not Assigned';

  const profileWrapper = (
    <Fragment>
      <>
        {/* Start Employee Profile */}
        <div className='row m-0 align-items-start'>
          <div className='col-12 p-0'>
            <div>
              <div
                className='card border-0 my-2'
                style={{
                  borderRadius: '10px'
                }}
              >
                <CardHeader className='card-header'>About Me</CardHeader>
                <div className='card-body'>
                  {props?.profile?.profile?.personalInformation?.aboutMe
                    ? props?.profile?.profile?.personalInformation?.aboutMe
                    : 'Nothing about me'}
                </div>
              </div>

              <div className='row align-items-start'>
                <div className='col-sm-6 col-12'>
                  <div
                    className='card border-0 mb-2'
                    style={{
                      borderRadius: '10px'
                    }}
                  >
                    <CardHeader className='card-header'>Basic Info</CardHeader>
                    <ul className='card-body'>
                      <div className='row m-0'>
                        <div className='col-12 p-0'>
                          <div className='row mx-0 text-center'>
                            <div className='col-5 text-left'>Hire Date</div>
                            <div className='col-7 text-left'>
                              <Badge
                                className='badge badge-pill mr-2'
                                style={{
                                  color: hexColorCodes[0]?.hexCode,
                                  border:
                                    '1px solid ' + hexColorCodes[0]?.hexCode
                                }}
                              >
                                {props?.profile?.profile?.employmentInformation
                                  ?.dateOfEmployment
                                  ? props?.profile?.profile
                                      ?.employmentInformation?.dateOfEmployment
                                  : '-'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className='col-12 p-0'>
                          <div className='row mx-0 text-center'>
                            <div className='col-5 text-left'>
                              Work Experience
                            </div>
                            <div className='col-7 text-left'>
                              <Badge
                                className='badge badge-pill mr-2'
                                style={{
                                  color: hexColorCodes[0]?.hexCode,
                                  border:
                                    '1px solid ' + hexColorCodes[0]?.hexCode
                                }}
                              >
                                {props?.profile?.profile?.employmentInformation
                                  ?.workEx
                                  ? props?.profile?.profile
                                      ?.employmentInformation?.workEx
                                  : '-'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className='col-12 p-0'>
                          <div className='row mx-0 text-center'>
                            <div className='col-5 text-left'>Employee ID</div>
                            <div className='col-7 text-left'>
                              <Badge
                                className='badge badge-pill mr-2'
                                style={{
                                  color: hexColorCodes[0]?.hexCode,
                                  border:
                                    '1px solid ' + hexColorCodes[0]?.hexCode
                                }}
                              >
                                {props?.profile?.profile?.empId
                                  ? props?.profile?.profile?.empId
                                  : 'Employee ID Unassigned'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className='col-12 p-0'>
                          <div className='row mx-0 text-center'>
                            <div className='col-5 text-left'>SSN</div>
                            <div className='col-7 text-left'>
                              <Badge
                                className='badge badge-pill mr-2'
                                style={{
                                  color: hexColorCodes[0]?.hexCode,
                                  border:
                                    '1px solid ' + hexColorCodes[0]?.hexCode
                                }}
                              >
                                xxxxxxx
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
                <div className='col-sm-6 col-12'>
                  <div
                    className='card border-0 mb-2'
                    style={{
                      borderRadius: '10px'
                    }}
                  >
                    <CardHeader className='card-header'>Organiztion</CardHeader>
                    <ul className='card-body'>
                      <div className='row m-0'>
                        <div className='col-12 p-0'>
                          <div className='row mx-0 text-center'>
                            <div className='col-4 text-left'>Department</div>
                            <div className='col-8 text-left'>
                              <Badge
                                className='badge badge-pill mr-2'
                                style={{
                                  color: hexColorCodes[0]?.hexCode,
                                  border:
                                    '1px solid ' + hexColorCodes[0]?.hexCode
                                }}
                              >
                                {props?.profile?.profile?.employmentInformation
                                  ?.department
                                  ? props?.profile?.profile
                                      ?.employmentInformation?.department
                                  : 'Unassigned'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className='col-12 p-0'>
                          <div className='row mx-0 text-center'>
                            <div className='col-4 text-left'>Manager</div>
                            <div className='col-8 text-left'>
                              <Badge
                                className='badge badge-pill mr-2'
                                style={{
                                  color: hexColorCodes[0]?.hexCode,
                                  border:
                                    '1px solid ' + hexColorCodes[0]?.hexCode
                                }}
                              >
                                {userManagerName}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className='col-12 p-0'>
                          <div className='row mx-0 text-center'>
                            <div className='col-4 text-left'>Current Role</div>
                            <div className='col-8 text-left'>
                              <Badge
                                className='badge badge-pill mr-2'
                                style={{
                                  color: hexColorCodes[0]?.hexCode,
                                  border:
                                    '1px solid ' + hexColorCodes[0]?.hexCode
                                }}
                              >
                                {props?.profile?.profile?.employmentInformation
                                  ?.currentRole
                                  ? props?.profile?.profile
                                      ?.employmentInformation?.currentRole
                                  : 'Unassigned'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className='col-12 p-0'>
                          <div className='row mx-0 text-center'>
                            <div className='col-4 text-left'>Team</div>
                            <div className='col-8 text-left'>
                              <Badge
                                className='badge badge-pill mr-2'
                                style={{
                                  color: hexColorCodes[0]?.hexCode,
                                  border:
                                    '1px solid ' + hexColorCodes[0]?.hexCode
                                }}
                              >
                                {props?.profile?.profile?.teamId
                                  ? props?.profile?.profile?.teamId
                                  : 'Unassigned'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className='card border-0 mb-2'
                style={{
                  borderRadius: '10px'
                }}
              >
                <CardHeader className='card-header'>Personal Info</CardHeader>
                <ul className='card-body'>
                  <div className='row m-0'>
                    <div className='col-12 p-0'>
                      <div className='row mx-0 text-center'>
                        <div className='col-4 text-left'>Gender</div>
                        <div className='col-6 text-left'>
                          {props?.profile?.profile?.personalInformation?.gender
                            ? props?.profile?.profile?.personalInformation
                                ?.gender
                            : '-'}
                        </div>
                      </div>
                    </div>
                    <div className='col-12 p-0'>
                      <div className='row mx-0 text-center'>
                        <div className='col-4 text-left'>Date Of Birth</div>
                        <div className='col-6 text-left'>
                          {props?.profile?.profile?.personalInformation?.dob
                            ? props?.profile?.profile?.personalInformation?.dob
                            : '-'}
                        </div>
                      </div>
                    </div>
                    <div className='col-12 p-0'>
                      <div className='row mx-0 text-center'>
                        <div className='col-4 text-left'>Personal Mobile</div>
                        <div className='col-6 text-left'>
                          {props?.profile?.profile?.personalInformation?.mobile
                            ? props?.profile?.profile?.personalInformation
                                ?.mobile
                            : '-'}
                        </div>
                      </div>
                    </div>
                    <div className='col-12 p-0'>
                      <div className='row mx-0 text-center'>
                        <div className='col-4 text-left'>Personal Email</div>
                        <div className='col-6 text-left'>
                          {props?.profile?.profile?.personalInformation?.email
                            ? props?.profile?.profile?.personalInformation
                                ?.email
                            : props?.profile?.profile?.personalInformation?.fullName.toLowerCase() +
                              '@imatmi.com'}
                        </div>
                      </div>
                    </div>
                    <div className='col-12 p-0'>
                      <div className='row mx-0 text-center'>
                        <div className='col-4 text-left'>Ethnicity</div>
                        <div className='col-6 text-left'>-</div>
                      </div>
                    </div>
                    <div className='col-12 p-0'>
                      <div className='row mx-0 text-center'>
                        <div className='col-4 text-left'>Address</div>
                        <div className='col-6 text-left'>-</div>
                      </div>
                    </div>
                  </div>
                </ul>
              </div>
            </div>
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

  return (
    <>
      <RightSideSkills wrapper={profileWrapper} />
    </>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(mapStateToProps, {
  getProfileById
})(Profile);
