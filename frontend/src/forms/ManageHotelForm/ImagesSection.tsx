import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"
import React from "react"

function ImagesSection() {
    const { register, formState: { errors }, watch,setValue } = useFormContext<HotelFormData>()
    const existingImagesUrls = watch("imageUrls")
    const handleDelete = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        imageUrl: string
    ) => {
        event.preventDefault();
        setValue("imageUrls",existingImagesUrls.filter((url)=> url !== imageUrl))
    }
    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="border rounded-lg p-4 flex flex-col gap-4">
                {existingImagesUrls && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {existingImagesUrls.map((url) => (
                            <div key={url} className="relative group overflow-hidden rounded-lg shadow-lg">
                                <img
                                    src={url}
                                    className="w-full h-32 object-cover transition-transform duration-300 transform group-hover:scale-110"
                                    alt="Hotel image"
                                />
                                <button 
                                onClick={(event)=>handleDelete(event,url)}
                                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white text-sm font-semibold transition-opacity duration-300">
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="w-full text-gray-700 font-normal border border-gray-300 rounded-lg p-2"
                    {...register("imageFiles", {
                        validate: (imageFiles) => {
                            const totalLength = imageFiles.length+ (existingImagesUrls?.length || 0)
                            if (totalLength === 0) {
                                return "At least one image should be added"
                            }
                            if (totalLength > 6) {
                                return "Total number of images cannot exceed 6"
                            }
                            return true
                        }
                    })}
                />
            </div>
            {errors.imageFiles && (
                <span className="text-red-500 text-sm font-bold">
                    {errors.imageFiles.message}
                </span>
            )}
        </div>
    )
}

export default ImagesSection
