import { IUser } from '../pages/Login/model/user.nodel';
 
enum FieldName {
  passwdHint = 'Passwrod hint',
  fullName = "Full name"
}

const validateFieldLength = (field?: string, fieldName?: string, minLength: number = 4) => {
  if (!field) return `${fieldName} is required`;
  if (/\s/.test(field) && !FieldName.passwdHint && !FieldName.fullName)
    return `${fieldName} cannot contain spaces`;
  if (field.length < minLength) return `${fieldName} must be at least ${minLength} characters long`;
  return '';
};

const validate = (currentUser: IUser, signUp: boolean) => {
  const newErrors: IUser = {};

  const usernameError = validateFieldLength(currentUser.username, 'Email or username');
  if (usernameError) newErrors.username = usernameError;

  const passwordError = validateFieldLength(currentUser.password, 'Password');
  if (passwordError) newErrors.password = passwordError;

  if (signUp) {
    const reTypePasswordError = currentUser.reTypePassword
      ? currentUser.reTypePassword !== currentUser.password
        ? 'Passwords do not match'
        : validateFieldLength(currentUser.reTypePassword, 'Re-type password')
      : 'Please confirm your password';

    if (reTypePasswordError) newErrors.reTypePassword = reTypePasswordError;

    const passWordHintError = validateFieldLength(currentUser.passWordHint, 'Password hint');
    if (passWordHintError) newErrors.passWordHint = passWordHintError;

    const fullNameError = validateFieldLength(currentUser.fullName, 'Full name');
    if (fullNameError) newErrors.fullName = fullNameError;
  }

  return newErrors;
};

export default validate;
