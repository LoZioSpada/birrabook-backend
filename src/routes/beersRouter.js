import express from 'express';
import { Beer } from '../models/beers';

const beersRouter = express.Router()

// GET per ritornare tutte le birre
beersRouter
    .get('/', async (req, res) => {
        try {
            const { name } = req.query
            const beers = await Beer.find(
                name ? { name: { $regex: name, $options: 'i' } } : {}
            ).populate('user', 'name surname')
            if(!beers){
                return res.status(404).send()
            }
            res.json(beers)

        } catch (error) {
            console.log(error) 
            res.status(505).send(error)
        }
    })

    // GET per ritornare una birra specifica
    .get('/:id', async (req, res) => {
        try{
            const { id } = req.params
            const beer = await Beer.findById(id)
            if(!beer){
                return res.status(404).send()
            }
            res.json(beer)

        } catch(error) {
            cpnsole.log(error)
            res.status(505).send(error)
        }
    })

    // -- ROTTE PER I COMMENTI --
    

export default beersRouter