const apiAdapter = require('../../apiAdapter');
const {URL_COURSE_SERVICE} = process.env;

const api = apiAdapter(URL_COURSE_SERVICE);

module.exports = async (request, response) => {
    try {
        const id = request.params.id
        const review = await api.delete(`/api/reviews/${id}`);
        return response.json(review.data);
        
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