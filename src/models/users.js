import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    surname: {
        type: String,
        required: true,
    },

    birth: {
        type: Date,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: function(){
            return this.googleId ? false : true;
        },
    },

    googleId: {
        type: String,
        required: function(){
            return this.password ? false : true
        }
    }
})

export const User = new mongoose.model('users', UserSchema)