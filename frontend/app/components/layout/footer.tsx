'use client'

import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Wasgeurtje.nl</h3>
            <p className="text-gray-600">
              Luxe wasparfums met langdurige geur. Italiaans geïnspireerde geuren, veilig voor alle stoffen.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/producten" className="text-gray-600 hover:text-gray-900">
                  Producten
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-600 hover:text-gray-900">
                  Winkelwagen
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <p className="text-gray-600">
              Vragen? Neem contact met ons op via info@wasgeurtje.nl
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Wasgeurtje.nl - Alle rechten voorbehouden</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 