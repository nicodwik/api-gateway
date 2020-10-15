require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mediaRouter = require('./routes/media');
const coursesRouter = require('./routes/courses');
const paymentsRouter = require('./routes/payments');
const ordersRouter = require('./routes/orders');
const refreshTokensRouter = require('./routes/refreshToken')
const mentorsRouter = require('./routes/mentors')
const chaptersRouter = require('./routes/chapters')
const lessonsRouter = require('./routes/lessons')
const imageCoursesRouter = require('./routes/imageCourses')

const verifyToken = require('./middlewares/verifyToken')

var app = express();

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/media', mediaRouter)
app.use('/orders', ordersRouter)
app.use('/courses', coursesRouter)
app.use('/payments', paymentsRouter)
app.use('/refresh-tokens', refreshTokensRouter)
app.use('/mentors', verifyToken, mentorsRouter)
app.use('/chapters', verifyToken, chaptersRouter)
app.use('/lessons', verifyToken, lessonsRouter)
app.use('/image-courses', verifyToken, imageCoursesRouter)

module.exports = app;
