import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from 'src/app/core/actions/alert';
import { register } from 'src/app/core/actions/authentication';
import { useFormik } from 'formik';
import * as Yup from 'yup';
const Register = ({ setAlert, register, isAuthenticated }) => {
  // const onChange = (e) =>
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   if (password !== password2) {
  //     setAlert('Passwords do not match', 'danger', 2000);
  //   } else {
  //     register({
  //       name,
  //       email,
  //       password,
  //       talentPassportAccess,
  //       evaluationAccess,
  //       myDevelopmentAccess
  //     });
  //   }
  // };

  // const onHandleCheckboxChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.currentTarget.checked });
  // };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password2: '',
      talentPassportAccess: false,
      evaluationAccess: false,
      myDevelopmentAccess: false
    },
    validationSchema: Yup.object({
      name: Yup.string().required('required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password should be at least 6 characters long'),
      password2: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Passwords must match'
      )
    }),
    onSubmit: (values) => {
      register(values);
      console.log(values);
    }
  });

  // console.log(formik.values);

  if (isAuthenticated) {
    // return <Redirect to='/dashboard' />;
    return <Redirect to='/GettingStarted' />;
  }
  return (
    <Fragment>
      <section className='container-login'>
        <h1 className='medium text-primary'>Sign Up</h1>{' '}
        <p className='lead'>
          <i className='fas fa-user'></i> Create Your Account{' '}
        </p>
        <form className='form' onSubmit={formik.handleSubmit}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.name && formik.errors.name ? (
              <p className='ValidationErrorMsg'>{formik.errors.name}</p>
            ) : null}
          </div>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.email && formik.errors.email ? (
              <p className='ValidationErrorMsg'>{formik.errors.email}</p>
            ) : null}
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              minLength='6'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className='ValidationErrorMsg'>{formik.errors.password}</p>
            ) : null}
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Confirm Password'
              name='password2'
              minLength='6'
              value={formik.values.password2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password2 && formik.errors.password2 ? (
              <p className='ValidationErrorMsg'>{formik.errors.password2}</p>
            ) : null}
          </div>
          <div className='form-group'>
            <div className='checkbox'>
              <input
                type='checkbox'
                placeholder='Talent Passport'
                name='talentPassportAccess'
                value={formik.values.talentPassportAccess}
                onChange={formik.handleChange}
              />
              <label>Talent Passport</label>
            </div>
            <div className='checkbox'>
              <input
                type='checkbox'
                placeholder='Evaluations'
                name='evaluationAccess'
                value={formik.values.evaluationAccess}
                onChange={formik.handleChange}
              />
              <label>Evaluations</label>
            </div>
            <div className='checkbox'>
              <input
                type='checkbox'
                placeholder='My Development'
                name='myDevelopmentAccess'
                value={formik.values.myDevelopmentAccess}
                onChange={formik.handleChange}
              />
              <label>My Development</label>
            </div>
          </div>
          <input type='submit' className='btn btn-primary' value='Register' />{' '}
        </form>
        <p className='my-1'>
          Already have an account? <Link to='/login'>Sign In</Link>{' '}
        </p>
      </section>
    </Fragment>
  );
};
Register.prototype = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { setAlert, register })(Register);
