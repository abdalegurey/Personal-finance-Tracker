


import api from '@/lib/api/apiClient';
import useAuthStore from '@/Store/authStore';

import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router';

const ProtectedRoute = ({children}) => {
    const location= useLocation()

    const {user,token,  setAuth,   clearAuth}= useAuthStore();
    
    
    const {data, error, isLoading, isError, isSuccess}=useQuery({
        queryKey:['currentUser'],
        queryFn:async()=>{
            const response= await api.get("/auth/profile"
);
            return response.data

        },
        retry:1
    })


    useEffect(()=>{
        if(isError){
            clearAuth();
        }

    },[isError,error,clearAuth])

    

     // success case
    useEffect(() => {
        if (isSuccess && data) {
            setAuth(data.user, token)
        }

    }, [isSuccess, data, setAuth, token])

    
    if (isLoading) {
        return (
            <div className='flex h-screen items-center justify-center'>
                <Loader className='animate-spin' />
            </div>
        )
    }


    if (isError) {
        console.log("error here", error);
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    // if(data.user.role !=="admin"){
    //    return <Navigate to="/login" state={{ from: location }} replace />
    // }

    if (!user) {
        console.log("user not found", user);
        return <Navigate to="/login" state={{ from: location }} replace />
    }
  return children
}

export default ProtectedRoute
