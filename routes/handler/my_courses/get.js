const apiAdapter = require('../../apiAdapter');
const {URL_COURSE_SERVICE} = process.env;

const api = apiAdapter(URL_COURSE_SERVICE);

module.exports = async (request, response) => {
    try {
        const userId = request.user.data.id
        const myCourses = await api.get(`/api/my-courses/`, {
            params: {
                user_id: userId
            }
        });
        return response.json(myCourses.data);
        
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