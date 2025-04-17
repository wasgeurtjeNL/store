// app/producten/page.tsx

import Image from 'next/image'
import Link from 'next/link'

export const revalidate = 0 // geen caching tijdens dev, voor live kun je dit verhogen

// Product type definitie
interface Product {
  id: string;
  title: string;
  description: string | null;
  handle: string;
  thumbnail: string | null;
  // Voeg andere velden toe die je gebruikt
}

// GetProductsResult type definitie
interface GetProductsResult {
  error: string | null;
  products: Product[];
  debug?: {
    url?: string;
    status?: number;
    errorText?: string;
    errorMessage?: string;
    headers?: Record<string, string>;
  };
}

async function getProducts(): Promise<GetProductsResult> {
  try {
    // Default URL voor als de environment variabelen niet beschikbaar zijn
    const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';
    // Zorg dat de URL correct is geformatteerd zonder dubbele slashes
    const apiUrl = `${backendUrl.replace(/\/+$/, "")}/store/products`;
    
    console.log('Verbinden met Medusa op:', apiUrl);
    console.log('API Key aanwezig:', !!process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY);
    
    // Headers voorbereiden met API key
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    
    // Voeg de correcte publishable API key toe als deze bestaat
    const publishableApiKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
    if (publishableApiKey) {
      headers['x-publishable-api-key'] = publishableApiKey;
    } else {
      // Optioneel: Log een waarschuwing als de key ontbreekt
      console.warn("NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY environment variable is not set for product listing.");
    }
    
    // Log de te gebruiken headers (verberg de key voor veiligheid)
    console.log('Request Headers:', { 
      ...headers, 
      'x-publishable-api-key': headers['x-publishable-api-key'] ? 'Present (hidden)' : 'Not Set' 
    });
    
    // Request met headers inclusief API key
    const res = await fetch(apiUrl, {
      method: 'GET',
      headers,
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    // Log volledige response informatie voor debugging
    console.log('Response status:', res.status);
    console.log('Response statusText:', res.statusText);
    console.log('Response headers:', Object.fromEntries([...res.headers.entries()]));
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Error details:', errorText);
      
      return { 
        error: `API_ERROR_${res.status}`, 
        products: [],
        debug: {
          url: apiUrl,
          status: res.status,
          errorText: errorText,
          headers: {
            // Verberg API key gedeeltelijk voor veiligheid in logs
            'x-publishable-api-key': headers['x-publishable-api-key'] ? 
              `${headers['x-publishable-api-key'].substring(0, 10)}...` : 'niet aanwezig'
          }
        } 
      };
    }

    const data = await res.json();
    console.log('Producten succesvol opgehaald:', data.products ? data.products.length : 'Geen products gevonden');
    return { 
      error: null, 
      products: data.products || [] 
    };
  } catch (err: unknown) {
    console.error('Fout bij ophalen producten:', err);
    // Controleer specifiek op connectieproblemen
    if (err instanceof TypeError && err.message.includes('fetch failed')) {
      console.error('Kan geen verbinding maken met Medusa backend. Draait de server wel?');
      return { error: 'CONNECTION_FAILED', products: [] };
    }
    
    const error = err as Error;
    return { 
      error: 'UNKNOWN_ERROR', 
      products: [],
      debug: { errorMessage: error.message }
    };
  }
}

export default async function ProductenPage() {
  const { error, products, debug } = await getProducts();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">🧼 Onze Producten</h1>

      {error && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-md mb-6">
          <h2 className="font-bold mb-2">Probleem gedetecteerd</h2>
          <p className="text-amber-700 mb-2">
            {error === 'MEDUSA_SERVER_DOWN' && 'De Medusa backend server lijkt niet te draaien op het verwachte adres.'}
            {error === 'CONNECTION_FAILED' && 'Kan geen verbinding maken met de Medusa backend.'}
            {error?.startsWith('API_ERROR') && `API fout (${error.replace('API_ERROR_', '')}) bij ophalen van producten.`}
            {error === 'UNKNOWN_ERROR' && 'Onbekende fout bij ophalen van producten.'}
          </p>
          <div className="bg-gray-100 p-3 rounded text-sm font-mono">
            <p>Backend URL: {process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'}</p>
            <p>API key aanwezig: {process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ? 'Ja' : 'Nee'}</p>
            
            {debug && (
              <div className="mt-2 border-t pt-2">
                <p className="font-bold">Debug Info:</p>
                <pre className="text-xs overflow-auto max-h-40">
                  {JSON.stringify(debug, null, 2)}
                </pre>
              </div>
            )}
          </div>
          <p className="mt-3 text-sm">
            Let op: Zorg dat je Medusa backend server draait voordat je de frontend gebruikt. 
            Je kunt de backend starten met <code className="bg-gray-100 px-1">yarn dev</code> in de hoofdmap.
          </p>
        </div>
      )}

      {products.length === 0 && !error && (
        <p className="text-gray-500">Er zijn nog geen producten beschikbaar.</p>
      )}

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product: Product) => (
          <li key={product.id} className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition">
            <Link href={`/product/${product.handle}`}>
              <div>
                {product.thumbnail ? (
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="object-cover w-full h-[200px] rounded-xl mb-3"
                  />
                ) : (
                  <div className="w-full h-[200px] bg-gray-200 rounded-xl mb-3 flex items-center justify-center">
                    <span className="text-gray-500">Geen afbeelding</span>
                  </div>
                )}
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
