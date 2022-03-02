import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './Manager-Dashboard.css';
import evaluateGoals from './evaluateGoals.png';
import profileImg from './profileimage.png';
import employeeInfo from './employeeInfo.png';
import TeamReview from './TeamReview.png';
import highlow from './high-low.png';
import DashboardCalendarStyle from '../dashboard/dashboard.style';
import { Calendar } from 'primereact/calendar';
import { Link } from 'react-router-dom';

// const ManDash = () => {
//   return (
//     <div classNameName='complete'>
//       <div classNameName='layout-main-container'>
//         <div classNameName='layout-main'>
//           <div classNameName='grid'>
//             <div classNameName='col-12 lg:col-6 xl:col-3 cardfigma'>
//               <div classNameName='card m-4'>
//                 <div classNameName='flex justify-content-between row'>
//                   <div classNameName='flex align-items-center justify-content-center col-2'>
//                     <img
//                       src={evaluateGoals}
//                       alt=''
//                       style={{
//                         width: '46px',
//                         height: '46px',
//                         left: '260px',
//                         top: '199px'
//                       }}
//                     />
//                   </div>
//                   <div classNameName='col-10'>
//                     <span classNameName='cardHeading'>Evaluate Goals</span> <br />
//                     <span classNameName='cardData'>goals to evaluate</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div classNameName='col-12 lg:col-6 xl:col-3 cardfigma'>
//               <div classNameName='card m-4'>
//                 <div classNameName='flex justify-content-between row'>
//                   <div classNameName='flex align-items-center justify-content-center col-1'>
//                     <img
//                       src={evaluateGoals}
//                       alt=''
//                       style={{
//                         width: '46px',
//                         height: '46px',
//                         left: '260px',
//                         top: '199px'
//                       }}
//                     />
//                   </div>
//                   <div classNameName='col-11'>
//                     <span classNameName='cardHeading'>Evaluate Goals</span> <br />
//                     <span classNameName='cardData'>goals to evaluate</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div classNameName='col-12 lg:col-6 xl:col-3 cardfigma'>
//               <div classNameName='card m-4'>
//                 <div classNameName='flex justify-content-between row'>
//                   <div classNameName='flex align-items-center justify-content-center col-1'>
//                     <img
//                       src={evaluateGoals}
//                       alt=''
//                       style={{
//                         width: '46px',
//                         height: '46px',
//                         left: '260px',
//                         top: '199px'
//                       }}
//                     />
//                   </div>
//                   <div classNameName='col-11'>
//                     <span classNameName='cardHeading'>Evaluate Goals</span> <br />
//                     <span classNameName='cardData'>goals to evaluate</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div classNameName='col-12 lg:col-6 xl:col-3 cardfigma'>
//               <div classNameName='card m-4'>
//                 <div classNameName='flex justify-content-between row'>
//                   <div classNameName='flex align-items-center justify-content-center col-1'>
//                     <img
//                       src={evaluateGoals}
//                       alt=''
//                       style={{
//                         width: '46px',
//                         height: '46px',
//                         left: '260px',
//                         top: '199px'
//                       }}
//                     />
//                   </div>
//                   <div classNameName='col-11'>
//                     <span classNameName='cardHeading'>Evaluate Goals</span> <br />
//                     <span classNameName='cardData'>goals to evaluate</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManDash;

