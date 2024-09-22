export interface IUser {
  username?: string;
  password?: string;
  isChecked: boolean;
  reTypePassword?: string;
  passWordHint?: string;
  fullName?: string;
}

const INIT_USER_MODEL: IUser = {
  username: '',
  password: '',
  isChecked: false,
  reTypePassword: '',
  fullName: '',
  passWordHint: '',
};

export default INIT_USER_MODEL;
