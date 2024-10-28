import React from "react";
import { hotelTypes } from "../config/hotel-options-config";

type Props = {
    selectedHotelTypes: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function HotelTypeFilter({ selectedHotelTypes, onChange }: Props) {
    return (
        <div className="bg-white p-5 rounded-lg shadow-lg">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
                Hotel Type
            </h4>
            {hotelTypes.map((hotelType) => (
                <label
                    key={hotelType}
                    className="flex items-center space-x-4 mb-3 cursor-pointer transition-transform transform hover:scale-105 hover:bg-blue-50 p-3 rounded-lg"
                >
                    <input
                        type="checkbox"
                        className="rounded border-gray-400 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        value={hotelType}
                        checked={selectedHotelTypes.includes(hotelType)}
                        onChange={onChange}
                    />
                    <span className="flex items-center text-gray-800 font-medium">
                        
                        <span className="ml-3 text-sm text-gray-700">
                            {hotelType}
                        </span>
                    </span>
                </label>
            ))}
        </div>
    );
}
