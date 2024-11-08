import { IUser } from '../../pages/Login/model/user.nodel';
import { CLEAR_USER_FIELDS, LOG_OUT, USER_INFORMATION_INPUT, USER_SIGN_IN} from './UserConstant';

const userEnteringInformation = (payload: IUser) => ({
  type: USER_INFORMATION_INPUT,
  payload,
});

const clearUserFields = () => ({
  type: CLEAR_USER_FIELDS,
});

const userLoggedIn = (payload: IUser) => ({
  type: USER_SIGN_IN,
  payload,
});

const logout = () => ({type: LOG_OUT});


export { userEnteringInformation, clearUserFields, userLoggedIn, logout };
