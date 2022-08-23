// check if the user isconnected, return true if yes and false if not

const isConnected = (req, res, next) => {
  let user = false;
  if (req.session.currentUser) {
    user = true;
    return user;
  } else {
    return user;
  }
};

// checks if the user is logged in when trying to access a specific page
const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    return res.redirect("/auth/login");
  }
};

// if an already logged in user tries to access the login page it
// redirects the user to the home page
const isLoggedOut = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect("/auth/login");
  }
  next();
};

module.exports = {
  isConnected,
  isLoggedIn,
  isLoggedOut,
};
