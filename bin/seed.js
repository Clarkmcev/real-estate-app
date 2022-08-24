const mongoose = require("mongoose");
const User = require("../models/User.model");
const Offer = require("../models/Offer.model");
ObjectId = require("mongodb").ObjectID;
const Review = require("../models/Review.model");

const DB_NAME = "real-estate-app";

mongoose.connect(`mongodb://localhost/${DB_NAME}`);

const users = [
  {
    username: "Thomas Edison",
    email: "thomas.edison@gmail.com",
    passwordHash:
      "$2b$10$sSGWwTzgWaF6OsjDKk25Zf.RJ4TaKw1Xh4bEW1/WLoBXf3M.RA.xV.",
    profileImage:
      "https://res.cloudinary.com/societe-generale/image/upload/v1661345750/real-estate-app/thomas_ha7y99.jpg",
  },
  {
    username: "Jenny Gordan",
    email: "jenny.gordan@gmail.com",
    passwordHash:
      "$2b$10$sSGWwTzgWaF6Osj1Kk25Zf.RJ4TaKw1Xh4bEW1/WLoBXf3M.RA.xV.",
    profileImage:
      "https://res.cloudinary.com/societe-generale/image/upload/v1661345750/real-estate-app/jenny_sbph55.jpg",
  },
  {
    username: "Will Turner",
    email: "will.smith@gmail.com",
    passwordHash:
      "$2b$10$sSGWwTzgWaF6Osj1Kk225Zf.RJ4TaKw1Xh4bEW1/WLoBXf3M.RA.xV.",
    profileImage:
      "https://res.cloudinary.com/societe-generale/image/upload/v1661345750/real-estate-app/will_eav4j8.png",
  },
  {
    username: "Samantha Green",
    email: "samantha.green@yahoo.com",
    passwordHash:
      "$2b$10$sSGWwTzgWaF6Osd1Kk225Zf.RJ4TaKw1Xh4bEW1/WLoBXf3M.RA.xV.",
    profileImage:
      "https://res.cloudinary.com/societe-generale/image/upload/v1661345750/real-estate-app/emilie_cdm9lq.jpg",
  },
  {
    username: "Emilie Sanders",
    email: "emilie.s@yahoo.com",
    passwordHash:
      "$2b$10$sSGWwTzgWaF6Osd1Kk22e5Zf.RJ4TaKw1Xh4bEW1/WLoBXf3M.RA.xV.",
    profileImage:
      "https://res.cloudinary.com/societe-generale/image/upload/v1661338035/real-estate-app/ywn9xsvf8h7tfhmg3zvu.jpg",
  },
  {
    username: "Bruce Lips",
    email: "bruce.lips@yahoo.com",
    passwordHash:
      "$2b$10$sSGWwTzgWaF6Osd1Kk22e5Zf.RJ4TaKw1Xh4bEW1/WLoB2f3M.RA.xV.",
    profileImage:
      "https://res.cloudinary.com/societe-generale/image/upload/v1661345749/real-estate-app/steve_skel0u.jpg",
  },
  {
    username: "Henrik Hermann",
    email: "henrik.hermann@gmail.com",
    passwordHash:
      "$2b$10$sSGWwTzgWaF6Osd1Kk22e5Zf.RJ4TaK2w1Xh4bEW1/WLoB2f3M.RA.xV.",
    profileImage:
      "https://res.cloudinary.com/societe-generale/image/upload/v1661345749/real-estate-app/henrik_ps8xae.jpg",
  },
  {
    username: "Steve Bander",
    email: "steve.bander@gmail.com",
    passwordHash:
      "$2b$10$sSGWwTzgWaF6Osd1Kk22e5Zf.RJ4TaK23w1Xh4bEW1/WLoB2f3M.RA.xV.",
    profileImage:
      "https://res.cloudinary.com/societe-generale/image/upload/v1661345749/real-estate-app/bruce_pryo1n.jpg",
  },
  {
    username: "Emir Agadir",
    email: "emir.Agadir@gmail.com",
    passwordHash:
      "$2b$10$sSGWwTzgWaF6Osd12k22e5Zf.RJ4TaK23w1Xh4bEW1/WLoB2f3M.RA.xV.",
    profileImage:
      "https://res.cloudinary.com/societe-generale/image/upload/v1661345995/real-estate-app/emir_htopyk.jpg",
  },
];

