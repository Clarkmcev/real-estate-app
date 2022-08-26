const router = require("express").Router();
const Offer = require("../models/Offer.model");
const fileUploader = require("../config/cloudinary.config");

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const {
  isLoggedIn,
  isLoggedOut,
  isConnected,
} = require("../middleware/route-guard");

let user = false;

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const { username, email, fullName, password } = req.body;
  if (!email) {
    return res.status(400).render("auth/signup", {
      errorMessage: "Please provide your email.",
    });
  }
  if (password.length < 8) {
    return res.status(400).render("auth/signup", {
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }
  //   ! This use case is using a regular expression to control for special characters and min length
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  if (!regex.test(password)) {
    return res.status(400).render("auth/signup", {
      errorMessage:
        "Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
  }
  // Search the database for a user with the username submitted in the form
  User.findOne({ email }).then((found) => {
    // If the user is found, send the message username is taken
    if (found) {
      return res
        .status(400)
        .render("auth/signup", { errorMessage: "Email already taken." });
    }

    // if user is not found, create a new user - start with hashing the password
    bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        // Create a user and save it in the database
        return User.create({
          username: username,
          email: email,
          fullName,
          passwordHash: hashedPassword,
        });
      })
      .then((user) => {
        // Bind the user to the session object
        req.session.user = user;
        res.redirect("/auth/login");
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res
            .status(400)
            .render("auth/signup", { errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).render("auth/signup", {
            errorMessage:
              "Email need to be unique. There's already a user with this email address.",
          });
        }
        return res
          .status(500)
          .render("auth/signup", { errorMessage: error.message });
      });
  });
});

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).render("auth/login", {
      errorMessage: "Please provide your email.",
    });
  }
  // Here we use the same logic as above
  // - either length based parameters or we check the strength of a password
  if (password.length < 8) {
    return res.status(400).render("auth/login", {
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }
  // Search the database for a user with the username submitted in the form
  User.findOne({ email })
    .then((user) => {
      // If the user isn't found, send the message that user provided wrong credentials
      if (!user) {
        return res.status(400).render("auth/login", {
          errorMessage: "Wrong credentials.",
        });
      }
      // If user is found based on the username, check if the in putted password matches the one saved in the database
      bcrypt.compare(password, user.passwordHash).then((isSamePassword) => {
        if (!isSamePassword) {
          return res.status(400).render("auth/login", {
            errorMessage: "Wrong credentials.",
          });
        }
        req.session.currentUser = user;
        // req.session.user = user._id; // ! better and safer but in this case we saving the entire user object
        return res.redirect("/auth/user-profile");
      });
    })
    .catch((err) => {
      // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
      // you can just as easily run the res.status that is commented out below
      next(err);
      // return res.status(500).render("login", { errorMessage: err.message });
    });
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("connect.sid");
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(500)
        .render("auth/logout", { errorMessage: err.message });
    }
    res.redirect("/");
  });
});

// Profile routes
router.get("/user-profile", (req, res, next) => {
  const { _id } = req.session.currentUser;
  User.findById(_id)
    .populate("likes")
    .then((foundUser) => {
      const arrLikes = foundUser.likes;
      Offer.find({ owner: _id }).then((offersByOwner) => {
        if (req.session.currentUser) {
          const { username } = req.session.currentUser;
          res.render("auth/user-profile", {
            username,
            offersByOwner,
            arrLikes,
            user: foundUser,
            userNavigation: req.session.currentUser,
          });
        } else {
          res.render("auth/user-profile", {
            user: foundUser,
          });
        }
      });
    })
    .catch((err) => console.log(err));
});

router.post(
  "/user-profile",
  fileUploader.single("profile"),
  (req, res, next) => {
    const { _id } = req.session.currentUser;
    User.findByIdAndUpdate(_id, { profileImage: req.file.path })
      .then((updatedUser) => {
        req.session.currentUser.imageProfile = req.file.path;
        res.redirect("/auth/user-profile");
      })
      .catch((err) => console.log(err));
  }
);

// Remove a liked offer
router.get("/remove/:id", (req, res, next) => {
  const { _id } = req.session.currentUser;
  const { id } = req.params;
  User.findByIdAndUpdate(_id, { $pull: { likes: id } })
    .then((user) => {
      res.render("auth/user-profile", { user: req.session.user });
    })
    .catch((err) => console.log(err));
});

// Settings route
router.get("/settings", async (req, res, next) => {
  const { _id } = req.session.currentUser;
  const foundUser = await User.findById(_id);
  console.log(_id);
  if (user.settings) {
    foundUser.settings = false;
    res.render("auth/user-profile", {
      user: foundUser,
      userNavigation: req.session.currentUser,
    });
  } else {
    foundUser.settings = true;
    res.render("auth/user-profile", { user: foundUser });
  }
});

// Complete profile
router.post(
  "/complete",
  fileUploader.single("profileImage"),
  (req, res, next) => {
    console.log("hey");
    const { profileImage, info, city, postcode, phoneNumber } = req.body;
    const { _id } = req.session.currentUser;
    console.log(req.body);
    User.findByIdAndUpdate(
      { _id },
      {
        profileImage: req.file.path,
        info,
        city,
        postcode,
        phoneNumber,
      }
    )
      .then(() => {
        const user = req.session.currentUser;
        user.settings = false;
        res.redirect("/auth/user-profile");
      })
      .catch((err) => console.log(err));
  }
);

module.exports = router;
