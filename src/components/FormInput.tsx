import React from 'react';
import { InputHTMLAttributes } from 'react';
import { FC } from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  labelClass?: string;
}

export const FormInput: FC<IProps> = ({
  label,
  name,
  type,
  onChange,
  className,
  placeholder,
  value,
  labelClass,
}) => {
  return (
    <>
      {label && (
        <label className={labelClass} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        type={type ? type : 'input'}
        name={name}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
        value={value}
        autoComplete="off"
      />
    </>
  );
};
