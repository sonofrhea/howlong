import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import '../App.css';
import { Box } from '@mui/material';
import MyTextField from "../components/constants/forms/MyTextField";
import MyPassField from "../components/constants/forms/MyPassField";
import MyButton from "../components/constants/forms/MyButton";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import apiClient from "../BaseEngine";
import { ImportMeta } from '../vite-env';





const Login = () => {
    const navigate = useNavigate()
    const {handleSubmit, control} = useForm()

    const submission = (data: any) => {
        const isDevelopment = import.meta.env.MODE === "development";
        const baseEntry = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY;
        apiClient.post(`${baseEntry}core/login/`,{
            email: data.email,
            password: data.password,
        })

        .then((response) => {
            localStorage.setItem('Token', response.data.token)
            navigate(`/dashboard`)
        })
        .catch((error) => {
            console.error("Login failed", error, error.response?.data || error.message)
        })
    }

    return(
        <div className={"myLoginBackground"}>
            <form onSubmit={handleSubmit(submission)}>

                <Box className={"whiteBox"}>
                    <Box className={"itemBox"}>
                        <Box className={'title'}>Login for Auth App</Box>
                    </Box>

                    <Box className={"itemBox"}>
                        <MyTextField 
                            label={"Email"}
                            name={"email"}
                            control={control}
                        />
                    </Box>

                    <Box className={"itemBox"}>
                        <MyPassField 
                            label={"Password"}
                            name={"password"}
                            control={control}
                        />
                    </Box>

                    <Box className={"itemBox"}>
                        <MyButton 
                            type={"submit"}
                            label={"Login"}
                        />
                    </Box>

                    <Box>
                        <p className="text-blue-800">No Account yet?</p>
                        <Link to="/register">
                            <p className="text-blue-800 underline">Register</p>
                        </Link>
                    </Box>
                </Box>
            </form>
        </div>
    )
}
export default Login;
























//export default function LoginForm() {
//    const [email, setEmail] = useState('');
//    const [password, setPassword] = useState('');
//    const [error, setError] = useState('');
//
//
//    const navigate = useNavigate();
//
//
//    const onSubmit = async (e: any) => {
//        e.preventDefault();
//        try {
//            const res = await HandleLogin(email, password);
//            console.log('Login response:', res);
//            alert('API connection Login successful!');
//            navigate('/dashboard');
//        } catch (err: any) {
//            console.error('Login error:', err);
//            setError(err.message || 'Invalid credentials');
//        }
//    };
//
//    return (
//        <form onSubmit={onSubmit}>
//            <input
//                type="email"
//                placeholder="Email"
//                value={email}
//                onChange={e => setEmail(e.target.value)}
//                className="text-white border-yellow-300"
//                />
//                <input 
//                    type="password"
//                    placeholder="password"
//                    value={password}
//                    onChange={e => setPassword(e.target.value)}
//                    className="text-white border-yellow-300"
//                />
//                <button 
//                    type="submit"
//                >
//                    Login
//                </button>
//                {error && <div>{error}</div>}
//                <p className="mt-4">
//                    Don't have an account? 
//                    <button
//                        onClick={() => navigate('/register')}
//                    >
//                        Register
//                    </button>
//                </p>
//        </form>
//    );
//}
//
//
//    //