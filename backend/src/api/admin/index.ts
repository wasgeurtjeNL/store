import { Router } from "express";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSTypeorm from "@adminjs/sql";
import session from "express-session";
import formidable from "express-formidable";
import { DataSource } from "typeorm";
import { getMedusaResources } from "./entities";
import path from "path";

// Register the TypeORM adapter
AdminJS.registerAdapter({
  Resource: AdminJSTypeorm.Resource,
  Database: AdminJSTypeorm.Database,
});

export default function getAdminRouter(
  router: Router,
  dataSource: DataSource
): Router {
  // Genereer resources voor alle Medusa entiteiten
  const resources = getMedusaResources(dataSource);
  
  // Create AdminJS instance
  const admin = new AdminJS({
    resources,
    rootPath: "/admin",
    branding: {
      companyName: "Wasgeurtje Admin",
      logo: "/img/logo.png",
      favicon: "/img/favicon.ico",
    },
    dashboard: {
      handler: async () => {
        return { some: 'output' }
      },
      component: path.join(__dirname, 'components', 'dashboard'),
    },
  });

  // Build and use the admin router
  const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate: async (email, password) => {
        // Hier zouden we de authenticatie moeten regelen met de Medusa gebruikers
        // Voor nu gebruiken we een vereenvoudigde aanpak met een harde admin gebruiker
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
          return { email };
        }
        return null;
      },
      cookieName: "adminjs_wasgeurtje",
      cookiePassword: process.env.ADMINJS_COOKIE_SECRET || process.env.COOKIE_SECRET || "supercookie",
    },
    null,
    {
      resave: false,
      saveUninitialized: true,
      secret: process.env.ADMINJS_COOKIE_SECRET || process.env.COOKIE_SECRET || "supercookie",
    }
  );

  // We moeten formidable middleware gebruiken voor file uploads in AdminJS
  router.use(formidable());
  
  // Voeg de adminjs router toe aan de api router
  router.use("/admin", adminJsRouter);

  return router;
} 