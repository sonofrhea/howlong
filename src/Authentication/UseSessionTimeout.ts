import React, { useEffect, useState } from "react";
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
        setShowPrompt(false);
        try {
            await handleStayLoggedIn();
            activate();
        } catch (error: any) {
            //console.error("Failed to extend session", error);
            localStorage.removeItem('Token');
            navigate('/login?reason=idle_timeout');

            let errorMessage = ""
            if (error.response?.status === 403) {
                errorMessage = "Oops! Timeout."
            }

            toast.error(errorMessage, {duration: 8000,});
        }
    };

    return { showPrompt, countdown, handleStayLoggedInValidation };
}
