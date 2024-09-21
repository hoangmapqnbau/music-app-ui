import { useState } from 'react';
import { Link } from 'react-router-dom';

import TextField from '../../components/TextField/TextField';
import bcx from '../../utils/bindingClassNames';
import Checkbox from '../../components/Checkbox/Checkbox';

import styles from './login.module.css';

const cls = bcx(styles);

const LoginPage = () => {
  const [dataInfor, setDataInfor] = useState({ username: '', password: '', isChecked: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;

    setDataInfor((prev) => {
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  };
  return (
    <>
      <div className={cls('login-container')}>
        <div className={cls('login-inputs')}>
          <div className={cls(['login-image', 'login-item'])}></div>
          <div className={cls(['login-information', 'login-item'])}>
            <div className={cls('wrapper')}>
              <span className={cls('title-login')}>Login to your Account</span>
              <TextField
                label="Email"
                id="email"
                name="username"
                placeholder="Input email or username"
                value={dataInfor.username}
                onChange={handleChange}
              />
              <TextField
                label="Password"
                id="password"
                type="password"
                name="password"
                placeholder="Input your password"
                value={dataInfor.password}
                onChange={handleChange}
              />
              <div className={cls('remember-me')}>
                <Checkbox label="Remember me" name="isChecked" checked={dataInfor.isChecked} onChange={handleChange} />
                <Link className={cls('forgot-passwd')} to="/forgot-password">Forgot password?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
