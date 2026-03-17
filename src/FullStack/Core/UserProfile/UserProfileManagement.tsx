import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from 'react-router-dom';

import { toast } from "react-hot-toast";


import { fetchUserProfile, patchUserProfile } from "../Engines";


import { UserProfileInputs } from "../constants/Types";
import { spinningStyles } from "../constants/Styles";


import UserProfileDetails from "./UserProfileDetails";







function UserProfileManagement() {
    const queryClient = useQueryClient();
    const [view, setView] = useState('details');




    const { data: selectedUserProfile, isLoading: isLoadingUserProfile, error: userProfileError } = useQuery({
        queryKey: ['userProfile'],
        queryFn: fetchUserProfile,
    });





    const updateUserProfileMutation = useMutation({
        mutationFn: patchUserProfile,
        onMutate: () => {
            toast.loading('Updating Company profile...', { id: "Update User profile" });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['company'] });
            toast.success('Company profile Updated', { id: "Update User profile" });
            setView('details')
        },
        onError: (error: any) => {
            toast.error('Failed to update Company profile', { id: "Update User profile" });
            console.error(
                'Error updating User profile:',
                error.response?.data || error.message
            )
        }
    })

    // ------------------------------------------------------------------------------------

    const handleUpdateUserProfile = async (userProfileData: UserProfileInputs) => {
        await updateUserProfileMutation.mutateAsync(userProfileData);
    };


    // ------------------------------------------------------------------------------------


    const handleBackToUserDetails = () => {
        setView('details')
    };

    // ------------------------------------------------------------------------------------

    const handleEditUserButton = () => {
        setView('edit');
    };

    // ------------------------------------------------------------------------------------


    // ERROR DISPLAYS

    if (isLoadingUserProfile) return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">fetching User...</p>
        </div>
        </div>
    );

    if (userProfileError) return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
                <svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-500 mb-4">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm0-4V7h2v6h-2z" fill="currentColor"/>
                </svg>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Data</h2>
                <p className="text-gray-600">Failed to user data. Please try again.</p>
            </div>
        </div>
    );



    return(
        <div className="min-h-screen bg-[#f0f2f7]">

            <style>
                {`
                    @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap");
                `}
            </style>

            <div className="border-b border-gray-100" style={{ fontFamily: 'Montserrat, system-ui' }}>
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <span className={spinningStyles.terminalBar.spinner}>⠋</span>
                            <div>
                                <h1 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                    Core Suite
                                </h1>
                                <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat, system-ui' }}>
                                    User Profile
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                        <Link 
                            to="/core"
                            className="text-sm text-black px-3 py-1 border border-gray-300 rounded-2xl transition-colors duration-200 flex items-center gap-2 hover:bg-purple-50 hover:border-purple-500 hover:shadow-md hover:-translate-y-0.5"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Company Dashboard
                        </Link>
                        </div>
                    </div>
                </div>
            </div>

            

            {view === 'details' && (
                <UserProfileDetails
                    userProfile={selectedUserProfile}
                    isLoading={isLoadingUserProfile}
                    onEdit={handleEditUserButton}
                />
            )}

            {view === 'edit' && selectedUserProfile && (
                <UserProfileEdit
                    userProfile={selectedUserProfile}
                    onSubmit={handleUpdateUserProfile}
                    isSubmitting={updateUserProfileMutation.isPending}
                    onCancel={handleBackToUserDetails}
                />
            )}
        </div>
    );


};
export default UserProfileManagement;
