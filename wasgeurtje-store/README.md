# Wasgeurtje.nl - Luxury Laundry Fragrance E-Commerce

This repository contains the codebase for Wasgeurtje.nl, a modern e-commerce platform specializing in luxury laundry fragrances.

## Project Structure

The project is divided into two main parts:

- **Backend**: Medusa.js headless e-commerce platform
- **Frontend**: Next.js storefront application

## Technology Stack

- **Backend**:
  - Medusa.js (Headless E-commerce)
  - Node.js
  - PostgreSQL
  - TypeScript

- **Frontend**:
  - Next.js
  - TypeScript
  - TailwindCSS
  - ShadCN/UI

- **Payment Processing**:
  - Stripe

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install Medusa CLI globally:
   ```
   npm install -g @medusajs/medusa-cli
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file based on the `.env.template`
   - Configure database and other settings

5. Start the development server:
   ```
   medusa develop
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env.local` file based on `.env.template`
   - Configure API URLs and other settings

4. Start the development server:
   ```
   npm run dev
   ```

## Features

- Product catalog with variants (scents, sizes)
- Multi-language support (NL/BE/DE)
- Mobile-first responsive design
- Optimized for SEO and performance
- Internationalization support
- Loyalty system for both B2B and B2C clients
- Webhook support for integrations 