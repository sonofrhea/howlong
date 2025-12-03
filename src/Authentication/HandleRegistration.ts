import React, { useState } from "react";
import axios from "axios";

import apiClient from "../BaseEngine";
import { RegistrationFormInputs } from "./Types";


const HandleRegistration = async (data: RegistrationFormInputs) => {
    try {
        const response = await apiClient.post('dj-rest-auth/registration/', data);
        return response.data;
    } catch (err: any) {
        console.error('Registration failed:', err.response?.data || err.message);
        throw err;
    }
};
export default HandleRegistration;
