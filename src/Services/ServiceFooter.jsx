import React, { useState, useEffect } from "react";
import { MapPin, PhoneCall, MailIcon } from "lucide-react";

import ngrokAxiosInstance from "../Hooks/axiosInstance";

const ServiceFooter = () => {
  const [footerData, setFooterData] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
  ngrokAxiosInstance
    .get('/dynamic/serviceFooter')
    .then((res) => {
      setFooterData(res.data[0]);
    })
    .catch((err) => {
      console.error('Error fetching footer:', err.response ? err.response.data : err.message);
    });
}, []);

const handleSubscribe = async (e) => {
  e.preventDefault();

  if (!email) return alert('Please enter your email');

  try {
    const response = await ngrokAxiosInstance.post('/newsLetter/create', { email });
    alert(response.data.message || 'Subscription successful');
  } catch (error) {
    console.error('Error subscribing:', error.response ? error.response.data : error.message);
    if (error.response?.status === 409) {
      alert('This email is already subscribed.');
    } else {
      alert(error.response?.data?.error || error.response?.data?.message || 'Something went wrong');
    }
  }
};

  if (!footerData) return null;

 const {
  logoText,
  address,
  phone,
  email: footerEmail,
  socialLinks = {},
  links = [],
  copyright,
  reserved,
  joinHeading,
  joinDescription,
} = footerData;

  return (
    <footer className="bg-gray-900 text-white min-h-screen flex flex-col justify-between">
      <div className="w-full py-16 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2 text-left">
          <h2 className="text-xl sm:text-3xl font-bold text-white mb-4">
  {joinHeading}
</h2>
<p className="text-gray-400 text-sm">
  {joinDescription}
</p>

        </div>
       <form onSubmit={handleSubscribe} className="w-full max-w-xl mx-auto">
        <div className="relative w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full px-10 md:py-6 py-3 pr-10 bg-white text-gray-900 text-lg font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-1 bottom-1  md:xs:px-20 sm:xs:px-20 px-4 cursor-pointer md:py-4 py-2  bg-orange-500 text-black md:text-lg text-sm font-semibold rounded-full hover:bg-orange-400 transition-colors"
          >
            Subscribe Now
          </button>
        </div>
      </form>
      </div>

      <div className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 flex flex-col md:flex-row md:justify-between md:gap-2 lg:gap-2 items-start">
        <div className="mb-8 md:mb-0">
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold text-blue-800">
              {logoText?.part1}
            </span>
            <span className="text-2xl font-bold text-white ml-1">
              {logoText?.part2}
            </span>
          </div>
          <div className="flex flex-row items-start mb-2 gap-3">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <p className="text-base font-normal text-gray-400 whitespace-pre-line">
              {address}
            </p>
          </div>
          <div className="flex flex-row items-start mb-2 gap-2">
            <PhoneCall size={15} />
            <p className="text-base font-normal text-gray-400">{phone}</p>
          </div>
          <div className="flex flex-row items-start gap-2">
            <MailIcon size={20} />
            <a
              href={`mailto:${footerEmail}`}
              className="text-base font-normal text-gray-400 hover:text-amber-400 transition-all duration-300"
            >
              {footerEmail}
            </a>
          </div>
        </div>

        <div className="mb-2">
          <h3 className="text-orange-500 font-semibold mb-4">Social</h3>
          <ul className="space-y-2">
            {Object.entries(socialLinks).map(([key, value]) => (
              <li
                key={key}
                className="text-gray-400 hover:text-orange-500 cursor-pointer"
              >
                <a href={value} target="_blank" rel="noopener noreferrer">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-orange-500 font-semibold mb-4">Links</h3>
        <ul className="space-y-2">
  {links.map((link, i) => (
    <li key={i}>
      <a
        href={link.path}
        className="text-gray-400 hover:text-orange-500 transition-colors"
      >
        {link.label}
      </a>
    </li>
  ))}
</ul>


        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-700 pt-6 pb-8 text-gray-400 text-sm px-2">
        <span>{copyright}</span>
        <div className="text-sm font-normal text-gray-400">{reserved}</div>
      </div>
    </footer>
  );
};

export default ServiceFooter;
