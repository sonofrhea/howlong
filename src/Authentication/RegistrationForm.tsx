import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegistrationFormInputs } from "./Types";
import '../App.css';

import { toast } from "react-hot-toast";


import { Box } from '@mui/material';
import MyTextField from "../components/constants/forms/MyTextField";
import MyPassField from "../components/constants/forms/MyPassField";
import MyButton from "../components/constants/forms/MyButton";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import AxiosInstance from "../components/AxiosInstance"; 
import apiClient from "../BaseEngine";

import HandleRegistration from "./HandleRegistration";
import { spinningStyles } from "./Styles";
import MyCompanyField from "../components/constants/forms/MyCompanyField";



const Register = () => {
    const navigate = useNavigate()
    const {handleSubmit, control, formState} = useForm();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const submission = async (data: any) => {
        if (loading) return
        setLoading(true);
        setError("")

        const toastId = toast.loading('Registering...');
        try {
            await HandleRegistration({
            email: data.email,
            password1: data.password1,
            password2: data.password2,
            company: data.company
        });
            toast.success('Registration successful!', {id: toastId});
            navigate(`/login`);
        } catch (error: any) {
            let errorMessage = "";
            let errorMessage2 = "";

            if (error.code === "ECONNABORTED") {
                errorMessage = "Request timed out. Please try again.";
            }

            else if (error.response.data?.detail) {
                errorMessage = error.response.data.detail;
            }

            else if (error.response.data?.password1) {
                errorMessage = error.response.data.password1;
            }

            setError(errorMessage);
            toast.error('Registration failed.', {id: toastId});
            //console.error(errorMessage);
        } finally {
            setLoading(false);
        }
        
        //apiClient.post(`core/register/`,{
        //    email: data.email,
        //    password1: data.password1,
        //    password2: data.password2
        //})
//
        //.then(() => {
        //    navigate(`/`)
        //})
    }

    return(
        <div>
            <div className="bg-gray-500">
                <Link to="/">
                    <button className="text-white hover:underline">Home</button>
                </Link>
            </div>
        
            <div className={"myLoginBackground"}>

                <form onSubmit={handleSubmit(submission)}>

                
                    <Box className="whiteBox" sx={{ width: 420, maxWidth: '100%' }}>
                        <Box className={"itemBox"}>
                            <Box className={'title'}>User Registration</Box>
                        </Box>

                        <div>
                        <Box className={"itemBox"}>
                            <MyTextField 
                                label={"Email"}
                                name={"email"}
                                control={control}
                                
                            />
                        </Box>
                        </div>

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
                                rules={{
                                    required: 'Please confirm your password',
                                    validate: (value, formValues) => value === formValues.password1 || "Passwords do not match"
                                }}
                            />
                        </Box>

                        <div>
                        <Box className={"itemBox"}>
                            <MyCompanyField 
                                label={"Company Name"}
                                name={"company"}
                                control={control}
                                rules={{required: 'Please enter company name'}}
                                
                            />
                        </Box>
                        </div>
                        
                        {error && (
                            <Box className={"itemBox"}>
                                <p className="text-amber-800 text-sm">
                                    {error}
                                </p>
                            </Box>
                        )}

                        <Box className={"itemBox"}>
                            <MyButton 
                                type={"submit"}
                                label={loading ? <span className={spinningStyles.terminalBar.spinner}>◖</span> : "Register"}
                                disabled={loading}
                            />
                        </Box>

                        <Box >
                            <p className="text-blue-900">Already have an account?</p>
                            <Link to="/login">
                                <button className="text-blue-900 underline">Login</button>
                            </Link>
                        </Box>
                    </Box>

                </form>
            </div>
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


{/*   {error && (
                    <Box className="text-amber-800">
                        {error}
                    </Box>
                    )} */}