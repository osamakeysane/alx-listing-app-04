// components/booking/BookingForm.tsx
import React, { useState } from "react";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  street: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
  street: "",
  apt: "",
  city: "",
  state: "",
  zip: "",
  country: "",
};

const BookingForm: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});

  function handleChange<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate() {
    const newErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.firstName.trim()) newErrors.firstName = "Required";
    if (!form.lastName.trim()) newErrors.lastName = "Required";
    if (!form.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Invalid email";
    if (!form.phone.trim()) newErrors.phone = "Required";
    if (
      !form.cardNumber.trim() ||
      form.cardNumber.replace(/\s/g, "").length < 12
    )
      newErrors.cardNumber = "Enter valid card number";
    if (!form.expiry.trim()) newErrors.expiry = "Required";
    if (!form.cvv.trim() || form.cvv.length < 3) newErrors.cvv = "Invalid CVV";
    if (!form.street.trim()) newErrors.street = "Required";
    if (!form.city.trim()) newErrors.city = "Required";
    if (!form.zip.trim()) newErrors.zip = "Required";
    if (!form.country.trim()) newErrors.country = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    // Simulate payment processing (DON'T do this in production).
    // In a real app, send card/billing data to your backend, and backend to payment gateway (Stripe, etc.)
    try {
      await new Promise((r) => setTimeout(r, 1000));
      alert("Booking confirmed! (This is a simulated confirmation.)");
      setForm(initialState);
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = "border rounded-md p-2 w-full mt-2";

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold">Contact Details</h2>
      <form onSubmit={handleSubmit}>
        {/* Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm">First Name</label>
            <input
              value={form.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className={inputClass}
            />
            {errors.firstName && (
              <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm">Last Name</label>
            <input
              value={form.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              className={inputClass}
            />
            {errors.lastName && (
              <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={inputClass}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm">Phone Number</label>
            <input
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className={inputClass}
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        {/* Payment */}
        <h2 className="text-xl font-semibold mt-6">Pay with</h2>
        <div className="mt-4">
          <label className="block text-sm">Card Number</label>
          <input
            value={form.cardNumber}
            onChange={(e) => handleChange("cardNumber", e.target.value)}
            className={inputClass}
            placeholder="•••• •••• •••• ••••"
          />
          {errors.cardNumber && (
            <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm">Expiration Date</label>
            <input
              value={form.expiry}
              onChange={(e) => handleChange("expiry", e.target.value)}
              className={inputClass}
              placeholder="MM/YY"
            />
            {errors.expiry && (
              <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>
            )}
          </div>
          <div>
            <label className="block text-sm">CVV</label>
            <input
              value={form.cvv}
              onChange={(e) => handleChange("cvv", e.target.value)}
              className={inputClass}
              placeholder="123"
            />
            {errors.cvv && (
              <p className="text-xs text-red-500 mt-1">{errors.cvv}</p>
            )}
          </div>
        </div>

        {/* Billing */}
        <h2 className="text-xl font-semibold mt-6">Billing Address</h2>
        <div className="mt-4">
          <label className="block text-sm">Street Address</label>
          <input
            value={form.street}
            onChange={(e) => handleChange("street", e.target.value)}
            className={inputClass}
          />
          {errors.street && (
            <p className="text-xs text-red-500 mt-1">{errors.street}</p>
          )}
        </div>
        <div className="mt-4">
          <label className="block text-sm">Apt / Suite (optional)</label>
          <input
            value={form.apt}
            onChange={(e) => handleChange("apt", e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm">City</label>
            <input
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
              className={inputClass}
            />
            {errors.city && (
              <p className="text-xs text-red-500 mt-1">{errors.city}</p>
            )}
          </div>
          <div>
            <label className="block text-sm">State</label>
            <input
              value={form.state}
              onChange={(e) => handleChange("state", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm">Zip Code</label>
            <input
              value={form.zip}
              onChange={(e) => handleChange("zip", e.target.value)}
              className={inputClass}
            />
            {errors.zip && (
              <p className="text-xs text-red-500 mt-1">{errors.zip}</p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm">Country</label>
          <input
            value={form.country}
            onChange={(e) => handleChange("country", e.target.value)}
            className={inputClass}
          />
          {errors.country && (
            <p className="text-xs text-red-500 mt-1">{errors.country}</p>
          )}
        </div>

        <button
          type="submit"
          className="mt-6 bg-green-500 text-white py-2 px-4 rounded-md w-full disabled:opacity-60"
          disabled={submitting}
        >
          {submitting ? "Processing..." : "Confirm & Pay"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
