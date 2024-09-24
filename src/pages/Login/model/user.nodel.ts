export interface IUser {
  username?: string;
  password?: string;
  isChecked: boolean;
  reTypePassword?: string;
  passWordHint?: string;
  fullName?: string;
}

const INIT_USER_MODEL: IUser = {
  username: 'nhhoang5@tma.com.vn',
  password: '12345',
  isChecked: false,
  reTypePassword: '',
  fullName: '',
  passWordHint: '',
};

export default INIT_USER_MODEL;
