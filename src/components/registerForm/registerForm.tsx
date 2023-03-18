import type { ChangeEvent, FC } from 'react';
import { useCallback, useState } from 'react';

import { Input } from 'components/input/input';

export const RegisterForm: FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setForm(state => ({ ...state, [event.target.name]: event.target.value }));
  }, []);

  const submit = useCallback(() => {
    console.log(form);
  }, [form]);

  return (
    <div>
      <Input name="name" value={form.name} onChange={handleInputChange} />
      <Input name="email" type="email" value={form.email} onChange={handleInputChange} />
      <Input name="password" type="password" value={form.password} onChange={handleInputChange} />
      <Input
        name="passwordConfirm"
        type="password"
        value={form.passwordConfirm}
        onChange={handleInputChange}
      />
      <button type="button" onClick={submit}>
        Mentés
      </button>
    </div>
  );
};
