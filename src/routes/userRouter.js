import express from 'express'
import { User } from '../models/users.js'
import { checkAuth } from '../middlewares/checkAuth.js'

const userRouter = express.Router()

// messaggio per verificare che il server funzioni
userRouter.get("/test", (req, res) => {
    res.json({ message: "test ok" })
})


userRouter.use(checkAuth)

// RITORNARE TUTTI GLI UTENTI
userRouter.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

// RITORNARE UN UTENTE SPECIFICO
userRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)

        if (!user) {
            return res.status(404).send()
        }

        res.json(user)
    } catch (error) {
        console.log(error)
    }

})

// AGGIUNGERE UN UTENTE
userRouter.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body)
        await newUser.save()
        res.status(200).send(newUser)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

// MODIFICARE UN UTENTE
userRouter.put('/:id', async (req, res) => {
    try{
        const { id } = req.params
        const updateUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
        }).select("-password")

        if(!updateUser){
            return res.status(404).send()
        } else {
            res.json(updateUser)
        }
    } catch (error){
        console.log(error)
        req.status(400).send(error)
    }
})

// ELIMINARE UN UTENTE
userRouter.delete('/id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).send()
        }
    } catch (error) {
        console.log(error)
        req.status(400).send()
    }
})



export default userRouter