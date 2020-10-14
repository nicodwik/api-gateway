const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env

module.exports = async (request, response, next) => {
    const token = request.headers.authorization

    jwt.verify(token, JWT_SECRET, (error, decoded) => {
        if(error) {
            return response.status(403).json({
                status: 'error',
                message: error.message
            })
        }

        request.user = decoded
        return next()
    })
}