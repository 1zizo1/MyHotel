import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client'
import { useAppContext } from '../contexts/AppContext';
import { Link, useNavigate } from 'react-router-dom';
export type SignInFormData = {
    email: string;
    password: string;
}

export default function SignIn() {
    const queryClient = useQueryClient()

    const navigate = useNavigate()
    const{showToast}=useAppContext()
    const { register, formState: { errors }, handleSubmit } = useForm<SignInFormData>()
    const mutation = useMutation(apiClient.SignIn, {
        onSuccess: async () => {
            showToast({message:"Welcome",type:'SUCCESS'})
            await queryClient.invalidateQueries("validateToken");            navigate('/')
        }, onError: (error: Error) => {
            showToast({message:error.message,type:'ERROR'})
        }
    })
    const onSubmit = handleSubmit((data) => {
        console.log(data);
        mutation.mutate(data)

    })

    return (
        <form className='flex flex-col gap-5' onSubmit={onSubmit}>
            <h2 className='text-3xl font-bold'>Sign In</h2>

            <label className=" text-gray-700 text-sm font-bold flex-1">
                Email
                <input type="email" className="border rounded w-full py-1 px-2 font-normal  " {...register("email", { required: "This Field is required" })} />
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
            </label>
            <label className=" text-gray-700 text-sm font-bold flex-1">
                Password
                <input type="password" className="border rounded w-full py-1 px-2 font-normal  " {...register("password", { required: "This Field is required", minLength: { value: 8, message: "password msut be at least 8 characters" } })} />
                {errors.password && (
                    <span className="text-red-500">{errors.password.message}</span>
                )}
            </label>
            <span className="flex items-center justify-between">
            <span className="text-sm">
                Not Registerd? <Link className='underline' to={'/register'}> Create an account here</Link>
                </span>
                <button type="submit" className="text-blue-600 px-4 py-2 font-bold bg-white border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-md hover:shadow-lg">
                    Sign In
                </button>
            </span>

        </form>
    )
}
