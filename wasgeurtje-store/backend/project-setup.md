# Medusa Backend Project Structure

This document outlines the organization and structure of the Medusa.js backend for Wasgeurtje.nl.

## Directory Structure

```
backend/
├── src/                         # Source code
│   ├── api/                     # Custom API routes
│   │   ├── routes/
│   │   │   ├── store/           # Storefront API extensions
│   │   │   └── admin/           # Admin API extensions
│   │   └── index.ts             # API configuration
│   ├── models/                  # Custom entity models
│   │   ├── product.ts
│   │   ├── fragrance.ts
│   │   └── ...
│   ├── migrations/              # Database migrations
│   ├── services/                # Business logic services
│   │   ├── loyalty.ts           # Loyalty program service
│   │   ├── fragrance.ts         # Fragrance-specific service
│   │   ├── email.ts             # Email notification service
│   │   └── ...
│   ├── subscribers/             # Event subscribers
│   │   ├── order.ts             # Order-related events
│   │   ├── customer.ts          # Customer-related events
│   │   └── ...
│   └── loaders/                 # Initialization loaders
├── data/                        # Seed data for testing
│   ├── products.json
│   ├── regions.json
│   └── ...
├── medusa-config.js             # Main configuration file
├── .env                         # Environment variables
├── Dockerfile                   # Docker configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

## Custom Entities

### Fragrance Entity

```typescript
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm"
import { Product } from "@medusajs/medusa"
import { BaseEntity } from "@medusajs/medusa"

@Entity()
export class Fragrance extends BaseEntity {
  @Column()
  name: string

  @Column()
  description: string

  @Column()
  icon_url: string

  @Column({ type: "jsonb", nullable: true })
  metadata: Record<string, unknown>

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product: Product

  @Column()
  product_id: string
}
```

### Loyalty Program

```typescript
import { Entity, Column, ManyToOne, JoinColumn } from "typeorm"
import { Customer } from "@medusajs/medusa"
import { BaseEntity } from "@medusajs/medusa"

@Entity()
export class LoyaltyPoints extends BaseEntity {
  @ManyToOne(() => Customer)
  @JoinColumn({ name: "customer_id" })
  customer: Customer

  @Column()
  customer_id: string

  @Column({ type: "int" })
  points: number

  @Column({ type: "enum", enum: ["B2B", "B2C"] })
  customer_type: string

  @Column({ type: "jsonb", nullable: true })
  history: Record<string, unknown>[]
}
```

## Key Services

### Loyalty Service

- Point calculation based on order value
- Redemption rules and validation
- Point history tracking
- Different rules for B2B vs B2C customers

### Fragrance Service

- Managing fragrance variations
- Association with products
- Icons and special attributes

### Email Notification Service

- Customized email templates
- Order notifications
- Shipping updates
- Special promotions

## Custom API Routes

### Store API Extensions

- `/store/fragrances` - Get available fragrances
- `/store/loyalty/balance` - Get customer loyalty balance
- `/store/loyalty/redeem` - Redeem loyalty points

### Admin API Extensions

- `/admin/fragrances` - CRUD operations for fragrances
- `/admin/loyalty/customers` - Manage customer loyalty points
- `/admin/analytics/sales-by-fragrance` - Fragrance popularity analytics

## Plugin Configuration

The Medusa backend will be configured with the following plugins:

- `medusa-payment-stripe` - Stripe payment provider
- `medusa-file-s3` - AWS S3 for file storage
- `medusa-fulfillment-manual` - Manual fulfillment handling
- `medusa-plugin-sendgrid` - SendGrid for transactional emails

## Setup and Development

1. Initialize a new Medusa project
2. Create custom entities and migrations
3. Implement services for business logic
4. Add API routes for custom functionality
5. Configure plugins for payment, email, etc. 