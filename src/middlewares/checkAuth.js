export const checkAuth = (req, res, next) => {
    if(req.headers.authorization === 'Password sicurissima!'){
        next()
    } else {
        const error = new Error ('Password errata!')
        error.statusCode = 401
        next(error)
    }
}