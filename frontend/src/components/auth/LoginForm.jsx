import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Navigate, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { extractErrorMessages } from '@/util/errorUtil';
import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api/apiClient';
import useAuthStore from '../../Store/authStore';
const LoginForm = () => {
  const   {setAuth}= useAuthStore();
  // console.log("setauth",setAuth)
    const [formValues, setFormValues] = useState({
         
            email: '',
            password: '',
        
        })
        const [error, setError] = useState(null)
        const navigate=useNavigate()
    
        
        const handleInputChange = (e) => {
            const { name, value } = e.target
            setFormValues({
                ...formValues,
                [name]: value
            })
        }

          const   loginMutation = useMutation({
        mutationFn: async (userData) => {
            const response = await api.post('/auth/login', userData)
            console.log("responseData",response.data)
            return response.data
        },
        onSuccess: (data) => {
          console.log("data",data)
          
            if (data.token) {
                const user = data.userExists;
                const token = data.token;
                // console.log("user",data.userExists);
                // console.log("tokennn",data.token)

                 setAuth(user, token);
                navigate('/dashboard');
            }

            // navigate('/dashboard');

        },
        onError: (err) => {
            console.log("errpr",err)
             setError(extractErrorMessages(err))
        }
    })


     const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        if (!formValues.email || !formValues.password) {
            setError('All fields are required')
            return
        }

        loginMutation.mutate({
            email: formValues.email,
            password: formValues.password
        })
    }
  return (
    <Card className="w-full max-w-md mx-auto border-border shadow-lg">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-2xl text-center font-semibold">Sign In</CardTitle>
        <CardDescription className="text-center text-sm text-muted-foreground">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>

      <form  onSubmit={handleSubmit} >
        <CardContent className="space-y-4 pt-0">
          {error && (
            <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Mail size={16} /> Email
            </label>
            <Input
              name="email"
              placeholder="email@email.com"
              type="email"
              required
              value={formValues.email}
              onChange={handleInputChange}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Lock size={16} /> Password
            </label>
            <Input
              name="password"
              type="password"
              placeholder="******"
              required
              value={formValues.password}
              onChange={handleInputChange}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center pt-0">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-primary hover:underline cursor-pointer"
            >
              Sign up
            </span>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}

export default LoginForm
