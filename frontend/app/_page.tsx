// import Image from "next/image";
// import Link from "next/link";
// import StickyHeader from "../_components/StickyHeader";
// import FeaturedProductsTabs from "../_components/FeaturedProductsTabs";
// import { Metadata } from "next";

// // Definieer Product interface (kan later in een apart types bestand)
// interface Product {
//   id: string;
//   name: string;
//   price: string;
//   imageUrl: string;
//   altText: string;
// }

// // Definieer ProductsByCategory interface
// interface ProductsByCategory {
//   "best-verkocht": Product[];
//   premium: Product[];
//   "collecties-sets": Product[];
// }

// // Interface for the product list response (might differ slightly, e.g., calculated_price)
// interface MedusaProductListItem {
//   id: string;
//   title: string;
//   thumbnail: string | null;
//   variants: {
//     calculated_price?: {
//       // Expect calculated_price here too based on /producten page
//       calculated_amount: number;
//       currency_code: string;
//     };
//     id: string;
//     title: string;
//   }[];
//   // Add other fields if needed from the list response
// }

// // Interface for the product list API response
// interface MedusaProductListResponse {
//   products: MedusaProductListItem[];
//   // Add count, limit, offset if needed
// }

// // Interface voor de verwachte API response structuur voor een SINGLE product (no price here)
// interface MedusaSingleProduct {
//   id: string;
//   title: string;
//   thumbnail: string | null;
//   // Include other non-price fields you need
//   variants: {
//     id: string;
//     title: string;
//   }[];
// }

// // Mock data - Dient nu als fallback of basisstructuur
// const mockProductsData: ProductsByCategory = {
//   "best-verkocht": [
//     {
//       id: "prod_1",
//       name: "Wasparfum proefpakket",
//       price: "14,95",
//       imageUrl: "/images/Wasparfum-proefpakket.webp",
//       altText: "Wasparfum proefpakket",
//     },
//     {
//       id: "prod_2",
//       name: "Wasgeurtje Wasstrips",
//       price: "14,95",
//       imageUrl: "/images/Wasgeurtje-Wasstrips.webp",
//       altText: "Wasgeurtje Wasstrips",
//     },
//     {
//       id: "prod_3",
//       name: "Blossom Drip",
//       price: "14,95",
//       imageUrl: "/images/Blossom-Drip.webp",
//       altText: "Wasparfum Blossom Drip",
//     },
//     {
//       id: "prod_4_mock",
//       name: "Full Moon (Mock)",
//       price: "14,95",
//       imageUrl: "/images/Full-Moon.webp",
//       altText: "Wasparfum Full Moon",
//     }, // Update ID om conflicten te voorkomen
//   ],
//   premium: [
//     {
//       id: "prod_5",
//       name: "White Musk",
//       price: "15,95",
//       imageUrl: "/images/White-Musk.webp",
//       altText: "Premium Wasparfum White Musk",
//     },
//     {
//       id: "prod_6",
//       name: "Evening Dew",
//       price: "15,95",
//       imageUrl: "/images/Evening-Dew.webp",
//       altText: "Premium Wasparfum Evening Dew",
//     },
//     {
//       id: "prod_7",
//       name: "Ylang Scent",
//       price: "15,95",
//       imageUrl: "/images/Ylang-Scent.webp",
//       altText: "Premium Wasparfum Ylang Scent",
//     },
//     {
//       id: "prod_8",
//       name: "Flower Rain",
//       price: "15,95",
//       imageUrl: "/images/Flower-Rain.webp",
//       altText: "Premium Wasparfum Flower Rain",
//     },
//   ],
//   "collecties-sets": [
//     {
//       id: "prod_9",
//       name: "Cadeauset wasparfum",
//       price: "74,95",
//       imageUrl: "/images/Cadeauset-wasparfum.webp",
//       altText: "Cadeauset wasparfum",
//     },
//     {
//       id: "prod_1b",
//       name: "Wasparfum proefpakket",
//       price: "14,95",
//       imageUrl: "/images/Wasparfum-proefpakket.webp",
//       altText: "Wasparfum proefpakket",
//     },
//     {
//       id: "prod_10",
//       name: "Nieuwe geurcollectie proefpakket",
//       price: "16,95",
//       imageUrl: "/images/Nieuwe-geurcollectie-proefpakket.webp",
//       altText: "Nieuwe geurcollectie proefpakket",
//     },
//     {
//       id: "prod_4b_mock",
//       name: "Full Moon (Mock Set)",
//       price: "14,95",
//       imageUrl: "/images/Full-Moon.webp",
//       altText: "Wasparfum Full Moon",
//     }, // Update ID
//   ],
// };

// export const metadata: Metadata = {
//   title: "Luxe Wasparfum kopen?",
//   description:
//     "Bestel luxe wasparfum op Wasgeurtje.nl. Italiaans geïnspireerde geuren, veilig voor alle stoffen en geliefd bij 1400+ klanten.",
// };

// // Fetch function for single product (basic info only)
// async function getSingleProduct(
//   productId: string
// ): Promise<MedusaSingleProduct | null> {
//   // Skip API calls if we're in development and the debug flag is set
//   const debugMode = process.env.NEXT_PUBLIC_DEBUG_MODE === "true";
//   const isDev = process.env.NODE_ENV === "development";

//   if (debugMode && isDev) {
//     console.log(
//       `[getSingleProduct] Skipping API call in debug mode for product ${productId}`
//     );
//     return null;
//   }

//   try {
//     const backendUrl =
//       process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
//     const apiUrl = `${backendUrl}/store/products/${productId}`;
//     console.log("[getSingleProduct] Fetching from:", apiUrl);

//     const headers: HeadersInit = {};
//     if (process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY) {
//       headers["x-publishable-api-key"] =
//         process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
//     } else {
//       console.warn("[getSingleProduct] Publishable API key missing.");
//     }

//     try {
//       const response = await fetch(apiUrl, {
//         cache: "no-store",
//         headers,
//         // Add a timeout to prevent hanging requests
//         signal: AbortSignal.timeout(5000),
//       });

//       if (!response.ok) {
//         console.error(
//           `[getSingleProduct] HTTP error! status: ${
//             response.status
//           }, body: ${await response.text()}`
//         );
//         return null;
//       }

//       const data: { product: MedusaSingleProduct } = await response.json();
//       console.log("[getSingleProduct] Success.");
//       return data.product;
//     } catch (fetchError) {
//       console.error(
//         `[getSingleProduct] Fetch operation failed for ${productId}:`,
//         fetchError
//       );
//       return null;
//     }
//   } catch (error) {
//     console.error("[getSingleProduct] Function failed:", error);
//     return null;
//   }
// }

// // Fetch function for product list (to get prices)
// async function getProductListWithPrices(
//   regionId: string
// ): Promise<MedusaProductListResponse | null> {
//   // Skip API calls if we're in development and the debug flag is set
//   const debugMode = process.env.NEXT_PUBLIC_DEBUG_MODE === "true";
//   const isDev = process.env.NODE_ENV === "development";

//   if (debugMode && isDev) {
//     console.log(`[getProductListWithPrices] Skipping API call in debug mode`);
//     return null;
//   }

//   try {
//     const backendUrl =
//       process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
//     const params = new URLSearchParams({ region_id: regionId });
//     const apiUrl = `${backendUrl}/store/products?${params.toString()}`;
//     console.log("[getProductListWithPrices] Fetching from:", apiUrl);

