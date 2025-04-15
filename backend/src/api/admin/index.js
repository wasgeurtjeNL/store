module.exports = (router) => {
  router.get("/dashboard", (req, res) => {
    res.json({ message: "Admin dashboard werkt!" });
  });

  return router;
};
