const router = require("express").Router();
const Offer = require("../models/Offer.model");
const fileUploader = require("../config/cloudinary.config");
const User = require("../models/User.model");
ObjectId = require("mongodb").ObjectID;

router.get("/", (req, res, next) => {
  res.render("index");
});

// List of offer
router.get("/list", async (req, res, next) => {
  const { _id, username } = req.session.currentUser;
  let postName = [];

  const currentUser = await User.findById(_id);

  Offer.find()
    .populate("owner")
    .then((foundOffers) => {
      foundOffers.map((offer) => {
        currentUser.likes.forEach((aLike) => {
          if (aLike.toString() === offer._id.toString()) {
            offer.isLiked = true;
          }
        });
      });
      res.render("offer/offer-list", {
        foundOffers,
        userNavigation: req.session.currentUser,
      });
    })
    .catch((err) => console.error(err));
});

// NEW SALE
router.get("/create-sale", (req, res, next) => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  console.log(formatter.format(2500));

  res.render("offer/create-offer-sale", {
    userNavigation: req.session.currentUser,
  });
});

router.post("/create", fileUploader.single("image-cover"), (req, res, next) => {
  const { _id } = req.session.currentUser;

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  let { price } = req.body;

  price = formatter.format(price);

  const {
    name,
    address,
    landSize,
    toilets,
    bedrooms,
    garages,
    livingAreas,
    description,
  } = req.body;
  Offer.create({
    offerType: "sale",
    name,
    address,
    landSize,
    price,
    toilets,
    images: req.file.path,
    bedrooms,
    garages,
    livingAreas,
    description,
    owner: _id,
  })
    .then(() => {
      res.redirect("/offer/list");
    })
    .catch((err) => {
      console.error(err);
    });
});

// NEW OFFER
router.get("/create-rent", (req, res, next) => {
  res.render("offer/create-offer-rent", {
    userNavigation: req.session.currentUser,
  });
});

router.post(
  "/create-rent",
  fileUploader.single("image-cover"),
  (req, res, next) => {
    const { _id } = req.session.currentUser;
    const {
      name,
      address,
      landSize,
      rent,
      toilets,
      bedrooms,
      garages,
      livingAreas,
      description,
    } = req.body;
    Offer.create({
      offerType: "rent",
      name,
      address,
      landSize,
      rent,
      toilets,
      images: req.file.path,
      bedrooms,
      garages,
      livingAreas,
      description,
      owner: _id,
    })
      .then(() => {
        res.redirect("/offer/list");
      })
      .catch((err) => {
        console.error(err);
      });
  }
);

// Details view
router.get("/details/:id", async (req, res, next) => {
  const { _id, username } = req.session.currentUser;
  const id = req.params;

  const currentUser = await User.findById(_id);

  Offer.findById(id.id)
    .populate("owner")
    .then((foundOffer) => {
      currentUser.likes.forEach((aLike) => {
        if (aLike.toString() === foundOffer._id.toString()) {
          foundOffer.isLiked = true;
        }
      });
      res.render("offer/offer-details", {
        foundOffer,
        userNavigation: req.session.currentUser,
      });
    })
    .catch((err) => console.log(err));
});

// Edit view
router.get("/edit/:id", (req, res, next) => {
  const id = req.params;
  Offer.findByIdAndUpdate(id.id)
    .then((foundOffer) => {
      res.render("offer/edit-offer", {
        foundOffer,
        userNavigation: req.session.currentUser,
      });
    })
    .catch((err) => console.log(err));
});

router.post(
  "/edit/:id",
  fileUploader.single("image-cover"),
  (req, res, next) => {
    const id = req.params;
    const {
      name,
      address,
      landSize,
      price,
      toilets,
      bedrooms,
      garages,
      livingAreas,
      description,
    } = req.body;
    Offer.findById(id.id, {
      name,
      address,
      landSize,
      price,
      toilets,
      images: req.file.path,
      bedrooms,
      garages,
      livingAreas,
      description,
      owner: id,
    })
      .then(() => {
        res.redirect("/auth/user-profile");
      })
      .catch((err) => console.log(err));
  }
);

// Like click
router.get("/like/:id", async (req, res, next) => {
  const { _id } = req.session.currentUser;
  const { id } = req.params;

  let isLiked = false;

  User.findById(_id)
    .populate("likes")
    .then((user) => {
      user.likes.forEach((elem) => {
        if (elem._id.toString() == _id) {
          isLiked = 1;
        }
      });
      if (isLiked) {
        User.findByIdAndUpdate(_id, { $pull: { likes: id } })
          .then(() => {
            res.render("offer/list", {
              userNavigation: req.session.currentUser,
            });
          })
          .catch((err) => console.log(err));
      } else {
        User.findByIdAndUpdate(_id, { $push: { likes: id } })
          .then(() => {
            res.render("offer/list", {
              userNavigation: req.session.currentUser,
            });
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});

// Review routes
router.get("/review/:id", (req, res, next) => {
  const { id } = req.params;

  Room.findById(id)
    .populate("reviews")
    .then((foundRoom) => {
      let arr = foundRoom.reviews;
      res.render("room/create-review", {
        arr,
        foundRoom,
        userNavigation: req.session.currentUser,
      });
    })
    .catch((err) => console.log(err));
});

// Page name
router.get("/page/:id", (req, res, next) => {
  const { id } = req.params;

  res.render("/profile", { userNavigation: req.session.currentUser });
});

// Remove a liked offer
router.get("/remove/:id", (req, res, next) => {
  const { _id } = req.session.currentUser;
  const { id } = req.params;
  User.findByIdAndUpdate(_id, { $pull: { likes: id } })
    .then((user) => {
      res.redirect("/auth/user-profile", {
        userNavigation: req.session.currentUser,
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
