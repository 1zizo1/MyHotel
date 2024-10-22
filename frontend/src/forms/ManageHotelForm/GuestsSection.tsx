import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"

export default function GuestsSection() {
    const { register, formState: { errors } } = useFormContext<HotelFormData>()

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Guests</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 bg-gray-100 rounded-lg shadow-lg">
                <label className="text-gray-700 text-sm font-semibold">
                    Adults
                    <input
                        type="number"
                        min={1}
                        className="border rounded w-full py-2 px-3 mt-1 font-normal focus:ring-2 focus:ring-blue-500 transition"
                        {...register("adultCount", { required: "This field is required" })}
                    />
                    {errors.adultCount?.message && (
                        <span className="text-red-500 text-sm font-bold">
                            {errors.adultCount.message}
                        </span>
                    )}
                </label>

                <label className="text-gray-700 text-sm font-semibold">
                    Children
                    <input
                        type="number"
                        min={0}
                        className="border rounded w-full py-2 px-3 mt-1 font-normal focus:ring-2 focus:ring-blue-500 transition"
                        {...register("childCount", { required: "This field is required" })}
                    />
                    {errors.childCount?.message && (
                        <span className="text-red-500 text-sm font-bold">
                            {errors.childCount.message}
                        </span>
                    )}
                </label>
            </div>
        </div>
    )
}
