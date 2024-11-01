import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";

type Props = {
  hotel: HotelType;
};

const LatestDestinationCard = ({ hotel }: Props) => {
  return (
    <Link
      to={`/detail/${hotel._id}`}
      className="relative block rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
    >
      <div className="h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          alt={hotel.name} // Added alt attribute for better accessibility
          className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-110"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-transparent to-transparent rounded-b-lg">
        <div className="flex justify-between items-center">
        <span className="text-white font-bold text-2xl tracking-tight">
          {hotel.name}
        </span>
        <span className=" text-white text-sm">
          {hotel.city},{hotel.country}
        </span>
        </div>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;
