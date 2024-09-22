import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import TextField from '../../components/TextField/TextField';
import bcx from '../../utils/bindingClassNames';
import Checkbox from '../../components/Checkbox/Checkbox';
import Button from '../../components/Button/Button';
import INIT_USER_MODEL, { IUser } from './model/user.nodel';

import styles from './login.module.css';
import Spinner from '../../components/LoadingSpinner/LoadingSpinner';
import useLoading from '../../hooks/useLoading';
import { CREATE_USER } from '../../constant/api';

const cls = bcx(styles);

const CREATED_STATUS = 201;

const LoginPage = () => {
  const [isLoading, setIsLoading] = useLoading();
  const [dataInfor, setDataInfor] = useState(INIT_USER_MODEL);
  const [signUp, setSignUp] = useState(false);
  const [errors, setErrors] = useState(INIT_USER_MODEL);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;

    setDataInfor((prev) => {
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };
    });

    setErrors((prev) => {
      return {
        ...prev,
        [name]: '',
      };
    });
  };

  const handleSignInSignUp = () => {
    setIsLoading(true);
    setSignUp((prev) => !prev);
    setDataInfor(INIT_USER_MODEL);
    setErrors(INIT_USER_MODEL);
  };

  const validate = () => {
    const newErrors: any = {};

    if (!dataInfor.username) {
      newErrors.username = 'Email or username is required';
    } else if (/\s/.test(dataInfor.username)) {
      newErrors.username = 'Email or username cannot contain spaces';
    } else if (dataInfor.username.length < 4) {
      newErrors.username = 'Email or username must be at least 4 characters long';
    }

    if (!dataInfor.password) {
      newErrors.password = 'Password is required';
    } else if (dataInfor.password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters long';
    }

    if (signUp) {
      if (!dataInfor.reTypePassword) {
        newErrors.reTypePassword = 'Please confirm your password';
      } else if (dataInfor.reTypePassword !== dataInfor.password) {
        newErrors.reTypePassword = 'Passwords do not match';
      } else if (dataInfor.reTypePassword.length < 4) {
        newErrors.reTypePassword = 'Re-type password must be at least 4 characters long';
      }

      if (!dataInfor.passWordHint) {
        newErrors.passWordHint = 'Password hint is required';
      } else if (dataInfor.passWordHint.length < 4) {
        newErrors.passWordHint = 'Password hint must be at least 4 characters long';
      }
    }

    return newErrors;
  };

  const handleSubmitForm = () => {
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    if (signUp) {
      registerUser();
    }
  };

  const registerUser = async () => {
    try {
      const { username: email, password, passWordHint, reTypePassword, fullName }: IUser = dataInfor;
      const userObject = { email, password, passWordHint, reTypePassword, fullName };
      const response = await axios.post(CREATE_USER, userObject);
      if (response?.status === CREATED_STATUS) {
        setSignUp(false);
        setIsLoading(true);
      }
    } catch (error: any) {
      // Handle error (user already exists or other errors)
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 409) {
          // User already exists
          console.error('Error: User already exists');
          alert('User already exists, please try another email');
        } else {
          // Other server-side errors
          console.error('Error:', error.response.data.message);
          alert('An error occurred: ' + error.response.data.message);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error: No response received from server');
        alert('No response from the server. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
        alert('An unexpected error occurred.');
      }
    }
  };

  return (
    <>
      <div className={cls('login-container')}>
        <div className={cls('login-inputs')}>
          <div className={cls(['login-image', 'login-item'])}></div>
          <div className={cls(['login-information', 'login-item'])}>
            <div className={cls(['wrapper', isLoading ? 'disappear' : 'appear'])}>
              {isLoading ? (
                <div style={{ margin: 'auto' }}>
                  <Spinner />
                </div>
              ) : (
                <>
                  <span className={cls('title-login')}>
                    {!signUp ? 'Login to your Account' : 'Join Our Membership!'}
                  </span>
                  <TextField
                    label="Email"
                    id="email"
                    name="username"
                    placeholder="Input email or username"
                    value={dataInfor.username}
                    onChange={handleChange}
                    error={errors.username}
                  />
                  <TextField
                    label="Password"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Input your password"
                    value={dataInfor.password}
                    error={errors.password}
                    onChange={handleChange}
                  />
                  {signUp ? (
                    <>
                      <TextField
                        label="Re-type Password"
                        id="reTypePassword"
                        showPassword={false}
                        type="password"
                        error={errors.reTypePassword}
                        name="reTypePassword"
                        placeholder="Re-type password"
                        value={dataInfor.reTypePassword}
                        onChange={handleChange}
                      />
                      <TextField
                        label="Password Hint"
                        id="passWordHint"
                        error={errors.passWordHint}
                        showPassword={false}
                        type="password"
                        name="passWordHint"
                        placeholder="Backup this to find your password"
                        value={dataInfor.passWordHint}
                        onChange={handleChange}
                      />
                      <TextField
                        label="Full Name"
                        id="fullName"
                        error={errors.fullName}
                        name="fullName"
                        placeholder="What is your name?"
                        value={dataInfor.fullName}
                        onChange={handleChange}
                      />
                    </>
                  ) : null}
                  {!signUp ? (
                    <div className={cls('remember-me')}>
                      <Checkbox
                        label="Remember me"
                        name="isChecked"
                        checked={dataInfor.isChecked}
                        onChange={handleChange}
                      />
                      <Link className={cls('forgot-passwd')} to="/forgot-password">
                        Forgot password?
                      </Link>
                    </div>
                  ) : null}
                  <div className={cls('login-button')}>
                    <Button text={signUp ? 'Register' : 'Login'} style={{ width: 200 }} onClick={handleSubmitForm} />
                    <div className={cls('signup-wrapper')}>
                      {!signUp ? <p>Don't have an account? </p> : <p>Already has an account? </p>}
                      <Button onClick={handleSignInSignUp} text={!signUp ? 'Register' : 'Login'} type="link" />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
