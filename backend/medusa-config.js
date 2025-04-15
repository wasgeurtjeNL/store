const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  projectConfig: {
    database_url: process.env.DATABASE_URL || "postgres://localhost/medusa",
    database_type: "postgres",
    jwtSecret: process.env.JWT_SECRET || "supersecret",
    cookieSecret: process.env.COOKIE_SECRET || "supercookie",
    store_cors: process.env.STORE_CORS || "http://localhost:3000",
    admin_cors: process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:9000",
    redis_url: process.env.REDIS_URL !== "fake" ? process.env.REDIS_URL : undefined,
  },
  plugins: [
    {
      resolve: "medusa-file-s3",
      options: {
        s3_url: process.env.S3_URL,
        bucket: process.env.S3_BUCKET,
        region: process.env.S3_REGION,
        access_key_id: process.env.S3_ACCESS_KEY_ID,
        secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
      },
    },
  ],
  api: {
    admin: {
      path: "./src/api",
    },
  },
  csp: {
    enabled: false,
    directives: {
      'default-src': ["'self'"],
      'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      'font-src': ["'self'", "https://fonts.gstatic.com"],
      'img-src': ["'self'", "data:", "https://medusajs.com"],
      'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
    },
  },
};
