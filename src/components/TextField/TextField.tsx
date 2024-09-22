import { ChangeEvent, useState } from 'react';
import bcx from '../../utils/bindingClassNames';
import styles from './TextField.module.css';

const cls = bcx(styles);

type TextFieldProps = {
  value?: string;
  name?: string;
  id?: string;
  label?: string;
  classNames?: string;
  showPassword?: boolean;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'checkbox';
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

const TextField: React.FC<TextFieldProps> = ({
  type = 'text',
  id = '',
  label = '',
  placeholder = '',
  classNames,
  value = '',
  name = '',
  showPassword = true,
  error = '',
  onChange,
}) => {
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    if (!value) return;
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  return (
    <div className={cls('i-form-field')}>
      <div className={cls(['i-field', label && 'has-label', value && 'i-hasvalue'])}>
        {label && (
          <label className={cls('label-input')} htmlFor={id}>
            {label}
          </label>
        )}
        <div className={cls('input-wrapper')}>
          <input
            id={id}
            type={inputType}
            value={value}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            className={cls(['input-field', value && 'has-value', classNames, error ? 'i-error' : ''])}
          />
          {type === 'password' && showPassword && (
            <i
              onClick={togglePasswordVisibility}
              className={cls(['show-pass', !value && 'disabled', inputType === 'text' ? 'active' : ''])}
            ></i>
          )}
        </div>
          {error ? <p className={cls('error-message')}>{error}</p> : null}
      </div>
    </div>
  );
};

export default TextField;
