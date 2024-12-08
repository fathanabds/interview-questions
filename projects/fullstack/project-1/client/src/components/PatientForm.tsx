import { useState } from 'react';
import { Patient } from '../types/types';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../utils/axiosClient';
import Swal from 'sweetalert2';
import axios from 'axios';

interface Props {
  patient?: Patient;
}

export default function PatientForm({ patient }: Props) {
  const [form, setForm] = useState({
    name: patient?.name ? patient.name : '',
    sex: patient?.sex ? patient.sex : '',
    religion: patient?.religion ? patient.religion : '',
    phone: patient?.phone ? patient.phone : '',
    address: patient?.address ? patient.address : '',
    nik: patient?.nik ? patient.nik : '',
  });

  const nav = useNavigate();

  async function handleSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (patient?.id) {
      try {
        await axiosClient.put(`/patients/${patient.id}`, form);
        nav('/');
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error) && error.response) {
          Swal.fire(error.response.data.message);
        } else {
          console.error(error);
        }
      }
    } else {
      try {
        await axiosClient.post(`/patients/`, form);
        nav('/');
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error) && error.response) {
          Swal.fire(error.response.data.message);
        } else {
          console.error(error);
        }
      }
    }
  }

  type event = React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>;

  function handleInputForm(e: event) {
    setForm((prevForm) => {
      return {
        ...prevForm,
        [e.target.name]: e.target.value,
      };
    });
  }

  return (
    <div className="flex justify-center w-full">
      <form onSubmit={handleSubmitForm} className="w-1/3">
        <label className="form-control w-full mb-3">
          <div className="label">
            <span className="label-text">Full Name</span>
          </div>
          <input onChange={handleInputForm} value={form.name} name="name" type="text" placeholder="Full Name" className="input input-bordered w-full" />
        </label>
        <label className="form-control w-full mb-3">
          <div className="label">
            <span className="label-text">Sex</span>
          </div>
          <select onChange={handleInputForm} defaultValue={form.sex} name="sex" className="select select-bordered">
            <option value={''} disabled selected>
              Pick one
            </option>
            <option value={'M'}>M</option>
            <option value={'F'}>F</option>
          </select>
        </label>
        <label className="form-control w-full mb-3">
          <div className="label">
            <span className="label-text">Religion</span>
          </div>
          <select onChange={handleInputForm} defaultValue={form.religion} name="religion" className="select select-bordered">
            <option value={''} disabled selected>
              Pick one
            </option>
            <option value={'Islam'}>Islam</option>
            <option value={'Katolik'}>Katolik</option>
            <option value={'Protestan'}>Protestan</option>
            <option value={'Hindu'}>Hindu</option>
            <option value={'Buddha'}>Buddha</option>
            <option value={'Khonghucu'}>Khonghucu</option>
          </select>
        </label>
        <label className="form-control w-full mb-3">
          <div className="label">
            <span className="label-text">Phone</span>
          </div>
          <input onChange={handleInputForm} value={form.phone} name="phone" type="number" placeholder="Phone" className="input input-bordered w-full" />
        </label>
        <label className="form-control mb-3">
          <div className="label">
            <span className="label-text">Address</span>
          </div>
          <textarea onChange={handleInputForm} value={form.address} name="address" className="textarea textarea-bordered h-24" placeholder="Address"></textarea>
        </label>
        <label className="form-control w-full mb-3">
          <div className="label">
            <span className="label-text">NIK</span>
          </div>
          <input onChange={handleInputForm} value={form.nik} name="nik" type="number" placeholder="NIK" className="input input-bordered w-full" />
        </label>
        <div className="flex w-full gap-1">
          <Link to={'/'} className="btn btn-warning w-1/2">
            Back
          </Link>
          <button className="btn btn-primary w-1/2">Submit</button>
        </div>
      </form>
    </div>
  );
}
