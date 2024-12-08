import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';

const router = createBrowserRouter([
  {
    path: '/register',
    element: <RegisterPage />,
  },
]);

function App() {
  return (
    <>
      <div className="p-5">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