//     const headers: HeadersInit = {};
//     if (process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY) {
//       headers["x-publishable-api-key"] =
//         process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
//     } else {
//       console.warn("[getProductListWithPrices] Publishable API key missing.");
//     }

//     try {
//       const response = await fetch(apiUrl, {
//         cache: "no-store",
//         headers,
//         // Add a timeout to prevent hanging requests
//         signal: AbortSignal.timeout(5000),
//       });

//       if (!response.ok) {
//         console.error(
//           `[getProductListWithPrices] HTTP error! status: ${
//             response.status
//           }, body: ${await response.text()}`
//         );
//         return null;
//       }

//       const data: MedusaProductListResponse = await response.json();
//       console.log(
//         `[getProductListWithPrices] Success, found ${
//           data.products?.length || 0
//         } products.`
//       );
//       return data;
//     } catch (fetchError) {
//       console.error(
//         "[getProductListWithPrices] Fetch operation failed:",
//         fetchError
//       );
//       return null;
//     }
//   } catch (error) {
//     console.error("[getProductListWithPrices] Function failed:", error);
//     return null;
//   }
// }

// // Maak de component async om data te kunnen fetchen
// export default async function Home() {
//   // Start with mock data so we always have something to display
//   const productsData = JSON.parse(JSON.stringify(mockProductsData));

//   // Product IDs
//   const fullMoonProductId = "prod_01JRZMGTR2XWJ64KNDBP71E2DK";
//   const mockFullMoonId = "prod_4_mock";
//   const blossomDripProductId = "prod_01JRZQYXZ8EF7HT5W1765F3841";
//   const mockBlossomDripId = "prod_3";
//   const wasstripsProductId = "prod_01JRZTRKPSY6123S92BGSG8J45";
//   const mockWasstripsId = "prod_2";
//   const proefpakketProductId = "prod_01JRZX00BC09HT9SA5Q28RP2MN";
//   const mockProefpakketId = "prod_1";
//   const cadeausetProductId = "prod_01JS076NX50DCSC1W70A6BMKNC";
//   const mockCadeausetId = "prod_9";
//   const regionId = "reg_01JRZPT5R3R1M46C2MXY8QXZRD";

//   // Fetch all required data in parallel with error handling
//   let apiResults;
//   try {
//     apiResults = await Promise.allSettled([
//       getSingleProduct(fullMoonProductId),
//       getSingleProduct(blossomDripProductId),
//       getSingleProduct(wasstripsProductId),
//       getSingleProduct(proefpakketProductId),
//       getSingleProduct(cadeausetProductId),
//       getProductListWithPrices(regionId),
//     ]);

//     // Log any failed fetches
//     apiResults.forEach((result, index) => {
//       if (result.status === "rejected") {
//         const productName = [
//           "Full Moon",
//           "Blossom Drip",
//           "Wasstrips",
//           "Proefpakket",
//           "Cadeauset",
//           "Product List",
//         ][index];
//         console.error(`API fetch failed for ${productName}:`, result.reason);
//       }
//     });
//   } catch (error) {
//     console.error("Failed to fetch product data:", error);
//     // Continue with mock data if all API calls fail
//     apiResults = [
//       { status: "rejected", reason: error },
//       { status: "rejected", reason: error },
//       { status: "rejected", reason: error },
//       { status: "rejected", reason: error },
//       { status: "rejected", reason: error },
//       { status: "rejected", reason: error },
//     ];
//   }

//   // Safely extract results
//   const [
//     fullMoonResult,
//     blossomDripResult,
//     wasstripsResult,
//     proefpakketResult,
//     cadeausetResult,
//     productListResult,
//   ] = apiResults;

//   // Safely get data from results
//   const fullMoonSingleData =
//     fullMoonResult.status === "fulfilled" ? fullMoonResult.value : null;
//   const blossomDripSingleData =
//     blossomDripResult.status === "fulfilled" ? blossomDripResult.value : null;
//   const wasstripsSingleData =
//     wasstripsResult.status === "fulfilled" ? wasstripsResult.value : null;
//   const proefpakketSingleData =
//     proefpakketResult.status === "fulfilled" ? proefpakketResult.value : null;
//   const cadeausetSingleData =
//     cadeausetResult.status === "fulfilled" ? cadeausetResult.value : null;
//   const productListData =
//     productListResult.status === "fulfilled" ? productListResult.value : null;

//   // Process Full Moon
//   let fullMoonProduct: Product | null = null;
//   if (fullMoonSingleData) {
//     const productFromList = productListData?.products.find(
//       (p) => p.id === fullMoonProductId
//     );
//     const calculatedPrice = productFromList?.variants?.[0]?.calculated_price;
//     if (calculatedPrice) {
//       fullMoonProduct = {
//         id: fullMoonSingleData.id,
//         name: fullMoonSingleData.title,
//         price: calculatedPrice.calculated_amount.toString(),
//         imageUrl: fullMoonSingleData.thumbnail || "/images/placeholder.webp",
//         altText: `Wasparfum ${fullMoonSingleData.title}`,
//       };
//       console.log("Successfully combined Full Moon details and price.");
//     } else {
//       console.warn(
//         `Price not found for Full Moon (${fullMoonProductId}) in the product list response.`
//       );
//     }
//   }

//   // Process Blossom Drip
//   let blossomDripProduct: Product | null = null;
//   if (blossomDripSingleData) {
//     const productFromList = productListData?.products.find(
//       (p) => p.id === blossomDripProductId
//     );
//     const calculatedPrice = productFromList?.variants?.[0]?.calculated_price;
//     if (calculatedPrice) {
//       blossomDripProduct = {
//         id: blossomDripSingleData.id,
//         name: blossomDripSingleData.title,
//         price: calculatedPrice.calculated_amount.toString(),
//         imageUrl: blossomDripSingleData.thumbnail || "/images/placeholder.webp",
//         altText: `Wasparfum ${blossomDripSingleData.title}`,
//       };
//       console.log("Successfully combined Blossom Drip details and price.");
//     } else {
//       console.warn(
//         `Price not found for Blossom Drip (${blossomDripProductId}) in the product list response.`
//       );
//     }
//   }

//   // Process Wasstrips
//   let wasstripsProduct: Product | null = null;
//   if (wasstripsSingleData) {
//     const productFromList = productListData?.products.find(
//       (p) => p.id === wasstripsProductId
//     );
//     const calculatedPrice = productFromList?.variants?.[0]?.calculated_price;
//     if (calculatedPrice) {
//       wasstripsProduct = {
//         id: wasstripsSingleData.id,
//         name: wasstripsSingleData.title,
//         price: calculatedPrice.calculated_amount.toString(),
//         imageUrl: wasstripsSingleData.thumbnail || "/images/placeholder.webp",
//         altText: `Wasstrips ${wasstripsSingleData.title}`,
//       };
//       console.log("Successfully combined Wasstrips details and price.");
//     } else {
//       console.warn(
//         `Price not found for Wasstrips (${wasstripsProductId}) in the product list response.`
//       );
//     }
//   }

