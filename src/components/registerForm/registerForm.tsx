/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

interface FormInputs {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  agree: boolean;
}

export const RegisterForm: FC = () => {
  const schema = yup.object().shape({
    name: yup.string().required().max(40),
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
    confirm_password: yup
      .string()
      .required()
      .min(6)
      .oneOf([yup.ref('password')], 'Passwords must match'),
    agree: yup.boolean().oneOf([true], 'Please agree to our terms'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
  });

  //const onSubmit = handleSubmit(data => console.log(data));

  const onSubmit = handleSubmit(async data => {
    try {
      const response = await axios.post('/api/registration', data);

      console.log(data);
      console.log(response.data);
      //void router.push('/success'); // Redirect to a success page
      alert('Registration successful! Now you can sign in.');
      reset();
    } catch (error: unknown) {
      console.error(error);
      alert('Registration was unsuccessful');
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group headline">
        <label className="hllabel" htmlFor="Headline">
          Get started in minutes
        </label>

        <label className="basiclabel" htmlFor="Basic">
          First, let&apos;s create your account. Once your account has been created you can choose
          the the the billing plan that is right for you and link your account with a server
          provider.
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="Name">Name</label>
        <input placeholder="Please state your name" type="text" {...register('name')} />
        {errors.name && <span className="error-message">{errors.name.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="Email">E-mail</label>
        <input placeholder="Please use an actual E-mail" type="text" {...register('email')} />
        {errors.email && <span className="error-message">{errors.email.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="Password">Password</label>
        <input placeholder="Please use strong password" type="Password" {...register('password')} />
        {errors.password && <span className="error-message">{errors.password.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="ConfirmPassword">Confirm Password</label>
        <input
          placeholder="Please confirm your password"
          type="password"
          {...register('confirm_password')}
        />
        {errors.confirm_password && (
          <span className="error-message">{errors.confirm_password.message}</span>
        )}
      </div>

      <div className="form-group checkbox">
        <input type="checkbox" {...register('agree')} />
        <label className="cblabel" htmlFor="Agree">
          I agree to the{' '}
          <a href="https://en.wikipedia.org/wiki/Terms_of_service">Terms of Service</a> and{' '}
          <a href="https://en.wikipedia.org/wiki/Privacy_policy">Privacy Policy</a>
        </label>
        {errors.agree && <p className="error-message">{errors.agree.message}</p>}
      </div>

      <div className="form-group submit">
        <input type="submit" value="Register" />
      </div>
    </form>
  );
};
