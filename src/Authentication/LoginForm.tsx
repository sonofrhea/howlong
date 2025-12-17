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
import HandleLogin from "./HandleLogin";
import { spinningStyles } from "./Styles";




const Login = () => {
    const navigate = useNavigate()
    const {handleSubmit, control} = useForm()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);

    const submission = async (data: any) => {
        console.log("SUBMISSION FUNCTION CALLED!", data);
        if (loading) {
            console.log("YES, LOADING!")
        } else {
            console.log("NOT LOADING, PROCEEDING...");
        }
        if (loading) return
        setLoading(true);
        setError("")
        try {
            await HandleLogin(data.email, data.password)
            navigate(`/dashboard`);
        } catch (error: any) {
            let errorMessage = "";

            if (error.code === "ECONNABORTED") {
                errorMessage = "Network timed out. Please try again.";
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
            console.log(errorMessage);
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
                    {error && (
                    <Box className="text-red-900 text-sm">
                        {error}
                    </Box>
                    )}

                    <Box className={"itemBox"}>
                        <MyButton 
                            type={"submit"}
                            label={loading ? <span className={spinningStyles.terminalBar.spinner}>↻</span> : "Login"}
                            disabled={loading}
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
//    