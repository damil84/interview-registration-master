import React from 'react';
import { useForm } from 'react-hook-form';

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Name" {...register("Name", {required: true, maxLength: 80})} />
      <input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
      <input type="password" placeholder="Password" {...register("Password", {required: true, min: 8})} />
      <input type="password" placeholder="Confirm Password" {...register("Confirm Password", {required: true})} />
      <input type="checkbox" placeholder="I agree " {...register("I agree ", {})} />

      <input type="submit" />
    </form>
  );
}