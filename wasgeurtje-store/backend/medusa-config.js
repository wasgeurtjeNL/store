const dotenv = require("dotenv")

let ENV_FILE_NAME = ".env"
dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME })

const DATABASE_URL = process.env.DATABASE_URL || "postgres://localhost/medusa-wasgeurtje"
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379"
const STRIPE_API_KEY = process.env.STRIPE_API_KEY || ""
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || ""
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || ""
const STORE_CORS = process.env.STORE_CORS || "http://localhost:3000"
const ADMIN_CORS = process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001"
const S3_URL = process.env.S3_URL || ""
const S3_BUCKET = process.env.S3_BUCKET || ""
const S3_REGION = process.env.S3_REGION || ""
const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID || ""
const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY || ""

module.exports = {
  projectConfig: {
    redis_url: REDIS_URL,
    database_url: DATABASE_URL,
    database_type: "postgres",
    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,
    database_extra: 
      process.env.NODE_ENV !== "development"
        ? { ssl: { rejectUnauthorized: false } }
        : {},
  },
  plugins: [
    `medusa-fulfillment-manual`,
    {
      resolve: `medusa-file-s3`,
      options: {
        s3_url: S3_URL,
        bucket: S3_BUCKET,
        region: S3_REGION,
        access_key_id: S3_ACCESS_KEY_ID,
        secret_access_key: S3_SECRET_ACCESS_KEY,
      },
    },
    {
      resolve: `medusa-payment-stripe`,
      options: {
        api_key: STRIPE_API_KEY,
        webhook_secret: STRIPE_WEBHOOK_SECRET,
        automatic_payment_methods: true,
      },
    },
    {
      resolve: `medusa-plugin-sendgrid`,
      options: {
        api_key: SENDGRID_API_KEY,
        from: "noreply@wasgeurtje.nl",
        order_placed_template: "order-placed-template-id",
        order_shipped_template: "order-shipped-template-id",
        customer_password_reset_template: "customer-password-reset-template-id",
        customer_password_reset_success_template: "customer-password-reset-success-template-id",
      },
    },
  ],
  modules: {
    eventBus: {
      resolve: "@medusajs/event-bus-redis",
      options: {
        redisUrl: REDIS_URL,
      },
    },
    cacheService: {
      resolve: "@medusajs/cache-redis",
      options: {
        redisUrl: REDIS_URL,
      },
    },
  },
} 