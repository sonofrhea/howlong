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
            className={`hover:text-yellow-800 px-3 py-1 rounded-lg  text-black cursor-pointer ${isRed ? "text-yellow-800 text-bold border border-yellow-300" : "text-black"}`}
        >
            <span className="ml-2">⟵ </span> Logout
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
            className={`hover:text-amber-800 px-3 py-1 rounded-lg text-black cursor-pointer ${isRed ? "text-amber-800 text-bold border border-amber-800" : "text-black"}`}
        >
            <span className="ml-2">⟵ </span> Logout All
        </button>
    );
}