import { User } from '../models/users.js'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'


const googleStrategy = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.MY_ENDPOINT}/api/oauth/callback`,
    },

    async function(_, __, profile, cb){
        console.log(profile)

        let user = await User.findOne({ googleId: profile.id })

        if(!user){
            user = await User.create({
                googleId: profile.id,
                firstName: profile.name.givenName,
                surname: profile.name.familyName,
                email: profile.emails[0].value,
            })
        }

        cb(null, user)
    }
)

export default googleStrategy