//   // Process Proefpakket
//   let proefpakketProduct: Product | null = null;
//   if (proefpakketSingleData) {
//     const productFromList = productListData?.products.find(
//       (p) => p.id === proefpakketProductId
//     );
//     const calculatedPrice = productFromList?.variants?.[0]?.calculated_price;
//     if (calculatedPrice) {
//       proefpakketProduct = {
//         id: proefpakketSingleData.id,
//         name: proefpakketSingleData.title,
//         price: calculatedPrice.calculated_amount.toString(),
//         imageUrl: proefpakketSingleData.thumbnail || "/images/placeholder.webp",
//         altText: `Wasparfum ${proefpakketSingleData.title}`,
//       };
//       console.log("Successfully combined Proefpakket details and price.");
//     } else {
//       console.warn(
//         `Price not found for Proefpakket (${proefpakketProductId}) in the product list response.`
//       );
//     }
//   }

//   // Process Cadeauset
//   let cadeausetProduct: Product | null = null;
//   if (cadeausetSingleData) {
//     const productFromList = productListData?.products.find(
//       (p) => p.id === cadeausetProductId
//     );
//     const calculatedPrice = productFromList?.variants?.[0]?.calculated_price;
//     if (calculatedPrice) {
//       cadeausetProduct = {
//         id: cadeausetSingleData.id,
//         name: cadeausetSingleData.title,
//         price: calculatedPrice.calculated_amount.toString(),
//         imageUrl: cadeausetSingleData.thumbnail || "/images/placeholder.webp",
//         altText: `Cadeauset ${cadeausetSingleData.title}`,
//       };
//       console.log("Successfully combined Cadeauset details and price.");
//     } else {
//       console.warn(
//         `Price not found for Cadeauset (${cadeausetProductId}) in the product list response.`
//       );
//     }
//   }

//   // Replace mock data if we successfully constructed the products
//   if (fullMoonProduct) {
//     const indexToReplace = productsData["best-verkocht"].findIndex(
//       (p: Product) => p.id === mockFullMoonId
//     );
//     if (indexToReplace !== -1) {
//       console.log(
//         `Replacing mock Full Moon at index ${indexToReplace} with combined data.`
//       );
//       productsData["best-verkocht"][indexToReplace] = fullMoonProduct;
//     } else {
//       console.warn(
//         `Mock Full Moon with ID '${mockFullMoonId}' not found. Adding combined product.`
//       );
//       productsData["best-verkocht"].push(fullMoonProduct);
//     }
//   } else {
//     console.warn(
//       `Failed to construct full product data for Full Moon (${fullMoonProductId}). Using mock data.`
//     );
//   }

//   if (blossomDripProduct) {
//     const indexToReplace = productsData["best-verkocht"].findIndex(
//       (p: Product) => p.id === mockBlossomDripId
//     );
//     if (indexToReplace !== -1) {
//       console.log(
//         `Replacing mock Blossom Drip at index ${indexToReplace} with combined data.`
//       );
//       productsData["best-verkocht"][indexToReplace] = blossomDripProduct;
//     } else {
//       console.warn(
//         `Mock Blossom Drip with ID '${mockBlossomDripId}' not found. Adding combined product.`
//       );
//       productsData["best-verkocht"].push(blossomDripProduct);
//     }
//   } else {
//     console.warn(
//       `Failed to construct full product data for Blossom Drip (${blossomDripProductId}). Using mock data.`
//     );
//   }

//   if (wasstripsProduct) {
//     const indexToReplace = productsData["best-verkocht"].findIndex(
//       (p: Product) => p.id === mockWasstripsId
//     );
//     if (indexToReplace !== -1) {
//       console.log(
//         `Replacing mock Wasstrips at index ${indexToReplace} with combined data.`
//       );
//       productsData["best-verkocht"][indexToReplace] = wasstripsProduct;
//     } else {
//       console.warn(
//         `Mock Wasstrips with ID '${mockWasstripsId}' not found. Adding combined product.`
//       );
//       productsData["best-verkocht"].push(wasstripsProduct);
//     }
//   } else {
//     console.warn(
//       `Failed to construct full product data for Wasstrips (${wasstripsProductId}). Using mock data.`
//     );
//   }

//   if (proefpakketProduct) {
//     const indexToReplace = productsData["best-verkocht"].findIndex(
//       (p: Product) => p.id === mockProefpakketId
//     );
//     if (indexToReplace !== -1) {
//       console.log(
//         `Replacing mock Proefpakket at index ${indexToReplace} with combined data.`
//       );
//       productsData["best-verkocht"][indexToReplace] = proefpakketProduct;
//     } else {
//       console.warn(
//         `Mock Proefpakket with ID '${mockProefpakketId}' not found. Adding combined product.`
//       );
//       productsData["best-verkocht"].push(proefpakketProduct);
//     }
//   } else {
//     console.warn(
//       `Failed to construct full product data for Proefpakket (${proefpakketProductId}). Using mock data.`
//     );
//   }

//   if (cadeausetProduct) {
//     // We no longer want to add this product to any product grid category
//     // Since we have a dedicated section for it

//     // Remove from best-verkocht category if it exists
//     const bestVerkIndex = productsData["best-verkocht"].findIndex(
//       (p: Product) => p.id === mockCadeausetId || p.id === cadeausetProductId
//     );
//     if (bestVerkIndex !== -1) {
//       console.log(`Removing Cadeauset from best-verkocht category.`);
//       productsData["best-verkocht"].splice(bestVerkIndex, 1);
//     }

//     // Remove from collecties-sets category if it exists
//     const collectieIndex = productsData["collecties-sets"].findIndex(
//       (p: Product) => p.id === mockCadeausetId || p.id === cadeausetProductId
//     );
//     if (collectieIndex !== -1) {
//       console.log(`Removing Cadeauset from collecties-sets category.`);
//       productsData["collecties-sets"].splice(collectieIndex, 1);
//     }
//   } else {
//     console.warn(
//       `Failed to construct full product data for Cadeauset (${cadeausetProductId}). Using mock data.`
//     );

//     // If we don't have real data, also remove the mock cadeauset from all product grids
//     const mockBestVerkIndex = productsData["best-verkocht"].findIndex(
//       (p: Product) => p.id === mockCadeausetId
//     );
//     if (mockBestVerkIndex !== -1) {
//       console.log(`Removing mock Cadeauset from best-verkocht category.`);
//       productsData["best-verkocht"].splice(mockBestVerkIndex, 1);
//     }

//     const mockCollectieIndex = productsData["collecties-sets"].findIndex(
//       (p: Product) => p.id === mockCadeausetId
//     );
//     if (mockCollectieIndex !== -1) {
//       console.log(`Removing mock Cadeauset from collecties-sets category.`);
//       productsData["collecties-sets"].splice(mockCollectieIndex, 1);
//     }
//   }

//   return (
//     <>
//       {/* Top Announcement Bars - stacked with full width */}
//       <div className="bg-[#1a1a1a] text-white text-center py-2 w-full relative overflow-hidden group">
//         {/* Subtle animated gradient overlay */}
//         <div
//           className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/0 via-[#333]/20 to-[#1a1a1a]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//           style={{
//             backgroundSize: "200% 100%",
//             animation: "shimmer 3s ease-in-out infinite",
//           }}
//         ></div>

//         {/* Left sparkle */}
//         <div
//           className="absolute left-[15%] top-1/2 transform -translate-y-1/2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-60"
//           style={{ animation: "ping 2s ease-in-out infinite" }}
//         ></div>

