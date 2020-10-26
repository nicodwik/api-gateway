module.exports = (...roles) => {
    return (request, response, next) => {
        const role = request.user.data.role
        
        if(!roles.includes(role)) {
            return response.status(405).json({
                status: 'error',
                message: 'you dont have permission!'
            })
        }

        return next()
    }
}