import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client"
export default function AddHotel() {

    const { showToast } = useAppContext()
    const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
        onSuccess: () => {
            showToast({ message: "Hotel Saved!", type: "SUCCESS" })
        },
        onError: (e) => {
            showToast({ message: "Error Saving Hotel", type: "ERROR" })
            console.log(e);
            
        }
    })
    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData)
    }
    return (
        <ManageHotelForm onSave={handleSave} isLoading={isLoading} />


    )
}
