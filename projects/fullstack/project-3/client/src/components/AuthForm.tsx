import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../utils/axiosClient';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';

interface Props {
  title: string;
}

export default function AuthForm({ title }: Props) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: '',
  });

  console.log(form);

  const nav = useNavigate();

  function handleInput(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    setForm((prevForm) => {
      return {
        ...prevForm,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (title == 'Register') {
        await axiosClient.post('/auth/register', form);
        nav('/login');
        Swal.fire('Register success');
      } else {
        const { data } = await axiosClient.post('/auth/login', form);
        localStorage.setItem('access_token', `Bearer ${data.access_token}`);
        nav('/');
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        Swal.fire(error.response?.data.message);
      }
    }
  }

  return (
    <>
      <h1 className="text-center font-bold text-3xl mb-3">{title}</h1>
      <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit} className="w-1/3 mb-3">
          <label className="form-control mb-3">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input value={form.email} onChange={handleInput} name="email" type="text" placeholder="user@mail.com" className="input input-bordered" />
          </label>
          <label className="form-control mb-3">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input value={form.password} onChange={handleInput} name="password" type="password" placeholder="Type here" className="input input-bordered" />
          </label>
          {title == 'Register' && (
            <label className="form-control mb-3">
              <div className="label">
                <span className="label-text">Role</span>
              </div>
              <select onChange={handleInput} defaultValue={form.role} name="role" className="select select-bordered">
                <option value={''} disabled>
                  Pick one
                </option>
                <option value={'admin'}>Admin</option>
                <option value={'customer'}>Customer</option>
              </select>
            </label>
          )}
          <button className="btn btn-primary w-full">{title}</button>
        </form>
        <p>
          {title == 'Login' ? "Don't have an account yet?" : 'Already have an account?'}{' '}
          <Link className="text-blue-500 link" to={title == 'Login' ? '/register' : '/login'}>
            {title == 'Login' ? 'Register' : 'Login'}
          </Link>
        </p>
      </div>
    </>
  );
}
