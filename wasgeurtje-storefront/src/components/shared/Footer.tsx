"use client"

import React from "react"
import footerLogo from "../../public/images/footer-logo.svg"
import {
  EmailIcon,
  FacebookIcon,
  InstagramIcon,
  PaymentMethodIcon,
  VerzeMethodIcon,
  XIcon,
  YoutubeIcon,
} from "../images/Footer"
import Image from "next/image"

const Footer: React.FC = () => {
  return (
    <div className="bg-[#111]">
      <footer className="container mx-auto text-white px-6 py-10">
        {/* Newsletter Signup */}
        <div className="max-w-7xl mx-auto border-b border-gray-700 pb-10 mb-10">
          <div className="flex flex-col md:flex-row sm:flex sm:flex-col justify-between items-center gap-4">
            <div>
              <p className="font-semibold text-lg">
                Blijf op de hoogte van onze geurende wereld!
              </p>
              <p className="text-sm mt-1">
                Schrijf je in voor onze nieuwsbrief en ontvang maandelijks
                exclusieve kortingen en updates over onze nieuwste wasgeurtjes!
              </p>
            </div>
            <div className="flex items-center w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your message"
                className="px-4 border border-white py-2 text-white w-full md:w-64 rounded"
              />
              <button className="bg-gradient-to-r from-[#FCCE4E] to-[#D6AD61] text-black font-semibold px-4 py-2 rounded">
                AANMELDEN
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
          {/* Logo */}
          <div className="col-span-1 flex justify-center items-center">
            <Image
              width={150}
              height={187}
              src={footerLogo}
              alt="logo icon"
              className="w-auto md:h-[187px]"
            />
          </div>

          {/* Link Columns */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold">Ontdekken</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>Doseren i-Dos wasmachine</li>
              <li>Wasparfum proefpakket</li>
              <li>Wasparfum cadeau set</li>
              <li>Wasparfum</li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-3">Informatie</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>Onze groene missie</li>
              <li>Ons verhaal</li>
              <li>Verkooppunten</li>
              <li>Verkooppunt worden</li>
              <li>Algemene voorwaarden</li>
              <li>Waarom Wasgeurtje?</li>
              <li>Waspunten</li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-3">Service</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>Contact</li>
              <li>Veelgestelde vragen</li>
              <li>Betaalmogelijkheden</li>
              <li>Verzenden en retourneren</li>
              <li>Wasgeurtje Kruidvat</li>
              <li>Wasgeurtje aanbieding</li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-3">Contact</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li className="flex justify-center md:justify-start items-center gap-2">
                <EmailIcon />
                <span>info@wasgeurtje.nl</span>
              </li>
            </ul>
            <div className="flex justify-center md:justify-start gap-3 mt-3 text-yellow-500">
              <FacebookIcon />
              <XIcon />
              <InstagramIcon />
              <YoutubeIcon />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between max-w-[550px] w-full pt-0 md:pt-4 pb-8 text-start md:text-center">
          <div className="flex flex-col items-center md:items-start">
            <h4 className="pb-2">Betaalmethodes</h4>
            <PaymentMethodIcon />
          </div>
          <div className="flex flex-col items-center md:items-start mt-4 md:mt-0">
            <h4 className="pb-2">Verzendmethodes</h4>
            <VerzeMethodIcon />
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 border-t border-gray-700 pt-4">
          <p className="order-2 md:order-1">
            Alle rechten voorbehouden © 2023 Wasgeurtje
          </p>
          <div className="flex gap-4 mt-2 md:mt-0 order-1 md:order-2">
            <a href="#">Privacybeleid</a>
            <a href="#">Algemene voorwaarden</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
