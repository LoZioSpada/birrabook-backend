import express from "express";
import userRouter from "./userRouter.js";
import commentRouter from "./commentsRouter.js";
import beersRouter from "./beersRouter.js";
import googleRouter from "./googleRouter.js";
import cors from 'cors'
import passport from "passport";
import googleStrategy from "../oauth/google.js";
import verifyEmailRouter from "./verifyEmailRouter.js";

const apiRouter = express.Router();

apiRouter.use(express.json());


// messaggio per verificare che il server funzioni
apiRouter.get("/test", (req, res) =>{
    res.json({ message: "test ok" })
})

apiRouter.use(cors())

passport.use(googleStrategy)

apiRouter.use('/users', userRouter)

apiRouter.use('/comments', commentRouter)

apiRouter.use('/beers', beersRouter)

apiRouter.use('/oauth', googleRouter)

apiRouter.use('/verifyEmail', verifyEmailRouter)

export default apiRouter