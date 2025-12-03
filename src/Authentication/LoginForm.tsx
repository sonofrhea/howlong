import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../App.css';
import { Box } from '@mui/material';
import MyTextField from "../components/constants/forms/MyTextField";
import MyPassField from "../components/constants/forms/MyPassField";
import MyButton from "../components/constants/forms/MyButton";
import { Link } from "react-router-dom";

import HandleLogin from "./HandleLogin";



const Login = () => {

    return(
        <div className={"myLoginBackground"}>
            <Box className={"whiteBox"}>
                <Box className={"itemBox"}>
                    <Box className={'title'}>Login for Auth App</Box>
                </Box>

                <Box className={"itemBox"}>
                    <MyTextField 
                        label={"Email"}
                    />
                </Box>

                <Box className={"itemBox"}>
                    <MyPassField 
                        label={"Password"}
                    />
                </Box>

                <Box className={"itemBox"}>
                    <MyButton 
                        label={"Login"}
                    />
                </Box>

                <Box className={"itemBox"}>
                    <Link to="/register">
                        No Account yet? Click to Register
                    </Link>
                </Box>
            </Box>
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