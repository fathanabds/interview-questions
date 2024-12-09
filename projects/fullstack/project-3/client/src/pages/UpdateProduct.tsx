import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axiosClient from '../utils/axiosClient';
import { useEffect, useState } from 'react';
import ProductForm from '../components/ProductForm';

export default function UpdateProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState();

  async function getProduct() {
    try {
      const { data } = await axiosClient.get(`/products/${productId}`, {
        headers: {
          Authorization: localStorage.getItem('access_token'),
        },
      });
      setProduct(data);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        Swal.fire(error.response?.data.message);
      }
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <ProductForm title="Update" product={product} />
    </>
  );
}
