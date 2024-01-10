import express from "express";
import apiRouter from "./apiRouter.js"
import mongoose from "mongoose";

const server = express();

const port = 3050

server.use('/api', apiRouter)

mongoose
    .connect(
        "mongodb+srv://loziospada:Spazzolino14@strive-blog.oeobgmc.mongodb.net/Birrabook"
    )
    .then(() => {
        server.listen(port, () =>{
            console.log('🚀 Server listening on port ' + port);
        })
    })

    .catch(() => {
        console.log('Errore nella connessione al database!!')
    })