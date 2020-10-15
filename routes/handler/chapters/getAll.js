const apiAdapter = require('../../apiAdapter');
const {
    URL_COURSE_SERVICE
} = process.env;

const api = apiAdapter(URL_COURSE_SERVICE);

module.exports = async (request, response) => {
    try {
        const chapter = await api.get('/api/chapters', {
            params: {
                ...request.query
            }
        })
        return response.json(chapter.data);
        
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