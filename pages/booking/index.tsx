// pages/booking/index.tsx, alx-listing-app-03
// import React from "react";
// import BookingForm from "@/components/booking/BookingForm";
// import OrderSummary from "@/components/booking/OrderSummary";
// import CancellationPolicy from "@/components/booking/CancellationPolicy";

// export default function BookingPage() {
//   const bookingDetails = {
//     propertyName: "Villa Arrecife Beach House",
//     price: 7500, // assumed price per night
//     bookingFee: 65,
//     totalNights: 3,
//     startDate: "24 August 2024",
//     imageUrl:
//       "https://images.unsplash.com/photo-1505691723518-36a3a4a23e4b?auto=format&fit=crop&w=800&q=60", // sample
//     reviewScore: 4.76,
//     reviewsCount: 345,
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div>
//           <BookingForm />
//           <CancellationPolicy />
//         </div>
//         <OrderSummary bookingDetails={bookingDetails} />
//       </div>
//     </div>
//   );
// }
//alx0listing-app-04..........................
import axios from "axios";
import { useState } from "react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    billingAddress: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post("/api/bookings", formData);
      console.log(response.data);
      setSuccess(true);
      alert("✅ Booking confirmed!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        cardNumber: "",
        expirationDate: "",
        cvv: "",
        billingAddress: "",
      });
    } catch (err) {
      console.error(err);
      setError("❌ Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">Booking Details</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            type="text"
            name={key}
            value={(formData as any)[key]}
            onChange={handleChange}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            className="border p-2 w-full rounded"
            required
          />
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {loading ? "Processing..." : "Confirm & Pay"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-3">{error}</p>}
      {success && (
        <p className="text-green-500 mt-3">Booking submitted successfully!</p>
      )}
    </div>
  );
}
