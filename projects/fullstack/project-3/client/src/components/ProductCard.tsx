import { AxiosError } from 'axios';
import { Product } from '../types/types';
import axiosClient from '../utils/axiosClient';
import rupiahFormatter from '../utils/rupiahFormatter';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

interface Props {
  product: Product;
  getProducts: () => Promise<void>;
}

export default function ProductCard({ product, getProducts }: Props) {
  async function handleDelete() {
    try {
      await axiosClient.delete(`/products/${product.id}`, {
        headers: {
          Authorization: localStorage.getItem('access_token'),
        },
      });
      getProducts();
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        Swal.fire(error.response?.data.message);
      }
    }
  }

  async function handleBuy() {
    try {
      await axiosClient.post(
        `/orders/`,
        { ProductId: product.id, quantity: 1 },
        {
          headers: {
            Authorization: localStorage.getItem('access_token'),
          },
        }
      );
      Swal.fire('Success buy product');
      getProducts();
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        Swal.fire(error.response?.data.message);
      }
    }
  }

  return (
    <>
      <div className="card bg-base-100 w-80 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mx-auto">{product.name}</h2>
          <div className="flex mb-3 flex-wrap h-12">
            <p>Stock: {product.stock}</p>
            <p>Price: {rupiahFormatter(product.price)}</p>
            <p>Category: {product.category.toUpperCase()}</p>
          </div>
          <div className="card-actions justify-end">
            <button onClick={handleDelete} className="btn btn-error btn-sm">
              Delete
            </button>
            <Link to={`/products/${product.id}`} className="btn btn-warning btn-sm">
              Update
            </Link>
            <button onClick={handleBuy} disabled={product.stock == 0 ? true : false} className="btn btn-primary btn-sm">
              {product.stock == 0 ? 'Sold out' : 'Buy now'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
