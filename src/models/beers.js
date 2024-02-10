import mongoose, { Schema } from "mongoose";

const BeerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    brewery: {
        type: String,
        required: true,
    },

    place: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    alc: {
        type: String,
        required: true,
    },

    photo: {
        type: String,
        required: true,
    }
})

export const Beer = new mongoose.model('beers', BeerSchema)