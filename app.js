require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mediaRouter = require('./routes/media');
const coursesRouter = require('./routes/courses');
const ordersRouter = require('./routes/orders');
const mentorsRouter = require('./routes/mentors')
const chaptersRouter = require('./routes/chapters')
const lessonsRouter = require('./routes/lessons')
const imageCoursesRouter = require('./routes/imageCourses')
const myCoursesRouter = require('./routes/myCourses')
const reviewsRouter = require('./routes/reviews')
const webhookRouter = require('./routes/webhook')

// middleware
const refreshTokensRouter = require('./routes/refreshToken')
const grant = require('./middlewares/permission')
const verifyToken = require('./middlewares/verifyToken')

var app = express();

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/media', grant('admin', 'student'), mediaRouter)
app.use('/orders', grant('admin', 'student'), ordersRouter)
app.use('/courses', coursesRouter)
app.use('/refresh-tokens', refreshTokensRouter)
app.use('/mentors', grant('admin', 'student'), verifyToken, mentorsRouter)
app.use('/chapters', grant('admin'), verifyToken, chaptersRouter)
app.use('/lessons', grant('admin'), verifyToken, lessonsRouter)
app.use('/image-courses', grant('admin'), verifyToken, imageCoursesRouter)
app.use('/my-courses', verifyToken, myCoursesRouter)
app.use('/reviews', grant('admin', 'student'), verifyToken, reviewsRouter)
app.use('/webhook', webhookRouter)

module.exports = app;
