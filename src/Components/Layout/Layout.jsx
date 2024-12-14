import React from 'react';
import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div className='bg-dark text-white vh-100'>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default Layout;
