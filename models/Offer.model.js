const { Schema, model } = require("mongoose");

const offerSchema = new Schema({
  offerType: {
    type: String,
    enum: ["rent", "sale"],
  },
  type: {
    type: String,
    enum: ["flat", "house"],
  },
  name: { type: String, required: true },
  address: { type: String, required: true },
  landSize: { type: Number, required: true },
  toilets: { type: Number },
  bedrooms: { type: Number },
  garages: { type: Number },
  livingAreas: { type: Number },
  rent: { type: Number },
  images: { type: String, required: true },
  price: { type: Number },
  description: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  isLiked: { type: Number, default: false },
});

const Offer = model("Offer", offerSchema);

module.exports = Offer;
