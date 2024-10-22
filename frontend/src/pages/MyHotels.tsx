import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { BsBuilding, BsMap } from "react-icons/bs";
import * as apiClient from '../api-client'
import { BiMoney, BiStar } from "react-icons/bi";
import { FaHotel } from "react-icons/fa";

export default function MyHotels() {
    const { data: hotelData } = useQuery("fetchMyHotels", apiClient.fetchMyHotels, {
        onError: () => {

        }
    })
    if (!hotelData) {
        return <span className="flex items-center justify-center text-red-600">No Hotel found</span>
    }
    return (
        <div className="space-y-5 p-4 lg:p-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-blue-600">
                    My Hotels
                </h1>
                <Link to="/add-hotel" className="text-blue-600 px-4 py-2 font-bold bg-white border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-md hover:shadow-lg">
                    Add Hotel
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {hotelData?.map((hotel) => (
                    <div key={hotel._id} className="flex flex-col border border-slate-300 rounded-lg p-6 gap-4 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <h2 className="text-2xl font-bold text-blue-600">{hotel.name}</h2>
                        <p className="text-gray-700 whitespace-pre-line">{hotel.description}</p>

                        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                            <div className="border border-slate-300 rounded-md p-3 flex items-center">
                                <BsMap className="mr-2 text-blue-600" />
                                <span>{hotel.city}, {hotel.country}</span>
                            </div>
                            <div className="border border-slate-300 rounded-md p-3 flex items-center">
                                <BsBuilding className="mr-2 text-blue-600" />
                                <span>{hotel.type}</span>
                            </div>
                            <div className="border border-slate-300 rounded-md p-3 flex items-center">
                                <BiMoney className="mr-2 text-blue-600" />
                                <span>EGP {hotel.pricePerNight} / night</span>
                            </div>
                            <div className="border border-slate-300 rounded-md p-3 flex items-center">
                                <FaHotel className="mr-2 text-blue-600" />
                                <span>{hotel.adultCount} adults, {hotel.childCount} children</span>
                            </div>
                            <div className="border border-slate-300 rounded-md p-3 flex items-center">
                                <BiStar className="mr-2 text-blue-600" />
                                <span>{hotel.starRating} Stars</span>
                            </div>
                        </div>
                    <span className="flex justify-end">
                    <Link className="text-blue-600 px-4 py-2 font-bold bg-white border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-md hover:shadow-lg" to={`/edit-hotel/${hotel._id}`}>
                    View Details
                    </Link>
                    </span>
                    </div>

                ))}
            </div>
        </div>
    )
}
