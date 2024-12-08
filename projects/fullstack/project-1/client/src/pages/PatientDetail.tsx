import { useParams } from 'react-router-dom';
import axiosClient from '../utils/axiosClient';
import { useEffect, useState } from 'react';
import PatientForm from '../components/PatientForm';
import { Patient } from '../types/types';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function PatientDetail() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState<Patient>();

  async function fetchPatientDetail() {
    try {
      const { data } = await axiosClient.get(`/patients/${patientId}`);
      setPatient(data.result);
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
    fetchPatientDetail();
  }, []);

  return (
    <>
      <h1 className="text-center text-2xl font-bold mb-5">Patient Detail</h1>
      {patient?.id && <PatientForm patient={patient} />}
    </>
  );
}
