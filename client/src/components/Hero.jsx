import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroAssets from "../assets/heroAssets";
import { motion, AnimatePresence } from "framer-motion";


const Hero = () => {

  const images = [
  heroAssets.bike_hero,
  heroAssets.bike1,
  heroAssets.bike2,
]; 

const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2500); // change every 2.5 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);



  return (
    <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20 h-full">
      <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Left: Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover our latest models and offers.
          </h1>
          <p className="text-lg mb-6 text-gray-200">
            Life's better on two wheels - start your ride here!
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Link
              to="/search"
              className="bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-md hover:bg-yellow-300 transition"
            >
              Browse Vehicles
            </Link>
            <Link
              to="/promotion"
              className="border border-white px-6 py-3 rounded-md hover:bg-white hover:text-gray-900 transition"
            >
              View Promotions
            </Link>
             <Link
              to="/chatbot"
              className="border border-white px-6 py-3 rounded-md hover:bg-white hover:text-gray-900 transition"
            >
              chatBot
            </Link>
          </div>
        </div>

        {/* Right: Image */}
    

     <div className="md:w-1/2 relative h-[500px] overflow-hidden rounded-lg shadow-lg">
      <AnimatePresence>
        <motion.img
          key={images[currentIndex]}
          src={images[currentIndex]}
          alt="bike"
          className="absolute top-0 left-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>
    </div>

      </div>
    </section>
  );
};

export default Hero;
