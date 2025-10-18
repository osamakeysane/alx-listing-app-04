// components/booking/OrderSummary.tsx
import React from "react";

type BookingDetails = {
  propertyName: string;
  price: number; // price per night (assumption)
  bookingFee: number;
  totalNights: number;
  startDate: string;
  imageUrl?: string;
  reviewScore?: number;
  reviewsCount?: number;
};

const currency = (n: number) =>
  n.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

const OrderSummary: React.FC<{ bookingDetails: BookingDetails }> = ({
  bookingDetails,
}) => {
  const { price, totalNights, bookingFee } = bookingDetails;
  const subtotal = price * Math.max(1, totalNights);
  const grandTotal = subtotal + bookingFee;

  return (
    <div className="bg-white p-6 shadow-md rounded-lg sticky top-6">
      <h2 className="text-xl font-semibold">Review Order Details</h2>

      <div className="flex items-center mt-4">
        <img
          src={bookingDetails.imageUrl}
          alt={bookingDetails.propertyName}
          className="w-28 h-20 object-cover rounded-md"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.png";
          }}
        />
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-semibold">
            {bookingDetails.propertyName}
          </h3>
          <p className="text-sm text-gray-500">
            {bookingDetails.reviewScore ?? 4.7} (
            {bookingDetails.reviewsCount ?? 0} reviews)
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {bookingDetails.startDate} • {bookingDetails.totalNights} Nights
          </p>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between">
          <p>Price ({totalNights} nights)</p>
          <p>{currency(subtotal)}</p>
        </div>
        <div className="flex justify-between mt-2">
          <p>Booking Fee</p>
          <p>{currency(bookingFee)}</p>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <p>Service / Taxes (example)</p>
          <p>{currency(0)}</p>
        </div>

        <div className="flex justify-between mt-4 font-semibold text-lg">
          <p>Grand Total</p>
          <p>{currency(grandTotal)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
