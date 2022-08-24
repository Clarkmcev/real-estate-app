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
    description: { type: String },
    likes: [{ type: Schema.Types.ObjectId, ref: "Offer" }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    profileImage: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
