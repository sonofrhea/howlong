import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HandleRegistration from "./HandleRegistration";
import { RegistrationFormInputs } from "./Types";



function RegistrationPage() {

    const navigate = useNavigate();
    const [registrationData, setRegistrationData] = useState<RegistrationFormInputs>({
        email: '',
        password1: '',
        password2: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e: any) => {
        setRegistrationData({ ...registrationData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await HandleRegistration(registrationData);
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Registration Failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            {error && <p className="text-red-600 mb-2">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={registrationData.email}
                    onChange={handleChange}
                    className="w-full mb-2 p-2 border rounded"
                    required
                />
                <input 
                    type="password"
                    name="password1"
                    placeholder="Password"
                    value={registrationData.password1}
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border rounded"
                    required
                />
                <input 
                    type="password"
                    name="password2"
                    placeholder="Password"
                    value={registrationData.password2}
                    onChange={handleChange}
                    className="w-full mb-4 p-2 border rounded"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded"
                >
                    Register
                </button>
                <p className="mt-4">
                    Already have an account? 
                    <button
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>
                </p>
            </form>
        </div>
    );
};
export default RegistrationPage;
