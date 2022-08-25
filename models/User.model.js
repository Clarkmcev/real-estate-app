const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required."],
    },
    fullName: { type: String, required: true },
    info: { type: String },
    phoneNumber: { type: String },
    city: { type: String },
    postcode: { type: String },
    likes: [{ type: Schema.Types.ObjectId, ref: "Offer" }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    profileImage: { type: String },
    settings: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
