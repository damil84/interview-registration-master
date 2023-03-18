import type { ChangeEventHandler, FC, HTMLInputTypeAttribute } from 'react';

interface InputProps {
  type?: HTMLInputTypeAttribute;
  name?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const Input: FC<InputProps> = ({ type = 'text', name, value, onChange }) => {
  return <input name={name} type={type} value={value} onChange={onChange} />;
};
