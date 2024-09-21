import React, { ChangeEvent } from 'react';
import Styles from './Checkbox.module.css';

import bcx from '../../utils/bindingClassNames';

const cls = bcx(Styles);

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, disabled = false, name = '' }) => {
  return (
    <label className={cls('checkbox-wrapper')} >
      <input
        name={name}
        className={cls('checkbox')}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        style={{ marginRight: '8px' }}
      />
      {label ? <p className={cls('label-text')}>{label}</p> : null}
    </label>
  );
};

export default Checkbox;
