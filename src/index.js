import express from "express";
import apiRouter from "./routes/apiRouter.js"
import mongoose from "mongoose";
import { genericError } from "./middlewares/genericError.js";
import list from 'express-list-endpoints'

const server = express();

// Porta del server
const port = 3030

// Sotto-directory /api
server.use('/api', apiRouter)

// ERRORE GENERICO
server.use(genericError)

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        server.listen(port, () => {
            console.log('🚀 Server listening on port ', port);
            console.log(list(server))
        })
    })

    .catch(() => {
        console.log('Errore nella connessione al database!!')
    })