import { useNavigate } from 'react-router-dom';
import { Patient } from '../types/types';
import axiosClient from '../utils/axiosClient';
import axios from 'axios';
import Swal from 'sweetalert2';

interface Props {
  patients: Patient[];
  fetchPatients: () => Promise<void>;
}

export default function PatientRow({ patients, fetchPatients }: Props) {
  const nav = useNavigate();

  function handleDetailUpdate(patientId: number) {
    nav(`/patients/${patientId}`);
  }

  async function handleDelete(patientId: number) {
    try {
      await axiosClient.delete(`/patients/${patientId}`);
      fetchPatients();
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response) {
        Swal.fire(error.response.data.message);
      } else {
        console.error(error);
      }
    }
  }

  return (
    <>
      {patients.map((patient, i) => {
        return (
          <tr key={patient.id}>
            <th>{i + 1}</th>
            <td className="max-w-56">{patient.name}</td>
            <td>{patient.sex}</td>
            <td>{patient.religion}</td>
            <td>{patient.phone}</td>
            <td className="max-w-56">{patient.address}</td>
            <td>{patient.nik}</td>
            <td className="flex gap-1">
              <button onClick={() => handleDetailUpdate(patient.id)} className="btn btn-primary btn-xs">
                Detail
              </button>
              <button onClick={() => handleDetailUpdate(patient.id)} className="btn btn-warning btn-xs">
                Update
              </button>
              <button onClick={() => handleDelete(patient.id)} className="btn btn-error btn-xs">
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </>
  );
}
