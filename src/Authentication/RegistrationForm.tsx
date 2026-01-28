import React, { lazy, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegistrationFormInputs } from "./Types";
import '../App.css';
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AxiosInstance from "../components/AxiosInstance"; 
import apiClient from "../BaseEngine";
import HandleRegistration from "./HandleRegistration";
import { spinningStyles } from "./Styles";

const Box = lazy(() => import('@mui/material/Box'));

const MyTextField = lazy(() => import("../components/constants/forms/MyTextField"));
const MyPassField = lazy(() => import("../components/constants/forms/MyPassField"));
const MyButton = lazy(() => import("../components/constants/forms/MyButton"));
const MyCompanyField = lazy(() => import("../components/constants/forms/MyCompanyField"));
const RolesSelect = lazy(() => import("../components/constants/forms/RolesSelect"));

const FormFallback = () => (
  <div className="whiteBox" style={{ width: 420, maxWidth: '100%', padding: 20 }}>
    <div style={{ height: 400, background: '#f5f5f5', borderRadius: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <span className={spinningStyles.terminalBar.spinner}></span>
    </div>
  </div>
);

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
            company: data.company,
            role: data.role
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
        } finally {
            setLoading(false);
        }
    }

    return(
        <div>
            <div className="bg-gray-500">
                <Link to="/">
                    <button className="text-white hover:underline">Home</button>
                </Link>
            </div>
        
            <div className={"myLoginBackground"}>
                <Suspense fallback={<FormFallback />}>
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
                                        validate: (value: string, formValues: any) => value === formValues.password1 || "Passwords do not match"
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

                            <div>
                            <Box className={"itemBox"}>
                                <RolesSelect 
                                    label={"Select Role"}
                                    name={"role"}
                                    control={control}
                                    rules={{required: 'Please pick a role'}}
                                    
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
                </Suspense>
            </div>
        </div>
    )
}
export default Register;