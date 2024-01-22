import express from 'express'
import { User } from '../models/users.js'
import checkJwt from '../middlewares/checkJwt.js'


const userRouter = express.Router()

// messaggio per verificare che il server funzioni
userRouter.get("/test", (req, res) => {
    res.json({ message: "test ok" })
})

// Autenticazione: controllare la password per il login e fornire un token
userRouter
    .post('/session', async (req, res) =>{
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if(!user){
            return res.status(404).send({ message: 'Utente non trovato' })
        }
        const isPasswordCorrect = bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            return res.status(401).send({ message: 'Password errata!' })
        }
        const payload = { id: user._id }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h',
        })
        res.status(200).json({ token: payload, message: 'Login effettuato con successo!' })
    })

    // get by id user e controllare che il token sia valido 
    .get('/:id', checkJwt, async (req, res) => {
        const user = await User.findById(req.params.id)
        if(!user) {
            res.status(404).json({ message: 'Utente non trovato!' })
            return
        }
        // dopo l'autenticazione, l'utente è disponibile dentro req.user
        // messo da noi nel middleware checkJwt
        res.status(200).json(req.user)
    })

    // GET per ritornare tutti gli utenti
    .get('/', async (req, res, next) => {
        try{
            const user = await User.find({}).select('-password')
            if(!user){
                return res.status(404).send()
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    })

    // POST per aggiungere un utente e fare hashing della password
    .post('/', async (req, res) => {
        try{
            const { email } = req.body
            const user = await User.findOne({ email })
            // controllare se l'utente esiste già
            if(user){
                return res.status(400).send({ message: 'Email già esistente nel sistema' })
            }
            // fare hashing della password inserita
            const password = await bcrypt.hash(req.body.password, 15)
            
            // Crea utente sovrascrivendo il campo della password con quella criptata
            const newUser = await User.create({
                ...req.body,
                password,
            })

            // Rimuovare il campo della password prima di inviare la risposta
            const userSenzaPassword = {
                _id: newUser._id,
                name: newUser.name,
                surname: newUser.surname,
                email: newUser.email,
            }

            await newUser.save()
            if(newUser){
                res.status(200).send(userSenzaPassword)
            } else {
                next(error)
            }

        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })

export default userRouter