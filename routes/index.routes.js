const router = require("express").Router();

// Home page
router.get("/", (req, res, next) => {
  if (req.session.currentUser) {
    console.log(req.session.currentUser);
    // const { username } = req.session.currentUser;
    res.render("index", { userNavigation: req.session.currentUser });
  } else {
    res.render("index");
  }
});

module.exports = router;
