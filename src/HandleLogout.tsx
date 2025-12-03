import React, { useState } from "react";

import apiClient from "./BaseEngine";
import { useNavigate } from "react-router-dom";


export default function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await apiClient.post('/dj-rest-auth/logout/');
        } catch (err) {
            console.error('Logout failed', err);
        } finally {
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    return <button onClick={handleLogout}>Logout</button>
}