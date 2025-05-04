/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import tickImg from "../../public/ti-verified.png"
import reviewImg from "../../public/review-1.png"
import googleIcon from "../../public/google.png"

import "swiper/css"
import "swiper/css/pagination"

interface Testimonial {
  id: number
  name: string
  date: string
  rating: number
  content: string
  image: string | any
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Anouk Kleyn Molekamp",
    date: "18 januari 2024",
    rating: 5,
    content:
      "Op 16/8 een bestelling geplaatst en tot op heden 10/9 niets ontvangen. Helaas ook geen reactie op meerdere mails die ik heb gestuurd...",
    image: reviewImg,
  },
  {
    id: 2,
    name: "Carly Craanberg",
    date: "11 januari 2024",
    rating: 4,
    content:
      "Ik had een flesje witte musk besteld. Toen deze binnenkwam was de halve fles gelekt in de plastic bubbel enveloppe.",
    image: reviewImg,
  },
  {
    id: 3,
    name: "Jessica Van Der Wiel",
    date: "10 januari 2024",
    rating: 5,
    content:
      "Voor groot bedrag besteld. Niet gekregen. Contact met de klantenservice is niet op gang te krijgen. Was altijd erg tevreden...",
    image: reviewImg,
  },
  {
    id: 4,
    name: "Anouk Kleyn Molekamp",
    date: "18 januari 2024",
    rating: 5,
    content:
      "Op 16/8 een bestelling geplaatst en tot op heden 10/9 niets ontvangen. Helaas ook geen reactie op meerdere mails die ik heb gestuurd...",
    image: reviewImg,
  },
  {
    id: 5,
    name: "Carly Craanberg",
    date: "11 januari 2024",
    rating: 4,
    content:
      "Ik had een flesje witte musk besteld. Toen deze binnenkwam was de halve fles gelekt in de plastic bubbel enveloppe.",
    image: reviewImg,
  },
  {
    id: 6,
    name: "Jessica Van Der Wiel",
    date: "10 januari 2024",
    rating: 5,
    content:
      "Voor groot bedrag besteld. Niet gekregen. Contact met de klantenservice is niet op gang te krijgen. Was altijd erg tevreden...",
    image: reviewImg,
  },
  {
    id: 7,
    name: "Anouk Kleyn Molekamp",
    date: "18 januari 2024",
    rating: 5,
    content:
      "Op 16/8 een bestelling geplaatst en tot op heden 10/9 niets ontvangen. Helaas ook geen reactie op meerdere mails die ik heb gestuurd...",
    image: reviewImg,
  },
  {
    id: 8,
    name: "Carly Craanberg",
    date: "11 januari 2024",
    rating: 4,
    content:
      "Ik had een flesje witte musk besteld. Toen deze binnenkwam was de halve fles gelekt in de plastic bubbel enveloppe.",
    image: reviewImg,
  },
  {
    id: 9,
    name: "Jessica Van Der Wiel",
    date: "10 januari 2024",
    rating: 5,
    content:
      "Voor groot bedrag besteld. Niet gekregen. Contact met de klantenservice is niet op gang te krijgen. Was altijd erg tevreden...",
    image: reviewImg,
  },
]

const Testimonials = () => {
  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={`star-${i}`}
          className="w-5 h-5 text-yellow-400 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
        </svg>
      )
    }

    if (hasHalfStar) {
      stars.push(
        <svg
          key="half-star"
          className="w-5 h-5 text-yellow-400 fill-current"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
            fill="url(#half)"
          />
          <defs>
            <linearGradient id="half" x1="0" x2="1" y1="0" y2="0">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={`empty-star-${i}`}
          className="w-5 h-5 text-gray-300 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
        </svg>
      )
    }

    return stars
  }

  return (
    <section className="bg-[#FFF5E0] py-16 px-4 md:px-8">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        slidesPerGroup={1}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          bulletClass: "custom-bullet",
          bulletActiveClass: "custom-bullet-active",
          renderBullet: (index, className) => {
            return `<span class="${className}"></span>`
          },
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          1024: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
        className="max-w-7xl mx-auto"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="bg-white p-6 rounded-lg shadow-sm h-full flex flex-col">
              <div className="flex items-center mb-4 gap-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="rounded-full object-cover w-10 h-10"
                />
                <div className="w-full">
                  <div className="flex items-center justify-between w-full">
                    <h3 className="font-medium text-gray-900">
                      {testimonial.name}
                    </h3>
                    <Image src={googleIcon} alt="google icon" />
                  </div>
                  <p className="text-sm text-gray-500">{testimonial.date}</p>
                </div>
              </div>
              <div className="flex mb-3 items-center">
                {renderStars(testimonial.rating)}
                <Image src={tickImg} alt="tick image" />
              </div>
              <p className="text-gray-700 flex-grow">{testimonial.content}</p>
              <button className="text-gray-500 text-sm mt-4 self-start hover:underline">
                Lees verder
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-pagination flex justify-center mt-4 gap-2"></div>
    </section>
  )
}

export default Testimonials
