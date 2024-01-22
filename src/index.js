import express from "express";
import apiRouter from "./routes/apiRouter.js"
import mongoose from "mongoose";
import { genericError } from "./middlewares/genericError.js";


const server = express();

const port = 3050

// Sotto-directory /api
server.use('/api', apiRouter)

// ERRORE GENERICO
server.use(genericError)

server.get("/health", (req, res) => {
    res.status(200).json({ message: 'OK' })
})

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        server.listen(port, () => {
            console.log('🚀 Server listening on port ' + port);
        })
    })

    .catch(() => {
        console.log('Errore nella connessione al database!!')
    })