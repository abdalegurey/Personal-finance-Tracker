import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {Button} from "@/components/ui/button"
import LoginForm from "@/components/auth/LoginForm"

function Login() {

  return (
    
   <div className='min-h-screen flex flex-col items-center justify-center bg-background'>

            <div className='absolute inset-0 bg-gradient-to-br from-secondary to-secondary opacity-1' />
            <div className='z-10 w-full max-w-md px-4'>
                <div className='mb-8 text-center'>
                    <h1 className='text-3xl font-bold text-foreground'>Welcome back</h1>
                    <p>We're glad to see you again</p>
                </div>

                {/* Registration Form */}
                <LoginForm />
            </div>
        </div>
  )
}
export default Login