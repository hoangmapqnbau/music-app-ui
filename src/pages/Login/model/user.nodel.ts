export interface IUser {
  username?: string;
  password?: string;
  reTypePassword?: string;
  passWordHint?: string;
  fullName?: string;
  isLogged?: boolean;
  userId?: string;
  authenticated?: boolean;
}

const INIT_USER_MODEL: IUser = {
  username: '',
  password: '',
  reTypePassword: '',
  fullName: '',
  passWordHint: '',
  userId: '',
  isLogged: false,
};

export default INIT_USER_MODEL;
