const { createMedusaApp } = require("@medusajs/medusa");

const port = process.env.PORT || 9000;

createMedusaApp()
  .then(({ app }) => {
    app.listen(port, "0.0.0.0", () => {
      console.log(`🚀 Server listening on http://0.0.0.0:${port}`);
    });
  })
  .catch((err) => {
    console.error("🔥 Failed to start Medusa server:", err);
  });
