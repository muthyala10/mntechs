import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import BackgroundCarousel from "./Ui/Backgroundcarousel";
import ngrokAxiosInstance from "../Hooks/axiosInstance";
import { Link } from "react-router-dom";

const Hero = () => {
  const [heroData, setHeroData] = useState(null);

  const fetchHeroData = async () => {
    try {
      const res = await ngrokAxiosInstance.get("/dynamic/hero");
      if (res.data.length > 0) {
        const latest = res.data[0];

        const feature_items =
          latest.features?.map((item) => ({
            label: item.title,
            tooltip_title: item.tooltip_title,
            tooltip_description: item.tooltip_text,
          })) || [];

        setHeroData({ ...latest, feature_items });
      }
    } catch (error) {
      console.error("Error fetching hero data:", error);
    }
  };

  useEffect(() => {
    fetchHeroData(); // 👈 This runs once on page load
  }, []);

  if (!heroData) return null;

  return (
    <section className="relative bg-cover bg-center bg-no-repeat h-screen min-h-[600px] text-white">
      <BackgroundCarousel />
      <div className="absolute bg-black bg-opacity-60 inset-0"></div>
      <div className="relative z-10 flex flex-col justify-center pt-28 lg:h-block lg:h-full ms:h-hidden px-4 md:px-10">
        <p className="text-white text-lg font-light mb-8">
          {heroData.intro_heading}{" "}
          <span className="text-orange-500 font-semibold">
            {heroData.intro_highlight}
          </span>
        </p>

        <div>
          <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white font-syne mb-2 sm:mb-4 md:mb-6">
            <span className="block mb-2">{heroData.title_lines}</span>
            <span className="block mb-2">{heroData.subheading}</span>
            <span className="mil-font-3 mil-accent text-2xl md:text-3xl font-black block md:mb-10 mb-5 mt-4">
              {heroData.description}
            </span>
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-10">
          <Link to = "/contact">
          <button className="lg:w-max w-[40%] px-6 py-3 border-2 cursor-pointer border-orange-500 text-white hover:bg-orange-500 hover:text-white bg-transparent transition-all duration-300 rounded-full">
            {heroData.button_text}
          </button>
          </Link>
          <p className="text-gray-300 max-w-xl">{heroData.paragraph_text}</p>
        </div>

        <div className="hidden lg:block absolute z-20 top-1/3 right-10 space-y-15 text-white text-lg font-semibold">
          {heroData.feature_items?.map((item, index) => {
            const positions = [
              "top-[15%] right-50",
              "top-[30%] right-15",
              "top-[45%] right-40",
            ];
            const posClass = positions[index] || "top-[60%] right-10";

            return (
              <div
                key={index}
                className={`relative ${posClass} hidden flex items-center space-x-3 group`}
              >
                <div className="  absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-300 bg-white text-black text-sm rounded-md shadow-lg px-4 py-3 w-56 z-30">
                  <h3 className="text-black font-bold">{item.tooltip_title}</h3>
                  <div className="flex items-center mt-2">
                    <div className="w-8 h-1 bg-orange-500"></div>
                    <div className="flex-1 border-t border-gray-200"></div>
                  </div>
                  <p>{item.tooltip_description}</p>
                </div>

                <div className="relative flex items-center justify-center size-10 group">
                  <span className="absolute hidden group-hover:inline-flex h-full w-full rounded-full bg-orange-400 opacity-75 animate-ping"></span>
                  <span className="relative inline-flex items-center justify-center size-10 rounded-full bg-gray-700 text-white transition-colors duration-300 group-hover:bg-orange-500">
                    <Plus size={16} />
                  </span>
                </div>

                <span className="transition-colors duration-300 group-hover:text-orange-500">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
