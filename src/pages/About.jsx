import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-16">
      {/* About Section */}
      <h2 className="text-2xl font-medium text-center relative inline-block mb-12 text-gray-800">
        ABOUT US
        <span className="block w-16 h-0.5 bg-gray-800 mt-2 mx-auto"></span>
      </h2>

      <div className="flex flex-wrap items-center gap-10 justify-center mb-16">
        {/* Image */}
        <div className="flex-1 min-w-[280px] max-w-[350px]">
          <img
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80"
            alt="Clothing and shoes laid out"
            className="w-full max-w-[350px] h-[500px] rounded-lg object-cover shadow-md"
            loading="lazy"
          />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-[300px] max-w-[450px] text-gray-700">
          <div className="flex flex-col justify-center h-full">
            <p className="mb-5 text-lg">
              Forever works from out of a passion for innovation and a desire to
              revolutionize the way people shop online. Our concept brings quality
              unique styles to people in a stylish place so customers can easily
              discover, explore, and purchase a wide range of products from the
              comfort of their homes.
            </p>

            <p className="mb-5 text-lg">
              Since our inception, we've worked tirelessly to curate a diverse
              selection of high-quality products that cater to every taste and
              preference. From fashion and beauty to electronics and home
              essentials, we offer an extensive collection sourced from trusted
              brands and designers.
            </p>

            <p className="font-semibold text-lg mb-2">Our Mission</p>
            <p className="text-lg">
              Our mission at Forever is to empower customers with choice,
              convenience, and confidence. We're committed to providing a trusted
              shopping experience that meets customer needs, from browsing and
              ordering to delivery and beyond.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-50 py-16 px-6">
        <h2 className="text-2xl font-medium text-center mb-12 text-gray-800 relative inline-block">
          WHY CHOOSE US
          <span className="block w-16 h-0.5 bg-gray-800 mt-2 mx-auto"></span>
        </h2>

        <div className="flex flex-wrap justify-center gap-10">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md flex-1 min-w-[250px] max-w-[300px] text-center">
            <div className="text-4xl mb-4">💎</div>
            <h3 className="font-semibold text-lg mb-2">High Quality</h3>
            <p className="text-gray-600">
              We carefully curate all products to ensure the highest quality for our customers.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md flex-1 min-w-[250px] max-w-[300px] text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Enjoy quick and reliable shipping on all orders, right to your doorstep.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md flex-1 min-w-[250px] max-w-[300px] text-center">
            <div className="text-4xl mb-4">💖</div>
            <h3 className="font-semibold text-lg mb-2">Customer Support</h3>
            <p className="text-gray-600">
              Our friendly support team is always ready to assist you with any inquiry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
