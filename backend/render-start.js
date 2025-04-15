const { start } = require("@medusajs/medusa");

const port = process.env.PORT || 9000;
const host = "0.0.0.0"; // belangrijk voor Render!

start({
  port,
  host,
}).catch((err) => {
  console.error("Medusa crashed:", err);
});