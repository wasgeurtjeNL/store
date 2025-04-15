const { develop } = require("@medusajs/medusa");

develop().catch((err) => {
  console.error("Medusa crashed:", err);
});
