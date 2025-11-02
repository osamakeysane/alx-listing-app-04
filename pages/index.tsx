//alx-listing -app -04
// // pages/index.tsx
// import React, { useState } from "react";
// import { PROPERTYLISTINGSAMPLE, HERO_BG } from "@/constants";
// import Pill from "@/components/common/Pill";
// import type { PropertyProps } from "@/interfaces";

// const FILTERS = [
//   "Top Villa",
//   "Self Checkin",
//   "Beachfront",
//   "Pet Friendly",
//   "Mountain View",
//   "Luxury",
//   "Pool",
// ];

// export default function Home() {
//   const [activeFilter, setActiveFilter] = useState<string | null>(null);

//   const filtered = activeFilter
//     ? PROPERTYLISTINGSAMPLE.filter((p) =>
//         p.category.join("|").toLowerCase().includes(activeFilter.toLowerCase())
//       )
//     : PROPERTYLISTINGSAMPLE;

//   return (
//     <div>
//       {/* Hero */}
//       <section
//         className="h-64 md:h-96 flex items-center"
//         style={{
//           backgroundImage: `url(${HERO_BG})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <div className="container mx-auto px-4">
//           <div className="max-w-2xl bg-white/80 p-6 rounded-md">
//             <h1 className="text-2xl md:text-4xl font-bold">
//               Find your favorite place here!
//             </h1>
//             <p className="mt-2 text-gray-700">
//               The best prices for over 2 million properties worldwide.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Filters */}
//       <section className="container mx-auto px-4 mt-6">
//         <div className="flex items-center gap-3 overflow-x-auto py-2">
//           {FILTERS.map((f) => (
//             <Pill
//               key={f}
//               label={f}
//               active={activeFilter === f}
//               onClick={() => setActiveFilter(activeFilter === f ? null : f)}
//             />
//           ))}
//         </div>
//       </section>

//       {/* Listings */}
//       <section className="container mx-auto px-4 mt-6 pb-12">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filtered.map((prop: PropertyProps, i: number) => (
//             <article
//               key={i}
//               className="bg-white rounded shadow-sm overflow-hidden"
//             >
//               <div className="h-48 bg-gray-200">
//                 <img
//                   src={prop.image}
//                   alt={prop.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="p-4">
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <h3 className="font-semibold text-lg">{prop.name}</h3>
//                     <div className="text-sm text-gray-500">
//                       {prop.address.city}, {prop.address.country}
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div className="text-indigo-600 font-bold">
//                       ${prop.price}
//                     </div>
//                     {prop.discount && (
//                       <div className="text-xs text-green-600">
//                         {prop.discount}% off
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
//                   <div className="flex items-center gap-2">
//                     <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded">
//                       ⭐ {prop.rating.toFixed(2)}
//                     </span>
//                     <div className="flex gap-1 flex-wrap">
//                       {prop.category.slice(0, 2).map((c) => (
//                         <span
//                           key={c}
//                           className="text-xs px-2 py-0.5 border rounded"
//                         >
//                           {c}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="text-xs text-gray-500">
//                     Beds: {prop.offers.bed} · Baths: {prop.offers.shower}
//                   </div>
//                 </div>
//               </div>
//             </article>
//           ))}
//         </div>

//         {filtered.length === 0 && (
//           <div className="mt-8 text-center text-gray-600">
//             No properties match that filter.
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }
//alx-listing-app-04........................
import axios from "axios";
import { useEffect, useState } from "react";
import PropertyCard from "@/components/property/PropertyCard"; // existing component

interface Property {
  id: number;
  title: string;
  image: string;
  price: number;
  location: string;
}

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("https://example.com/api/properties"); // replace with your real API URL
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setError("Failed to load properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading properties...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
