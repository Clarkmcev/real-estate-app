const { Schema, model } = require("mongoose");

const offerSchema = new Schema({
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
  // images: [
  //   {
  //     URL: String,
  //     filename: String,
  //   },
  // ],
  images: String,
  price: { type: Number, required: true },
  description: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
});

const Offer = model("Offer", offerSchema);

module.exports = Offer;
