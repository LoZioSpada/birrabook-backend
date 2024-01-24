import express from "express";
import apiRouter from "./routes/apiRouter.js"
import mongoose from "mongoose";
import { genericError } from "./middlewares/genericError.js";
import list from 'express-list-endpoints'
import cors from 'cors'

const server = express();

const port = 3050

const whitelist = [
    'https://birrabook.netlify.app',
    'http://localhost:3000'
]
const corsOptions = {
    origin: function (origin, next){
        if(whitelist.indexOf(origin) !== -1){
            next(null, true)
        } else {
            next(new Error('Not allowedby CORS'))
        }
    },
}

server.use(cors(corsOptions))


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
            console.table(list(server))
        })
    })

    .catch(() => {
        console.log('Errore nella connessione al database!!')
    })