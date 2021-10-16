import React from 'react';
import { Link } from 'react-router-dom';

export const GettingStarted = () => {
  return (
    <section
      style={{
        maxHeight: '3000px',
        maxWidth: '600px',
        margin: 'auto',
        padding: '0 2 rem',
        marginTop: '4rem',
        marginBottom: '2rem',
        overflow: 'hidden'
      }}
    >
      <h2 className='text-center'>Getting Started</h2>
      <h6 className='text-center'>
        Welcome! We are here to help you get things rolling
      </h6>
      <br />
      <br />
      <Link to='/CreateProfile'>
        {/* <a href='/CreateProfile'> */}
        <div
          class='card '
          style={{ borderTopRightRadius: '30px', borderTopLeftRadius: '30px' }}
        >
          {' '}
          <div class='d-flex justify-content-evenly'>
            <i
              class='fas fa-user-circle fa-3x'
              style={{
                marginLeft: '4%',
                marginTop: '4%',
                marginBottom: '4%'
              }}
            ></i>
            <div
              style={{
                marginLeft: '4%',
                marginTop: '4%',
                marginBottom: '4%'
              }}
            >
              <h5>Complete your profile</h5>
              <p>Configure your personal and professional data.</p>
            </div>

            <i
              class='fas fa-arrow-circle-right fa-3x'
              style={{
                marginLeft: '20%',
                marginTop: '4%',
                marginBottom: '4%'
              }}
            ></i>
          </div>
        </div>
        {/* </a> */}
      </Link>
      <a href='#'>
        <div class='card'>
          <div class='d-flex justify-content-evenly'>
            <i
              class='fa fa-download fa-3x'
              aria-hidden='true'
              style={{ marginLeft: '4%', marginTop: '4%', marginBottom: '4%' }}
            ></i>
            <div
              style={{ marginLeft: '4%', marginTop: '4%', marginBottom: '4%' }}
            >
              <h5>Import data</h5>
              <p>Don't start empty, import your data and start right away.</p>
            </div>
            <i
              class='fas fa-arrow-circle-right fa-3x'
              style={{ marginLeft: '9%', marginTop: '4%', marginBottom: '4%' }}
            ></i>
          </div>
        </div>
      </a>
      <a href='#'>
        <div class='card'>
          <div class='d-flex justify-content-evenly'>
            <i
              class='fas fa-user-plus fa-3x'
              style={{ marginLeft: '4%', marginTop: '4%', marginBottom: '4%' }}
            ></i>
            <div
              style={{ marginLeft: '4%', marginTop: '4%', marginBottom: '4%' }}
            >
              <h5>Invite team members</h5>
            </div>
            <i
              class='fas fa-arrow-circle-right fa-3x'
              style={{ marginLeft: '37%', marginTop: '4%', marginBottom: '4%' }}
            ></i>
          </div>
        </div>
      </a>
      <a href='/profile'>
        <br />
        <br />
        <p className='text-center'>Skip and continue to Dashboard</p>
      </a>
      <footer class='blockquote-footer' style={{ textAlign: 'center' }}>
        Tip : You can return hereany time from settings menu
      </footer>
    </section>
  );
};