//         {/* Right sparkle */}
//         <div
//           className="absolute right-[15%] top-1/2 transform -translate-y-1/2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-60"
//           style={{ animation: "ping 2s ease-in-out 0.5s infinite" }}
//         ></div>

//         <span className="text-sm relative inline-flex items-center">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="w-4 h-4 mr-2 text-[#dba94a]"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
//             />
//           </svg>
//           Bestel vóór 16:00 voor verzending op dezelfde dag
//         </span>
//       </div>

//       <div className="bg-black text-white text-center py-2 w-full border-t border-[#333333] relative overflow-hidden group">
//         {/* Animated gradient line on hover */}
//         <div
//           className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#dba94a] via-[#f8d570] to-[#dba94a] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//           style={{
//             backgroundSize: "200% 100%",
//             animation: "shimmer 3s ease-in-out infinite",
//           }}
//         ></div>

//         <span className="text-sm relative inline-flex items-center">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="w-4 h-4 mr-2 text-[#dba94a]"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
//             />
//           </svg>
//           <span className="mr-1">Gratis verzending vanaf</span>
//           <span className="text-[#dba94a] font-semibold">€29</span>
//         </span>
//       </div>

//       {/* Sticky Header - nu als client component */}
//       <StickyHeader />

//       {/* Main content needs padding top to account for sticky header */}
//       <main className="flex flex-col min-h-screen">
//         {/* Hero sectie */}
//         <section className="relative">
//           {/* Main Hero Section */}
//           <div className="relative overflow-hidden">
//             {/* Desktop Layout */}
//             <div className="hidden md:flex min-h-[65vh]">
//               {/* Left Column - Gold Background with Text */}
//               <div className="w-1/2 bg-gradient-to-r from-[#dba94a] via-[#f8d570] to-[#fef9ec] p-12 lg:p-16 flex flex-col justify-center relative z-10">
//                 {/* Star Rating */}
//                 <div className="bg-white/90 rounded-full px-4 py-1.5 inline-flex items-center w-fit mb-8 shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 cursor-pointer">
//                   <div className="flex mr-2">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <span
//                         key={star}
//                         className="text-[#dba94a] hover:text-[#FCCE4E] transition-colors duration-200"
//                       >
//                         ★
//                       </span>
//                     ))}
//                   </div>
//                   <span className="text-gray-800 text-sm font-medium">
//                     4.8/5 (1400+ google reviews)
//                   </span>
//                 </div>

//                 {/* Heading */}
//                 <h1 className="text-[2.75rem] md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-bold text-gray-900 mb-7 leading-[1.15]">
//                   <span className="block hover:text-[#814E1E] transition-colors duration-300">
//                     Luxe wasparfums die
//                   </span>
//                   <span className="block hover:text-[#814E1E] transition-colors duration-300">
//                     uitzonderlijk lang blijven
//                   </span>
//                   <span className="block hover:text-[#814E1E] transition-colors duration-300">
//                     hangen
//                   </span>
//                 </h1>

//                 {/* Subheading */}
//                 <p className="text-lg text-gray-800 mb-9 max-w-md hover:text-[#814E1E] transition-colors duration-300">
//                   Italiaans geïnspireerde geuren gemaakt met eersteklas
//                   essentiële oliën
//                 </p>

//                 {/* CTA Button */}
//                 <div className="max-w-[250px]">
//                   <Link
//                     href="/producten"
//                     className="w-full bg-black text-white px-7 py-5 text-xs tracking-wider font-semibold uppercase text-center block relative group overflow-hidden"
//                     title="Ontdek ons assortiment luxe wasparfums"
//                   >
//                     <span className="relative z-10 group-hover:tracking-wider transition-all duration-300">
//                       ONTDEK NU
//                     </span>
//                     <span className="absolute inset-0 bg-gradient-to-r from-[#dba94a] to-[#f8d570] opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-0 transition-all duration-500"></span>
//                     <span className="absolute inset-0 bg-black group-hover:bg-transparent transition-colors duration-300 group-hover:shadow-[0_0_20px_rgba(219,169,74,0.4)] group-hover:shadow-inner"></span>
//                   </Link>
//                 </div>
//               </div>

//               {/* Right Column - Product Image */}
//               <div className="w-1/2 relative overflow-hidden">
//                 <img
//                   src="/images/Women.webp"
//                   alt="Vrouw ruikt aan schone was"
//                   width="800"
//                   height="1200"
//                   fetchPriority="high"
//                   decoding="async"
//                   className="object-cover object-[center_15%] absolute inset-0 h-full w-full scale-110"
//                   style={{
//                     backgroundImage: "url('/images/Women.webp')",
//                     backgroundSize: "cover",
//                   }}
//                 />
//               </div>
//             </div>

//             {/* Mobile Layout */}
//             <div className="block md:hidden">
//               {/* Mobiele text content */}
//               <div className="bg-gradient-to-r from-[#dba94a] via-[#f8d570] to-[#fef9ec] p-6">
//                 {/* Star Rating */}
//                 <div className="bg-white/90 rounded-full px-3 py-.5 inline-flex items-center w-fit mb-4 shadow-sm">
//                   <div className="flex mr-2">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <span key={star} className="text-[#dba94a]">
//                         ★
//                       </span>
//                     ))}
//                   </div>
//                   <span className="text-gray-800 text-xs font-medium">
//                     4.8/5 (1400+ reviews)
//                   </span>
//                 </div>

//                 {/* Heading */}
//                 <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
//                   Luxe wasparfums die uitzonderlijk lang blijven hangen
//                 </h1>

//                 {/* Subheading */}
//                 <p className="text-base text-gray-800 mb-6">
//                   Italiaans geïnspireerde geuren gemaakt met eersteklas
//                   essentiële oliën
//                 </p>

//                 {/* CTA Button */}
//                 <div className="max-w-[210px]">
//                   <Link
//                     href="/producten"
//                     className="w-full bg-black text-white px-7 py-3 text-xs tracking-wider font-semibold uppercase hover:bg-gray-800 transition-colors text-center block relative group overflow-hidden"
//                     title="Ontdek ons assortiment luxe wasparfums"
//                   >
//                     <span className="relative z-10 group-hover:tracking-wider transition-all duration-300">
//                       ONTDEK NU
//                     </span>
//                     <span className="absolute inset-0 bg-gradient-to-r from-[#dba94a] to-[#f8d570] opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-0 transition-all duration-300"></span>
//                     <span className="absolute inset-0 bg-black group-hover:bg-transparent transition-colors duration-300"></span>
//                   </Link>
//                 </div>
//               </div>

//               {/* Mobiele afbeelding */}
//               <div className="relative w-full h-[350px] overflow-hidden">
//                 <img
//                   src="/images/Women.webp"
//                   alt="Vrouw ruikt aan schone was"
//                   width="600"
//                   height="900"
//                   fetchPriority="high"
//                   decoding="async"
//                   className="object-cover object-[center_15%] absolute inset-0 h-full w-full scale-110"
//                   style={{
//                     backgroundImage: "url('/images/Women.webp')",
//                     backgroundSize: "cover",
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* USP sectie - direct onder de hero met de golvende vorm */}
//         <section className="relative bg-[#f3e6d0] pb-8 pt-[70px]">
//           {/* Wave separating hero and USP section */}
//           <div
//             className="absolute top-0 left-0 right-0 w-full h-[120px] overflow-hidden"
//             style={{ transform: "translateY(-99%)" }}
//             aria-hidden="true"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 1440 120"
//               className="absolute bottom-0 w-full h-full"
//               preserveAspectRatio="none"
//               fill="#dba94a"
//             >
//               <path d="" />
//             </svg>
//           </div>

