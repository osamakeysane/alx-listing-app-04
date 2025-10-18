// pages/booking/index.tsx
import React from "react";
import BookingForm from "@/components/booking/BookingForm";
import OrderSummary from "@/components/booking/OrderSummary";
import CancellationPolicy from "@/components/booking/CancellationPolicy";

export default function BookingPage() {
  const bookingDetails = {
    propertyName: "Villa Arrecife Beach House",
    price: 7500, // assumed price per night
    bookingFee: 65,
    totalNights: 3,
    startDate: "24 August 2024",
    imageUrl:
      "https://images.unsplash.com/photo-1505691723518-36a3a4a23e4b?auto=format&fit=crop&w=800&q=60", // sample
    reviewScore: 4.76,
    reviewsCount: 345,
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <BookingForm />
          <CancellationPolicy />
        </div>
        <OrderSummary bookingDetails={bookingDetails} />
      </div>
    </div>
  );
}
