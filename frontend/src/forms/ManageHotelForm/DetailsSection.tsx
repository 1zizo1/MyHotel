import { useFormContext } from 'react-hook-form'
import { HotelFormData } from './ManageHotelForm'

export default function DetailsSection() {
  const { register, formState: { errors } } = useFormContext<HotelFormData>()

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold mb-4">Add Hotel</h1>

      {/* Hotel Name */}
      <label className="text-gray-700 text-sm font-bold">
        Name
        <input
          type="text"
          className="border rounded w-full py-2 px-3 text-gray-800 font-normal focus:ring-2 focus:ring-blue-400 transition-all"
          {...register("name", { required: "This Field is required" })}
        />
        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
      </label>

      {/* City & Country */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="text-gray-700 text-sm font-bold">
          City
          <input
            type="text"
            className="border rounded w-full py-2 px-3 text-gray-800 font-normal focus:ring-2 focus:ring-blue-400 transition-all"
            {...register("city", { required: "This Field is required" })}
          />
          {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
        </label>

        <label className="text-gray-700 text-sm font-bold">
          Country
          <input
            type="text"
            className="border rounded w-full py-2 px-3 text-gray-800 font-normal focus:ring-2 focus:ring-blue-400 transition-all"
            {...register("country", { required: "This Field is required" })}
          />
          {errors.country && <span className="text-red-500 text-sm">{errors.country.message}</span>}
        </label>
      </div>

      {/* Description */}
      <label className="text-gray-700 text-sm font-bold">
        Description
        <textarea
          rows={6}
          className="border rounded w-full py-2 px-3 text-gray-800 font-normal focus:ring-2 focus:ring-blue-400 transition-all"
          {...register("description", { required: "This Field is required" })}
        />
        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
      </label>

      {/* Price Per Night */}
      <label className="text-gray-700 text-sm font-bold">
        Price Per Night
        <input
          type="number"
          min={1}
          className="border rounded w-full py-2 px-3 text-gray-800 font-normal focus:ring-2 focus:ring-blue-400 transition-all"
          {...register("pricePerNight", { required: "This Field is required" })}
        />
        {errors.pricePerNight && <span className="text-red-500 text-sm">{errors.pricePerNight.message}</span>}
      </label>

      {/* Star Rating */}
      <label className="text-gray-700 text-sm font-bold">
        Star Rating
        <select
          className="border rounded w-full py-2 px-3 text-gray-800 font-normal focus:ring-2 focus:ring-blue-400 transition-all"
          {...register("starRating", { required: "This field is required" })}
        >
          <option value="" className="text-sm font-bold">
            Select a Rating
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.starRating && <span className="text-red-500 text-sm">{errors.starRating.message}</span>}
      </label>
    </div>
  )
}
