export const genericError = (err, req, res, next) => {
    console.log(error)
    res.status(error.statusCode || 500).send(error.message)
}