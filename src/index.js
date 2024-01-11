import express from "express";
import apiRouter from "./routes/apiRouter.js"
import mongoose from "mongoose";

const server = express();

// Porta del server
const port = 3050

// Sotto-directory /api
server.use('/api', apiRouter)

mongoose
    .connect(
        process.env.MONGO_URL
    )
    .then(() => {
        server.listen(port, () =>{
            console.log('🚀 Server listening on port ' + port);
        })
    })

    .catch(() => {
        console.log('Errore nella connessione al database!!')
    })