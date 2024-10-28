import React from "react";
import { hotelFacilities } from "../config/hotel-options-config";

type Props = {
    selectedFacilities: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FacilitiesFilter({ selectedFacilities, onChange }: Props) {
    return (
        <div className="bg-white p-5 rounded-lg shadow-lg">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
            Facilities
            </h4>
            {hotelFacilities.map((facility) => (
                <label
                    key={facility}
                    className="flex items-center space-x-4 mb-3 cursor-pointer transition-transform transform hover:scale-105 hover:bg-blue-50 p-3 rounded-lg"
                >
                    <input
                        type="checkbox"
                        className="rounded border-gray-400 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        value={facility}
                        checked={selectedFacilities.includes(facility)}
                        onChange={onChange}
                    />
                    <span className="flex items-center text-gray-800 font-medium">
                        
                        <span className="ml-3 text-sm text-gray-700">
                            {facility}
                        </span>
                    </span>
                </label>
            ))}
        </div>
    );
}
