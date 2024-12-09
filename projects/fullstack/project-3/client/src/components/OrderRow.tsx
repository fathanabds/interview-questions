import { Order } from '../types/types';
import rupiahFormatter from '../utils/rupiahFormatter';

interface Props {
  order: Order;
  idx: number;
}

export default function OrderRow({ order, idx }: Props) {
  return (
    <tr>
      <th>{idx + 1}</th>
      <td>{order.User.email}</td>
      <td>{order.Product.name}</td>
      <td>{order.Product.category.toUpperCase()}</td>
      <td>{order.quantity}</td>
      <td>{rupiahFormatter(order.totalPrice)}</td>
      <td>{order.isPaid ? 'Done' : 'Waiting'}</td>
      <td className="flex flex-col flex-wrap gap-1">
        <button disabled={order.isPaid ? true : false} className="btn btn-primary btn-sm">
          {order.isPaid ? 'Paid' : 'Pay'}
        </button>
        <button className="btn btn-error btn-sm">Delete</button>
      </td>
    </tr>
  );
}
