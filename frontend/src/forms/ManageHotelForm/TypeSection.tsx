import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

export default function TypeSection() {
  const { register, watch, formState: { errors } } = useFormContext<HotelFormData>();
  const typewatch = watch("type");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>

      {/* Type Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {hotelTypes.map((type) => (
          <label
            key={type}
            className={`cursor-pointer text-sm rounded-full px-4 py-2 font-semibold transition-all duration-300
            ${typewatch === type ? "bg-blue-400 text-white" : "bg-gray-300 text-gray-700 hover:bg-blue-200"}`}
          >
            <input
              type="radio"
              className="hidden"
              value={type}
              {...register("type", { required: "This field is required" })}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>

      {/* Error Message */}
      {errors.type && (
        <span className="text-red-500 text-sm font-bold mt-2">
          {errors.type.message}
        </span>
      )}
    </div>
  );
}
