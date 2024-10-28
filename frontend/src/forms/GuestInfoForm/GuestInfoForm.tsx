import { useForm } from "react-hook-form";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

type Props = {
    hotelId: string;
    pricePerNight: number;
};

type GuestInfoFormData = {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
};

export default function GuestInfoForm({ hotelId, pricePerNight }: Props) {
    const search = useSearchContext();
    const { isLoggedIn } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();
    
    const { watch, register, handleSubmit, setValue, formState: { errors } } = useForm<GuestInfoFormData>({
        defaultValues: {
            checkIn: search.checkIn,
            checkOut: search.checkOut,
            adultCount: search.adultCount,
            childCount: search.childCount,
        },
    });
    
    const checkIn = watch("checkIn");
    const checkOut = watch("checkOut");

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    const onSignInClick = (data: GuestInfoFormData) => {
        search.saveSearchValues("", data.checkIn, data.checkOut, data.adultCount, data.childCount);
        navigate("/sign-in", { state: { from: location } });
    };

    const onSubmit = (data: GuestInfoFormData) => {
        search.saveSearchValues("", data.checkIn, data.checkOut, data.adultCount, data.childCount);
        navigate(`/hotel/${hotelId}/booking`);
    };

    return (
        <div className="flex flex-col p-6 bg-blue-50 shadow-md rounded-lg gap-4 border border-slate-300">
            <h3 className="text-2xl font-bold text-center text-blue-700">£{pricePerNight}</h3>
            <form
                onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}
            >
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <DatePicker
                            required
                            selected={checkIn}
                            onChange={(date) => setValue("checkIn", date as Date)}
                            selectsStart
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={minDate}
                            maxDate={maxDate}
                            placeholderText="Check-in Date"
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <DatePicker
                            required
                            selected={checkOut}
                            onChange={(date) => setValue("checkOut", date as Date)}
                            selectsEnd
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={checkIn ? checkIn : minDate}
                            maxDate={maxDate}
                            placeholderText="Check-out Date"
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex bg-white border border-gray-300 rounded-md p-2 gap-4">
                        <label className="flex items-center">
                            <span className="mr-2 font-medium">Adults:</span>
                            <input
                                className="w-full border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="number"
                                min={1}
                                max={20}
                                {...register("adultCount", {
                                    required: "This field is required",
                                    min: {
                                        value: 1,
                                        message: "There must be at least one adult",
                                    },
                                    valueAsNumber: true,
                                })}
                            />
                        </label>
                        <label className="flex items-center">
                            <span className="mr-2 font-medium">Children:</span>
                            <input
                                className="w-full border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="number"
                                min={0}
                                max={20}
                                {...register("childCount", {
                                    valueAsNumber: true,
                                })}
                            />
                        </label>
                    </div>
                    {errors.adultCount && (
                        <span className="text-red-500 font-semibold text-sm">
                            {errors.adultCount.message}
                        </span>
                    )}
                    <div className="flex justify-center">
                        <button className=" bg-white border border-blue-600 rounded-lg  hover:text-white transition-colors duration-300 shadow-md hover:shadow-lg text-blue-600 h-12 w-full font-bold hover:bg-blue-500">
                            {isLoggedIn ? "Book Now" : "Sign in to Book"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}