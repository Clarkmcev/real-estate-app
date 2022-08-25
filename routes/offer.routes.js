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
      // console.log(foundOffers);
      res.render("offer/offer-list", { foundOffers });
    })
    .catch((err) => console.error(err));
});

// NEW SALE
router.get("/create-sale", (req, res, next) => {
  res.render("offer/create-offer-sale");
});

router.post("/create", fileUploader.single("image-cover"), (req, res, next) => {
  const { _id } = req.session.currentUser;
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
  res.render("offer/create-offer-rent");
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
      res.render("offer/offer-details", { foundOffer });
    })
    .catch((err) => console.log(err));
});

// router.get("/list", async (req, res, next) => {
//   const { _id, username } = req.session.currentUser;
//   let postName = [];

//   const currentUser = await User.findById(_id);

//   Offer.find()
//     .populate("owner")
//     .then((foundOffers) => {
//       foundOffers.map((offer) => {
//         currentUser.likes.forEach((aLike) => {
//           if (aLike.toString() === offer._id.toString()) {
//             offer.isLiked = true;
//           }
//         });
//       });
//       // console.log(foundOffers);
//       res.render("offer/offer-list", { foundOffers });
//     })
//     .catch((err) => console.error(err));
// });

// Edit view
router.get("/edit/:id", (req, res, next) => {
  const id = req.params;
  Offer.findByIdAndUpdate(id.id)
    .then((foundOffer) => {
      res.render("offer/edit-offer", { foundOffer });
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
          .then((user) => {
            console.log("yo");
            res.redirect("/offer/list");
          })
          .catch((err) => console.log(err));
      } else {
        User.findByIdAndUpdate(_id, { $push: { likes: id } })
          .then((user) => {
            console.log("here");
            res.redirect("/offer/list");
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
      res.render("room/create-review", { arr, foundRoom });
    })
    .catch((err) => console.log(err));
});

// Page name
router.get("/page/:id", (req, res, next) => {
  const { id } = req.params;

  res.render("/profile");
});

// Remove a liked offer
router.get("/remove/:id", (req, res, next) => {
  const { _id } = req.session.currentUser;
  const { id } = req.params;
  User.findByIdAndUpdate(_id, { $pull: { likes: id } })
    .then((user) => {
      res.redirect("/auth/user-profile");
    })
    .catch((err) => console.log(err));
});

module.exports = router;
