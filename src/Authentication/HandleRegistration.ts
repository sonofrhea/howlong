import React, { useState } from "react";
import axios from "axios";

import apiClient from "../BaseEngine";
import { RegistrationFormInputs } from "./Types";


const HandleRegistration = async (data: RegistrationFormInputs) => {
    const isDevelopment = import.meta.env.MODE === "development";
    const baseEntry = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY;

    try {
        const response = await apiClient.post(`${baseEntry}core/registration/`, data);
        return response.data;
    } catch (err: any) {
        console.error('Registration failed:', err.response?.data || err.message);
        throw err;
    }
};
export default HandleRegistration;


// { withCredentials: true }