interface PropertyCardProps {
  property: {
    id: number;
    title: string;
    image: string;
    price: number;
    location: string;
  };
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="border rounded-lg shadow-md hover:shadow-lg transition duration-200 overflow-hidden">
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{property.title}</h3>
        <p className="text-sm text-gray-600">{property.location}</p>
        <p className="text-blue-600 font-bold mt-2">
          ${property.price} / night
        </p>
      </div>
    </div>
  );
}
