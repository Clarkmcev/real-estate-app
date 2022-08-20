const { Schema, model } = require("mongoose");


const exerciseSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },

        image: String
    },
    {
        timestamps: true
    }
);

const Exercise = model("Exercise", exerciseSchema);

module.exports = Exercise;