import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from 'src/app/core/actions/authentication';
import { setAlert } from 'src/app/core/actions/alert';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const checkCredentials = () => {
  console.log('Invalid Cred');
};
const Login = ({ login, setAlert, isAuthenticated }) => {
  // const [formData, setFormData] = useState({
  //   email: '',
  //   password: ''
  // }); //state of the form

  // const [validCred, setValidCred] = useState(true);

  // const { email, password } = formData;

  // const onChange = (e) =>
  //   setFormData({ ...formData, [e.target.name]: e.target.value });

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   login({ email, password });
  //   console.log(validCred);
  // };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password should be at least 6 characters long')
        .required('Password is required')
    }),
    onSubmit: (values) => {
      login(values);
      console.log(values);
    }
  });
  // console.log(login.checkCred);
  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <section className='container-login'>
        <h1 className='medium text-primary'>Sign In</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Sign Into Your Account
        </p>
        <form className='form' onSubmit={formik.handleSubmit}>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email'
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
          {/* {validCred ? '' : <p>Invalid Credentials</p>} */}
          <input type='submit' className='btn btn-primary' value='Login' />
        </form>
        <p className='my-1'>
          Don't have an account? <Link to='/register'>Sign Up</Link>
        </p>
      </section>
    </Fragment>
  );
};
Login.prototype = {
  login: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { login, setAlert })(Login);
