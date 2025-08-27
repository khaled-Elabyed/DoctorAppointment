import React from 'react'
import Slider from "react-slick"
import carousal_1 from "../assets/image/hero-carousel-1.jpg"
import carousal_2 from "../assets/image/hero-carousel-2.jpg"
import carousal_3 from "../assets/image/hero-carousel-3.jpg"

const HeroSlider = () => {
   var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,         
    autoplaySpeed: 3000,
};
    const slides = [
        {
            image: carousal_1,
            title: "Your Healty , Our Opporunity",
            text: "we provide Advanced medical care with Experienced Doctor, modern technology and a caring approach for every patient."
        },
        {
            image: carousal_2,
            title: "Specializad Medical services",
            text: "From Cardiology to pediatrics, Our Expert Teams Are Aready To Help Your And Your Familly Stay Healty And SAfe."
        },
        {
            image: carousal_3,
            title: "Easy online Appointments",
            text: "Book Your Appointment quickly and conveniently With Top Doctor at your preferred time."
        }
    ]
    return (
    <section className='relative w-full h-[80vh] overflow-hidden'>
    <Slider {...settings}>
        {slides.map((slide,index)=> {
            return(
            <div key={index} className="relative w-full h-[80vh]">
                <img src={slide.image} alt="" className='w-full h-full object-cover' />
                <div className="absolute inset-0 bg-black bg-opacity-60 
                flex flex-col justify-center text-center items-center text-white px-4">
                    <h2 className='text-4xl text-[#46daea] font-bold mb-4'>{slide.title}</h2>
                    <p className='max-w-xl'>{slide.text}</p>
                    <button className='mt-6 inline-block 
                    px-6 py-3 rounded'>Read More</button>
                </div>
            </div>
            )
        })}
    </Slider>
    </section>
  )
}

export default HeroSlider