//           <div className="container mx-auto px-4 relative z-10 pt-2">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
//               {/* USP 1 - Veilig voor alle stoffen en machines */}
//               <div className="text-center group">
//                 <div className="flex justify-center mb-3">
//                   <div className="w-[64px] h-[64px] -mt-2 transform group-hover:scale-110 transition-transform duration-300">
//                     <Image
//                       src="/images/veilig voor alle stoffen en machines.svg"
//                       alt="Veilig voor alle stoffen en machines"
//                       width={64}
//                       height={64}
//                       loading="lazy"
//                       className="filter group-hover:drop-shadow-[0_0_8px_rgba(214,173,97,0.6)] transition-all duration-300"
//                     />
//                   </div>
//                 </div>
//                 <h3 className="font-bold text-gray-900 text-lg mb-0 group-hover:text-[#814E1E] transition-colors duration-300">
//                   Veilig voor alle stoffen en
//                 </h3>
//                 <p className="text-gray-800 text-base group-hover:text-[#814E1E] transition-colors duration-300">
//                   machines
//                 </p>
//               </div>

//               {/* USP 2 - Geformuleerd voor de gevoelige huid */}
//               <div className="text-center group">
//                 <div className="flex justify-center mb-3">
//                   <div className="w-[64px] h-[64px] -mt-2 transform group-hover:scale-110 transition-transform duration-300">
//                     <Image
//                       src="/images/geformolueerd voor de gevoelige huid.svg"
//                       alt="Geformuleerd voor de gevoelige huid"
//                       width={64}
//                       height={64}
//                       loading="lazy"
//                       className="filter group-hover:drop-shadow-[0_0_8px_rgba(214,173,97,0.6)] transition-all duration-300"
//                     />
//                   </div>
//                 </div>
//                 <h3 className="font-bold text-gray-900 text-lg mb-0 group-hover:text-[#814E1E] transition-colors duration-300">
//                   Geformuleerd voor de gevoelige
//                 </h3>
//                 <p className="text-gray-800 text-base group-hover:text-[#814E1E] transition-colors duration-300">
//                   huid
//                 </p>
//               </div>

//               {/* USP 3 - Milieuvriendelijk & Parabenenvrij */}
//               <div className="text-center group">
//                 <div className="flex justify-center mb-3">
//                   <div className="w-[64px] h-[64px] -mt-2 transform group-hover:scale-110 transition-transform duration-300">
//                     <Image
//                       src="/images/Icon-Eco friendly and parben free.svg"
//                       alt="Milieuvriendelijk & Parabenenvrij"
//                       width={64}
//                       height={64}
//                       loading="lazy"
//                       className="filter group-hover:drop-shadow-[0_0_8px_rgba(214,173,97,0.6)] transition-all duration-300"
//                     />
//                   </div>
//                 </div>
//                 <h3 className="font-bold text-gray-900 text-lg mb-0 group-hover:text-[#814E1E] transition-colors duration-300">
//                   Milieuvriendelijk &
//                 </h3>
//                 <p className="text-gray-800 text-base group-hover:text-[#814E1E] transition-colors duration-300">
//                   Parabenenvrij
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Productcategorieën sectie - met echte afbeeldingen */}
//         <section className="py-16 bg-white">
//           <div className="container mx-auto px-4">
//             <div className="flex flex-col md:flex-row justify-between items-center mb-16">
//               <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-0 text-center md:text-left relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 md:after:left-0 after:w-0 hover:after:w-1/4 after:h-1 after:bg-[#D6AD61] after:transition-all after:duration-500 hover:text-[#814E1E] transition-colors duration-300 pb-2">
//                 Onze populairste collecties
//               </h2>
//             </div>

//             <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-12">
//               {/* Best Verkocht */}
//               <div className="group cursor-pointer">
//                 <div className="h-48 md:h-64 relative rounded-lg overflow-hidden mb-4 md:mb-6 shadow-md group-hover:shadow-xl group-hover:shadow-[#d6ad61]/20 transition-all duration-300">
//                   <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300 z-10"></div>
//                   <Image
//                     src="/images/Best-verkocht.webp"
//                     alt="Best Verkocht Wasparfums"
//                     fill
//                     style={{ objectFit: "cover" }}
//                     sizes="(max-width: 639px) 50vw, (max-width: 767px) 50vw, 25vw"
//                     className="group-hover:scale-105 transition-transform duration-500"
//                   />
//                   <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 text-white p-4 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
//                     <p className="text-sm">
//                       Bekijk onze bestverkochte wasparfums
//                     </p>
//                   </div>
//                 </div>
//                 <h3 className="font-bold text-lg md:text-xl lg:text-2xl text-gray-900 text-center group-hover:text-[#814E1E] transition-colors duration-300">
//                   Best Verkocht
//                 </h3>
//               </div>

//               {/* Premium Wasparfums */}
//               <div className="group cursor-pointer">
//                 <div className="h-48 md:h-64 relative rounded-lg overflow-hidden mb-4 md:mb-6 shadow-md group-hover:shadow-xl group-hover:shadow-[#d6ad61]/20 transition-all duration-300">
//                   <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300 z-10"></div>
//                   <Image
//                     src="/images/Premieum-wasparfums.webp"
//                     alt="Premium Wasparfums"
//                     fill
//                     style={{ objectFit: "cover" }}
//                     sizes="(max-width: 639px) 50vw, (max-width: 767px) 50vw, 25vw"
//                     className="group-hover:scale-105 transition-transform duration-500"
//                   />
//                   <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 text-white p-4 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
//                     <p className="text-sm">Ontdek onze premium wasparfums</p>
//                   </div>
//                 </div>
//                 <h3 className="font-bold text-lg md:text-xl lg:text-2xl text-gray-900 text-center group-hover:text-[#814E1E] transition-colors duration-300">
//                   Premium Wasparfums
//                 </h3>
//               </div>

//               {/* Proefpakket */}
//               <div className="group cursor-pointer">
//                 <div className="h-48 md:h-64 relative rounded-lg overflow-hidden mb-4 md:mb-6 shadow-md group-hover:shadow-xl group-hover:shadow-[#d6ad61]/20 transition-all duration-300">
//                   <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300 z-10"></div>
//                   <Image
//                     src="/images/Proefpakket.webp"
//                     alt="Wasparfum Proefpakket"
//                     fill
//                     style={{ objectFit: "cover" }}
//                     sizes="(max-width: 639px) 50vw, (max-width: 767px) 50vw, 25vw"
//                     className="group-hover:scale-105 transition-transform duration-500"
//                   />
//                   <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 text-white p-4 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
//                     <p className="text-sm">
//                       Probeer verschillende geuren met ons proefpakket
//                     </p>
//                   </div>
//                 </div>
//                 <h3 className="font-bold text-lg md:text-xl lg:text-2xl text-gray-900 text-center group-hover:text-[#814E1E] transition-colors duration-300">
//                   Proefpakket
//                 </h3>
//               </div>

