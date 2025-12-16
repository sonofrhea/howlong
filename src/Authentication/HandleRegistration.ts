import React, { useState } from "react";
import axios from "axios";

import apiClient from "../BaseEngine";
import { RegistrationFormInputs } from "./Types";


const HandleRegistration = async (data: RegistrationFormInputs) => {
    const isDevelopment = import.meta.env.MODE === "development";
    const baseEntry = isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_DEPLOY;

    try {
        const response = await apiClient.post(`${baseEntry}core/register/`, data);
        return response?.data;
    } catch (err: any) {
        //console.log("ERROR TYPE:", err.constructor.name);
        //console.log("ERROR KEYS:", Object.keys(err));
        //console.log("FULL ERROR OBJECT:", err);
        throw err;
    }
};
export default HandleRegistration;


