import express from "express";
import userRouter from "./userRouter.js";

const apiRouter = express.Router();

// messaggio per verificare che il server funzioni
apiRouter.get("/test", (req, res) =>{
    res.json({ message: "test ok" })
})

apiRouter.use('/users', userRouter)

export default apiRouter