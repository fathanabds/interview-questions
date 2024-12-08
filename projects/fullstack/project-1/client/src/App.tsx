import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import PatientDetail from './pages/PatientDetail';
import Navbar from './components/Navbar';
import AddPatient from './pages/AddPatient';

const router = createBrowserRouter([
  {
    element: (
      <>
        <Navbar />
        <div className="p-5">
          <Outlet />
        </div>
      </>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/patients/:patientId',
        element: <PatientDetail />,
      },
      {
        path: '/patients/',
        element: <AddPatient />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
