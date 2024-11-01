import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import * as apiClient from '../api-client';
import { FaCalendarAlt, FaDollarSign, FaUserFriends } from 'react-icons/fa';

export default function MyBookings() {
  const { data: hotels } = useQuery("fetchMyBookings", apiClient.fetchMyBookings);

  if (!hotels || hotels.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-gray-500 text-lg">No bookings found</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-800">My Bookings</h1>
        <Link to="/" className="text-blue-600 text-sm hover:underline">← Back to Home</Link>
      </div>

      {hotels.map((hotel) => (
        <div
          key={hotel._id}
          className="border border-slate-300 rounded-lg shadow-lg p-6 transition-transform hover:scale-105 hover:shadow-xl space-y-6"
        >
          {/* Hotel Info Section */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
            <div className="lg:w-full lg:h-[220px] overflow-hidden rounded-lg">
              <img
                src={hotel.imageUrls[0]}
                alt={hotel.name}
                className="w-full h-full object-cover rounded-md transition-transform duration-300 hover:scale-110"
              />
            </div>

            <div className="flex flex-col justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">{hotel.name}</h2>
                <p className="text-sm text-gray-600">
                  {hotel.city}, {hotel.country}
                </p>
              </div>

              {hotel.bookings.map((booking) => (
                <div key={booking._id} className="space-y-2 border-t pt-4 mt-4 border-slate-200">
                  {/* Booking Dates */}
                  <div className="flex items-center space-x-2 text-gray-700">
                    <FaCalendarAlt className="text-blue-600" />
                    <span className="font-semibold">Dates:</span>
                    <span>
                      {new Date(booking.checkIn).toDateString()} - {new Date(booking.checkOut).toDateString()}
                    </span>
                   
                  </div>

                  {/* Guest Info */}
                  <div className="flex items-center space-x-2 text-gray-700">
                    <FaDollarSign className="text-blue-600" />
                    <span className="font-semibold pe-2"> Total Cost:</span>
                    {booking.totalCost} EGP
                  </div>

                  <div className="flex items-center space-x-2 text-gray-700">
                    <FaUserFriends className="text-blue-600" />
                    <span className="font-semibold">Guests:</span>
                    {booking.adultCount} adults, {booking.childCount} children
                  </div>
                </div>
              ))}
            </div>
          </div>

       
        </div>
      ))}
    </div>
  );
}
