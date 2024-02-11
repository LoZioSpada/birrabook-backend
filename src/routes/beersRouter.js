import express from 'express';
import { Beer } from '../models/beers.js';
import { Comment } from '../models/comments.js';

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

    // GET PER RITORNARE TUTTI I COMMENTI SU UNA BIRRA SPECIFICA
    .get('/:id/comments', async (req, res) => {
        try {
            const comments = await Beer.findById(req.params.id)
            .populate('comments user')
            .select('comments -_id')

            if(!comments){
                return res.status(404).send()
            }
            res.json(comments)

        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    })

    // GET PER RITORNARE UN COMMENTO SPECIFICO SU UNA BIRRA SPECIFICA
    .get('/:id/comments/:commentId', async (req, res) => {
        try {
            const beer = await Beer.findById(req.params.id);
            const comment = await Comment.findById(req.params.commentId)
            if(!beer){
                return res.status(404).send()
            } else if (!comment){
                return res.status(404).send()
            }
            res.json(comment)

        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    })

    // POST PER AGGIUNGERE UN NUOVO COMMENTO AD UNA BIRRA
    .post('/:id/comments', async (req, res) => {
        try{
            const beer = await Beer.findById(req.params.id)
            console.log("Beer:", beer)
            if(!beer){
                return res.status(404).send()
            }
            beer.comments = beer.comments || []

            const newComment = new Comment({
                rate: req.body.rate,
                text: req.body.text,
                author: req.body.author,
                beer: req.params.id
            })
            await newComment.save()
            beer.comments.push(newComment)
            await beer.save()
            res.status(201).json(newComment)

        } catch(error){
            console.log("Errore durante il recupero della birra:", error)
            res.status(500).send(error)
        }
    })

    // PUT PER MODIFICARE UN COMMENTO
    .put('/:id/comments/:commentId', async (req, res) => {
        try{
            const beer = await Beer.findById(req.params.id)
            const updateComment = await Comment.findByIdAndUpdate(
                req.params.commentId,
                req.body
            )
            if(!beer){
                return res.status(404).send()
            } else if (!updateComment){
                return res.status(404).send()
            }
            res.json(updateComment)

        } catch (error){
            console.log(error)
            return res.status(400).send(error)
        }
    })

    // DELETE PER CANCELLARE UN COMMENTO
    .delete('/:id/comments/:commentId', async (req, res) => {
        try{
            const beer = await Beer.findById(req.params.id)
            const deleteComment = await Comment.findByIdAndDelete(
                req.params.commentId
            )
            if(!beer){
                return res.status(404).send()
            } else if(!deleteComment){
                return res.status(404).send()
            } else {
                res.status(204).send()
            }
        } catch (error){
            console.log(error)
            res.status(400).send(error)
        }
    })

export default beersRouter