import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SideBarNew from '../Sidebar/SidebarNew'

import LoginNew from '../Login/LoginNew';
import { useContext } from 'react';
import { loginContext } from '../../App';
const Layout = () => {
    const { login, setLogin } = useContext(loginContext);
    return (
        <>
            {localStorage.getItem("login") ?
                <div className="layout__content">
                    <SideBarNew />

                </div> :
                <Routes>
                    <Route path='/login' element={<LoginNew />} />
                    <Route path="/*" element={<Navigate to="/login" replace />} />
               
                </Routes>}
        </>
    )
}

export default Layout
