import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
<div className="navbar bg-base-100 px-36 shadow-lg">
  <div className="flex-1">
    <Link href='/' className="text-3xl font-bold text-blue-700 border border-blue-600 rounded-md p-1">Email-Auth</Link>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal p-0 font-semibold">
     <li><Link to='/'>Home</Link></li>
     <li><Link to='/login'>Login</Link></li>
     <li><Link to='/register'>Register</Link></li>
     <li><Link to='/profile'>Profile</Link></li>
    </ul>
  </div>
</div>
    );
};

export default Header;