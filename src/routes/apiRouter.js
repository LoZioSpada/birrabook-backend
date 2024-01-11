import express from "express";
import userRouter from "./userRouter.js";

const apiRouter = express.Router();

apiRouter.use(express.json());

// messaggio per verificare che il server funzioni
apiRouter.get("/test", (req, res) =>{
    res.json({ message: "test ok" })
})

apiRouter.use('/users', userRouter)

// apiRouter.use('/comments', commentsRouter)

// apiRouter.use('/beers', beersRouter)

export default apiRouter