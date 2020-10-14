const apiAdapter = require('../../apiAdapter');
const { URL_USERS_SERVICE } = process.env;

const api = apiAdapter(URL_USERS_SERVICE);

module.exports = async (request, response) => {
    try {
        const id = request.user.data.id

        const user = await api.put(`/users/${id}`, request.body)
        return response.json(user.data)
        
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