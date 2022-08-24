const router = require("express").Router();

// Home page
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