//               {/* Geschenkset */}
//               <div className="group cursor-pointer">
//                 <div className="h-48 md:h-64 relative rounded-lg overflow-hidden mb-4 md:mb-6 shadow-md group-hover:shadow-xl group-hover:shadow-[#d6ad61]/20 transition-all duration-300">
//                   <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300 z-10"></div>
//                   <Image
//                     src="/images/cadauset.webp"
//                     alt="Wasparfum Geschenkset"
//                     fill
//                     style={{ objectFit: "cover" }}
//                     sizes="(max-width: 639px) 50vw, (max-width: 767px) 50vw, 25vw"
//                     className="group-hover:scale-105 transition-transform duration-500"
//                   />
//                   <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 text-white p-4 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
//                     <p className="text-sm">
//                       Het perfecte cadeau voor elke gelegenheid
//                     </p>
//                   </div>
//                 </div>
//                 <h3 className="font-bold text-lg md:text-xl lg:text-2xl text-gray-900 text-center group-hover:text-[#814E1E] transition-colors duration-300">
//                   Geschenkset
//                 </h3>
//               </div>
//             </div>

//             <div className="text-center">
//               <a
//                 href="/wasparfum"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 title="Bekijk alle luxe wasparfum geuren"
//                 className="inline-flex items-center bg-gradient-to-r from-[#FDD86A] to-[#FCCE4E] hover:from-[#eab63c] hover:to-[#dba94a] text-[#212529] px-8 py-3 rounded-md font-semibold uppercase tracking-wide shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 relative overflow-hidden group"
//               >
//                 <span className="relative z-10">ALLE WASPARFUMS BEKIJKEN</span>
//                 <span className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 group-hover:right-6 transition-all duration-300 ease-in-out z-0">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     strokeWidth={2}
//                     stroke="currentColor"
//                     className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
//                     />
//                   </svg>
//                 </span>
//               </a>
//             </div>
//           </div>
//         </section>

//         {/* USP Kenmerken sectie - Aangepaste styling */}
//         <section className="bg-[#814E1E] py-5">
//           {" "}
//           {/* Increased vertical padding */}
//           <div className="container mx-auto px-4">
//             <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 md:gap-x-16 lg:gap-x-20 text-white">
//               {" "}
//               {/* Increased gaps */}
//               {/* USP 1 - Geen parabenen */}
//               <div className="flex items-center gap-3.5">
//                 {" "}
//                 {/* Increased gap between icon and text */}
//                 <div className="w-14 h-14 bg-[#814E1E]/50 rounded-full flex items-center justify-center">
//                   {" "}
//                   {/* Larger icon with background */}
//                   <Image
//                     src="/images/Icon-Parben free.svg"
//                     alt="Geen parabenen"
//                     width={42}
//                     height={42}
//                     className="w-10 h-10"
//                   />
//                 </div>
//                 <span className="text-base md:text-lg font-medium">
//                   Geen parabenen
//                 </span>
//               </div>
//               {/* USP 2 - Geen microplastics */}
//               <div className="flex items-center gap-3.5">
//                 <div className="w-14 h-14 bg-[#814E1E]/50 rounded-full flex items-center justify-center">
//                   <Image
//                     src="/images/Icon-Microplastic free.svg"
//                     alt="Geen microplastics"
//                     width={42}
//                     height={42}
//                     className="w-10 h-10"
//                   />
//                 </div>
//                 <span className="text-base md:text-lg font-medium">
//                   Geen microplastics
//                 </span>
//               </div>
//               {/* USP 3 - Biologisch afbreekbaar */}
//               <div className="flex items-center gap-3.5">
//                 <div className="w-14 h-14 bg-[#814E1E]/50 rounded-full flex items-center justify-center">
//                   <Image
//                     src="/images/Icon-Biodegradable.svg"
//                     alt="Biologisch afbreekbaar"
//                     width={42}
//                     height={42}
//                     className="w-10 h-10"
//                   />
//                 </div>
//                 <span className="text-base md:text-lg font-medium">
//                   Biologisch afbreekbaar
//                 </span>
//               </div>
//               {/* USP 4 - 100% Veganistisch */}
//               <div className="flex items-center gap-3.5">
//                 <div className="w-14 h-14 bg-[#814E1E]/50 rounded-full flex items-center justify-center">
//                   <Image
//                     src="/images/Icon-100-percent-vegan.svg"
//                     alt="100% Veganistisch & Dierproefvrij"
//                     width={42}
//                     height={42}
//                     className="w-10 h-10"
//                   />
//                 </div>
//                 <span className="text-base md:text-lg font-medium">
//                   100% Veganistisch <br className="hidden sm:block" />&
//                   Dierproefvrij
//                 </span>
//               </div>
//             </div>
//           </div>
//         </section>
//         {/* Section under the brown bar */}
//         <section className="py-20 bg-[#fef0ca]">
//           <div className="container mx-auto px-2">
//             <h2 className="text-3xl font-semibold text-[#814E1E] text-center mb-8 leading-tight relative inline-block mx-auto">
//               Wat onze klanten zeggen
//             </h2>
//           </div>
//         </section>

//         {/* Hoe werkt het sectie */}
//         <section className="py-16 bg-[#fef9ec]">
//           <div className="container mx-auto px-4">
//             {/* Section header */}
//             <div className="flex flex-col items-center justify-center text-center mb-10">
//               <h2 className="text-[32px] font-semibold text-[#212529] font-['EB_Garamond'] leading-[120%] mb-2">
//                 Hoe werkt het
//               </h2>
//               <p className="text-[18px] font-normal text-[#212529] leading-[150%] max-w-xl">
//                 Eenvoudige luxe voor jouw wasgoed
//               </p>
//             </div>

//             {/* Steps with much wider spacing - no background stripe */}
//             <div className="max-w-7xl mx-auto pb-20">
//               <div className="flex flex-col md:flex-row justify-between items-start">
//                 {/* Step 1 */}
//                 <div className="flex flex-col items-center md:w-1/3 px-4 mb-12 md:mb-0">
//                   <div className="relative w-full max-w-[280px] h-[280px] mb-6">
//                     <Image
//                       src="/images/Voeg-een-vleugje-elegantie-toe.webp"
//                       alt="Voeg een vleugje elegantie toe"
//                       fill
//                       className="object-cover rounded-md"
//                     />
//                   </div>
//                   <h3 className="text-[18px] font-bold text-[#814E1E] leading-[150%] mb-2 text-center">
//                     1. Voeg een vleugje elegantie toe
//                   </h3>
//                   <p className="text-[16px] text-center font-normal text-[#212529] leading-[150%] max-w-[280px]">
//                     Giet een dopje van Wasgeurtje&apos;s geconcentreerde
//                     wasparfum in het wasverzachtervakje van je wasmachine. Een
//                     kleine hoeveelheid is al voldoende voor een heerlijke,
//                     langdurige geur.
//                   </p>
//                 </div>

