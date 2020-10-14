const apiAdapter = require('../../apiAdapter');
const jwt = require('jsonwebtoken');
const { response } = require('../../../app');

const {
    URL_USERS_SERVICE,
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED
} = process.env;

const api = apiAdapter(URL_USERS_SERVICE);

module.exports = async (request, response) => {
    try {
        const refreshToken = request.body.refresh_token
        const email = request.body.email

        if(!refreshToken || !email) {
            return response.status(400).json({
                status: 'error',
                message: 'invalid token'
            })
        }

        await api.get('/refresh_tokens', {
            params: { refresh_token: refreshToken}
        })

        jwt.verify(refreshToken, JWT_SECRET_REFRESH_TOKEN, (error, decoded) => {
            if(error) {
                return response.status(400).json({
                    status: 'error',
                    message: error.message
                })
            }

            if(email !== decoded.data.email) {
                return response.status(400).json({
                    status: 'error',
                    message: 'email not valid'
                })  
            }

            const token = jwt.sign({ data: decoded.data }, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED })

            return response.status(200).json({
                status: 'success',
                data: {
                    token: token
                }
            })
        })
    } catch (error) {

        if (error.code == 'ECONNREFUSED') {
            return response.status(500).json({
                status : 'error',
                message: 'service unavailable'
            })
        }
            const {status, data} = error.response
            return response.status(status).json(data);
    }
}