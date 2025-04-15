const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const { Database, Resource } = require("@adminjs/typeorm");
const express = require("express");
const session = require("express-session");

const { dataSource } = require("@medusajs/medusa/dist/loaders/database");

AdminJS.registerAdapter({ Database, Resource });

module.exports = async () => {
  const router = express.Router();

  const admin = new AdminJS({
    databases: [dataSource],
    rootPath: "/admin",
    branding: {
      companyName: "Wasgeurtje Admin",
      softwareBrothers: false,
    },
  });

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
    authenticate: async (email, password) => {
      return (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD && { email }
      );
    },
    cookieName: "adminjs",
    cookiePassword: process.env.ADMINJS_COOKIE_SECRET || "supersecret",
  });

  router.use(admin.options.rootPath, adminRouter);

  return router;
};
