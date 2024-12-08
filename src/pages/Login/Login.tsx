import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import TextField from '../../components/TextField/TextField';
import bcx from '../../utils/bindingClassNames';
import Checkbox from '../../components/Checkbox/Checkbox';
import Button from '../../components/Button/Button';

import styles from './login.module.css';
import Spinner from '../../components/LoadingSpinner/LoadingSpinner';

import { AUTH_LOGIN_URI, USER_URI } from '../../constant/api';
import INIT_USER_MODEL, { IUser } from './model/user.nodel';
import NotificationToast, { NotificationProps } from '../../components/Notification/Notification';
import { clearUserFields, userLoggedIn } from '../../store/UserStore/UserAction';

import validate from '../../utils/userValidation';
import useLoading from '../../hooks/useLoading';
import useUserContext from '../../hooks/useUserContext';
import { setCookie } from '../../utils/cookie';
import useAuthenticated from '../../hooks/useAuthenticate';

const cls = bcx(styles);

const CREATED_STATUS = 201;
const USER_EXISTS = 'Error: User already exists';

type TNotification = NotificationProps & {
  show: boolean;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useLoading();
  const [signUp, setSignUp] = useState(false);
  const [user, setUser] = useState(INIT_USER_MODEL);
  const [errors, setErrors] = useState(INIT_USER_MODEL);
  const [notification, setNotification] = useState<TNotification>({ show: false, type: 'success', text: '' });
  const timeReference = useRef(0);
  const { dispatch } = useUserContext();
  const { currentUser } = useAuthenticated();

  useEffect(() => {
    if (notification.show) {
      timeReference.current = window.setInterval(() => {
        setNotification({ show: false, type: 'success', text: '' });
      }, 3500);
    }

    return () => {
      clearInterval(timeReference.current);
    };
  }, [notification.show]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((pre) => ({ ...pre, [name]: value }));
    setErrors({ [name]: '' });
  };

  const handleSignInSignUp = () => {
    setIsLoading(true);
    setSignUp((prev) => !prev);
    dispatch(clearUserFields());
    setErrors(INIT_USER_MODEL);
  };

  const handleSubmitForm = () => {
    const formErrors = validate(user, signUp);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    signUp ? registerUser() : loginUser();
  };

  const registerUser = async () => {
    const { username: email, password, passWordHint, reTypePassword, fullName }: IUser = user;
    const userObject = { email: email?.trim(), password, passWordHint, reTypePassword, fullName };

    try {
      const response = await axios.post(USER_URI, userObject);
      handleResponse(response);
    } catch (error: any) {
      handleError(error);
    }
  };

  const handleResponse = (response: any) => {
    if (response?.status === CREATED_STATUS) {
      setSignUp(false);
      setIsLoading(true);
      setNotification({
        show: true,
        type: 'success',
        text: 'User has been registered successfully!!',
      });
    }
  };

  const handleError = (error: any) => {
    if (error.response) {
      const errorMessage = error.response.status === 409 ? USER_EXISTS : error.response.data.message;

      setNotification({
        show: true,
        type: 'error',
        text: errorMessage,
      });
    } else if (error.request) {
      setNotification({
        show: true,
        type: 'error',
        text: 'No response from the server. Please try again later.',
      });
    }
  };

  const loginUser = async () => {
    const { username, password } = user;
    try {
      const response = await axios.post(AUTH_LOGIN_URI, { username, password });

      const { access_token: accessToken, message } = response.data;

      if (!accessToken) {
        triggerNotification('error', message);
        return;
      }

      const { userId, email, fullName } = response.data.userResponse;

      setCookie(accessToken);
      dispatch(userLoggedIn({ userId: userId, username: email, fullName, authenticated: true }));
      localStorage.setItem('user', JSON.stringify(response.data.userResponse));
      navigate('/');
    } catch (error: any) {
      triggerNotification('error', error.message || 'An error occurred');
    }
  };

  useEffect(() => {
    if (currentUser?.authenticated) navigate('/');
  }, [currentUser]);

  const triggerNotification = (type: 'success' | 'error', text: string) => {
    setNotification((prev) => ({
      ...prev,
      show: true,
      type,
      text,
    }));
  };

  return (
    <>
      {notification.show ? <NotificationToast text={notification.text} type={notification.type} /> : null}
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
                    value={user.username}
                    onChange={handleChange}
                    error={errors.username}
                  />
                  <TextField
                    label="Password"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Input your password"
                    value={user.password}
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
                        value={user.reTypePassword}
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
                        value={user.passWordHint}
                        onChange={handleChange}
                      />
                      <TextField
                        label="Full Name"
                        id="fullName"
                        error={errors.fullName}
                        name="fullName"
                        placeholder="What is your name?"
                        value={user.fullName}
                        onChange={handleChange}
                      />
                    </>
                  ) : null}
                  {!signUp ? (
                    <div className={cls('remember-me')}>
                      <Checkbox label="Remember me" name="isChecked" checked={true} onChange={() => console.log(123)} />
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
