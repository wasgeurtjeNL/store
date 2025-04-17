import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Wasgeurtje.nl',
    default: 'Luxe Wasparfum kopen? | Wasgeurtje.nl'
  },
  description: "Wasgeurtje.nl biedt luxe wasparfums met langdurige geur. Italiaans geïnspireerde geuren, veilig voor alle stoffen. Gratis verzending vanaf €29.",
  keywords: ["wasparfum", "luxe wasparfum", "wasparfum kopen", "wasgeurtje", "was parfum", "wasgeur"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Luxe Wasparfum kopen? | Wasgeurtje.nl",
    description: "Luxe Italiaanse wasparfums met langdurige geur. Gratis verzending vanaf €29. 1400+ positieve reviews.",
    url: "https://wasgeurtje.nl",
    siteName: "Wasgeurtje.nl",
    locale: "nl_NL",
    type: "website",
    images: [
      {
        url: "https://wasgeurtje.nl/images/og-wasgeurtje.jpg",
        width: 1200,
        height: 630,
        alt: "Wasgeurtje.nl - Luxe wasparfum",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxe Wasparfum kopen? | Wasgeurtje.nl",
    description: "Luxe Italiaanse wasparfums met langdurige geur. Gratis verzending vanaf €29.",
    images: ["https://wasgeurtje.nl/images/og-wasgeurtje.jpg"]
  },
  alternates: {
    canonical: "https://wasgeurtje.nl"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <head>
        {/* Preconnect naar Medusa S3 CDN */}
        <link rel="preconnect" href="https://medusa-public-images.s3.eu-west-1.amazonaws.com" crossOrigin="anonymous" />
        
        {/* Preload Hero afbeelding (belangrijk voor LCP op homepage) */}
        <link 
          rel="preload" 
          as="image" 
          href="/images/Women.webp" 
          type="image/webp"
          fetchPriority="high"
        />

        {/* Hero SVG placeholder preload */}
        <link 
          rel="preload" 
          as="image" 
          href="/images/Women.webp"
          type="image/svg+xml"
        />

        <link rel="manifest" href="/manifest.json" />
        
        {/* Trustindex Generieke Loader Script */}
        <script defer async src='https://cdn.trustindex.io/loader.js'></script>
        
        {/* JSON-LD Scripts */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Wasgeurtje.nl",
              "url": "https://wasgeurtje.nl",
              "logo": "https://wasgeurtje.nl/images/Logo-wasgeurtje.webp",
              "sameAs": [
                "https://www.instagram.com/wasgeurtje",
                "https://www.facebook.com/wasgeurtje"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              "name": "Wasparfum Proefpakket",
              "image": [
                "https://wasgeurtje.nl/images/Proefpakket.webp"
              ],
              "description": "Luxe wasparfum om uit te proberen. Italiaans geïnspireerde geuren met langdurig effect.",
              "brand": {
                "@type": "Brand",
                "name": "Wasgeurtje.nl"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "1400"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
