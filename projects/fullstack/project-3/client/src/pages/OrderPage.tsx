import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axiosClient from '../utils/axiosClient';
import OrderRow from '../components/OrderRow';
import { Order } from '../types/types';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export default function OrderPage() {
  const [orders, setOrders] = useState([]);

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (csvData: Order[]) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, 'orders data' + fileExtension);
  };

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
      <div className="flex justify-end mb-3">
        <button onClick={() => exportToCSV(orders)} className="btn btn-primary btn-sm">
          Export to CSV
        </button>
      </div>
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
              return <OrderRow getOrders={getOrders} idx={idx} order={order} key={order.id} />;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
