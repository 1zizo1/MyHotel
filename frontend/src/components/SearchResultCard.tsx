import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../../../backend/src/shared/types"
import { Link } from "react-router-dom";

type props = {
    hotel: HotelType;
}
export default function SearchResultCard({ hotel }: props) {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
            <div className="w-full h-[300px]">
                <img src={hotel.imageUrls[0]}
                    className="w-full h-full object-cover object-center" />
            </div>
            <div className="grid grid-rows-[1fr_2fr_1fr]">
                <div>
                    <div className="flex items-center">
                        <span className="flex">
                            {Array.from({ length: hotel.starRating }).map(() => (
                                <AiFillStar className="fill-yellow-400" />
                            ))}
                        </span>
                        <span className="ml-12 text-sm">
                            {hotel.type}
                        </span>
                    </div>
                    <Link to={`/detail/${hotel._id}`}>
                        <h2 className="text-2xl font-bold cursor-pointer">
                            {hotel.name}
                        </h2>
                    </Link>
                </div>

                <div>
                    <div className="line-clamp-4">{hotel.description}</div>
                </div>
                <div className="grid grid-cols-2 items-end whitespace-nowrap">

                    <div className="flex gap-1 items-center">
                        {hotel.facilities.slice(0, 2).map((facility) => (
                            <span className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap">
                                {facility}
                            </span>
                        ))}
                        <span className="text-sm">
                            {hotel.facilities.length > 2 && `+${hotel.facilities.length - 2} more`}
                        </span>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                        <span className="font-bold">
                            {hotel.pricePerNight} per night
                        </span>
                        <Link to={`/detail/${hotel._id}`}>
                            <button className=" text-blue-600 px-4 py-2 font-bold bg-white border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-md hover:shadow-lg max-w-fit">
                                View More
                            </button>
                        </Link>
                    </div>

                </div>

            </div>
        </div>
    )
}