const offers = [
  {
    offerType: "sale",
    type: "house",
    name: "Cubic modern house",
    address: "62 Marble Arch Pl, Arundel, Qld 4214",
    price: 500000,
    landSize: 100,
    toilets: 2,
    bedrooms: 3,
    garages: 1,
    livingAreas: 2,
    images:
      "https://res.cloudinary.com/societe-generale/image/upload/v1661346714/real-estate-app/white_house_v3ypxf.jpg",
    description:
      "Has doctus iuvaret epicuri cu, accusamus posidonium scripserit et sea, sit quem oportere prodesset ad. Sed zril facete adipiscing id, ius appetere facilisis no. An cetero labitur delectus vix, ad agam consetetur inciderint cum, cum id euripidis scriptorem. Ad graeci causae vivendo sea. At usu erat affert, lobortis delicata mea ex. Ea possim omnium nusquam mea.",
    owner: ObjectId("6306246cbac0fc9177bfebb4"),
  },
  {
    offerType: "sale",
    type: "house",
    name: "Cubic modern house",
    address: "381 Kiamba Rd, Cooloolabin, Arundel, Qld 4214",
    price: 40000,
    landSize: 150,
    toilets: 2,
    bedrooms: 3,
    garages: 2,
    livingArea: 2,
    images:
      "https://res.cloudinary.com/societe-generale/image/upload/v1661346715/real-estate-app/little_red_kq0ndu.jpg",
    description:
      "Has doctus iuvaret epicuri cu, accusamus posidonium scripserit et sea, sit quem oportere prodesset ad. Sed zril facete adipiscing id, ius appetere facilisis no. An cetero labitur delectus vix, ad agam consetetur inciderint cum, cum id euripidis scriptorem. Ad graeci causae vivendo sea. At usu erat affert, lobortis delicata mea ex. Ea possim omnium nusquam mea.",
    owner: ObjectId("6306246cbac0fc9177bfebb6"),
  },
  {
    offerType: "sale",
    type: "house",
    name: "Family house",
    address: "381 Kiamba Rd, Cooloolabin, Arundel, Qld 4214",
    price: 40000,
    landSize: 100,
    toilets: 2,
    bedrooms: 3,
    garages: 1,
    livingArea: 2,
    images:
      "https://res.cloudinary.com/societe-generale/image/upload/v1661346716/real-estate-app/familiy_house_rfbv6w.jpg",
    description:
      "Has doctus iuvaret epicuri cu, accusamus posidonium scripserit et sea, sit quem oportere prodesset ad. Sed zril facete adipiscing id, ius appetere facilisis no. An cetero labitur delectus vix, ad agam consetetur inciderint cum, cum id euripidis scriptorem. Ad graeci causae vivendo sea. At usu erat affert, lobortis delicata mea ex. Ea possim omnium nusquam mea.",
    owner: ObjectId("6306246cbac0fc9177bfebb7"),
  },
  {
    offerType: "sale",
    type: "house",
    name: "Modern glass house",
    address: "381 Kiamba Rd, Cooloolabin, Arundel, Qld 4214",
    price: 600000,
    landSize: 100,
    toilets: 2,
    bedrooms: 3,
    garages: 1,
    livingArea: 2,
    images:
      "https://res.cloudinary.com/societe-generale/image/upload/v1661346711/real-estate-app/modern_house_hwwbkp.jpg",
    description:
      "Has doctus iuvaret epicuri cu, accusamus posidonium scripserit et sea, sit quem oportere prodesset ad. Sed zril facete adipiscing id, ius appetere facilisis no. An cetero labitur delectus vix, ad agam consetetur inciderint cum, cum id euripidis scriptorem. Ad graeci causae vivendo sea. At usu erat affert, lobortis delicata mea ex. Ea possim omnium nusquam mea.",
    owner: ObjectId("6306246cbac0fc9177bfebb8"),
  },
  {
    offerType: "sale",
    type: "house",
    name: "Nowhere house",
    address: "381 Kiamba Rd, Cooloolabin, Arundel, Qld 4214",
    price: 300000,
    landSize: 100,
    toilets: 2,
    bedrooms: 3,
    garages: 1,
    livingArea: 2,
    images:
      "https://res.cloudinary.com/societe-generale/image/upload/v1661346711/real-estate-app/lost_house_onv3zp.jpg",
    description:
      "Has doctus iuvaret epicuri cu, accusamus posidonium scripserit et sea, sit quem oportere prodesset ad. Sed zril facete adipiscing id, ius appetere facilisis no. An cetero labitur delectus vix, ad agam consetetur inciderint cum, cum id euripidis scriptorem. Ad graeci causae vivendo sea. At usu erat affert, lobortis delicata mea ex. Ea possim omnium nusquam mea.",
    owner: ObjectId("6306246cbac0fc9177bfebb9"),
  },
  {
    offerType: "rent",
    type: "house",
    name: "Countryside house",
    address: "381 Kiamba Rd, Cooloolabin, Arundel, Qld 4214",
    price: 300000,
    landSize: 150,
    toilets: 2,
    bedrooms: 3,
    garages: 1,
    livingArea: 3,
    images:
      "https://res.cloudinary.com/societe-generale/image/upload/v1661346710/real-estate-app/green_vintage_mvgxio.jpg",
    description:
      "Has doctus iuvaret epicuri cu, accusamus posidonium scripserit et sea, sit quem oportere prodesset ad. Sed zril facete adipiscing id, ius appetere facilisis no. An cetero labitur delectus vix, ad agam consetetur inciderint cum, cum id euripidis scriptorem. Ad graeci causae vivendo sea. At usu erat affert, lobortis delicata mea ex. Ea possim omnium nusquam mea.",
    owner: ObjectId("6306246cbac0fc9177bfebba"),
  },
  {
    offerType: "rent",
    type: "flat",
    name: "Cozy flat",
    address: "381 Kiamba Rd, Cooloolabin, Arundel, Qld 4214",
    price: 300000,
    landSize: 150,
    toilets: 2,
    bedrooms: 3,
    garages: 1,
    livingArea: 3,
    images:
      "https://res.cloudinary.com/societe-generale/image/upload/v1661346709/real-estate-app/cozy_flat_rigvgc.jpg",
    description:
      "Has doctus iuvaret epicuri cu, accusamus posidonium scripserit et sea, sit quem oportere prodesset ad. Sed zril facete adipiscing id, ius appetere facilisis no. An cetero labitur delectus vix, ad agam consetetur inciderint cum, cum id euripidis scriptorem. Ad graeci causae vivendo sea. At usu erat affert, lobortis delicata mea ex. Ea possim omnium nusquam mea.",
    owner: ObjectId("6306246cbac0fc9177bfebbb"),
  },
  {
    offerType: "sale",
    type: "flat",
    name: "Family flat",
    address: "381 Kiamba Rd, Cooloolabin, Arundel, Qld 4214",
    price: 300000,
    landSize: 150,
    toilets: 2,
    bedrooms: 3,
    garages: 1,
    livingArea: 3,
    images:
      "https://res.cloudinary.com/societe-generale/image/upload/v1661346705/real-estate-app/family_flat_ozulum.jpg",
    description:
      "Has doctus iuvaret epicuri cu, accusamus posidonium scripserit et sea, sit quem oportere prodesset ad. Sed zril facete adipiscing id, ius appetere facilisis no. An cetero labitur delectus vix, ad agam consetetur inciderint cum, cum id euripidis scriptorem. Ad graeci causae vivendo sea. At usu erat affert, lobortis delicata mea ex. Ea possim omnium nusquam mea.",
    owner: ObjectId("6306246cbac0fc9177bfebb3"),
  },
  {
    offerType: "sale",
    type: "house",
    name: "Double floor modern type house",
    address: "381 Kiamba Rd, Cooloolabin, Arundel, Qld 4214",
    price: 300000,
    landSize: 150,
    toilets: 2,
    bedrooms: 3,
    garages: 1,
    livingArea: 3,
    images:
      "https://res.cloudinary.com/societe-generale/image/upload/v1661346708/real-estate-app/newstyle_house_ngjxhg.jpg",
    description:
      "Has doctus iuvaret epicuri cu, accusamus posidonium scripserit et sea, sit quem oportere prodesset ad. Sed zril facete adipiscing id, ius appetere facilisis no. An cetero labitur delectus vix, ad agam consetetur inciderint cum, cum id euripidis scriptorem. Ad graeci causae vivendo sea. At usu erat affert, lobortis delicata mea ex. Ea possim omnium nusquam mea.",
    owner: ObjectId("6306246cbac0fc9177bfebb3"),
  },
  {
    offerType: "sale",
    type: "house",
    name: "Influencer house",
    address: "381 Kiamba Rd, Cooloolabin, Arundel, Qld 4214",
    price: 5000000,
    landSize: 150,
    toilets: 4,
    bedrooms: 3,
    garages: 2,
    livingArea: 4,
    images:
      "https://res.cloudinary.com/societe-generale/image/upload/v1661346708/real-estate-app/newstyle_house_ngjxhg.jpg",
    description:
      "Has doctus iuvaret epicuri cu, accusamus posidonium scripserit et sea, sit quem oportere prodesset ad. Sed zril facete adipiscing id, ius appetere facilisis no. An cetero labitur delectus vix, ad agam consetetur inciderint cum, cum id euripidis scriptorem. Ad graeci causae vivendo sea. At usu erat affert, lobortis delicata mea ex. Ea possim omnium nusquam mea.",
    owner: ObjectId("6306246cbac0fc9177bfebb5"),
  },
  {
    offerType: "sale",
    type: "house",
    name: "The garden house",
    address: "381 Kiamba Rd, Cooloolabin, Arundel, Qld 4214",
    price: 1000000,
    landSize: 150,
    toilets: 2,
    bedrooms: 3,
    garages: 1,
    livingArea: 3,
    images:
      "https://res.cloudinary.com/societe-generale/image/upload/v1661346707/real-estate-app/country_house_bc6gwr.jpg",
    description:
      "Has doctus iuvaret epicuri cu, accusamus posidonium scripserit et sea, sit quem oportere prodesset ad. Sed zril facete adipiscing id, ius appetere facilisis no. An cetero labitur delectus vix, ad agam consetetur inciderint cum, cum id euripidis scriptorem. Ad graeci causae vivendo sea. At usu erat affert, lobortis delicata mea ex. Ea possim omnium nusquam mea.",
    owner: ObjectId("6306246cbac0fc9177bfebbb"),
  },
];

