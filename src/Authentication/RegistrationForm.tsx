import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HandleRegistration from "./HandleRegistration";
import { RegistrationFormInputs } from "./Types";
import '../App.css';


import { Box } from '@mui/material';
import MyTextField from "../components/constants/forms/MyTextField";
import MyPassField from "../components/constants/forms/MyPassField";
import MyButton from "../components/constants/forms/MyButton";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import AxiosInstance from "../components/AxiosInstance"; 
import apiClient from "../BaseEngine";




const Register = () => {
    const navigate = useNavigate()
    const {handleSubmit, control} = useForm();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const submission = (data: any) => {
        if (loading) return
        setLoading(true);
        
        apiClient.post(`core/register/`,{
            email: data.email,
            password1: data.password1,
            password2: data.password2
        })

        .then(() => {
            navigate(`/`)
        })
    }

    return(
        <div className={"myLoginBackground"}>

            <form onSubmit={handleSubmit(submission)}>

            
                <Box className={"whiteBox"}>
                    <Box className={"itemBox"}>
                        <Box className={'title'}>User Registration</Box>
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
                            name={"password1"}
                            control={control}
                        />
                    </Box>

                    <Box className={"itemBox"}>
                        <MyPassField 
                            label={"Confirm password"}
                            name={"password2"}
                            control={control}
                        />
                    </Box>

                    <Box className={"itemBox"}>
                        <MyButton 
                            type={"submit"}
                            label={loading ? "Registering..." : "Register"}
                            disabled={loading}
                        />
                    </Box>

                    <Box >
                        <p className="text-blue-900">Already have an account?</p>
                        <Link to="/">
                            <button className="text-blue-900 underline">Login</button>
                        </Link>
                    </Box>
                </Box>

            </form>
        </div>
    )
}
export default Register;





































//function RegistrationPage() {
//
//    const navigate = useNavigate();
//    const [registrationData, setRegistrationData] = useState<RegistrationFormInputs>({
//        email: '',
//        password1: '',
//        password2: '',
//    });
//    const [error, setError] = useState('');
//
//    const handleChange = (e: any) => {
//        setRegistrationData({ ...registrationData, [e.target.name]: e.target.value });
//    };
//
//    const handleSubmit = async (e: React.FormEvent) => {
//        e.preventDefault();
//        try {
//            await HandleRegistration(registrationData);
//            console.log("Registration successful.")
//            navigate('/login');
//        } catch (err: any) {
//            setError(err.response?.data?.detail || 'Registration Failed!');
//        }
//    };
//
//    return (
//        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
//            <h2 className="text-2xl font-bold mb-4">Register</h2>
//            {error && <p className="text-red-600 mb-2">{error}</p>}
//            <form onSubmit={handleSubmit}>
//                <input 
//                    type="email"
//                    name="email"
//                    placeholder="Email"
//                    value={registrationData.email}
//                    onChange={handleChange}
//                    className="w-full mb-2 p-2 border rounded"
//                    required
//                />
//                <input 
//                    type="password"
//                    name="password1"
//                    placeholder="Password"
//                    value={registrationData.password1}
//                    onChange={handleChange}
//                    className="w-full mb-4 p-2 border rounded"
//                    required
//                />
//                <input 
//                    type="password"
//                    name="password2"
//                    placeholder="Password"
//                    value={registrationData.password2}
//                    onChange={handleChange}
//                    className="w-full mb-4 p-2 border rounded"
//                    required
//                />
//                <button
//                    type="submit"
//                    className="w-full bg-blue-600 text-white p-2 rounded"
//                >
//                    Register
//                </button>
//                <p className="mt-4">
//                    Already have an account? 
//                    <button
//                        onClick={() => navigate('/login')}
//                    >
//                        Login
//                    </button>
//                </p>
//            </form>
//        </div>
//    );
//};
//export default RegistrationPage;
//