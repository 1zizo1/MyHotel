import { useFormContext } from "react-hook-form"
import { hotelFacilities } from "../../config/hotel-options-config"
import { HotelFormData } from "./ManageHotelForm"

export default function FacilitiesSection() {
    const { register, formState: { errors } } = useFormContext<HotelFormData>()

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Facilities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 bg-gray-100 p-5 rounded-lg shadow-lg">
                {hotelFacilities.map((facility) => (
                    <label key={facility} className="text-sm flex gap-2 items-center text-gray-700 hover:bg-gray-200 p-2 rounded transition-all duration-300 ease-in-out">
                        <input 
                            type="checkbox" 
                            value={facility} 
                            className="cursor-pointer"
                            {...register("facilities", {
                                validate: (facilities) => {
                                    if (facilities && facilities.length > 0) {
                                        return true
                                    } else {
                                        return "At least one facility is required"
                                    }
                                }
                            })} 
                        />
                        {facility}
                    </label>
                ))}
            </div>
            {errors.facilities && (
                <span className="text-red-500 text-sm font-bold mt-2">
                    {errors.facilities.message}
                </span>
            )}
        </div>
    )
}
