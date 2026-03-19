import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import '../App.css';
import { Box } from '@mui/material';
import MyTextField from "../components/constants/forms/MyTextField";
import MyPassField from "../components/constants/forms/MyPassField";
import MyButton from "../components/constants/forms/MyButton";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import {HandleLogin} from "./HandleLogin";
import { spinningStyles } from "./Styles";





const Login = () => {
    const navigate = useNavigate()
    const {handleSubmit, control} = useForm()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const toastShown = useRef(false);

    const searchParams = new URLSearchParams(location.search);
    const reason = searchParams.get('reason');

    useEffect(() => {
        if (!reason || toastShown.current) return;

        let message = "";
        if (reason === "idle_timeout") {
            message = "Your session timed out due to inactivity. Please log in again.";

        } else if (reason === "session_expired") {
            message = "Your session has expired. Please log in again.";
        }

        if (message) {
            toast(message, { duration: 12000, style: {fontFamily: "Helvetica"} });
            toastShown.current = true;
        }
    }, [reason]);


    const submission = async (data: any) => {
        if (loading) return
        setLoading(true);
        setError("")

        const toastId = toast.loading('Logging in...', {duration: 8000,});
        try {
            await HandleLogin(data.email, data.password);
            toast.success('Login successful!', {id: toastId});
            navigate(`/mainpage`);
        } catch (error: any) {
            let errorMessage = "";

            if (error.code === "ECONNABORTED") {
                errorMessage = "Network timed out, Please try again. System will wake in 10seconds.";
            }

            else if (error.response?.data?.detail === "Invalid token.") {
                errorMessage = "Invalid Token."
                localStorage.removeItem('Token');
            }

            else if (error.response?.data?.detail?.[0]) {
                errorMessage = error.response.data.detail[0];
            }

            else if (error.response?.data?.detail) {
                errorMessage = error.response.data.detail;
            }

            else if (error.message) {
                errorMessage = error.message;
            }
            
            else {
                errorMessage = "Invalid email or password";
            }

            setError(errorMessage);
            toast.error(errorMessage, { id: toastId });
            //console.log(errorMessage);
        } finally {
            setLoading(false);
        }
    }
        

    return(
        <div>
            <title>Login | Urusentra · ERP for Small & Medium Enterprises</title>
            <meta name="description" content="Secure login to Urusentra – modern ERP for SMEs" />

            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800;900&display=swap');
                   
                `}
            </style>

            
            <div className="fixed top-4 left-4 z-50">
                <Link 
                    to="/marketplace-login"
                    className="fixed top-4 left-4 z-50 group flex items-center gap-3 px-3 py-1 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-600 shadow-sm transition-all duration-300 hover:text-blue-600 hover:shadow-md hover:-translate-y-0.5"
                >
                    <span style={{ fontFamily: 'Montserrat, system-ui' }}>Marketplace Login for suppliers</span>
                </Link>
            </div>


            <div className="fixed top-4 left-4 z-50">
                <Link 
                    to="/"
                    className="fixed top-4 right-4 z-50 group flex items-center gap-3 px-3 py-1 bg-white border border-gray-200 rounded-2xl text-sm font-semibold text-gray-600 shadow-sm transition-all duration-300 hover:text-blue-600 hover:shadow-md hover:-translate-y-0.5"
                >
                    <span>Home</span>
                </Link>
            </div>
            <div className={"myLoginBackground"}>

                <form onSubmit={handleSubmit(submission)}>

                    <Box className="whiteBox" sx={{ width: 420, maxWidth: '100%' }}>
                        <Box className={"itemBox"}>
                            <Box 
                            className={'title'} 
                            style={{ fontFamily: 'Montserrat, system-ui' }}>
                                Login for Auth App
                            </Box>
                        </Box>

                        <Box className="itemBox" sx={{ width: '100%' }} style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <MyTextField 
                                label={"Email"}
                                name={"email"}
                                control={control}
                                style={{ fontFamily: 'Montserrat, system-ui' }}
                            />
                        </Box>

                        <Box className="itemBox" sx={{ width: '100%' }} style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <MyPassField 
                                label={"Password"}
                                name={"password"}
                                control={control}
                                style={{ fontFamily: 'Montserrat, system-ui' }}
                            />
                        </Box>

                        {error && (
                            <p className="text-amber-800 text-sm" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                {error}
                            </p>
                        )}

                        <Box className="itemBox" sx={{ width: '100%' }} style={{ fontFamily: 'Montserrat, system-ui' }}>
                            <MyButton 
                                type={"submit"}
                                label={loading ? <p className={spinningStyles.terminalBar.spinner}>◖</p> : "Login"}
                                disabled={loading}
                            />
                        </Box>

                        <Box>
                            <p className="text-blue-800" style={{ fontFamily: 'Montserrat, system-ui' }}>No Account yet? </p>
                            <Link to="/register">
                                <p className="text-blue-800 underline" style={{ fontFamily: 'Montserrat, system-ui' }}> Click to Register</p>
                            </Link>
                        </Box>
                    </Box>
                </form>
            </div>
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
//    