const ManDash = () => {
  const [today, setToday] = useState(new Date());
  const [teamList, setTeamList] = useState([]);
  const [id, setId] = useState(
    JSON.parse(sessionStorage.getItem('currentUser'))?.userId
  );

  useEffect(() => {
    getMyTeams();
    fetchDataforMilestoneProgress();
  }, []);

  const getMyTeams = async () => {
    const res = await axios.get(`teams/${id}`);
    console.log('all teams', res?.data);
    setTeamList(res?.data);
  };

  const [Result, setResult] = useState(0);

  const fetchDataforMilestoneProgress = async (userId) => {
    const res = await axios.get(`actionPlan/${id}`);
    console.log('actionPLan res', res?.data?.modules);
    let time = 0;
    res?.data?.modules?.forEach((data) => {
      data?.milestoneList?.forEach((task) => {
        time += parseInt(task?.duration);
      });
    });
    console.log('time', time);

    let ans = 0;
    const value = await axios.get(`taskofUser/${id}`);
    console.log('task res2', value?.data);
    value?.data?.forEach((task) => {
      if (task?.status === 'Completed') {
        ans += parseInt(task?.duration);
      }
    });
    console.log('time2', ans);

    setResult((ans / time) * 100);
  };

  return (
    <>
      <div className='complete'>
        <div id='wrapper'>
          <div className='d-flex flex-column' id='content-wrapper'>
            <div id='content'>
              {/* <nav className='navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top'>
              <div className='container-fluid'>
                <button
                  className='btn btn-link d-md-none rounded-circle mr-3'
                  id='sidebarToggleTop'
                  type='button'
                >
                  <i className='fas fa-bars'></i>
                </button>
                <form className='form-inline d-none d-sm-inline-block mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search'>
                  <div className='input-group bg-light'>
                    <i className='fas fa-search mt-2 ml-2'></i>
                    <input
                      className='bg-light form-control border-0 small'
                      type='text'
                      placeholder='Search....'
                    />
                  </div>
                </form>
                <ul className='nav navbar-nav flex-nowrap ml-auto'>
                  <li className='nav-item dropdown d-sm-none no-arrow'>
                    <a
                      className='dropdown-toggle nav-link'
                      data-toggle='dropdown'
                      aria-expanded='false'
                      href='#'
                    >
                      <i className='fas fa-search'></i>
                    </a>
                    <div
                      className='dropdown-menu dropdown-menu-right p-3 animated--grow-in'
                      role='menu'
                      aria-labelledby='searchDropdown'
                    >
                      <form className='form-inline mr-auto navbar-search w-100'>
                        <div className='input-group'>
                          <input
                            className='bg-light form-control border-0 small'
                            type='text'
                            placeholder='Search for ...'
                          />
                        </div>
                      </form>
                    </div>
                  </li>
                  <li
                    className='nav-item dropdown no-arrow mx-1'
                    role='presentation'
                  ></li>
                  <li
                    className='nav-item dropdown no-arrow mx-1'
                    role='presentation'
                  >
                    <div
                      className='shadow dropdown-list dropdown-menu dropdown-menu-right'
                      aria-labelledby='alertsDropdown'
                    ></div>
                  </li>
                  <li
                    className='nav-item dropdown no-arrow'
                    role='presentation'
                  >
                    <div className='nav-item dropdown no-arrow'>
                      <a
                        className='dropdown-toggle nav-link'
                        data-toggle='dropdown'
                        aria-expanded='false'
                        href='#'
                      >
                        <img
                          className='border rounded-circle img-profile'
                          src={profileImg}
                        />
                        <span className='d-none d-lg-inline ml-1 text-gray-600 small'>
                          Nina
                        </span>
                      </a>
                      {/* <div
                        className='dropdown-menu shadow dropdown-menu-right animated--grow-in'
                        role='menu'
                      >
                        <a
                          className='dropdown-item'
                          role='presentation'
                          href='#'
                        >
                          <i className='fas fa-user fa-sm fa-fw mr-2 text-gray-400'></i>
                          &nbsp;Profile
                        </a>
                        <a
                          className='dropdown-item'
                          role='presentation'
                          href='#'
                        >
                          <i className='fas fa-cogs fa-sm fa-fw mr-2 text-gray-400'></i>
                          &nbsp;Settings
                        </a>
                        <a
                          className='dropdown-item'
                          role='presentation'
                          href='#'
                        >
                          <i className='fas fa-list fa-sm fa-fw mr-2 text-gray-400'></i>
                          &nbsp;Activity log
                        </a>
                        <div className='dropdown-divider'></div>
                        <a
                          className='dropdown-item'
                          role='presentation'
                          href='#'
                        >
                          <i className='fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400'></i>
                          &nbsp;Logout
                        </a>
                      </div> */}
              {/* </div>
                  </li>
                </ul>
              </div>
              </nav> */}
              <div className='container-fluid'>
                <div className='d-sm-flex justify-content-between align-items-center mb-4 mt-4'>
                  <p
                    className='mb-0'
                    style={{
                      fontSize: '18px',
                      fontWeight: '500',
                      fontFamily: 'Poppins'
                    }}
                  >
                    Welcome Nina!
                  </p>
                </div>
                <div className='row ml-1 mr-1'>
                  <div className='col-md-6 col-xl-3 mb-4 justify-content-center'>
                    <Link to='/evaluate-goals'>
                      <div
                        className='card shadow py-2'
                        style={{
                          borderRadius: '16px',
                          boxShadow: '0px -1px 11px rgba(0, 0, 0, 0.07)',
                          background: '#FFFFFF'
                        }}
                      >
                        <div className='card-body m-1'>
                          <div className='row align-items-center no-gutters'>
                            <div className='col col-3'>
                              <img
                                src={evaluateGoals}
                                alt=''
                                style={{
                                  width: '46px',
                                  height: '46px',
                                  left: '260px',
                                  top: '199px'
                                }}
                              />
                            </div>
                            <div className='col-auto'>
                              <div className='mb-1'>
                                <span
                                  style={{
                                    fontStyle: 'normal',
                                    fontWeight: '500',
                                    fontSize: '18px',
                                    lineHeight: '27px',
                                    color: '#000000',
                                    fontFamily: 'Poppins'
                                  }}
                                >
                                  Evaluate goals
                                </span>
                                <br />
                                <span
                                  style={{
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: '500',
                                    fontSize: '12px',
                                    lineHeight: '18px',
                                    color: '#8D8D8D'
                                  }}
                                >
                                  4 Goals to Evaluate
                                </span>
                              </div>
                              {/* <div className='text-dark mb-0'></div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className='col-md-6 col-xl-3 mb-4 justify-content-center'>
                    <div
                      className='card shadow py-2'
                      style={{
                        borderRadius: '16px',
                        boxShadow: '0px -1px 11px rgba(0, 0, 0, 0.07)',
                        background:
                          '#FFFFFF' /*width: 246px;*/ /*height: 125px;*/ /*left: 234px;*/ /*top: 160px;*/
                      }}
                    >
                      <div className='card-body m-1'>
                        <div className='row align-items-center no-gutters'>
                          <div className='col col-3'>
                            <img
                              src={TeamReview}
                              alt=''
                              style={{
                                width: '46px',
                                height: '46px',
                                left: '260px',
                                top: '199px'
                              }}
                            />
                          </div>
                          <div className='col-auto'>
                            <div className='mb-1'>
                              <span
                                style={{
                                  fontStyle: 'normal',
                                  fontWeight: '500',
                                  fontSize: '18px',
                                  lineHeight: '27px',
                                  color: '#000000',
                                  fontFamily: 'Poppins'
                                }}
                              >
                                Review Team
                              </span>
                              <br />
                              <span
                                style={{
                                  fontFamily: 'Poppins',
                                  fontStyle: 'normal',
                                  fontWeight: '500',
                                  fontSize: '12px',
                                  lineHeight: '18px',
                                  color: '#8D8D8D'
                                }}
                              >
                                Trigger Reviews
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6 col-xl-3 mb-4 justify-content-center'>
                    <div
                      className='card shadow py-2'
                      style={{
                        borderRadius: '16px',
                        boxShadow: '0px -1px 11px rgba(0, 0, 0, 0.07)',
                        background:
                          '#FFFFFF' /*width: 246px;*/ /*height: 125px;*/ /*left: 234px;*/ /*top: 160px;*/
                      }}
                    >
                      <div className='card-body m-1'>
                        <div className='row align-items-center no-gutters'>
                          <div className='col col-3'>
                            <img
                              src={evaluateGoals}
                              alt=''
                              style={{
                                width: '46px',
                                height: '46px',
                                left: '260px',
                                top: '199px'
                              }}
                            />
                          </div>
                          <div className='col-auto'>
                            <div className='mb-1'>
                              <span
                                style={{
                                  fontStyle: 'normal',
                                  fontWeight: '500',
                                  fontSize: '18px',
                                  lineHeight: '27px',
                                  color: '#000000',
                                  fontFamily: 'Poppins'
                                }}
                              >
                                Goal Completion
                              </span>
                              <br />
                              <span>
                                <br />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-6 col-xl-3 mb-4 justify-content-center'>
                    <div
                      className='card shadow py-2'
                      style={{
                        borderRadius: '16px',
                        boxShadow: '0px -1px 11px rgba(0, 0, 0, 0.07)',
                        background:
                          '#FFFFFF' /*width: 246px;*/ /*height: 125px;*/ /*left: 234px;*/ /*top: 160px;*/
                      }}
                    >
                      <Link to='/employee-info'>
                        <div className='card-body'>
                          <div className='row align-items-center no-gutters my-1'>
                            <div className='col col-2'>
                              <img
                                src={employeeInfo}
                                alt=''
                                style={{
                                  width: '46px',
                                  height: '46px',
                                  left: '260px',
                                  top: '199px'
                                }}
                              />
                            </div>

                            <div className='col-10'>
                              <div className='mb-1 ml-2'>
                                <span
                                  style={{
                                    fontStyle: 'normal',
                                    fontWeight: '500',
                                    fontSize: '18px',
                                    lineHeight: '27px',
                                    color: '#000000',
                                    fontFamily: 'Poppins'
                                  }}
                                >
                                  Employee info
                                </span>
                                <br />
                                <span
                                  style={{
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: '500',
                                    fontSize: '12px',
                                    lineHeight: '18px',
                                    color: '#8D8D8D'
                                  }}
                                >
                                  Get Information About Employees
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* next row */}
              <div class='row ml-3 mr-3'>
                <div class='col-lg-7 col-xl-8'>
                  <div
                    class='card shadow mb-4'
                    style={{ borderRadius: '16px' }}
                  >
                    <div
                      class='card-header d-flex justify-content-between align-items-center'
                      // style={{
                      //   background: '#FFFFFF',
                      //   boxShadow: '0px -1px 11px rgba(0, 0, 0, 0.07)',
                      //   borderTopRightRadius: '16px',
                      //   borderTopLeftRadius: '16px'
                      // }}
                    >
                      <p
                        class='m-0'
                        style={{
                          fontFamily: 'Poppins',
                          fontStyle: 'normal',
                          fontWeight: '500',
                          fontSize: '22px',
                          lineHeight: '33px',
                          display: 'flex',
                          alignItems: 'center',
                          textAlign: 'center',
                          color: '#000000'
                        }}
                      >
                        Milestone Progress{/*&nbsp;&nbsp;*/}
                      </p>
                      <i
                        class='fas fa-sliders-h fa-2x'
                        style={{
                          width: '27px',
                          height: '27px',
                          left: '260px' /*top: 199px;*/
                        }}
                      ></i>
                      {/* <img
                        src={highlow}
                        alt=''
                        style={{
                          width: '18px',
                          height: '18px',
                          left: '5px',
                          top: '5px',
                          // boxShadow: 'inset 0px 4px 4px #FFFFFF',
                          borderRadius: '23px'
                        }}
                      /> */}
                    </div>
                    <div class='card-body' /*style={{ marginLeft: '200px' }}*/>
                      <div className='row'>
                        <div
                          className='col-2'
                          style={{ background: 'rgba(20, 53, 96, 0.06)' }}
                        >
                          <img
                            className='border rounded-circle img-profile'
                            src={profileImg}
                          />
                          <span className='d-none d-lg-inline ml-1 text-gray-600 small'>
                            Nina
                          </span>
                        </div>
                        {/* <br /> */}
                        <div className='col-10'>
                          <div class='progress' style={{ height: '30px' }}>
                            <div
                              class='progress-bar bg-danger'
                              aria-valuenow={Result} //aria-valuenow='20'
                              aria-valuemin='0'
                              aria-valuemax='100'
                              style={{ width: `${Result?.toString()}%` }}
                            >
                              {parseInt(Result)}%
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div
                          className='col-2'
                          style={{ background: 'rgba(20, 53, 96, 0.06)' }}
                        >
                          <img
                            className='border rounded-circle img-profile'
                            src={profileImg}
                          />
                          <span className='d-none d-lg-inline ml-1 text-gray-600 small'>
                            Nina
                          </span>
                        </div>
                        <div className='col-10'>
                          <div class='progress' style={{ height: '30px' }}>
                            <div
                              class='progress-bar bg-warning'
                              aria-valuenow='40'
                              aria-valuemin='0'
                              aria-valuemax='100'
                              style={{ width: '40%' }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div
                          className='col-2'
                          style={{ background: 'rgba(20, 53, 96, 0.06)' }}
                        >
                          <img
                            className='border rounded-circle img-profile'
                            src={profileImg}
                          />
                          <span className='d-none d-lg-inline ml-1 text-gray-600 small'>
                            Nina
                          </span>
                        </div>
                        <div className='col-10'>
                          <div class='progress' style={{ height: '30px' }}>
                            <div
                              class='progress-bar bg-primary'
                              aria-valuenow='60'
                              aria-valuemin='0'
                              aria-valuemax='100'
                              style={{ width: '60%' }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div
                          className='col-2'
                          style={{ background: 'rgba(20, 53, 96, 0.06)' }}
                        >
                          <img
                            className='border rounded-circle img-profile'
                            src={profileImg}
                          />
                          <span className='d-none d-lg-inline ml-1 text-gray-600 small'>
                            Nina Dobrev
                          </span>
                        </div>
                        <div className='col-10'>
                          <div class='progress' style={{ height: '30px' }}>
                            <div
                              class='progress-bar bg-info'
                              aria-valuenow='80'
                              aria-valuemin='0'
                              aria-valuemax='100'
                              style={{ width: '80%' }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*Inside new Row*/}
                  <div className='row mr-1 ml-1'>
                    <div className='col-lg-7 col-xl-8'>
                      <div
                        class='card shadow mb-4'
                        style={{
                          borderRadius: '16px',
                          paddingBottom: '0.5rem'
                        }}
                      >
                        <div class='card-header d-flex justify-content-between align-items-center'>
                          <p
                            class='m-0'
                            style={{
                              fontFamily: 'Poppins',
                              fontStyle: 'normal',
                              fontWeight: '500',
                              fontSize: '22px',
                              //lineHeight: '33px',
                              display: 'flex',
                              alignItems: 'center',
                              textAlign: 'center',
                              color: '#000000'
                            }}
                          >
                            Opportunities{/*&nbsp;&nbsp;*/}
                          </p>
                        </div>
                        <div class='card-body'>
                          <div className='row'>
                            <div
                              className='col-5 d-flex justify-content-center'
                              style={{
                                //paddingRight: '0',
                                background: 'rgba(174, 200, 237, 0.42)'
                              }}
                            >
                              {/* <div
                                className='d-flex justify-content-center'
                                // style={{
                                //   //,
                                //   //borderRadius: '0px 0px 0px 16px'
                                // }}
                              > */}
                              <span
                                style={{
                                  fontFamily: 'Poppins',
                                  fontStyle: 'normal',
                                  fontWeight: '500',
                                  fontSize: '18px',
                                  //lineHeight: '27px',
                                  margin: '6px 0px'
                                }}
                              >
                                Web Developer
                              </span>
                              {/* </div> */}
                            </div>
                            <div
                              className='col-4 d-flex justify-content-center'
                              style={{
                                background: 'rgba(174, 200, 237, 0.42)'
                              }}
                            >
                              {/* <div
                                className='d-flex justify-content-center'
                                // style={{
                                //   background: 'rgba(174, 200, 237, 0.42)'
                                // }}
                              > */}
                              <span
                                style={{
                                  fontFamily: 'Poppins',
                                  fontStyle: 'normal',
                                  fontWeight: '500',
                                  fontSize: '18px',
                                  //lineHeight: '27px',
                                  margin: '6px 0px'
                                }}
                              >
                                2 positions
                              </span>
                              {/* </div> */}
                            </div>
                            <div className='col-3'>
                              <div
                                className='d-flex justify-content-center'
                                style={{
                                  background: '#5B7499',
                                  borderRadius: '6px'
                                }}
                              >
                                <span
                                  style={{
                                    color: '#FFFFFF',
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: '500',
                                    fontSize: '10px',
                                    //lineHeight: '15px',
                                    margin: '6px 0px'
                                  }}
                                >
                                  Recommend
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className='row'>
                            <div
                              className='col-5 d-flex justify-content-center'
                              style={{
                                //paddingRight: '0',
                                background: 'rgba(174, 200, 237, 0.42)'
                              }}
                            >
                              {/* <div
                                className='d-flex justify-content-center'
                                // style={{
                                //   background: 'rgba(174, 200, 237, 0.42)' //,
                                //   //borderRadius: '0px 0px 0px 16px'
                                // }}
                              > */}
                              <span
                                style={{
                                  fontFamily: 'Poppins',
                                  fontStyle: 'normal',
                                  fontWeight: '500',
                                  fontSize: '18px',
                                  //lineHeight: '27px',
                                  margin: '6px 0px'
                                }}
                              >
                                Designer
                              </span>
                              {/* </div> */}
                            </div>
                            <div
                              className='col-4 d-flex justify-content-center'
                              style={{
                                background: 'rgba(174, 200, 237, 0.42)'
                              }}
                            >
                              {/* <div
                                className='d-flex justify-content-center'
                                // style={{
                                //   background: 'rgba(174, 200, 237, 0.42)'
                                // }}
                              > */}
                              <span
                                style={{
                                  fontFamily: 'Poppins',
                                  fontStyle: 'normal',
                                  fontWeight: '500',
                                  fontSize: '18px',
                                  //lineHeight: '27px',
                                  margin: '6px 0px'
                                }}
                              >
                                3 positions
                              </span>
                              {/* </div> */}
                            </div>
                            <div className='col-3'>
                              <div
                                className='d-flex justify-content-center'
                                style={{
                                  background: '#5B7499',
                                  borderRadius: '6px'
                                }}
                              >
                                <span
                                  style={{
                                    color: '#FFFFFF',
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: '500',
                                    fontSize: '10px',
                                    //lineHeight: '15px',
                                    margin: '6px 0px'
                                  }}
                                >
                                  Recommend
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className='row'>
                            <div
                              className='col-5 d-flex justify-content-center'
                              style={{
                                //paddingRight: '0',
                                background: 'rgba(174, 200, 237, 0.42)'
                              }}
                            >
                              {/* <div
                                className='d-flex justify-content-center'
                                // style={{
                                //   //,
                                //   //borderRadius: '0px 0px 0px 16px'
                                // }}
                              > */}
                              <span
                                style={{
                                  fontFamily: 'Poppins',
                                  fontStyle: 'normal',
                                  fontWeight: '500',
                                  fontSize: '18px',
                                  //lineHeight: '27px',
                                  margin: '6px 0px'
                                }}
                              >
                                ML Specialist
                              </span>
                              {/* </div> */}
                            </div>
                            <div
                              className='col-4 d-flex justify-content-center'
                              style={{
                                background: 'rgba(174, 200, 237, 0.42)'
                              }}
                            >
                              {/* <div
                                className='d-flex justify-content-center'
                                // style={{
                                //   background: 'rgba(174, 200, 237, 0.42)'
                                // }}
                              > */}
                              <span
                                style={{
                                  fontFamily: 'Poppins',
                                  fontStyle: 'normal',
                                  fontWeight: '500',
                                  fontSize: '18px',
                                  //lineHeight: '27px',
                                  margin: '6px 0px'
                                }}
                              >
                                2 positions
                              </span>
                              {/* </div> */}
                            </div>
                            <div className='col-3'>
                              <div
                                className='d-flex justify-content-center'
                                style={{
                                  background: '#5B7499',
                                  borderRadius: '6px'
                                }}
                              >
                                <span
                                  style={{
                                    color: '#FFFFFF',
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: '500',
                                    fontSize: '10px',
                                    //lineHeight: '15px',
                                    margin: '6px 0px'
                                  }}
                                >
                                  Recommend
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className='row'>
                            <div
                              className='col-5 d-flex justify-content-center'
                              style={{
                                //paddingRight: '0',
                                background: 'rgba(174, 200, 237, 0.42)'
                              }}
                            >
                              {/* <div
                                className='d-flex justify-content-center'
                                // style={{
                                //   //,
                                //   //borderRadius: '0px 0px 0px 16px'
                                // }}
                              > */}
                              <span
                                style={{
                                  fontFamily: 'Poppins',
                                  fontStyle: 'normal',
                                  fontWeight: '500',
                                  fontSize: '18px',
                                  //lineHeight: '27px',
                                  margin: '6px 0px'
                                }}
                              >
                                Product Manager
                              </span>
                              {/* </div> */}
                            </div>
                            <div
                              className='col-4 d-flex justify-content-center'
                              style={{
                                background: 'rgba(174, 200, 237, 0.42)'
                              }}
                            >
                              {/* <div
                                className='d-flex justify-content-center'
                                // style={{
                                //   background: 'rgba(174, 200, 237, 0.42)'
                                // }}
                              > */}
                              <span
                                style={{
                                  fontFamily: 'Poppins',
                                  fontStyle: 'normal',
                                  fontWeight: '500',
                                  fontSize: '18px',
                                  //lineHeight: '27px',
                                  margin: '6px 0px'
                                }}
                              >
                                2 positions
                              </span>
                              {/* </div> */}
                            </div>
                            <div className='col-3'>
                              <div
                                className='d-flex justify-content-center'
                                style={{
                                  background: '#5B7499',
                                  borderRadius: '6px'
                                }}
                              >
                                <span
                                  style={{
                                    color: '#FFFFFF',
                                    fontFamily: 'Poppins',
                                    fontStyle: 'normal',
                                    fontWeight: '500',
                                    fontSize: '10px',
                                    //lineHeight: '15px',
                                    margin: '6px 0px'
                                  }}
                                >
                                  Recommend
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-5 col-xl-4'>
                      {/* <div
                        className='card shadow mb-4'
                        style={{
                          background: '#FFFFFF',
                          boxShadow: '0px -1px 11px rgba(0, 0, 0, 0.07)',
                          borderRadius: '16px'
                        }}
                      > */}
                      {/* <div
                        className='card-header py-2'
                        style={{
                          borderTopRightRadius: '16px',
                          borderTopLeftRadius: '16px',
                          background: '#5E889F',
                          boxShadow: '0px -1px 11px rgba(0, 0, 0, 0.07)'
                        }}
                      > */}
                      <div
                        className='card-body'
                        style={{
                          background: '#5E889F',
                          borderRadius: '16px 16px 0px 0px',
                          boxShadow: '0px -1px 11px rgba(0, 0, 0, 0.07)'
                        }}
                      >
                        <p
                          style={{
                            fontStyle: 'Poppins',
                            fontWeight: '500',
                            fontSize: '18px',
                            lineHeight: '22px',
                            textAlign: 'center',
                            color: '#FFFFFF',
                            marginBottom: '0'
                          }}
                        >
                          Top Performers
                        </p>
                        <br />
                        {Array.from(Array(5), (e) => {
                          return (
                            <figure className='figure'>
                              <img
                                className='border-dark rounded-circle img-profile justify-content-center'
                                src={profileImg}
                                style={{
                                  boxShadow: 'inset 0px 1px 11px -3px #000000',
                                  margin: '0px 7px'
                                }}
                              />
                              <figcaption
                                className='figure-caption justify-content-center'
                                style={{
                                  fontStyle: 'normal',
                                  fontWeight: '500',
                                  fontSize: '13px',
                                  lineHeight: '19px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  textAlign: 'center',
                                  color: '#FFF2F2',
                                  marginBottom: '0'
                                }}
                              >
                                Nina
                              </figcaption>
                            </figure>
                          );
                        })}
                        {/* <figure className='figure'>
                          <img
                            className='border-dark rounded-circle img-profile justify-content-center'
                            src={profileImg}
                            style={{
                              boxShadow: 'inset 0px 1px 11px -3px #000000',
                              margin: '0px 7px'
                            }}
                          />
                          <figcaption
                            className='figure-caption justify-content-center'
                            style={{
                              fontStyle: 'normal',
                              fontWeight: '500',
                              fontSize: '13px',
                              lineHeight: '19px',
                              display: 'flex',
                              alignItems: 'center',
                              textAlign: 'center',
                              color: '#FFF2F2',
                              marginBottom: '0'
                            }}
                          >
                            Nina
                          </figcaption>
                        </figure>
                        <figure className='figure'>
                          <img
                            className='border-dark rounded-circle img-profile justify-content-center'
                            src={profileImg}
                            style={{
                              boxShadow: 'inset 0px 1px 11px -3px #000000',
                              margin: '0px 7px'
                            }}
                          />
                          <figcaption
                            className='figure-caption justify-content-center'
                            style={{
                              fontStyle: 'normal',
                              fontWeight: '500',
                              fontSize: '13px',
                              lineHeight: '19px',
                              display: 'flex',
                              alignItems: 'center',
                              textAlign: 'center',
                              color: '#FFF2F2',
                              marginBottom: '0'
                            }}
                          >
                            Nina
                          </figcaption>
                        </figure>
                        <figure className='figure'>
                          <img
                            className='border-dark rounded-circle img-profile justify-content-center'
                            src={profileImg}
                            style={{
                              boxShadow: 'inset 0px 1px 11px -3px #000000',
                              margin: '0px 7px'
                            }}
                          />
                          <figcaption
                            className='figure-caption justify-content-center'
                            style={{
                              fontStyle: 'normal',
                              fontWeight: '500',
                              fontSize: '13px',
                              lineHeight: '19px',
                              display: 'flex',
                              alignItems: 'center',
                              textAlign: 'center',
                              color: '#FFF2F2',
                              marginBottom: '0'
                            }}
                          >
                            Nina
                          </figcaption>
                        </figure>
                        <figure className='figure'>
                          <img
                            className='border-dark rounded-circle img-profile justify-content-center'
                            src={profileImg}
                            style={{
                              boxShadow: 'inset 0px 1px 11px -3px #000000',
                              margin: '0px 7px'
                            }}
                          />
                          <figcaption
                            className='figure-caption justify-content-center'
                            style={{
                              fontStyle: 'normal',
                              fontWeight: '500',
                              fontSize: '13px',
                              lineHeight: '19px',
                              display: 'flex',
                              alignItems: 'center',
                              textAlign: 'center',
                              color: '#FFF2F2',
                              marginBottom: '0'
                            }}
                          >
                            Nina
                          </figcaption>
                        </figure> 
                        <figure className='figure'>
                          <img
                            className='border-dark rounded-circle img-profile justify-content-center'
                            src={profileImg}
                            style={{
                              boxShadow: 'inset 0px 1px 11px -3px #000000',
                              margin: '0px 7px'
                            }}
                          />
                          <figcaption
                            className='figure-caption justify-content-center'
                            style={{
                              fontStyle: 'normal',
                              fontWeight: '500',
                              fontSize: '13px',
                              lineHeight: '19px',
                              display: 'flex',
                              alignItems: 'center',
                              textAlign: 'center',
                              color: '#FFF2F2',
                              marginBottom: '0'
                            }}
                          >
                            Nina
                          </figcaption>
                        </figure> */}
                      </div>
                      <div
                        className='card-body'
                        style={{
                          background: '#9E4949',
                          borderRadius: '0px 0px 16px 16px',
                          boxShadow: '0px -1px 11px rgba(0, 0, 0, 0.07)'
                        }}
                      >
                        <p
                          style={{
                            fontStyle: 'Poppins',
                            fontWeight: '500',
                            fontSize: '18px',
                            lineHeight: '22px',
                            textAlign: 'center',
                            color: '#FFFFFF',
                            marginBottom: '0'
                          }}
                        >
                          Bottom Performers
                        </p>
                        <br />
                        {Array.from(Array(5), (e) => {
                          return (
                            <figure className='figure'>
                              <img
                                className='border-dark rounded-circle img-profile justify-content-center'
                                src={profileImg}
                                style={{
                                  boxShadow: 'inset 0px 1px 11px -3px #000000',
                                  margin: '0px 7px'
                                }}
                              />
                              <figcaption
                                className='figure-caption justify-content-center'
                                style={{
                                  fontStyle: 'normal',
                                  fontWeight: '500',
                                  fontSize: '13px',
                                  lineHeight: '19px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  textAlign: 'center',
                                  color: '#FFF2F2',
                                  marginBottom: '0'
                                }}
                              >
                                Nina
                              </figcaption>
                            </figure>
                          );
                        })}
                        {/* <figure className='figure'>
                          <img
                            className='border-dark rounded-circle img-profile justify-content-center'
                            src={profileImg}
                            style={{
                              boxShadow: 'inset 0px 1px 11px -3px #000000',
                              margin: '0px 7px'
                            }}
                          />
                          <figcaption
                            className='figure-caption justify-content-center'
                            style={{
                              fontStyle: 'normal',
                              fontWeight: '500',
                              fontSize: '13px',
                              lineHeight: '19px',
                              display: 'flex',
                              alignItems: 'center',
                              textAlign: 'center',
                              color: '#FFF2F2',
                              marginBottom: '0'
                            }}
                          >
                            Nina
                          </figcaption>
                        </figure>
                        <figure className='figure'>
                          <img
                            className='border-dark rounded-circle img-profile justify-content-center'
                            src={profileImg}
                            style={{
                              boxShadow: 'inset 0px 1px 11px -3px #000000',
                              margin: '0px 7px'
                            }}
                          />
                          <figcaption
                            className='figure-caption justify-content-center'
                            style={{
                              fontStyle: 'normal',
                              fontWeight: '500',
                              fontSize: '13px',
                              lineHeight: '19px',
                              display: 'flex',
                              alignItems: 'center',
                              textAlign: 'center',
                              color: '#FFF2F2',
                              marginBottom: '0'
                            }}
                          >
                            Nina
                          </figcaption>
                        </figure>
                        <figure className='figure'>
                          <img
                            className='border-dark rounded-circle img-profile justify-content-center'
                            src={profileImg}
                            style={{
                              boxShadow: 'inset 0px 1px 11px -3px #000000',
                              margin: '0px 7px'
                            }}
                          />
                          <figcaption
                            className='figure-caption justify-content-center'
                            style={{
                              fontStyle: 'normal',
                              fontWeight: '500',
                              fontSize: '13px',
                              lineHeight: '19px',
                              display: 'flex',
                              alignItems: 'center',
                              textAlign: 'center',
                              color: '#FFF2F2',
                              marginBottom: '0'
                            }}
                          >
                            Nina
                          </figcaption>
                        </figure>
                        <figure className='figure'>
                          <img
                            className='border-dark rounded-circle img-profile justify-content-center'
                            src={profileImg}
                            style={{
                              boxShadow: 'inset 0px 1px 11px -3px #000000',
                              margin: '0px 7px'
                            }}
                          />
                          <figcaption
                            className='figure-caption justify-content-center'
                            style={{
                              fontStyle: 'normal',
                              fontWeight: '500',
                              fontSize: '13px',
                              lineHeight: '19px',
                              display: 'flex',
                              alignItems: 'center',
                              textAlign: 'center',
                              color: '#FFF2F2',
                              marginBottom: '0'
                            }}
                          >
                            Nina
                          </figcaption>
                        </figure>
                        <figure className='figure'>
                          <img
                            className='border-dark rounded-circle img-profile justify-content-center'
                            src={profileImg}
                            style={{
                              boxShadow: 'inset 0px 1px 11px -3px #000000',
                              margin: '0px 7px'
                            }}
                          />
                          <figcaption
                            className='figure-caption justify-content-center'
                            style={{
                              fontStyle: 'normal',
                              fontWeight: '500',
                              fontSize: '13px',
                              lineHeight: '19px',
                              display: 'flex',
                              alignItems: 'center',
                              textAlign: 'center',
                              color: '#FFF2F2',
                              marginBottom: '0'
                            }}
                          >
                            Nina
                          </figcaption>
                        </figure> */}
                      </div>
                      {/* </div> */}
                    </div>
                  </div>
                </div>

                <div class='col-lg-5 col-xl-4'>
                  {/* <div className='row ml-5'> */}
                  <div class='card shadow mb-4'>
                    <DashboardCalendarStyle className='text-center overflow-auto'>
                      <Calendar
                        inline
                        value={today}
                        onChange={(e) => setToday(e.value)}
                        //footerTemplate={footer}
                      ></Calendar>
                    </DashboardCalendarStyle>
                    {/* </div> */}
                  </div>

                  {/* <div className='row ml-5'> */}
                  <Link to='/teams'>
                    <div
                      className='card shadow mb-4'
                      style={{
                        background: '#FFFFFF',
                        boxShadow: '0px -1px 11px rgba(0, 0, 0, 0.07)',
                        borderRadius: '16px'
                      }}
                    >
                      <div
                        className='card-header py-3'
                        style={{
                          borderTopRightRadius: '16px',
                          borderTopLeftRadius: '16px',
                          background: '#ffffff',
                          boxShadow: '0px -1px 11px rgba(0, 0, 0, 0.07)'
                        }}
                      >
                        <h6
                          className='text-primary font-weight-bold m-0'
                          style={{
                            fontStyle: 'normal',
                            fontWeight: 500,
                            fontSize: '18px',
                            lineHeight: '22px',
                            textAlign: 'center',
                            color: '#FFFFFF'
                          }}
                        >
                          Teams
                        </h6>
                      </div>
                      <div
                        className='card-body'
                        style={{
                          background: '#ffffff',
                          borderRadius: '0px 0px 16px 16px'
                        }}
                      >
                        {/* <div className='row'> */}
                        {teamList?.slice(0, 8).map((data) => {
                          return (
                            <figure
                              className='figure'
                              style={{
                                background: '#464646',
                                borderRadius: '15px',
                                flex: 'none',
                                order: 0,
                                flexGrow: 0,
                                marginLeft: '0px', //originally 40
                                marginTop: '14px',
                                marginBottom: '14px',
                                marginRight: '30px'
                              }}
                            >
                              <img
                                className='img-fluid figure-img'
                                src=''
                                onError={(e) =>
                                  (e.target.src =
                                    'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
                                }
                                style={{
                                  borderRadius: '14px',
                                  height: '60px',
                                  width: '60px'
                                }}
                                alt=''
                              />
                              <figcaption
                                className='figure-caption text-center'
                                style={{
                                  fontFamily: 'cursive',
                                  fontStyle: 'normal',
                                  fontWeight: 500,
                                  fontSize: '9px',
                                  lineHeight: '13px',
                                  color: '#ffffff'
                                }}
                              >
                                {data?.teamName}
                              </figcaption>
                            </figure>
                          );
                        })}
                        {teamList.length > 8 ? (
                          <i class='fa-light fa-circle-plus'></i>
                        ) : (
                          ''
                        )}
                        {/* <figure
                        className='figure'
                        style={{
                          background: '#464646',
                          borderRadius: '15px',
                          flex: 'none',
                          order: 0,
                          flexGrow: 0,
                          marginLeft: '0px', //originally 40
                          marginTop: '14px',
                          marginBottom: '14px',
                          marginRight: '30px'
                        }}
                      >
                        <img
                          className='img-fluid figure-img'
                          src={profileImg}
                          style={{ borderRadius: '14px' }}
                        />
                        <figcaption
                          className='figure-caption text-center'
                          style={{
                            fontFamily: 'cursive',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            fontSize: '9px',
                            lineHeight: '13px',
                            color: '#ffffff'
                          }}
                        >
                          Nina
                        </figcaption>
                      </figure>
                      <figure
                        className='figure'
                        style={{
                          background: '#464646',
                          borderRadius: '15px',
                          flex: 'none',
                          order: 0,
                          flexGrow: 0,
                          marginLeft: '0px',
                          marginTop: '14px',
                          marginBottom: '14px',
                          marginRight: '30px'
                        }}
                      >
                        <img
                          className='img-fluid figure-img'
                          src={profileImg}
                          style={{ borderRadius: '14px' }}
                        />
                        <figcaption
                          className='figure-caption text-center'
                          style={{
                            fontFamily: 'cursive',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            fontSize: '9px',
                            lineHeight: '13px',
                            alignItems: 'center',
                            color: '#ffffff'
                          }}
                        >
                          Nina
                        </figcaption>
                      </figure>
                      <figure
                        className='figure'
                        style={{
                          background: '#464646',
                          borderRadius: '15px',
                          flex: 'none',
                          order: 0,
                          flexGrow: 0,
                          marginLeft: '0px',
                          marginTop: '14px',
                          marginBottom: '14px',
                          marginRight: '30px'
                        }}
                      >
                        <img
                          className='img-fluid figure-img'
                          src={profileImg}
                          style={{ borderRadius: '14px' }}
                        />
                        <figcaption
                          className='figure-caption text-center'
                          style={{
                            fontFamily: 'cursive',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            fontSize: '9px',
                            lineHeight: '13px',
                            alignItems: 'center',
                            color: '#ffffff'
                          }}
                        >
                          Nina
                        </figcaption>
                      </figure>
                      <figure
                        className='figure'
                        style={{
                          background: '#464646',
                          borderRadius: '15px',
                          flex: 'none',
                          order: 0,
                          flexGrow: 0,
                          marginLeft: '0px',
                          marginTop: '14px',
                          marginBottom: '14px',
                          marginRight: '30px' //originally 40
                        }}
                      >
                        <img
                          className='img-fluid figure-img'
                          src={profileImg}
                          style={{ borderRadius: '14px' }}
                        />
                        <figcaption
                          className='figure-caption text-center'
                          style={{
                            fontFamily: 'cursive',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            fontSize: '9px',
                            lineHeight: '13px',
                            alignItems: 'center',
                            color: '#ffffff'
                          }}
                        >
                          Nina
                        </figcaption>
                      </figure>
                      {/* </div> */}
                        {/* <div className='row'> */}
                        {/*
                      <figure
                        className='figure'
                        style={{
                          background: '#464646',
                          borderRadius: '15px',
                          flex: 'none',
                          order: 0,
                          flexGrow: 0,
                          marginLeft: '0px', //originally 40
                          marginTop: '14px',
                          marginBottom: '14px',
                          marginRight: '30px'
                        }}
                      >
                        <img
                          className='img-fluid figure-img'
                          src={profileImg}
                          style={{ borderRadius: '14px' }}
                        />
                        <figcaption
                          className='figure-caption text-center'
                          style={{
                            fontFamily: 'cursive',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            fontSize: '9px',
                            lineHeight: '13px',
                            alignItems: 'center',
                            color: '#ffffff'
                          }}
                        >
                          Nina
                        </figcaption>
                      </figure>
                      <figure
                        className='figure'
                        style={{
                          background: '#464646',
                          borderRadius: '15px',
                          flex: 'none',
                          order: 0,
                          flexGrow: 0,
                          marginLeft: '0px',
                          marginTop: '14px',
                          marginBottom: '14px',
                          marginRight: '30px'
                        }}
                      >
                        <img
                          className='img-fluid figure-img'
                          src={profileImg}
                          style={{ borderRadius: '14px' }}
                        />
                        <figcaption
                          className='figure-caption text-center'
                          style={{
                            fontFamily: 'cursive',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            fontSize: '9px',
                            lineHeight: '13px',
                            alignItems: 'center',
                            color: '#ffffff'
                          }}
                        >
                          Nina
                        </figcaption>
                      </figure>
                      <figure
                        className='figure'
                        style={{
                          background: '#464646',
                          borderRadius: '15px',
                          flex: 'none',
                          order: 0,
                          flexGrow: 0,
                          marginLeft: '0px',
                          marginTop: '14px',
                          marginBottom: '14px',
                          marginRight: '30px'
                        }}
                      >
                        <img
                          className='img-fluid figure-img'
                          src={profileImg}
                          style={{ borderRadius: '14px' }}
                        />
                        <figcaption
                          className='figure-caption text-center'
                          style={{
                            fontFamily: 'cursive',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            fontSize: '9px',
                            lineHeight: '13px',
                            alignItems: 'center',
                            color: '#ffffff'
                          }}
                        >
                          Nina
                        </figcaption>
                      </figure>
                      <figure
                        className='figure'
                        style={{
                          background: '#464646',
                          borderRadius: '15px',
                          flex: 'none',
                          order: 0,
                          flexGrow: 0,
                          marginLeft: '0px',
                          marginTop: '14px',
                          marginBottom: '14px',
                          marginRight: '30px' //originally 40
                        }}
                      >
                        <img
                          className='img-fluid figure-img'
                          src={profileImg}
                          style={{ borderRadius: '14px' }}
                        />
                        <figcaption
                          className='figure-caption text-center'
                          style={{
                            fontFamily: 'cursive',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            fontSize: '9px',
                            lineHeight: '13px',
                            alignItems: 'center',
                            color: '#ffffff'
                          }}
                        >
                          Nina
                        </figcaption>
                      </figure> */}
                        {/* </div> */}
                      </div>
                    </div>
                  </Link>
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <a className='border rounded d-inline scroll-to-top' href='#page-top'>
        <i className='fas fa-angle-up'></i>
      </a> */}
      <script src='assets/js/jquery.min.js'></script>
      <script src='assets/bootstrap/js/bootstrap.min.js'></script>
      <script src='assets/js/chart.min.js'></script>
      <script src='assets/js/bs-init.js'></script>
      <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.4.1/jquery.easing.js'></script>
      <script src='assets/js/theme.js'></script>
    </>
  );
};

export default ManDash;
