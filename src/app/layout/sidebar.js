import Fade from '@material-ui/core/Fade';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import actionPlanIconWhite from 'src/assets/images/icons/action-plan-white.svg';
import actionPlanIcon from 'src/assets/images/icons/action-plan.svg';
import calenderIconWhite from 'src/assets/images/icons/calender-white.svg';
import calenderIcon from 'src/assets/images/icons/calender.svg';
import dashboardIconWhite from 'src/assets/images/icons/dashboard-white.svg';
import dashboardIcon from 'src/assets/images/icons/dashboard.svg';
import goalsIconWhite from 'src/assets/images/icons/goals-white.svg';
import goalsIcon from 'src/assets/images/icons/goals.svg';
import logo from 'src/assets/images/IMATMIEngine.svg';
import ImatmiLogo from 'src/assets/images/IMATMI.png';
import styled from 'styled-components';
import { logout } from '../core/actions/authentication';
import { Pages } from '../shared/constants/routes';
import { propTypes } from 'react-bootstrap/esm/Image';

const ProfileMenuLink = styled.div`
  .MuiButtonBase-root a {
    font-family: 'Poppins', 'Roboto', sans-serif !important;
    font-size: 14px;
    line-height: 16px;
    background-color: #fff;
    color: #333;
  }
`;

