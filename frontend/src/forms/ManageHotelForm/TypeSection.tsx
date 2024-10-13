import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";


export default function TypeSection() {
    const { register, watch } = useFormContext();
    const typewatch = watch("type")
    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Type</h2>
            <div className="grid-cols-5 grid gap-2">
                {hotelTypes.map((type) => (
                    <label
                        className={typewatch === type ? "cursor-pointer bg-blue-300 text-sm rounded-full px-4 py-2 font-semibold" : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"}
                    >
                        <input type="radio"
                        className="hidden"
                            value={type}{...register("type", {
                                required: "This field is required"
                            })} />
                        <span>{type}</span>
                    </label>
                ))}
            </div>
        </div>
    )
}
