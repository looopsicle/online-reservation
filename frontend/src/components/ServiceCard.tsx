import React from "react";
import { Link } from "react-router-dom";
import type { Service } from "@shared/models";

interface ServiceCardProps {
  service: Service;
}

const typeLabels: Record<Service["type"], string> = {
  massage: "Massage",
  facial: "Facial",
  hair: "Hair",
  nails: "Nails",
};

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <Link to={`/services/${service.id}`} className="w-[300px] border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer block">
      <img
        src={service.photo}
        alt={service.name}
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <p className="text-xs text-gray-500 text-center mb-2">
        <span className="font-medium">{typeLabels[service.type]}</span>
      </p>
      <h3 className="font-semibold text-lg mb-1 text-center leading-tight">{service.name}</h3>
    </Link>
  );
};

export default ServiceCard;
