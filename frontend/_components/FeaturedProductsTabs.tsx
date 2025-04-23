// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';

// // Definieer een interface voor de productdata (verwacht van backend)
// interface Product {
//   id: string; // Aangepast naar string
//   name: string;
//   price: string; // Houd rekening met valuta/formattering vanuit Medusa
//   imageUrl: string;
//   altText: string;
// }

// // Type voor de data die als prop wordt verwacht
// interface ProductsByCategory {
//   'best-verkocht': Product[];
//   premium: Product[];
//   'collecties-sets': Product[];
// }

// type TabId = 'best-verkocht' | 'premium' | 'collecties-sets';

// // De component verwacht nu product data via props
// export default function FeaturedProductsTabs({ productsByCategory }: { productsByCategory: ProductsByCategory }) {
//   const [activeTab, setActiveTab] = useState<TabId>('best-verkocht');

//   const handleTabClick = (tabId: TabId) => {
//     setActiveTab(tabId);
//   };

//   // Gebruik de data uit de prop
//   const currentProducts = productsByCategory[activeTab] || [];

//   const getTabClasses = (tabId: TabId) => {
//     const baseClasses = 'text-lg pb-2 border-b-2 transition-all duration-300 relative overflow-hidden px-2';
//     const activeClasses = 'text-[#814E1E] font-bold border-[#814E1E] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-[#814E1E] after:transform after:scale-x-100 after:origin-left';
//     // Aangepaste styling voor inactieve tabs
//     const inactiveClasses = 'text-[#212529] hover:text-[#814E1E] font-normal border-transparent hover:border-[#D6AD61]/50 after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-[#D6AD61] after:transform after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300';
//     return `${baseClasses} ${activeTab === tabId ? activeClasses : inactiveClasses}`;
//   };

//   return (
//     <section className="py-16 bg-white">
//       <div className="container mx-auto px-4">
//         <h2 className="text-center text-3xl font-semibold text-[#212529] font-serif leading-[1.2] mb-8 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-0 hover:after:w-40 after:h-0.5 after:bg-[#D6AD61] after:transition-all after:duration-500 hover:text-[#814E1E] transition-colors duration-300 pb-2 inline-block mx-auto">
//           Vind je perfecte wasparfum
//         </h2>

//         {/* Tab Navigatie */}
//         <div className="flex justify-center space-x-8 border-b border-gray-200 mb-12 relative">
//           <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-100"></div>
//           <button
//             onClick={() => handleTabClick('best-verkocht')}
//             className={getTabClasses('best-verkocht')}
//           >
//             <span className="relative z-10 transition-all duration-200 group-hover:tracking-wider">Best Verkocht</span>
//             <span className="absolute inset-0 bg-[#fef9ec] transform origin-left scale-x-0 group-hover:scale-x-100 -z-10 transition-transform duration-300"></span>
//           </button>
//           <button
//             onClick={() => handleTabClick('premium')}
//             className={getTabClasses('premium')}
//           >
//             <span className="relative z-10 transition-all duration-200 group-hover:tracking-wider">Premium</span>
//             <span className="absolute inset-0 bg-[#fef9ec] transform origin-left scale-x-0 group-hover:scale-x-100 -z-10 transition-transform duration-300"></span>
//           </button>
//           <button
//             onClick={() => handleTabClick('collecties-sets')}
//             className={getTabClasses('collecties-sets')}
//           >
//             <span className="relative z-10 transition-all duration-200 group-hover:tracking-wider">Collecties en Sets</span>
//             <span className="absolute inset-0 bg-[#fef9ec] transform origin-left scale-x-0 group-hover:scale-x-100 -z-10 transition-transform duration-300"></span>
//           </button>
//         </div>

//         {/* Product Grid - Toont nu producten uit de prop */}
//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
//           {currentProducts.length === 0 && (
//             <p className="col-span-full text-center text-gray-500">Geen producten gevonden voor deze categorie.</p>
//           )}
//           {currentProducts.map((product) => (
//             <div key={product.id} className="border border-[#D6AD61]/30 rounded-lg bg-white flex flex-col hover:shadow-xl hover:shadow-[#d6ad61]/10 hover:border-[#D6AD61]/60 transition-all duration-300 transform hover:-translate-y-1 group">
//               <div className="relative w-full aspect-square overflow-hidden rounded-t-lg">
//                 <Image
//                   src={product.imageUrl} // Gebruik data uit prop
//                   alt={product.altText} // Gebruik data uit prop
//                   fill
//                   style={{ objectFit: "contain" }}
//                   className="p-4 group-hover:scale-105 transition-transform duration-300"
//                   sizes="(max-width: 640px) 45vw, (max-width: 1024px) 45vw, 23vw"
//                   loading="lazy"
//                  />
//               </div>
//               <div className="p-3 md:p-4 flex-grow flex flex-col">
//                 <h3 className="text-gray-800 font-medium mb-1 flex-grow group-hover:text-[#814E1E] transition-colors duration-300 text-sm md:text-base">{product.name}</h3>
//                 <div className="flex justify-between items-center mt-2 bg-[#fef9ec] p-2 md:p-3 rounded-md border border-[#D6AD61]/50 group-hover:border-[#D6AD61] transition-all duration-300">
//                    <p className="text-gray-700 font-semibold group-hover:text-[#814E1E] transition-colors duration-300 text-sm md:text-base">€{product.price}</p>
//                    <button
//                      aria-label={`Voeg ${product.name} toe aan winkelwagen`}
//                      className="bg-[#d7ad60] text-white rounded-full p-1 md:p-1.5 hover:bg-[#c69c50] transition-colors relative overflow-hidden group-hover:shadow-md group-hover:shadow-[#d7ad60]/30"
//                      // TODO: Voeg hier onClick handler toe voor winkelwagen functionaliteit
//                    >
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-300"> <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /> </svg>
//                     <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
//                    </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* CTA Knop */}
//         <div className="text-center">
//           <Link
//             href="/wasparfum"
//              // Styling met gradient achtergrond (identiek aan de andere knop)
//             className="inline-flex items-center bg-gradient-to-r from-[#FDD86A] to-[#FCCE4E] hover:from-[#eab63c] hover:to-[#dba94a] text-[#212529] px-8 py-3 rounded-md font-semibold uppercase tracking-wide shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 relative overflow-hidden group"
//           >
//             <span className="relative z-10">Alle Wasparfums Bekijken</span>
//             <span className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 group-hover:right-6 transition-all duration-300 ease-in-out z-0">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
//               </svg>
//             </span>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }
