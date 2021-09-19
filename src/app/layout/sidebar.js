import Fade from '@material-ui/core/Fade';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import dashboardIconWhite from '../../assets/images/icons/dashboard-white.svg';
import dashboardIcon from '../../assets/images/icons/dashboard.svg';
import logo from '../../assets/images/IMATMIEngine.svg';
import styled from 'styled-components';
import { logout } from '../core/actions/authentication';
import { Pages } from '../shared/constants/routes';

const ProfileMenuLink = styled.div`
  .MuiButtonBase-root a {
    font-family: 'Poppins', 'Roboto', sans-serif !important;
    font-size: 14px;
    line-height: 16px;
    background-color: #fff;
    color: #333;
  }
`;

const Sidebar = ({ auth: { isAuthenticated, authLoading }, logout }) => {
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
      title: 'Profile',
      path: Pages.profile.link,
      icon: dashboardIcon,
      iconHover: dashboardIconWhite
    }
  ];

  const location = useLocation();

  const sidebarCollapsed = localStorage.getItem('sidebar-collapsed');
  const [isExpanded, setIsExpanded] = useState(sidebarCollapsed ? true : false);

  const handleToggler = () => {
    setIsExpanded(isExpanded ? false : true);
    localStorage.setItem('sidebar-collapsed', isExpanded ? true : false);
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
    <div className={isExpanded ? 'sidebar' : 'sidebar collapsed'}>
      <ul className='sidebar-nav'>
        <li className='sidebar-nav-item'>
          <div className='sidebar-nav-link'>
            <div>
              <i
                id='toggleButton'
                className={isExpanded ? 'fas fa-times' : 'fas fa-bars'}
                onClick={handleToggler}
              ></i>
            </div>
            <span>
              <img src={logo} alt='Card'></img>
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
        </li>
        <li className='sidebar-nav-item'>
          <Link
            to={Pages.landingPage.link}
            className='sidebar-nav-link'
            onClick={() => {
              logout();
              setIsExpanded(false);
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
  );
  return (
    <>
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
  profile: state.profile
});
export default connect(mapStateToProps, { logout })(Sidebar);
