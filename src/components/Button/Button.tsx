import React from 'react';
import Styles from './Button.module.css';
import bcx from '../../utils/bindingClassNames';

const cls = bcx(Styles);

interface ButtonProps {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  name?: string;
  active?: boolean;
  className?: string;
  type?: 'primary' | 'falt' | 'link' | 'outline';
  icon?: JSX.Element;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled = false,
  name = '',
  active = false,
  className,
  type = 'primary',
  icon,
}) => {
  return (
    <div className={cls('button-wrapper')}>
      <button
        name={name}
        className={cls(['button', active ? 'active' : '', className, type])}
        onClick={onClick}
        disabled={disabled}
        style={{ marginRight: '8px' }}
      >
        {text}
      </button>
      {icon}
    </div>
  );
};

export default Button;
