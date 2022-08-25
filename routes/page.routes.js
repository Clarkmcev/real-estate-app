const router = require("express").Router();
const Offer = require("../models/Offer.model");
const fileUploader = require("../config/cloudinary.config");
const Review = require("../models/Review.model");
const User = require("../models/User.model");
const UserModel = require("../models/User.model");

// Page of a user
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .populate("reviews")
    .populate({
      path: "reviews",
      populate: {
        path: "user", //populate the review owner within the review model
        model: "User",
      },
    })
    .then((user) => {
      console.log(user);
      res.render("page/page-profile", { user });
    })
    .catch((err) => console.log(err));
});

router.post("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { comment } = req.body;

  Review.create({ user: id, comment })
    .then((newReview) => {
      User.findByIdAndUpdate(id, { $push: { reviews: newReview } })
        .populate("reviews")
        .then((user) => {
          res.render("page/page-profile", { user });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = router;
