import React from "react";
import { FaStar } from "react-icons/fa";

type Props = {
    selectedStars: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function StarRatingFilter({ selectedStars, onChange }: Props) {
    return (
        <div className="bg-white p-5 rounded-lg shadow-lg">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
                Property Rating
            </h4>
            {['5', '4', '3', '2', '1'].map((star) => (
                <label
                    key={star}
                    className="flex items-center space-x-4 mb-3 cursor-pointer transition-transform transform hover:scale-105 hover:bg-blue-50 p-3 rounded-lg"
                >
                    <input
                        type="checkbox"
                        className="rounded border-gray-400 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        value={star}
                        checked={selectedStars.includes(star)}
                        onChange={onChange}
                    />
                    <span className="flex items-center text-gray-800 font-medium">
                        {Array.from({ length: parseInt(star) }, (_, i) => (
                            <FaStar key={i} className="text-yellow-500 mr-1" />
                        ))}
                        <span className="ml-3 text-sm text-gray-700">
                            {star} Star{star !== '1' && 's'}
                        </span>
                    </span>
                </label>
            ))}
        </div>
    );
}
