import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';

const router = createBrowserRouter([
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: (
      <>
        <Navbar />
        <div className="p-10">
          <Outlet />
        </div>
      </>
    ),
    children: [
      {
        path: '/',
        element: <HomePage />,
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