const Sidebar = ({
  auth: { isAuthenticated, authLoading },
  profile: { profileLoading, directReports, isManager },
  logout,
  getExpandedData,
  roleName,
  organizationName
}) => {
  const sideBarData = [
    {
      id: 1,
      title: 'Dashboard',
      path: Pages.dashboard.link,
      icon: dashboardIcon,
      iconHover: dashboardIconWhite
    },
    {
      id: 2,
      title: 'Action Plan',
      path: Pages.actionPlan.link,
      icon: actionPlanIcon,
      iconHover: actionPlanIconWhite
    },
    {
      id: 3,
      title: 'Goals',
      path: Pages.developmentGoal.link,
      icon: goalsIcon,
      iconHover: goalsIconWhite
    },
    {
      id: 4,
      title: 'Calender',
      path: Pages.calender.link,
      icon: calenderIcon,
      iconHover: calenderIconWhite
    },
    // {
    //   id: 5,
    //   title: 'Teams',
    //   path: Pages.teams.link,
    //   icon: null,
    //   iconHover: null,
    //   fontIcon: 'fas fa-users text-gray'
    // },
    {
      id: 6,
      title: 'Skill Module',
      path: Pages.skillModules.link.replace(':id', 'parent'),
      icon: dashboardIcon,
      iconHover: dashboardIconWhite
    },
    // {
    //   id: 5,
    //   title: 'IJP',
    //   path: '/ijp',
    //   icon: ijpIcon,
    //   iconHover: ijpIconWhite
    // },
    // {
    //   id: 6,
    //   title: 'Profile',
    //   path: Pages.profile.link,
    //   icon: ijpIcon,
    //   iconHover: ijpIconWhite
    // }
    {
      id: 12,
      title: 'Survey',
      path: '/survey',
      icon: null,
      iconHover: null
    },
    {
      id: 13,
      title: 'Personality Survey',
      path: '/personality-match',
      icon: null,
      iconHover: null
    }
  ];

  const AdminSideBarData = [
    {
      id: 7,
      title: 'Grant Access',
      path: Pages.grantReq.link,
      icon: null,
      iconHover: null
    },
    {
      id: 9,
      title: 'Roles',
      path: Pages.roles.link,
      icon: null,
      iconHover: null
    }
  ];

  const ImatmiAdminSideBarData = [
    {
      id: 8,
      title: 'Create Organization',
      path: Pages.createOrganization.link,
      icon: null,
      iconHover: null
    }
  ];

  const ManagerSideBar = [
    {
      id: 10,
      title: 'Manager dashboard',
      path: '/ManDash',
      icon: null,
      iconHover: null
    },
    {
      id: 11,
      title: 'Best Fit',
      path: Pages.Bestfit.link,
      icon: null,
      iconHover: null
    }
  ];

  const location = useLocation();

  const sidebarCollapsed = localStorage.getItem('sidebar-collapsed');
  const [isExpanded, setIsExpanded] = useState(sidebarCollapsed ? true : false);

  const handleToggler = () => {
    getExpandedData(isExpanded ? false : true);
    setIsExpanded(isExpanded ? false : true);
    localStorage.setItem('sidebar-collapsed', isExpanded ? true : false);
  };

  const handleToggleForHover = () => {
    localStorage.setItem('sidebar-collapsed', isExpanded ? true : false);
    setIsExpanded(isExpanded ? false : true);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const sideWrapper = (
    <>
      <div className='sidebar-nav-link'>
        <div>
          <i
            id='toggleButton'
            className='fas fa-bars'
            onClick={handleToggler}
            style={{ cursor: 'pointer' }}
          ></i>
        </div>
        {/* <span>
          <img
            src={ImatmiLogo}
            style={{ width: '110px', height: '32px' }}
            alt='Card'
          ></img>
        </span> */}
      </div>
      <div className={isExpanded ? 'sidebar' : 'sidebar collapsed'}>
        <ul className='sidebar-nav'>
          <li className='sidebar-nav-item'>
            <div className='sidebar-nav-link'>
              <div>
                <i
                  id='toggleButton'
                  className='fas fa-times'
                  onClick={handleToggler}
                  style={{ cursor: 'pointer' }}
                ></i>
              </div>
              <span>
                <img
                  src={ImatmiLogo}
                  style={{ width: '110px', height: '32px' }}
                  alt='Card'
                ></img>
              </span>
            </div>
          </li>
          {sideBarData.map((item, index) => {
            return (
              <li className='sidebar-nav-item' key={item.id}>
                <Link
                  to={item.path}
                  className={
                    location.pathname == item.path
                      ? 'sidebar-nav-link active'
                      : 'sidebar-nav-link'
                  }
                  onClick={() => {
                    setIsExpanded(false);
                    getExpandedData(false);
                  }}
                >
                  <div className='item-center'>
                    {item?.icon ? (
                      <img src={item.icon} alt='Card'></img>
                    ) : (
                      <i className={item?.fontIcon}></i>
                    )}
                  </div>
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
          {roleName === 'Admin' &&
            AdminSideBarData.map((item, index) => {
              return (
                <li className='sidebar-nav-item' key={item.id}>
                  <Link
                    to={item.path}
                    className={
                      location.pathname == item.path
                        ? 'sidebar-nav-link active'
                        : 'sidebar-nav-link'
                    }
                    onClick={() => {
                      setIsExpanded(false);
                      getExpandedData(false);
                    }}
                  >
                    <div className='item-center'>
                      {item?.icon ? (
                        <img src={item.icon} alt='Card'></img>
                      ) : (
                        <i className={item?.fontIcon}></i>
                      )}
                    </div>
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          {roleName === 'Admin' &&
            organizationName === 'IMATMI' &&
            ImatmiAdminSideBarData.map((item, index) => {
              return (
                <li className='sidebar-nav-item' key={item.id}>
                  <Link
                    to={item.path}
                    className={
                      location.pathname == item.path
                        ? 'sidebar-nav-link active'
                        : 'sidebar-nav-link'
                    }
                    onClick={() => {
                      setIsExpanded(false);
                      getExpandedData(false);
                    }}
                  >
                    <div className='item-center'>
                      {item?.icon ? (
                        <img src={item.icon} alt='Card'></img>
                      ) : (
                        <i className={item?.fontIcon}></i>
                      )}
                    </div>
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          {roleName === 'Manager' &&
            ManagerSideBar.map((item, index) => {
              return (
                <li className='sidebar-nav-item' key={item.id}>
                  <Link
                    to={item.path}
                    className={
                      location.pathname == item.path
                        ? 'sidebar-nav-link active'
                        : 'sidebar-nav-link'
                    }
                    onClick={() => {
                      setIsExpanded(false);
                      getExpandedData(false);
                    }}
                  >
                    <div className='item-center'>
                      {item?.icon ? (
                        <img src={item.icon} alt='Card'></img>
                      ) : (
                        <i className={item?.fontIcon}></i>
                      )}
                    </div>
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          {isManager && (
            <li className='sidebar-nav-item mt-auto'>
              <div
                className='sidebar-nav-link dropdown'
                aria-controls='simple-menu'
                aria-haspopup='true'
                onClick={handleClick}
              >
                <div className='dropbtn item-center'>
                  <i className='fas fa-users text-dark'></i>
                </div>
              </div>
              <Menu
                id='fade-menu'
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <ProfileMenuLink>
                  <MenuItem onClick={handleClose}>
                    <i className='fas fa-user-tie mr-2 py-1'></i>
                    <Link
                      to={Pages.profile.link}
                      className='text-dark font-weight-bold py-1 px-2'
                    >
                      Profile
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <i className='fas fa-cog mr-2 py-1'></i>
                    <Link className='text-dark font-weight-bold py-1 px-2'>
                      Settings
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <i className='fas fa-sign-out-alt mr-2 py-1'></i>
                    <Link
                      onClick={logout}
                      to={Pages.landingPage.link}
                      className='text-dark font-weight-bold py-1 px-2'
                    >
                      Logout
                    </Link>
                  </MenuItem>
                </ProfileMenuLink>
              </Menu>
            </li>
          )}

          <li
            className={
              isManager ? 'sidebar-nav-item' : 'sidebar-nav-item mt-auto'
            }
          >
            <Link
              to={Pages.profile.link}
              className={
                location.pathname == Pages.profile.link
                  ? 'sidebar-nav-link active'
                  : 'sidebar-nav-link'
              }
              onClick={() => {
                setIsExpanded(false);
                getExpandedData(false);
              }}
            >
              <div className='item-center'>
                <i
                  className={
                    location.pathname == Pages.profile.link
                      ? 'fas fa-user-tie mr-2 py-1 text-gray'
                      : 'fas fa-user-tie mr-2 py-1 text-dark'
                  }
                ></i>
              </div>
              <span
                className={
                  location.pathname == Pages.profile.link
                    ? 'text-gray font-weight-bold'
                    : 'text-dark font-weight-bold'
                }
              >
                Profile
              </span>
            </Link>
          </li>
          <li className='sidebar-nav-item'>
            <Link
              to={Pages.setting.link}
              className={
                location.pathname == Pages.setting.link
                  ? 'sidebar-nav-link active'
                  : 'sidebar-nav-link'
              }
              onClick={() => {
                setIsExpanded(false);
                getExpandedData(false);
              }}
            >
              <div className='item-center'>
                <i
                  className='fas fa-cog mr-2 py-1 text-dark'
                  className={
                    location.pathname == Pages.setting.link
                      ? 'fas fa-cog mr-2 py-1 text-gray'
                      : 'fas fa-cog mr-2 py-1 text-dark'
                  }
                ></i>
              </div>
              <span
                className={
                  location.pathname == Pages.setting.link
                    ? 'text-gray font-weight-bold'
                    : 'text-dark font-weight-bold'
                }
              >
                Settings
              </span>
            </Link>
          </li>
          <li className='sidebar-nav-item mb-5'>
            <Link
              to={Pages.landingPage.link}
              className='sidebar-nav-link'
              onClick={() => {
                logout();
                setIsExpanded(false);
                getExpandedData(false);
              }}
            >
              <div className='item-center'>
                <i className='fas fa-sign-out-alt mr-2 py-1 text-dark'></i>
              </div>
              <span className='font-weight-bold text-dark'>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
  return (
    <>
      <div
        onMouseEnter={() => {
          handleToggleForHover(true);
        }}
        style={{
          float: 'left',
          background: 'white',
          width: '5px',
          height: '100vh'
        }}
      ></div>
      {!authLoading && (
        <Fragment>{isAuthenticated ? sideWrapper : null}</Fragment>
      )}
    </>
  );
};
Sidebar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  roleName: state?.auth?.user?.organization?.roleName,
  organizationName: state?.auth?.user?.organization?.organizationName
});
export default connect(mapStateToProps, { logout })(Sidebar);
