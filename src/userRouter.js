import express from 'express'
import { User } from './models/users.js'

const userRouter = express.Router()

// messaggio per verificare che il server funzioni
userRouter.get("/test", (req, res) =>{
    res.json({ message: "test ok" })
})

// RITORNARE TUTTI GLI UTENTI
userRouter.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

// RITORNARE UN UTENTE SPECIFICO
userRouter.get('/:id', async (req, res) =>{
    const { id } = req.params
    const user = await User.findById(id)

    if(!user){
        return res.status(404).send()
    }

    res.json(user)
})

// AGGIUNGERE UN UTENTE
userRouter.post('/', async (req, res) =>{
    const newUser = new User(req.body)
    await newUser.save()
    res.status(200).send(newUser)
})

export default userRouter