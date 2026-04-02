import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIdleTimer } from 'react-idle-timer';

import { handleStayLoggedIn } from "./HandleLogin";

import { toast } from "react-hot-toast";



const IDLE_TIMEOUT_MS = 50 * 60 * 1000;
const PROMPT_DURATION_MS = 60 * 1000;

export const useSessionTimeout = () =>{
    const navigate = useNavigate();
    const [showPrompt, setShowPrompt] = useState(false);
    const [countdown, setCountdown] = useState(PROMPT_DURATION_MS / 1000);
    const [redirect, setRedirect] = useState(false);

    const isHandling = useRef(false);
    const toastShown = useRef(false);


    useEffect(() => {
        if (redirect) {
            navigate("/login?reason=idle_timeout");
            setRedirect(false);
        }
    }, [redirect, navigate])


    const { activate } = useIdleTimer({
        disabled: !localStorage.getItem('Token'),
        timeout: IDLE_TIMEOUT_MS,
        promptBeforeIdle: PROMPT_DURATION_MS,
        onIdle: () => {
            localStorage.removeItem('Token');
            setRedirect(true);
        },
        onPrompt: () => setShowPrompt(true),
        onActive: () => {
            setShowPrompt(false);
            setCountdown(PROMPT_DURATION_MS / 1000);
        },
        debounce: 500,
        crossTab: true,
        leaderElection: true
    });

    useEffect(() => {
        if (!showPrompt) return;

        const interval = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    localStorage.removeItem('Token');
                    setRedirect(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [showPrompt]);

    const handleStayLoggedInValidation = async () => {
        if (isHandling.current) return;
        isHandling.current = true;
        setShowPrompt(false);
        try {
            await handleStayLoggedIn();
            activate();
            isHandling.current = false;
        } catch (error: any) {
            isHandling.current = false;
            //console.error("Failed to extend session", error);
            if (!toastShown.current) {
                toastShown.current = true;

                let errorMessage = "Session expired. Please log in again"
                if (error.response?.status === 403) {
                    errorMessage = "Session timeout. Please log in again.";
                } else if (error.response?.status === 401) {
                    errorMessage = "Your session has expired. Please log in again.";
                } else if (error.message?.includes("Authentication credentials were not provided")) {
                    errorMessage = "Authentication failed. Please log in again";
                }
                
                toast.error(errorMessage, {id: "timeout-toast"});
            }
            localStorage.removeItem('Token');
            navigate('/login?reason=idle_timeout');
        }
    };

    return { showPrompt, countdown, handleStayLoggedInValidation };
}
