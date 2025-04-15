import Image from "next/image";
import Link from "next/link";

// Bestsellers producten data
const bestSellers = [
  {
    id: "prod_001",
    title: "Wasparfum proefpakket",
    handle: "wasparfum-proefpakket",
    thumbnail: "/images/proefpakket.jpg",
    price: 1995,
    fragranceType: "Diverse"
  },
  {
    id: "prod_002",
    title: "Morning Vapor",
    handle: "morning-vapor",
    thumbnail: "/images/morning-vapor.jpg",
    price: 1595,
    fragranceType: "Fris"
  },
  {
    id: "prod_003",
    title: "Blossom Drip",
    handle: "blossom-drip",
    thumbnail: "/images/blossom-drip.jpg",
    price: 1495,
    fragranceType: "Bloemen"
  },
  {
    id: "prod_004",
    title: "Full Moon",
    handle: "full-moon",
    thumbnail: "/images/full-moon.jpg",
    price: 1695,
    fragranceType: "Oriëntaals"
  },
  {
    id: "prod_005",
    title: "Flower Rain",
    handle: "flower-rain",
    thumbnail: "/images/flower-rain.jpg",
    price: 1495,
    fragranceType: "Bloemen"
  },
  {
    id: "prod_006",
    title: "Sundance",
    handle: "sundance",
    thumbnail: "/images/sundance.jpg",
    price: 1595,
    fragranceType: "Citrus"
  },
  {
    id: "prod_007",
    title: "Cadeauset wasparfum",
    handle: "cadeauset-wasparfum",
    thumbnail: "/images/cadeauset.jpg",
    price: 2995,
    fragranceType: "Diverse"
  }
];

// VIP geuren data
const vipGeuren = [
  {
    id: "prod_101",
    title: "Nieuwe geurcollectie proefpakket",
    handle: "nieuwe-geurcollectie-proefpakket",
    thumbnail: "/images/nieuwe-collectie-proefpakket.jpg",
    price: 2495,
    fragranceType: "Exclusief",
    isNew: true
  },
  {
    id: "prod_102",
    title: "Lavender Odor",
    handle: "lavender-odor",
    thumbnail: "/images/lavender-odor.jpg",
    price: 1895,
    fragranceType: "Bloemen",
    isNew: true
  },
  {
    id: "prod_103",
    title: "Ylang Scent",
    handle: "ylang-scent",
    thumbnail: "/images/ylang-scent.jpg",
    price: 1895,
    fragranceType: "Bloemen",
    isNew: true
  },
  {
    id: "prod_104",
    title: "White Musk",
    handle: "white-musk",
    thumbnail: "/images/white-musk.jpg",
    price: 1895,
    fragranceType: "Musk",
    isNew: true
  },
  {
    id: "prod_105",
    title: "Evening Dew",
    handle: "evening-dew",
    thumbnail: "/images/evening-dew.jpg",
    price: 1895,
    fragranceType: "Fris",
    isNew: true
  },
  {
    id: "prod_106",
    title: "Sweet Fog",
    handle: "sweet-fog",
    thumbnail: "/images/sweet-fog.jpg",
    price: 1895,
    fragranceType: "Zoet",
    isNew: true
  }
];

// Format price
const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount / 100);
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-50 to-blue-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Luxe wasparfum voor een frisse geur in huis
              </h1>
              <p className="text-lg text-gray-600">
                Geef je wasgoed een luxe geurbeleving met onze premium wasparfums.
                Handgemaakt in Nederland met natuurlijke ingrediënten.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/producten" className="inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                  Bekijk collectie
                </Link>
                <Link href="/geuren" className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Ontdek geuren
                </Link>
              </div>
            </div>
            <div className="relative aspect-square max-w-md mx-auto">
              <Image
                src="/images/hero-image.jpg"
                alt="Wasgeurtje wasparfum"
                fill
                className="object-cover rounded-lg shadow-xl"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Bestsellers</h2>
            <Link href="/producten" className="text-indigo-600 hover:text-indigo-800 font-medium">
              Bekijk alles →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bestSellers.slice(0, 4).map((product) => (
              <Link key={product.id} href={`/products/${product.handle}`} className="group">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900">{product.title}</h3>
                <p className="text-sm text-gray-500">{product.fragranceType}</p>
                <p className="mt-1 font-medium text-gray-900">{formatPrice(product.price)}</p>
              </Link>
            ))}
          </div>
          
          <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-8 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Cadeauset wasparfum</h3>
                  <p className="text-gray-600 mb-4">Perfect om te geven of zelf te houden</p>
                  <Link href={`/products/cadeauset-wasparfum`} className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800">
                    Bekijk nu <span aria-hidden="true" className="ml-1">→</span>
                  </Link>
                </div>
                <div className="absolute right-0 bottom-0 w-1/2 h-full">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/cadeauset.jpg"
                      alt="Cadeauset wasparfum"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-indigo-50 rounded-lg p-8 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Wasparfum proefpakket</h3>
                  <p className="text-gray-600 mb-4">Ontdek onze bestsellers</p>
                  <Link href={`/products/wasparfum-proefpakket`} className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800">
                    Bekijk nu <span aria-hidden="true" className="ml-1">→</span>
                  </Link>
                </div>
                <div className="absolute right-0 bottom-0 w-1/2 h-full">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/proefpakket.jpg"
                      alt="Wasparfum proefpakket"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIP Geuren Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Exclusieve VIP Geuren</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Ontdek onze nieuwste exclusieve geuren, speciaal samengesteld door onze geurexperts
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {vipGeuren.slice(0, 6).map((product) => (
              <Link key={product.id} href={`/products/${product.handle}`} className="group">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {product.isNew && (
                    <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">
                      NIEUW
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-medium text-gray-900">{product.title}</h3>
                <p className="text-sm text-gray-500">{product.fragranceType}</p>
                <p className="mt-1 font-medium text-gray-900">{formatPrice(product.price)}</p>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/geuren/vip" className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-indigo-600 bg-white hover:bg-indigo-50 ring-1 ring-indigo-200">
              Bekijk alle VIP geuren
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Waarom Wasgeurtje.nl?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Natuurlijke ingrediënten</h3>
              <p className="text-gray-600">Onze wasparfums zijn gemaakt van natuurlijke ingrediënten, vrij van schadelijke chemicaliën.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Handgemaakt in Nederland</h3>
              <p className="text-gray-600">Elk product wordt met zorg handgemaakt in onze studio in Nederland.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Langdurige geur</h3>
              <p className="text-gray-600">Onze wasparfums geven je wasgoed een langdurige, frisse geur die weken blijft hangen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ontdek de luxe van wasparfums</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Geniet van een heerlijke geur in je hele huis, elke keer als je de was doet.
          </p>
          <Link href="/producten" className="inline-flex items-center justify-center px-8 py-4 border border-transparent rounded-md shadow-sm text-base font-medium text-indigo-600 bg-white hover:bg-indigo-50">
            Shop nu
          </Link>
        </div>
      </section>
    </div>
  );
}
