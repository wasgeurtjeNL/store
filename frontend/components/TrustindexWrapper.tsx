'use client';

import { useState, useEffect } from 'react';

const TRUSTINDEX_SRC = 'https://cdn.trustindex.io/loader.js?7a75ab7437cb36021a66ccdf541';

export default function TrustindexWrapper({ reviewCount = 8 }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Component has mounted on the client
    setIsMounted(true);

    // Optional: Check if script already exists to avoid duplicates if component re-mounts
    if (!document.querySelector(`script[src="${TRUSTINDEX_SRC}"]`)) {
        const script = document.createElement('script');
        script.src = TRUSTINDEX_SRC;
        script.async = true;
        document.body.appendChild(script);

        // Optional: Cleanup function to remove script if component unmounts
        return () => {
            const existingScript = document.querySelector(`script[src="${TRUSTINDEX_SRC}"]`);
            if (existingScript) {
                // Note: Removing the script doesn't necessarily stop its execution
                // or remove the widget it rendered.
                // document.body.removeChild(existingScript);
            }
        };
    }
  }, []);

  // Only render the target div on the client after mount
  // The script loaded in useEffect will find and populate this div.
  if (!isMounted) {
    return null; // Render nothing on the server or during initial client render
  }

  return <div data-src={TRUSTINDEX_SRC} data-num="8" data-widget-id="1" className="trustindex-widget"></div>;
} 