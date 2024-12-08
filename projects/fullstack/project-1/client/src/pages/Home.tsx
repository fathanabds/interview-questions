import { useEffect, useState } from 'react';
import axiosClient from '../utils/axiosClient';
import PatientRow from '../components/PatientRow';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Home() {
  const [patients, setPatients] = useState([]);

  async function fetchPatients() {
    try {
      const { data } = await axiosClient.get('/patients');
      setPatients(data.result);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error) && error.response) {
        Swal.fire(error.response.data.message);
      } else {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <>
      <h1 className="mb-5 text-center font-bold text-2xl">Patients List</h1>
      <div className="overflow-x-aut">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Sex</th>
              <th>Religion</th>
              <th>Phone</th>
              <th>Address</th>
              <th>NIK</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <PatientRow fetchPatients={fetchPatients} patients={patients} />
          </tbody>
          <tfoot>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Sex</th>
              <th>Religion</th>
              <th>Phone</th>
              <th>Address</th>
              <th>NIK</th>
              <th>Action</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
