import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import '../App.css';
import { Box } from '@mui/material';
import MyTextField from "../components/constants/forms/MyTextField";
import MyPassField from "../components/constants/forms/MyPassField";
import MyButton from "../components/constants/forms/MyButton";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import HandleLogin from "./HandleLogin";
import { spinningStyles } from "./Styles";




const Login = () => {
    const navigate = useNavigate()
    const {handleSubmit, control} = useForm()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);

    const submission = async (data: any) => {
        if (loading) return
        setLoading(true);
        setError("")

        const toastId = toast.loading('Logging in...');
        try {
            await HandleLogin(data.email, data.password);
            toast.success('Login successful!', {id: toastId});
            navigate(`/mainpage`);
        } catch (error: any) {
            let errorMessage = "";

            if (error.code === "ECONNABORTED") {
                errorMessage = "Network timed out, Please try again. Will wake in 30seconds.";
            }

            else if (error.response.data?.detail?.[0]) {
                errorMessage = error.response.data.detail[0];
            }

            else if (error.message) {
                console.log(error.message);
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
        
   //     apiClient.post(`core/login/`,{
   //         email: data.email,
   //         password: data.password,
   //     })
//
   //     .then((response) => {
   //         localStorage.setItem('Token', response.data.token)
   //         navigate(`/dashboard`)
   //     })
   //     .catch((error) => {
   //         console.error("Login failed", error, error.response?.data || error.message)
   //     })
   // }

    return(
        <div>
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
                            <Box className={'title'}>Login for Auth App</Box>
                        </Box>

                        <Box className="itemBox" sx={{ width: '100%' }}>
                            <MyTextField 
                                label={"Email"}
                                name={"email"}
                                control={control}
                            />
                        </Box>

                        <Box className="itemBox" sx={{ width: '100%' }}>
                            <MyPassField 
                                label={"Password"}
                                name={"password"}
                                control={control}
                            />
                        </Box>

                        {error && (
                            <p className="text-amber-800 text-sm">
                                {error}
                            </p>
                        )}

                        <Box className="itemBox" sx={{ width: '100%' }}>
                            <MyButton 
                                type={"submit"}
                                label={loading ? <p className={spinningStyles.terminalBar.spinner}>◖</p> : "Login"}
                                disabled={loading}
                            />
                        </Box>

                        <Box>
                            <p className="text-blue-800">No Account yet? </p>
                            <Link to="/register">
                                <p className="text-blue-800 underline"> Click to Register</p>
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