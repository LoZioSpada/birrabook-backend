import express from "express"
import passport from "passport"
import jwt from "jsonwebtoken"

const googleRouter = express.Router()

googleRouter
    .get("/",
        passport.authenticate("google", {
            scope: ["profile", "email"], // dati che si ricevono da Google
            prompt: "select_account", // richiesta all'utente con quale account desidera entrare
        })
    )

    .get('/callback',
        passport.authenticate('google', {
            failureRedirect: '/',
            session: false,
        }),
        async (req, res, next) => {
            try {
                const payload = { id: req.user._id }
                const token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: '1h'
                })
                res.redirect(
                    // qui andrà il link una volta fatto il deploy e il frontend
                    `https://birrabook.netlify.app/?token=${token}&userId=${req.user._id}`
                )
                
            } catch (error) {
                next(error);
            }
        }
    )

export default googleRouter