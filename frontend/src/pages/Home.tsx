import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import headerBgImg from '../assets/header-bg.jpg';
import featuredCardImg from '../assets/featured-service.jpeg';
import ServiceList from "src/components/ServiceList";
import type { Service } from "@shared/models";

const Home: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServices() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/services"); // sesuaikan URL API-mu
        if (!res.ok) {
          throw new Error("Gagal mengambil data layanan");
        }
        const data: Service[] = await res.json();
        setServices(data);
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);


  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="relative bg-pink-100 h-96">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url(${headerBgImg})` }}
          aria-hidden="true"
        />
        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-extrabold text-black mb-4">
            Your Escape Begins Here
          </h1>
          <p className="text-sm text-gray-700 max-w-xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna
            tellus, consectetur vel risus vel, dignissim viverra nibh. Maecenas
            gravida non libero a vehicula.
          </p>
        </div>
      </header>

      {/* Featured Card */}
      <section className="max-w-4xl mx-auto px-6 relative" style={{ marginTop: '-8rem', zIndex: 10 }}>
        <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
          <img  
            src={featuredCardImg}
            alt="Featured service"
            className="w-full md:w-1/2 object-cover h-64 md:h-auto"
          />
          <div className="p-8 md:w-1/2 flex flex-col justify-center">
            <span className="text-pink-400 text-2xl mb-4 font-ruthie">V</span>
            <h2 className="text-3xl font-extrabold mb-4">
              Experience True Wellness at Vioré
            </h2>
            <p className="text-sm text-gray-700 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna
              tellus, consectetur vel risus vel, dignissim viverra nibh.
              Maecenas gravida non libero a vehicula.
            </p>
            <Link
              to="/services"
              className="inline-block self-start bg-pink-200 text-pink-700 rounded-full px-6 py-2 text-sm font-semibold hover:bg-pink-300 transition"
            >
              See Services
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-6xl mx-auto px-6 mb-16"  style={{ marginTop: '6rem' }}>
        <h3 className="text-2xl font-bold text-center mb-4">
          Relax, Rejuvenate, Repeat.
        </h3>
        <p className="text-center text-sm text-gray-600 mb-10 max-w-xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna
          tellus, consectetur vel risus
        </p>

        <ServiceList services={services.slice(0, 3)} loading={loading} error={error} />

      </section>
    </div>
  );
};

export default Home;