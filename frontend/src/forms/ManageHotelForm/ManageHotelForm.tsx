import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: number;
    adultCount: number;
    childCount: number;
    facilities: string[];
    starRating: number;
    imageUrls: string[];
    imageFiles: FileList;
}

type props={
    onSave:(hotelFormData:FormData)=> void
    isLoading:boolean
}
export default function ManageHotelForm({onSave,isLoading}:props) {
    const formMethods = useForm<HotelFormData>()
    const { handleSubmit } = formMethods;
    const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
        const formData = new FormData()
        formData.append("name", formDataJson.name)
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("description", formDataJson.description);
        formData.append("type", formDataJson.type);
        formData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());

        formDataJson.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility);
        });

        if (formDataJson.imageUrls) {
            formDataJson.imageUrls.forEach((url, index) => {
                formData.append(`imageUrls[${index}]`, url);
            });
        }

        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            formData.append(`imageFiles`, imageFile);
        });
    onSave(formData);


    })
    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-10" onSubmit={onSubmit}>
                <DetailsSection />
                <TypeSection />
                <FacilitiesSection />
                <GuestsSection />
                <ImagesSection />
                <span className="flex justify-end">
                    <button className=" text-blue-600 px-4 py-2 font-bold bg-white border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-md hover:shadow-lg disabled:bg-gray-500"
                    disabled={isLoading}
                    >
                        {isLoading?"Saving...":"Save"}
                        
                    </button>
                </span>
            </form>
        </FormProvider>
    )
}
