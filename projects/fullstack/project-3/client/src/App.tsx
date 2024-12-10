import { createBrowserRouter, Outlet, redirect, RouterProvider } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import UpdateProduct from './pages/UpdateProduct';
import AddProduct from './pages/AddProduct';
import OrderPage from './pages/OrderPage';
import ProfilePage from './pages/ProfilePage';

const router = createBrowserRouter([
  {
    loader: () => {
      if (localStorage.getItem('access_token')) {
        return redirect('/');
      }
      return null;
    },
    children: [
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
  {
    element: (
      <>
        <Navbar />
        <div className="p-5">
          <Outlet />
        </div>
      </>
    ),
    loader: () => {
      if (!localStorage.getItem('access_token')) {
        return redirect('/login');
      }
      return null;
    },
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/products/add',
        element: <AddProduct />,
      },
      {
        path: '/orders',
        element: <OrderPage />,
      },
      {
        path: '/profiles',
        element: <ProfilePage />,
      },
      {
        path: '/products/:productId',
        element: <UpdateProduct />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