//                 {/* Arrow 1 - only visible on desktop */}
//                 <div className="hidden md:flex items-center justify-center md:w-auto">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="35"
//                     height="25"
//                     viewBox="0 0 35 25"
//                     fill="none"
//                     className="text-[#D6AD61] transform -translate-y-20"
//                   >
//                     <path
//                       d="M34.4596 13.6168C35.1553 12.9211 35.1553 11.7964 34.4596 11.1008L23.9138 0.554918C23.2181 -0.140744 22.0934 -0.140744 21.3978 0.554918C20.7021 1.25058 20.7021 2.37531 21.3978 3.07097L30.6856 12.3588L21.3978 21.6466C20.7021 22.3422 20.7021 23.467 21.3978 24.1626C22.0934 24.8583 23.2181 24.8583 23.9138 24.1626L34.4596 13.6168ZM0.708496 14.1142H33.0996V10.6034H0.708496V14.1142Z"
//                       fill="#D6AD61"
//                     />
//                   </svg>
//                 </div>

//                 {/* Step 2 */}
//                 <div className="flex flex-col items-center md:w-1/3 px-4 mb-12 md:mb-0">
//                   <div className="relative w-full max-w-[280px] h-[280px] mb-6">
//                     <Image
//                       src="/images/Start-je-wasprogramma.webp"
//                       alt="Start je wasprogramma"
//                       fill
//                       className="object-cover rounded-md"
//                     />
//                   </div>
//                   <h3 className="text-[18px] font-bold text-[#814E1E] leading-[150%] mb-2 text-center">
//                     2. Start je wasprogramma
//                   </h3>
//                   <p className="text-[16px] text-center font-normal text-[#212529] leading-[150%] max-w-[280px]">
//                     Onze formule is geschikt voor alle soorten textiel en
//                     wasmachines. Was zoals je gewend bent en geniet van een geur
//                     die niet alleen fris blijft, maar ook zacht is voor je
//                     kleding.
//                   </p>
//                 </div>

//                 {/* Arrow 2 - only visible on desktop */}
//                 <div className="hidden md:flex items-center justify-center md:w-auto">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="35"
//                     height="25"
//                     viewBox="0 0 35 25"
//                     fill="none"
//                     className="text-[#D6AD61] transform -translate-y-20"
//                   >
//                     <path
//                       d="M34.4596 13.6168C35.1553 12.9211 35.1553 11.7964 34.4596 11.1008L23.9138 0.554918C23.2181 -0.140744 22.0934 -0.140744 21.3978 0.554918C20.7021 1.25058 20.7021 2.37531 21.3978 3.07097L30.6856 12.3588L21.3978 21.6466C20.7021 22.3422 20.7021 23.467 21.3978 24.1626C22.0934 24.8583 23.2181 24.8583 23.9138 24.1626L34.4596 13.6168ZM0.708496 14.1142H33.0996V10.6034H0.708496V14.1142Z"
//                       fill="#D6AD61"
//                     />
//                   </svg>
//                 </div>

//                 {/* Step 3 */}
//                 <div className="flex flex-col items-center md:w-1/3 px-4">
//                   <div className="relative w-full max-w-[280px] h-[280px] mb-6">
//                     <Image
//                       src="/images/Geniet-van-langdurige-luxe.webp"
//                       alt="Geniet van langdurige luxe"
//                       fill
//                       className="object-cover rounded-md"
//                     />
//                   </div>
//                   <h3 className="text-[18px] font-bold text-[#814E1E] leading-[150%] mb-2 text-center">
//                     3. Geniet van langdurige luxe
//                   </h3>
//                   <p className="text-[16px] text-center font-normal text-[#212529] leading-[150%] max-w-[280px]">
//                     Haal je was uit de wasmachine en ervaar een langdurige, luxe
//                     geur geïnspireerd door Italiaanse parfums. Jouw kleding
//                     blijft fris en heerlijk geurig, wasbeurt na wasbeurt.
//                   </p>
//                 </div>
//               </div>

//               {/* Icons at bottom with more spacing */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
//                 {/* Icon 1 */}
//                 <div className="flex flex-col items-center justify-center py-2 gap-1">
//                   <Image
//                     src="/images/veilig voor alle stoffen en machines.svg"
//                     alt="Veilig voor alle textiel en wasmachines"
//                     width={42}
//                     height={42}
//                   />
//                   <p className="text-[16px] font-medium text-[#212529] text-center">
//                     Veilig voor alle textiel en wasmachines
//                   </p>
//                 </div>

//                 {/* Icon 2 */}
//                 <div className="flex flex-col items-center justify-center py-2 gap-1">
//                   <Image
//                     src="/images/wasmachine.svg"
//                     alt="Werkt met elke wasmachine"
//                     width={42}
//                     height={42}
//                   />
//                   <p className="text-[16px] font-medium text-[#212529] text-center">
//                     Werkt met elke wasmachine
//                   </p>
//                 </div>

//                 {/* Icon 3 */}
//                 <div className="flex flex-col items-center justify-center py-2 gap-1">
//                   <Image
//                     src="/images/Icon-safe for sensitive skin.svg"
//                     alt="Geformuleerd voor de gevoelige huid"
//                     width={42}
//                     height={42}
//                   />
//                   <p className="text-[16px] font-medium text-[#212529] text-center">
//                     Geformuleerd voor de gevoelige huid
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* "Vind je perfecte wasparfum" sectie */}
//         <FeaturedProductsTabs productsByCategory={productsData} />

//         {/* Nieuwe "Duurzaam geparfumeerd" sectie */}
//         <section className="py-16 bg-[#fef9ec]">
//           {" "}
//           {/* Achtergrondkleur zoals andere lichte secties */}
//           <div className="container mx-auto px-4 text-center">
//             <h2 className="text-3xl font-semibold text-[#814E1E] font-serif mb-4 leading-tight relative inline-block">
//               Duurzaam geparfumeerd, bewust gemaakt
//               <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D6AD61] group-hover:w-full transition-all duration-700 ease-in-out"></span>
//             </h2>
//             <p className="text-gray-600 mb-16 max-w-2xl mx-auto">
//               Veilig voor je huid, je kleding en de planeet
//             </p>

//             <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-8">
//               {/* Item 1: Geen parabenen */}
//               <div className="flex flex-col items-center group">
//                 <div className="w-24 h-24 md:w-28 md:h-28 mb-4 md:mb-6 bg-[#fef9ec] rounded-full border-2 border-[#D6AD61] flex items-center justify-center p-2 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(214,173,97,0.4)] group-hover:border-[#FCCE4E] transform group-hover:scale-105">
//                   <Image
//                     src="/images/Geen parabenen of microplastics.svg"
//                     alt=""
//                     width={64}
//                     height={64}
//                     aria-hidden="true"
//                     className="transition-transform duration-300 group-hover:rotate-3"
//                   />
//                 </div>
//                 <p className="text-sm md:text-base text-[#212529] font-normal leading-5 md:leading-6 text-center transition-all duration-300 group-hover:text-[#814E1E] group-hover:font-medium">
//                   Geen parabenen of microplastics
//                 </p>
//               </div>

//               {/* Item 2: Biologisch afbreekbaar */}
//               <div className="flex flex-col items-center group">
//                 <div className="w-24 h-24 md:w-28 md:h-28 mb-4 md:mb-6 bg-[#fef9ec] rounded-full border-2 border-[#D6AD61] flex items-center justify-center p-2 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(214,173,97,0.4)] group-hover:border-[#FCCE4E] transform group-hover:scale-105">
//                   <Image
//                     src="/images/Biologisch-afbreekbare-ingrediënten.svg"
//                     alt=""
//                     width={64}
//                     height={64}
//                     aria-hidden="true"
//                     className="transition-transform duration-300 group-hover:rotate-3"
//                   />
//                 </div>
//                 <p className="text-sm md:text-base text-[#212529] font-normal leading-5 md:leading-6 text-center transition-all duration-300 group-hover:text-[#814E1E] group-hover:font-medium">
//                   Biologisch afbreekbare ingrediënten
//                 </p>
//               </div>

