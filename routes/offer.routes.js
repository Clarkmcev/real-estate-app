const router = require("express").Router();
const Offer = require("../models/Offer.model");
const fileUploader = require("../config/cloudinary.config");

router.get("/", (req, res, next) => {
  res.render("index");
});

// List of offer
router.get("/list", (req, res, next) => {
  Offer.find()
    .then((foundOffers) => {
      res.render("offer/offer-list", { foundOffers });
    })
    .catch((err) => console.error(err));
});

// Create new offer
router.get("/create", (req, res, next) => {
  res.render("offer/create-offer");
});

router.post("/create", fileUploader.single("image-cover"), (req, res, next) => {
  console.log(req.file);
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
  })
    .then(() => {
      res.render("offer/offer-list");
    })
    .catch((err) => {
      console.error(err);
    });
});

// Details view
router.get("/details/:id", (req, res, next) => {
  const id = req.params;
  Offer.findById(id.id)
    .then((foundOffer) => {
      res.render("offer/offer-details", { foundOffer });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
