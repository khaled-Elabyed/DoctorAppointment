import React from "react";
import About_image from "../assets/image/about.jpg";
const About = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl text-[#008e9b] font-bold mb-3">About us</h2>
        <p className="max-w-2xl text-gray-600 mx-auto">
          We are dedicated to providing high-quality healthcare services with
          experienced doctors, modern facilities, and compassionate care. Our
          mission is to ensure every patient receives the attention and
          treatment they deserve.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 gap-8 px-4">
        <div className="relative">
          <img src={About_image} alt="" className="rounded-lg shadow-md" />
          <a
            href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
            className="absolute inset-0 flex justify-center items-center"
          >
            <div className="bg-white rounded-xl shadow-lg px-6 py-2 hover:scale-110 transition">
              play
            </div>
          </a>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">
            We are committed to providing trusted healthcare services with
            skilled professionals, advanced technology, and compassionate care
            to ensure your well-being.
          </h3>
          <p className="text-[#008e9b]">
            We strive to deliver exceptional healthcare with a patient-first
            approach, combining expert medical knowledge, modern facilities, and
            compassionate care to improve lives and build healthier communities.
          </p>
          <ul className="space-y-2 my-4">
            <li>✔ Quick and easy online appointment booking.</li>
            <li>✔ Comprehensive healthcare services for your entire family.</li>
            <li>✔ Compassionate care focused on your well-being.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
