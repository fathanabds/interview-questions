import { useEffect, useState } from 'react';
import { setSelected } from '../features/companiesSlice';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { HiEye } from 'react-icons/hi2';

export default function RegisterPage() {
  const { value: companies, selected: selectedCompany } = useAppSelector((state) => state.companies);
  const dispatch = useAppDispatch();
  const [selectedPosition, setSelectedPosition] = useState<string[]>([]);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);
  const [errorSelectedCompany, setErrorSelectedCompany] = useState<string>('Company is required');
  const [errorSelectedPosition, setErrorSelectedPosition] = useState<string>('Position is required');
  const [errorName, setErrorName] = useState<string>('Name is required');
  const [errorPhone, setErrorPhone] = useState<string>('Must be minimum 11 digits');

  const positions: string[] = ['Backend Developer', 'Frontend Developer', 'Quality Assurance', 'Devops'];

  function handleSelectCompany(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(setSelected(e.target.value));
    if (e.target.value) {
      setErrorSelectedCompany('');
    } else {
      setErrorSelectedCompany('Company is required');
    }
  }

  function toggleConfirmPasswordVisibility(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setIsConfirmPasswordVisible((prevState) => !prevState);
  }

  function togglePasswordVisibility(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setIsPasswordVisible((prevState) => !prevState);
  }

  function handleSelectPosition(e: React.ChangeEvent<HTMLInputElement>) {
    const newPosition = e.target.value;
    if (e.target.name == 'checkAll') {
      if (e.target.checked) {
        setSelectedPosition(positions);
      }
      if (!e.target.checked) {
        setSelectedPosition([]);
      }
    } else {
      if (e.target.checked) {
        setSelectedPosition((prevPosition) => {
          return [...prevPosition, newPosition];
        });
      }
      if (!e.target.checked) {
        setSelectedPosition((prevPosition) => {
          return prevPosition.filter((e) => e != newPosition);
        });
      }
    }
  }

  useEffect(() => {
    if (selectedPosition.length > 0) {
      setErrorSelectedPosition('');
    } else {
      setErrorSelectedPosition('Position is required');
    }
  }, [selectedPosition]);

  function handleInputName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
    const regex = /[^A-Za-z0-9 ]/;
    if (!e.target.value) {
      setErrorName('Name is required');
    } else if (e.target.value.length < 3) {
      setErrorName('Name must be min 3 chars');
    } else if (regex.test(e.target.value)) {
      setErrorName('Name cannot contain symbols');
    } else if (e.target.value.split(' ').length > 2) {
      setErrorName('Must be max 2 words');
    } else {
      setErrorName('');
    }
  }

  function handleInputPhone(e: React.ChangeEvent<HTMLInputElement>) {
    const regex = /[^0-9]/;
    if (regex.test(e.target.value)) {
      setErrorPhone('Must be only numbers');
    } else if (e.target.value.length < 11) {
      setErrorPhone('Must be minimum 11 digits');
    } else {
      setErrorPhone('');
    }
    setPhone(e.target.value);
  }

  function handleInputPassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function handleInputConfirmPassword(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value);
  }

  return (
    <>
      <h1 className="text-center font-bold text-2xl mb-3">Register</h1>
      <form action="" className="flex flex-col items-center">
        <label className="form-control w-full max-w-md mb-3">
          <div className="label">
            <span className="label-text">Company to Apply</span>
            {errorSelectedCompany && <span className="label-text text-red-500">{errorSelectedCompany}</span>}
          </div>
          <select value={selectedCompany} onChange={handleSelectCompany} className="select select-bordered">
            <option value={''}>Select One</option>;
            {companies.map((company, idx) => {
              return <option key={idx}>{company}</option>;
            })}
          </select>
        </label>
        <label className="form-control w-full max-w-md mb-3">
          <div className="label">
            <span className="label-text">Position to Apply</span>
            {errorSelectedPosition && <span className="label-text text-red-500">{errorSelectedPosition}</span>}
          </div>
          <label className="label cursor-pointer">
            <span className="label-text">Check All</span>
            <input checked={selectedPosition.length == 4 ? true : false} name={'checkAll'} onChange={handleSelectPosition} type="checkbox" className="checkbox" />
          </label>
          {positions.map((position, idx) => {
            return (
              <label key={idx} className="label cursor-pointer">
                <span className="label-text">{position}</span>
                <input checked={selectedPosition.find((e) => e == position) ? true : false} name={position} onChange={handleSelectPosition} value={position} type="checkbox" className="checkbox" />
              </label>
            );
          })}
        </label>
        <label className="form-control w-full max-w-md mb-3">
          <div className="label">
            <span className="label-text">Full Name</span>
            {errorName && <span className="label-text text-red-500">{errorName}</span>}
          </div>
          <input value={name} onChange={handleInputName} type="text" placeholder="Type here" className="input input-bordered w-full max-w-md" />
        </label>
        <label className="form-control w-full max-w-md mb-3">
          <div className="label">
            <span className="label-text">Phone Number</span>
            {errorPhone && <span className="label-text text-red-500">{errorPhone}</span>}
          </div>
          <div className="flex">
            <span className="my-auto me-2">+62</span>
            <input value={phone} onChange={handleInputPhone} type="text" placeholder="Type here" className="input input-bordered w-full max-w-md" />
          </div>
        </label>
        <label className="form-control w-full max-w-md mb-3">
          <div className="label">
            <span className="label-text">Password</span>
            {!password && <span className="label-text text-red-500">Password is required</span>}
          </div>
          <div className="flex">
            <input value={password} onChange={handleInputPassword} type={isPasswordVisible ? 'text' : 'password'} placeholder="Type here" className="input input-bordered w-full max-w-md" />
            <button className="ml-2 text-gray-600 hover:text-gray-900" onClick={togglePasswordVisibility}>
              <HiEye />
            </button>
          </div>
        </label>
        <label className="form-control w-full max-w-md mb-3">
          <div className="label">
            <span className="label-text">Confirm Password</span>
            {password !== confirmPassword && <span className="label-text text-red-500">Password not match</span>}
          </div>
          <div className="flex">
            <input value={confirmPassword} onChange={handleInputConfirmPassword} type={isConfirmPasswordVisible ? 'text' : 'password'} placeholder="Type here" className="input input-bordered w-full max-w-md" />
            <button className="ml-2 text-gray-600 hover:text-gray-900" onClick={toggleConfirmPasswordVisibility}>
              <HiEye />
            </button>
          </div>
        </label>
      </form>
    </>
  );
}
