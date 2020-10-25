const apiAdapter = require('../../apiAdapter');
const {URL_ORDER_PAYMENT_SERVICE} = process.env;

const api = apiAdapter(URL_ORDER_PAYMENT_SERVICE);

module.exports = async (request, response) => {
    try {
        const webhook = await api.post('/api/webhook', request.body);
        return response.json(webhook.data);
        
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