import React from "react";
import { assets } from "../assets/assets"; // ensure this path is correct

const Contact = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-16">
      {/* Contact Header */}
      <h2 className="text-2xl font-medium text-center mb-12 text-gray-800 relative inline-block">
        CONTACT US
        <span className="block w-16 h-0.5 bg-gray-800 mt-2 mx-auto"></span>
      </h2>

      {/* Main Section: Image + Form/Details */}
      <div className="flex flex-wrap lg:flex-nowrap items-stretch gap-10 justify-center min-h-[calc(100vh-100px)]">
        {/* Contact Image */}
        <div className="flex-1 min-w-[280px] max-w-[450px]">
          <img
            src={assets.contact_img}
            alt="Contact Us"
            className="w-full h-full rounded-lg shadow-md object-cover"
            loading="lazy"
          />
        </div>

        {/* Contact Form + Details */}
        <div className="flex-1 min-w-[300px] max-w-[500px] flex flex-col gap-8 h-full">
          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-md flex-1">
            <form className="flex flex-col gap-5 h-full">
              <input
                type="text"
                placeholder="Full Name"
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
              <input
                type="text"
                placeholder="Subject"
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-800 resize-none"
              ></textarea>
              <button
                type="submit"
                className="bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors mt-auto"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Details Side by Side */}
          <div className="flex flex-wrap gap-6 justify-between items-stretch">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center flex-1 min-w-[120px] flex flex-col justify-center">
              <h3 className="font-semibold text-lg mb-2">Address</h3>
              <p>123 Fashion Street, City, Country</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center flex-1 min-w-[120px] flex flex-col justify-center">
              <h3 className="font-semibold text-lg mb-2">Phone</h3>
              <p>+1 234 567 890</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center flex-1 min-w-[120px] flex flex-col justify-center">
              <h3 className="font-semibold text-lg mb-2">Email</h3>
              <p>contact@forever.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Box */}
      <div className="mt-16 bg-gray-100 py-12 px-6 rounded-lg max-w-3xl mx-auto text-center shadow-md">
        <h3 className="text-xl font-semibold mb-4">Subscribe to our Newsletter</h3>
        <p className="text-gray-600 mb-6">Get the latest updates, offers, and news directly in your inbox.</p>
        <form className="flex flex-col sm:flex-row justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 rounded-lg px-4 py-3 w-full sm:w-auto flex-1 focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
          <button
            type="submit"
            className="bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
