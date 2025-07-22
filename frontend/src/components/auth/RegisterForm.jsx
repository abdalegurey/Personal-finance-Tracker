import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'


import { Button } from '../ui/button'
import { Mail, User, Lock, LoaderCircle } from "lucide-react";
import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api/apiClient';
import { extractErrorMessages } from '@/util/errorUtil';


const RegisterForm = () => {

    
    const navigate = useNavigate();
     const registerMutation = useMutation({
        mutationFn: async (userData) => {
            const response = await api.post('/auth/register', userData)
            console.log("responseData",response.data)
            return response.data
        },
        onSuccess: (data) => {
            // console.log("data",data)
             navigate('/login')
        },
        onError: (err) => {
            console.log("errpr",err)
             setError(extractErrorMessages(err))
        }
    })

       const [formValues, setFormValues] = useState({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
        // console.log("formValues",formValues)
        const [error, setError] = useState(null)
    
        
        const handleInputChange = (e) => {
            // console.log("e.targetddd",e.target.name)
            const { name, value } = e.target
            setFormValues({
                ...formValues,
                [name]: value
            })
        }

        const handleSubmit=async(e)=>{
        e.preventDefault();
        setError(null)

          if (!formValues.name || !formValues.email || !formValues.password) {
            setError('All fields are required')
            return
        }

        if (formValues.password !== formValues.confirmPassword) {
            setError('Passwords do not match')
            return
        }


       registerMutation.mutate({
            name: formValues.name,
            email: formValues.email,
            password: formValues.password
        })

        }
  return (
<Card className="w-full max-w-md mx-auto border-border shadow-xl">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-2xl text-center font-semibold">Create an account</CardTitle>
        <CardDescription className="text-center text-sm text-muted-foreground">
          Enter your details to register
        </CardDescription>
      </CardHeader>

      <form  onSubmit={handleSubmit} >
        <CardContent className="space-y-4 pt-0">

          {error && (
            <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
              {error}
            </div>
          )}

          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <User size={16} /> Full Name
            </label>
            <Input
              name="name"
              placeholder="John Doe"
              required
              value={formValues.name}
              onChange={handleInputChange}
            />
          </div>

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

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Lock size={16} /> Confirm Password
            </label>
            <Input
              name="confirmPassword"
              type="password"
              placeholder="******"
              value={formValues.confirmPassword}
              onChange={handleInputChange}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button type="submit" className="w-full">
            {registerMutation.isPending ? (<span className='flex items-center gap-2'><LoaderCircle /> Creating account... </span>) : ("Create Account")}
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center pt-0">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-primary hover:underline cursor-pointer"
            >
              Sign in
            </span>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}

export default RegisterForm
