import express from 'express';
import brevo from '@getbrevo/brevo'
import createToken from '../email/createToken.js';
import HTMLVerifyEmail from '../email/index.js';

const verifyEmailRouter = express.Router()

let apiIstance = new brevo.TransactionalEmailsApi()

let apiKey = apiIstance.authentications['apiKey']
apiKey.apiKey = process.env.BREVO_API_KEY

verifyEmailRouter
    .post('/', async (req, res) => {

        // Token da inviare nell'email
        const { _id } = req.body
        const user = await getUserById(_id)
        if(!user){
            return res.status(404).send('Utente non trovato')
        }

        const token = createToken(_id)

        let sendSmtpEmail = new brevo.SendSmtpEmail()
        sendSmtpEmail.subject = 'Conferma registrazione'

        sendSmtpEmail.htmlContent = HTMLVerifyEmail(token, _id)
        sendSmtpEmail.sender = {
            name: process.env.BRAND_NAME,
            email: process.env.MY_EMAIL,
        }
        sendSmtpEmail.to = [{ email: user.email, name: user.name }]
        sendSmtpEmail.replyTo = {
            name: process.env.MY_MANE,
            email: process.env.MY_EMAIL,
        }

        sendSmtpEmail.headers = {
            'Some-Custom-Name': 'unique-id-1234'
        }


        const data = await apiInstance.sendTransacEmail(sendSmtpEmail)

        console.log('Chiamata API avvenuta. Dati ritornati: ' + JSON.stringify(data));

        res.send(data);
    })

export default verifyEmailRouter