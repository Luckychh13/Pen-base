import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { login } from '../store/authSlice'
import { Logo, Button, Input } from "../components/index"
import { Link } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState(null)

    const loginHandler = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userdata = await authService.getCurrentUser()
                if (userdata) {
                    dispatch(login(userdata))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[80vh] px-4">
            <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
                <div className="flex justify-center mb-6">
                    <Logo width="90px" />
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-900">
                    Sign in to your account
                </h2>
                <p className="text-center text-sm text-gray-500 mt-2 mb-6">
                    Don&apos;t have an account?&nbsp;
                    <Link to="/signup" className="text-indigo-600 font-medium hover:underline">
                        Sign Up
                    </Link>
                </p>

                {error && (
                    <p className="bg-red-50 text-red-600 text-sm rounded-lg px-3 py-2 mb-4 text-center">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit(loginHandler)} className="space-y-4">
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                            }
                        })}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", { required: true })}
                    />
                    <Button type="submit" className="w-full mt-2">
                        Sign in
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Login