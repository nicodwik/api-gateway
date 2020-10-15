const apiAdapter = require('../../apiAdapter');
const {URL_COURSE_SERVICE} = process.env;

const api = apiAdapter(URL_COURSE_SERVICE);

module.exports = async (request, response) => {
    try {
        const userId = request.user.data.userId
        const courseId = request.body.course_id
        const myCourse = await api.post('/api/my-courses', {
            user_id: userId,
            course_id: courseId
        });
        return response.json(myCourse.data);
        
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