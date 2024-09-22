import React from 'react';

import bcx from '../../utils/bindingClassNames';

import Styles from './Button.module.css';
const cls = bcx(Styles);

interface ButtonProps {
  text?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  active?: boolean;
  className?: string;
  type?: 'primary' | 'flat' | 'link' | 'outline';
  icon?: JSX.Element;
  style?: React.CSSProperties
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled = false,
  className,
  type = 'primary',
  icon,
  style
}) => {
  return (
    <div className={cls(['button-wrapper', disabled ? "i-disabled" : ''])}>
      <button
        className={cls(['button', className, type])}
        onClick={onClick}
        disabled={disabled}
        style={style}
      >
        {text}
      </button>
      {icon}
    </div>
  );
};

export default Button;
