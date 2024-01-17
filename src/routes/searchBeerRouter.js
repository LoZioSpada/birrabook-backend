import express from 'express';
import { Beer } from '../models/beers';

const searchBeerRouter = express.Router()

searchBeerRouter
    .get('/', async (req, res, next) => {
        try{
            const { name } = req.query
            
            // controllare se è stato fornito un nome
            if(!title) {
                return res.status(400).json({ message: 'Il parametro "nome" è obbligatorio' })
            }

            // cerca per nome della birra
            const nameResult = await Beer.find({
                name: { $regex: name, $options: 'i' },
            }).populate('user')
            res.json(nameResult)
        } catch (error) {
            console.log(error)
            next(genericError)
        }
    })

export default searchBeerRouter