const apiAdapter = require('../../apiAdapter');
const jwt = require('jsonwebtoken');

const { 
    URL_USERS_SERVICE,
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
    JWT_REFRESH_TOKEN_EXPIRED
} = process.env;

const api = apiAdapter(URL_USERS_SERVICE);

module.exports = async (request, response) => {
    try {
        const user = await api.post('/users/login', request.body);
        const data = user.data.data
        
        const token = jwt.sign({ data: data }, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRED })
        const refreshToken = jwt.sign({ data: data }, JWT_SECRET_REFRESH_TOKEN, { expiresIn: JWT_REFRESH_TOKEN_EXPIRED })

        await api.post('/refresh_tokens', {
            refresh_token: refreshToken,
            user_id: data.id
        })

        return response.status(200).json({
            status: 'success',
            data: {
                token: token,
                refresh_token: refreshToken
            }
        })
        
    } catch (error) {

        if (error.code == 'ECONNREFUSED') {
            return response.status(500).json({
                status : 'error',
                message: 'service unavailable'
            })
        }
        const {status, data} = error.response;
        return response.status(status).json(data);
    }
}