//               {/* Item 3: Vegan & Dierproefvrij */}
//               <div className="flex flex-col items-center group">
//                 <div className="w-24 h-24 md:w-28 md:h-28 mb-4 md:mb-6 bg-[#fef9ec] rounded-full border-2 border-[#D6AD61] flex items-center justify-center p-2 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(214,173,97,0.4)] group-hover:border-[#FCCE4E] transform group-hover:scale-105">
//                   <Image
//                     src="/images/100-procent-Veganistisch-en-Dierproefvrij.svg"
//                     alt=""
//                     width={64}
//                     height={64}
//                     aria-hidden="true"
//                     className="transition-transform duration-300 group-hover:rotate-3"
//                   />
//                 </div>
//                 <p className="text-sm md:text-base text-[#212529] font-normal leading-5 md:leading-6 text-center transition-all duration-300 group-hover:text-[#814E1E] group-hover:font-medium">
//                   100% Veganistisch
//                   <br />& Dierproefvrij
//                 </p>
//               </div>

//               {/* Item 4: Gerecycled plastic */}
//               <div className="flex flex-col items-center group">
//                 <div className="w-24 h-24 md:w-28 md:h-28 mb-4 md:mb-6 bg-[#fef9ec] rounded-full border-2 border-[#D6AD61] flex items-center justify-center p-2 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(214,173,97,0.4)] group-hover:border-[#FCCE4E] transform group-hover:scale-105">
//                   <Image
//                     src="/images/Flessen van gerecycled plastic.svg"
//                     alt=""
//                     width={64}
//                     height={64}
//                     aria-hidden="true"
//                     className="transition-transform duration-300 group-hover:rotate-3"
//                   />
//                 </div>
//                 <p className="text-sm md:text-base text-[#212529] font-normal leading-5 md:leading-6 text-center transition-all duration-300 group-hover:text-[#814E1E] group-hover:font-medium">
//                   Flessen van
//                   <br />
//                   gerecycled plastic
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Cadeauset sectie - Aangepaste layout */}
//         <section className="py-12 md:py-16 bg-white">
//           <div className="container mx-auto px-4">
//             <div className="bg-white rounded-lg shadow-xl overflow-hidden md:flex md:items-center border border-gray-200 relative">
//               {/* Left column: Image */}
//               <div className="md:w-5/12 p-6 text-center">
//                 {cadeausetProduct?.imageUrl ? (
//                   <Image
//                     src={cadeausetProduct.imageUrl}
//                     alt={cadeausetProduct.altText}
//                     width={450}
//                     height={450}
//                     className="w-full h-auto object-contain rounded-md inline-block"
//                     sizes="(max-width: 767px) 80vw, 40vw"
//                   />
//                 ) : (
//                   <Image
//                     src="/images/Cadeauset-wasparfum.webp"
//                     alt="Bestverkochte wasgeuren nu als voordeelpakket"
//                     width={450}
//                     height={450}
//                     className="w-full h-auto object-contain rounded-md inline-block"
//                     sizes="(max-width: 767px) 80vw, 40vw"
//                   />
//                 )}
//               </div>

//               {/* Right column: Product details */}
//               <div className="md:w-7/12 p-8 lg:p-10 flex flex-col">
//                 {/* Product title with underline */}
//                 <div className="mb-5">
//                   <h2 className="text-3xl lg:text-4xl font-semibold text-[#212529] mb-2">
//                     {cadeausetProduct?.name || "cadeauset wasgeurtje"}
//                   </h2>
//                   <div className="h-0.5 w-32 bg-[#D6AD61]"></div>
//                 </div>

//                 {/* Product description */}
//                 <p className="text-base text-gray-700 mb-6">
//                   Twijfel je nog tussen geuren? Kies niet één, maar allemaal –
//                   met deze{" "}
//                   <span className="font-medium text-gray-800">
//                     complete set
//                   </span>{" "}
//                   van onze{" "}
//                   <span className="font-medium text-gray-800">
//                     bestverkochte
//                   </span>{" "}
//                   wasparfums.
//                 </p>

//                 {/* Product details */}
//                 <div className="mb-6 space-y-3 border-b border-gray-200 pb-6">
//                   <div className="flex items-start">
//                     <span className="text-sm font-semibold text-[#814E1E] uppercase tracking-wider w-28 flex-shrink-0">
//                       INCLUDES:
//                     </span>
//                     <p className="text-base text-gray-800">
//                       <span className="text-[#D6AD61] mr-1">✓</span> x5 10ml
//                       flesjes
//                     </p>
//                   </div>
//                   <div className="flex items-start">
//                     <span className="text-sm font-semibold text-[#814E1E] uppercase tracking-wider w-28 flex-shrink-0">
//                       PERFUMES:
//                     </span>
//                     <div>
//                       <span className="font-medium text-gray-800 mr-2">
//                         • Morning Vapor
//                       </span>
//                       <span className="font-medium text-gray-800 mr-2">
//                         • Flower Rain
//                       </span>
//                       <span className="font-medium text-gray-800 mr-2">
//                         • Blossom Drip
//                       </span>
//                       <span className="font-medium text-gray-800 mr-2">
//                         • Sundance
//                       </span>
//                       <span className="font-medium text-gray-800">
//                         • Full Moon
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <p className="text-xs text-gray-500 mb-8 italic">
//                   *2-4 wasbeurten per flesje, afhankelijk van de gewenste
//                   geursterkte.*
//                 </p>

//                 {/* Call to action button */}
//                 <div className="mt-auto">
//                   <a
//                     href="#"
//                     className="block w-full bg-[#FDD75F] text-center text-[#212529] px-6 py-5 font-bold text-xl uppercase"
//                   >
//                     BESTEL NU
//                     <div className="flex items-center justify-center mt-1">
//                       <span className="mr-2 text-gray-700 line-through text-sm">
//                         €93,65
//                       </span>
//                       <span className="font-bold text-xl text-black">
//                         €14,95
//                       </span>
//                     </div>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* JSON-LD Structured Data voor Product Reviews */}
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify({
//               "@context": "https://schema.org/",
//               "@type": "Product",
//               name:
//                 cadeausetProduct?.name ||
//                 "Bestverkochte wasgeuren als voordeelpakket",
//               image: [
//                 cadeausetProduct?.imageUrl ||
//                   "/images/Cadeauset-wasparfum.webp",
//               ],
//               description:
//                 "Luxe cadeauset met bestverkochte wasparfums. Italiaans geïnspireerde geuren met langdurig effect.",
//               brand: {
//                 "@type": "Brand",
//                 name: "Wasgeurtje.nl",
//               },
//               aggregateRating: {
//                 "@type": "AggregateRating",
//                 ratingValue: "4.8",
//                 reviewCount: "1400",
//               },
//             }),
//           }}
//         />
//       </main>
//     </>
//   );
// }
