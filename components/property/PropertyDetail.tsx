interface PropertyDetailProps {
  property: {
    id: number;
    title: string;
    image: string;
    price: number;
    location: string;
    description: string;
    bedrooms: number;
    bathrooms: number;
  };
}

export default function PropertyDetail({ property }: PropertyDetailProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-96 object-cover rounded-lg mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
      <p className="text-gray-600 mb-4">{property.location}</p>

      <div className="flex justify-between items-center mb-4">
        <p className="text-blue-600 font-semibold text-xl">
          ${property.price} / night
        </p>
        <p className="text-gray-500">
          🛏 {property.bedrooms} Beds · 🚿 {property.bathrooms} Baths
        </p>
      </div>

      <p className="text-gray-700 leading-relaxed">{property.description}</p>
    </div>
  );
}
