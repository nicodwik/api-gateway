const apiAdapter = require('../../apiAdapter');
const {
    URL_COURSE_SERVICE,
    HOSTNAME
} = process.env;

const api = apiAdapter(URL_COURSE_SERVICE);

module.exports = async (request, response) => {
    try {
        const courses = await api.get('/api/courses', {
            params: {
                ...request.query
            }
        });

        const courseData = courses.data
        const firstPage = courseData.data.first_page_url.split('?').pop()
        const lastPage = courseData.data.last_page_url.split('?').pop()
        const nextPage = courseData.data.next_page_url
        const prevPage = courseData.data.prev_page_url
        
        courseData.data.first_page_url = `${HOSTNAME}/courses?${firstPage}`
        courseData.data.last_page_url = `${HOSTNAME}/courses?${lastPage}`
        courseData.data.path = `${HOSTNAME}/courses`
        if (nextPage) {
            const nextPageUrl = nextPage.split('?').pop()
            courseData.data.next_page_url = `${HOSTNAME}/courses?${nextPageUrl}`
        }
        if (prevPage) {
            const prevPageUrl = prevPage.split('?').pop()
            courseData.data.prev_page_url = `${HOSTNAME}/courses?${prevPageUrl}`
        }

        return response.json(courses.data);
        
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