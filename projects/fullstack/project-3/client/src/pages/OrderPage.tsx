import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axiosClient from '../utils/axiosClient';
import OrderRow from '../components/OrderRow';
import { Order } from '../types/types';

export default function OrderPage() {
  const [orders, setOrders] = useState([]);

  async function getOrders() {
    try {
      const { data } = await axiosClient.get('orders', {
        headers: {
          Authorization: localStorage.getItem('access_token'),
        },
      });
      setOrders(data);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        Swal.fire(error.response?.data.message);
      }
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <h1 className="text-center font-bold text-3xl mb-3">My Order</h1>
      <div className="overflow-x-auto">
        <table className="table table-sm">
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Product</th>
              <th>Category</th>
              <th>Qty</th>
              <th>Total Price</th>
              <th>Payment Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: Order, idx) => {
              return <OrderRow idx={idx} order={order} key={order.id} />;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
