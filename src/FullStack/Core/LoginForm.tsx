import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import HandleLogin from "../../HandleLogin";


export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const navigate = useNavigate();


    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await HandleLogin(email, password);
            alert('API connection Login successful!');
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="text-white border-yellow-300"
                />
                <input 
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="text-white border-yellow-300"
                />
                <button 
                    type="submit"
                >
                    Login
                </button>
                {error && <div>{error}</div>}
        </form>
    );
}


    //