import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axiosClient from '../utils/axiosClient';
import { Product } from '../types/types';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    try {
      const { data } = await axiosClient.get('/products', {
        headers: {
          Authorization: localStorage.getItem('access_token'),
        },
      });
      setProducts(data);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        Swal.fire(error.response?.data.message);
      }
    }
  }

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="flex justify-center gap-2 flex-wrap">
      {products.map((product: Product) => {
        return <ProductCard key={product.id} product={product} getProducts={getProducts} />;
      })}
    </div>
  );
}
