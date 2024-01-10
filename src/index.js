import express from "express";

const server = express();

const port = 3050


// messaggio per verificare che il server funzioni
server.get("/test", (req, res) =>{
    res.json({ message: "test ok" })
})

server.listen(port, () =>{
    console.log('🚀 Server listening on port ' + port);
})