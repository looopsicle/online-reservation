import React from "react";
import type { Service } from "@shared/models";
import ServiceCard from "./ServiceCard";

interface ServiceListProps {
  services: Service[];
  loading?: boolean;
  error?: string | null;
}

const ServiceList: React.FC<ServiceListProps> = ({ services, loading, error }) => {
  if (loading) return <p>Loading services...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (services.length === 0) return <p>No services available.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default ServiceList;
