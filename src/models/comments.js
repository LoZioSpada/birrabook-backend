import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema({
    rate: {
        type: Number,
        required: true,
    },

    text: {
        type: String,
        required: true,
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },

    beer: {
        type: Schema.Types.ObjectId,
        ref: "beers",
        required: true,
    },


})

export const Comment = new mongoose.model('comments', CommentSchema)