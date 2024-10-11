import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from '../api-client'
import { useNavigate } from "react-router-dom";

export default function SignOutButton() {
    const navigate = useNavigate()

    const queryClient = useQueryClient()
    const { showToast } = useAppContext()
    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
           
            showToast({ message: "Signed Out!", type: 'SUCCESS' })
            await queryClient.invalidateQueries("validateToken");
navigate('/sign-in')
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: 'ERROR' })
        }
    })
    const handleClick = () => {
        mutation.mutate();
    }
    return (
        <button onClick={handleClick} className="text-blue-600 px-4 py-2 font-bold bg-white border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-md hover:shadow-lg">
            Sign Out
        </button>
    );
}
