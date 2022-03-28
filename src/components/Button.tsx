import React from 'react';
import { ButtonHTMLAttributes } from 'react';
import { FC } from 'react';
import './styles/button.css';
interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className: 'is-active' | 'is-disabled';
  children: string;
  size?: string;
  custom__class?: string;
}

export const Button: FC<IButtonProps> = ({
  className,
  children,
  disabled,
  size,
  custom__class,
  onClick,
}) => {
  return (
    <button
      className={`btn btn--${className} 
      ${size ? `btn--${size}` : ''}
      ${custom__class ? `btn--${custom__class}` : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
