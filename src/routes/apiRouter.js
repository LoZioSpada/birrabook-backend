import express from "express";
import userRouter from "./userRouter.js";
import commentRouter from "./commentsRouter.js";

const apiRouter = express.Router();

apiRouter.use(express.json());

// messaggio per verificare che il server funzioni
apiRouter.get("/test", (req, res) =>{
    res.json({ message: "test ok" })
})

apiRouter.use('/users', userRouter)

apiRouter.use('/comments', commentRouter)

// apiRouter.use('/beers', beersRouter)

export default apiRouter