// Create USERS *********************************************************************************************
User.create(users)
  .then((usersArr) => {
    console.log(`Created ${usersArr.length} users`);
    mongoose.connection.close();
  })
  .catch((err) =>
    console.log(`An error occurred while getting books from the DB: ${err}`)
  );

// Delete all USERS
// User.deleteMany()
//   .then(() => {
//     console.log(`Deleted all users`);
//     mongoose.connection.close();
//   })
//   .catch((err) =>
//     console.log(`An error occurred while getting books from the DB: ${err}`)
//   );

// Create OFFERS *********************************************************************************************
Offer.create(offers)
  .then((offersList) => {
    console.log(`Created ${offersList.length} offers`);
    mongoose.connection.close();
  })
  .catch((err) =>
    console.log(`An error occurred while getting books from the DB: ${err}`)
  );

// Delete offers
// Offer.deleteMany()
//   .then(() => {
//     console.log(`Deleted all offers`);
//     mongoose.connection.close();
//   })
//   .catch((err) =>
//     console.log(`An error occurred while getting books from the DB: ${err}`)
//   );

// Reviews *********************************************************************************************
// Review.create(offers)
//   .then((offersList) => {
//     console.log(`Created ${offersList.length} offers`);
//     mongoose.connection.close();
//   })
//   .catch((err) =>
//     console.log(`An error occurred while getting books from the DB: ${err}`)
//   );

// Review.deleteMany()
//   .then(() => {
//     console.log(`Deleted all offers`);
//     mongoose.connection.close();
//   })
//   .catch((err) =>
//     console.log(`An error occurred while getting books from the DB: ${err}`)
//   );
