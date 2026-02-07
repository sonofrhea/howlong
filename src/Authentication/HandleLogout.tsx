import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import apiClient from '../BaseEngine';


export function LogoutButton() {
    const navigate = useNavigate();
    const [isRed, setIsRed] = useState(false);
    

    const logoutUser = () => {
        apiClient.post(`logout/`, {

        }).then( () => {
            localStorage.removeItem("Token")
            navigate('/login')
        })
    };
    useEffect(() => {
        const interval = setInterval(() => {
            setIsRed(prev => !prev)
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <button
            onClick={logoutUser}
            className={`group flex items-center gap-3 bg-white border border-gray-200 rounded-2xl text-sm font-semibold shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:text-yellow-800 px-3 py-1 text-black cursor-pointer ${isRed ? "text-yellow-800 px-3 py-1 text-bold" : "text-black"}`}
        >
            <span className="ml-2 ">⟵ </span> Logout
        </button>
    );
}



export function LogoutAllbutton() {
    const navigate = useNavigate();
    const [isRed, setIsRed] = useState(false);
    

    const logoutUser = () => {
        apiClient.post(`logoutall/`, {

        }).then( () => {
            localStorage.removeItem("Token")
            navigate('/')
        })
    };
    useEffect(() => {
        const interval = setInterval(() => {
            setIsRed(prev => !prev)
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <button
            onClick={logoutUser}
            className={`group flex items-center gap-3 bg-white border border-gray-200 rounded-2xl text-sm font-semibold shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:text-red-900 px-3 py-1 text-black cursor-pointer ${isRed ? "text-red-900 px-3 py-1 text-bold" : "text-yellow-400"}`}
        >
            <span className="ml-2">⟵ </span> Logout All
        </button>
    );
}