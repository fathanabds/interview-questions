import { useEffect, useState } from 'react';
import { Product } from '../types/types';
import axiosClient from '../utils/axiosClient';
import Swal from 'sweetalert2';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

interface Props {
  title: string;
  product?: Product;
}

export default function ProductForm({ title, product }: Props) {
  const [form, setForm] = useState({
    name: product?.name ? product.name : '',
    stock: product?.stock ? product.stock : '',
    price: product?.price ? product.price : '',
    category: product?.category ? product.category : '',
  });

  const nav = useNavigate();

  function populateForm() {
    if (product) {
      setForm(product);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (title == 'Update') {
        await axiosClient.put(`/products/${product?.id}`, form, {
          headers: {
            Authorization: localStorage.getItem('access_token'),
          },
        });
        nav('/');
        Swal.fire('Success update product');
      } else {
        await axiosClient.post('/products', form, {
          headers: {
            Authorization: localStorage.getItem('access_token'),
          },
        });
        nav('/');
        Swal.fire('Success add new product');
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        Swal.fire(error.response?.data.message);
      }
    }
  }

  useEffect(() => {
    populateForm();
  }, [product]);

  function handleInput(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    setForm((prevForm) => {
      return {
        ...prevForm,
        [e.target.name]: e.target.value,
      };
    });
  }

  return (
    <>
      <h1 className="text-center font-bold text-3xl mb-3">{title} Product</h1>
      <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit} className="w-1/3 mb-3">
          <label className="form-control mb-3">
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <input value={form.name} onChange={handleInput} name="name" type="text" placeholder="Type here" className="input input-bordered" />
          </label>
          <label className="form-control mb-3">
            <div className="label">
              <span className="label-text">Stock</span>
            </div>
            <input value={form.stock} onChange={handleInput} name="stock" type="number" className="input input-bordered" />
          </label>
          <label className="form-control mb-3">
            <div className="label">
              <span className="label-text">Price</span>
            </div>
            <input value={form.price} onChange={handleInput} name="price" type="number" className="input input-bordered" />
          </label>
          <label className="form-control mb-3">
            <div className="label">
              <span className="label-text">Category</span>
            </div>
            <select onChange={handleInput} name="category" value={form.category} className="select select-bordered">
              <option value={''} disabled>
                Pick one
              </option>
              <option value={'retail'}>Retail</option>
              <option value={'fnb'}>FnB</option>
            </select>
          </label>
          <button className="btn btn-primary w-full">{title}</button>
        </form>
      </div>
    </>
  );
}
