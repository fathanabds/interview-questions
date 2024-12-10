import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const nav = useNavigate();

  function handleLogout() {
    localStorage.removeItem('access_token');
    nav('/login');
  }

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <Link to={'/'} className="btn btn-ghost text-xl">
            Tokopedia
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to={'/products/add'}>Add New Product</Link>
            </li>
            <li>
              <Link to={'/orders'}>My Order</Link>
            </li>
            <li>
              <Link to={'/profiles'}>My Profile</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <button onClick={handleLogout} className="btn btn-error">
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
