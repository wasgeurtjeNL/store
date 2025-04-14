# Frontend Project Structure

This document outlines the organization and structure of the Next.js frontend for Wasgeurtje.nl.

## Next.js App Router Structure

```
frontend/
├── app/
│   ├── [locale]/                    # Internationalization route group
│   │   ├── (auth)/                  # Auth-related routes
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── account/
│   │   ├── (shop)/                  # Main shop routes 
│   │   │   ├── page.tsx             # Homepage
│   │   │   ├── products/
│   │   │   │   ├── [handle]/        # Product detail page
│   │   │   │   └── page.tsx         # Product listing page
│   │   │   ├── cart/                # Cart page
│   │   │   ├── checkout/            # Checkout flow
│   │   │   ├── order-confirmation/
│   │   │   └── search/
│   │   ├── (info)/                  # Informational pages
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── faq/
│   │   │   └── blog/
│   │   ├── layout.tsx               # Root layout with common elements
│   │   └── providers.tsx            # Context providers
│   ├── api/                         # API routes for frontend
│   │   ├── revalidate/
│   │   └── webhooks/
│   └── globals.css                  # Global styles
├── components/                      # Reusable components
│   ├── ui/                          # Basic UI components 
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── common/                      # Common components
│   │   ├── header/
│   │   ├── footer/
│   │   ├── cart/
│   │   └── ...
│   └── product/                     # Product-specific components
│       ├── product-card.tsx
│       ├── product-grid.tsx
│       ├── product-info.tsx
│       └── ...
├── lib/                             # Utility functions and helpers
│   ├── medusa/                      # Medusa client configuration
│   ├── hooks/                       # Custom React hooks
│   ├── utils/                       # General utility functions
│   ├── constants.ts                 # App-wide constants
│   └── types.ts                     # TypeScript types and interfaces
├── public/                          # Static assets
│   ├── images/
│   ├── fonts/
│   └── favicon.ico
├── store/                           # State management
│   ├── cart-store.ts
│   ├── user-store.ts
│   └── ...
├── styles/                          # Component-specific styles
│   └── theme.ts                     # Theme configuration
├── locales/                         # Translation files
│   ├── nl.json
│   ├── de.json
│   └── ...
├── config/                          # App configuration
│   ├── site.ts                      # Site-specific configuration
│   ├── medusa.ts                    # Medusa API configuration
│   └── ...
├── middleware.ts                    # Next.js middleware for routing/i18n
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Key Component Structure

### Product Components

- **ProductCard**: Display product in listings with image, title, price
- **ProductGrid**: Display multiple products in a grid layout
- **ProductDetail**: Comprehensive product view with variants, description
- **ProductActions**: Add to cart, save, quantity selector
- **ProductReviews**: Customer reviews section
- **ProductRecommendations**: Related/recommended products

### Cart Components

- **CartDrawer**: Slide-in cart panel
- **CartItem**: Individual item in the cart
- **CartSummary**: Order summary with pricing breakdown
- **ShippingOptions**: Shipping method selection
- **CartActions**: Proceed to checkout, continue shopping

### Checkout Components

- **CheckoutForm**: Main checkout form with multiple steps
- **AddressForm**: Shipping/billing address form
- **PaymentMethods**: Payment option selection
- **OrderSummary**: Final order review
- **ShippingDetails**: Delivery method selection and details

### Layout Components

- **Header**: Main navigation with logo, cart, search
- **Footer**: Site links, contact info, newsletter
- **NavMenu**: Navigation menu structure
- **MobileNav**: Mobile-specific navigation
- **Breadcrumbs**: Page navigation hierarchy

## Getting Started Steps

1. Initialize Next.js project with TypeScript
2. Set up TailwindCSS and ShadCN/UI
3. Configure internationalization
4. Create base layout components
5. Implement Medusa client integration
6. Start with Homepage and Product Listing components 