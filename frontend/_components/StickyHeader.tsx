// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";

// export default function StickyHeader() {
//   const [scrolled, setScrolled] = useState(false);
//   const [hovered, setHovered] = useState(false);
//   const [activeLink, setActiveLink] = useState<string | null>(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       const offset = window.scrollY;
//       if (offset > 30) {
//         setScrolled(true);
//       } else {
//         setScrolled(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const navLinks = [
//     { name: "BLOGS", href: "/blogs" },
//     { name: "WASPARFUM", href: "/wasparfum" },
//     { name: "PROEFPAKKET", href: "/wasparfum-proefpakket" },
//     { name: "CONTACT", href: "/contact" }
//   ];

//   // Altijd zwarte achtergrond, tekstkleur wit. Scroll effect voegt alleen schaduw/blur toe.
//   return (
//     <header className={`bg-black text-white py-0.5 sticky top-0 w-full z-50 transition-all duration-300 ${
//       scrolled ? "shadow-lg backdrop-blur-sm bg-black/95" : ""
//     }`}>
//       <div className="container mx-auto px-3 flex items-center justify-between">
//         {/* Logo & RTL4 Badge Container */}
//         <div className="flex items-center">
//           {/* Logo */}
//           <div className="flex items-center transition-all duration-300 flex-shrink-0">
//             <Link href="/" className={`transition-all duration-300 mr-2 ${scrolled ? "scale-90" : ""}`}>
//               <Image
//                 src="/images/logo-wasgeurtje.webp"
//                 alt="Wasgeurtje"
//                 width={100}
//                 height={27}
//                 className="h-auto"
//                 priority
//               />
//             </Link>

//             {/* RTL4 Badge - Reinstated */}
//              <div
//                className={`relative transition-all duration-300 ${scrolled ? "scale-90" : ""}`}
//                onMouseEnter={() => setHovered(true)}
//                onMouseLeave={() => setHovered(false)}
//              >
//                <div className="relative group">
//                  <div className="relative">
//                    <div className="bg-gradient-to-r from-[#000000] via-[#111111] to-[#000000] p-1 rounded-sm border border-[#dba94a]/30 transform rotate-0 shadow-lg overflow-hidden">
//                      <div className="absolute left-0 top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#dba94a] to-transparent opacity-80" style={{ animation: 'scanline 3s ease-in-out infinite' }}></div>
//                      <div className="flex flex-col items-start">
//                        <span className="text-[10px] font-medium tracking-tight text-white">luxe wasparfum</span>
//                        <div className="flex items-center">
//                          <span className="text-[11px] font-semibold tracking-tight text-white mr-1">bekend van</span>
//                          <span className="text-[12px] font-bold tracking-tight text-[#dba94a] relative inline-block">
//                            RTL<span className="text-red-500">4</span>
//                            <span className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-[#dba94a]/10 to-transparent opacity-70 bg-[length:200%_100%]" style={{ animation: 'shimmer 2s ease-in-out infinite' }}></span>
//                          </span>
//                        </div>
//                      </div>
//                    </div>
//                    <div className="absolute -top-1 right-2 w-1 h-2 bg-white rounded-full transform rotate-45" style={{ animation: 'glint 5s ease-in-out infinite' }}></div>
//                    <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#dba94a]/70 to-transparent"></div>
//                  </div>
//                  <div className={`absolute inset-0 bg-[#dba94a]/5 rounded-sm blur-md transition-opacity duration-300 ${hovered ? 'opacity-100 animate-pulse' : 'opacity-0'}`}></div>
//                </div>
//              </div>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="hidden md:block">
//           <ul className="flex space-x-4">
//             {navLinks.map((link) => (
//               <li key={link.name}
//                 onMouseEnter={() => setActiveLink(link.name)}
//                 onMouseLeave={() => setActiveLink(null)}
//                 className="relative"
//               >
//                 <Link
//                   href={link.href}
//                   className={`text-xs py-1 px-2 transition-all duration-300 relative overflow-hidden group inline-block`}
//                 >
//                   {/* Text with hover effect */}
//                   <span className={`relative z-10 ${activeLink === link.name ? 'text-[#dba94a] font-medium' : 'text-white'}`}>
//                     {link.name}
//                   </span>

//                   {/* Bottom line animation */}
//                   <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#dba94a] to-[#f8d570] transform origin-left transition-transform duration-300 ${activeLink === link.name ? 'scale-x-100' : 'scale-x-0'}`}></span>

//                   {/* Subtle gold sparkle */}
//                   <span className={`absolute top-0 right-0 w-1 h-1 bg-[#dba94a] rounded-full opacity-0 transition-opacity duration-300 ${activeLink === link.name ? 'opacity-70' : 'opacity-0'}`} style={{ animation: activeLink === link.name ? 'glint 3s ease-in-out infinite' : 'none' }}></span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         {/* Icons */}
//         <div className="flex items-center space-x-4">
//           <button aria-label="Search" className="group relative hover:text-[#dba94a] transition-colors duration-200">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:scale-110 transition-transform duration-300">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
//             </svg>
//             <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#dba94a] group-hover:w-full transition-all duration-300"></span>
//           </button>
//           <button aria-label="Account" className="group relative hover:text-[#dba94a] transition-colors duration-200">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:scale-110 transition-transform duration-300">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
//             </svg>
//             <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#dba94a] group-hover:w-full transition-all duration-300"></span>
//           </button>
//           <button aria-label="Cart" className="group relative hover:text-[#dba94a] transition-colors duration-200">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:scale-110 transition-transform duration-300">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
//             </svg>
//             <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#dba94a] group-hover:w-full transition-all duration-300"></span>
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }
