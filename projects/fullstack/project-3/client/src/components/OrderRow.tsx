import { AxiosError } from 'axios';
import { Order } from '../types/types';
import rupiahFormatter from '../utils/rupiahFormatter';
import Swal from 'sweetalert2';
import axiosClient from '../utils/axiosClient';

interface Props {
  order: Order;
  idx: number;
  getOrders: () => Promise<void>;
}

export default function OrderRow({ order, idx, getOrders }: Props) {
  async function handlePayment() {
    try {
      await axiosClient.patch(
        `/orders/${order.id}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem('access_token'),
          },
        }
      );
      Swal.fire('Success confirm payment');
      getOrders();
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        Swal.fire(error.response?.data.message);
      }
    }
  }

  async function handleDelete() {
    try {
      await axiosClient.delete(`/orders/${order.id}`, {
        headers: {
          Authorization: localStorage.getItem('access_token'),
        },
      });
      Swal.fire('Success delete order');
      getOrders();
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        Swal.fire(error.response?.data.message);
      }
    }
  }

  return (
    <tr>
      <th>{idx + 1}</th>
      <td>{order.User.email}</td>
      <td>{order.Product.name}</td>
      <td>{order.Product.category.toUpperCase()}</td>
      <td>{order.quantity}</td>
      <td>{rupiahFormatter(order.totalPrice)}</td>
      <td>{order.isPaid ? 'Done' : 'Waiting'}</td>
      <td className="flex flex-col flex-wrap gap-1 w-40">
        <button onClick={handlePayment} disabled={order.isPaid ? true : false} className="btn btn-primary btn-sm">
          {order.isPaid ? 'Paid' : 'Confirm Payment'}
        </button>
        <button onClick={handleDelete} className="btn btn-error btn-sm">
          Delete
        </button>
      </td>
    </tr>
  );
}
