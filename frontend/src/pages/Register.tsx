import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-client'
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}
export default function Register() {
    const queryClient = useQueryClient()

    const navigate = useNavigate()
    const { showToast } = useAppContext();
    const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            showToast({ message: "Registration Success! ", type: "SUCCESS" })
            await queryClient.invalidateQueries("validateToken");
            navigate("/")
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: "ERROR" })

        }
    })
    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data)
    })

    return (
        <form className='flex flex-col gap-5' onSubmit={onSubmit}>
            <h2 className='text-3xl font-bold'>
                Create an Account
            </h2>
            <div className="flex flex-col md:flex-row gap-5">
                <label className=" text-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input type="text" className="border rounded w-full py-1 px-2 font-normal"{...register("firstName", { required: "This Field is required" })} />
                    {errors.firstName && (
                        <span className="text-red-500">{errors.firstName.message}</span>
                    )}
                </label>
                <label className=" text-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input type="text" className="border rounded w-full py-1 px-2 font-normal" {...register("lastName", { required: "This Field is required" })} />
                    {errors.lastName && (
                        <span className="text-red-500">{errors.lastName.message}</span>
                    )}
                </label>

            </div>
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
            <label className=" text-gray-700 text-sm font-bold flex-1">
                Confirm Password
                <input type="password" className="border rounded w-full py-1 px-2 font-normal  " {...register("confirmPassword", {
                    validate: (val) => {
                        if (!val) {
                            return "this field is required"
                        } else if (watch("password") !== val) {
                            return "Your password do not match"
                        }
                    }
                })} />
                {errors.confirmPassword && (
                    <span className="text-red-500">{errors.confirmPassword.message}</span>
                )}
            </label>
            <span className="flex items-center justify-between">
            <span className="text-sm">
                Already Registerd? <Link className='underline' to={'/sign-in'}> Sign in here</Link>
                </span>
                <button type="submit" className="text-blue-600 px-4 py-2 font-bold bg-white border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-md hover:shadow-lg">
                    Create Account
                </button>
            </span>
        </form>
    )
}


