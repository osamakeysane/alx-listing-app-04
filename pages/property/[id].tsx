import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import PropertyDetail from "@/components/property/PropertyDetail";
import ReviewSection from "@/components/property/ReviewSection";

interface Property {
  id: number;
  title: string;
  image: string;
  price: number;
  location: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
}

export default function PropertyDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return; // Wait until id is available

      try {
        const response = await axios.get(
          `https://example.com/api/properties/${id}`
        ); // Replace with your real API URL
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property details:", error);
        setError("Failed to load property details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <p className="text-center text-gray-500">Loading property details...</p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!property) {
    return <p className="text-center text-gray-600">Property not found.</p>;
  }

  return (
    <div>
      <PropertyDetail property={property} />
      <ReviewSection propertyId={property.id} />
    </div>
  );
}
