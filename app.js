const express = require('express')
const app = express()
require('dotenv').config()
const session = require('express-session')
const bodyParser = require("body-parser");
const userRouter = require('./router/User')
const adminAuth = require('./router/AdminAuthRouter')
const adminDashboard = require('./router/DashboardRouter')
const adminCrud = require('./router/AdminCrudRouter')
const db = require('./config/db')
const blogRouter = require('./router/BlogsRouter')
const serviceRouter = require('./router/ServiceRouter')
const newsRouter = require('./router/NewsRouter')
const projectRouter = require('./router/ProjectRouter')
const contactRouter = require('./router/AdminContactRouter')
const quotesRouter = require('./router/AdminQuotesRouter')
const adminProfileRouter = require('./router/ProfileRouter')
const flash = require('express-flash-messages')
const responseTime = require('response-time')

//API Imports

const apiContactRouter = require('./api/router/user/ContactAPIRouter')
const userAuthAPIRouter = require('./api/router/user/UserAuthRouter')
const userProjectAPIRouter = require('./api/router/user/ProjectAPIRouter')
const apiBlogsRouter = require('./api/router/user/BlogsRouter')
const servieAPIRouter = require('./api/router/user/ServicesAPIRouter')
const projectAPIRouter = require('./api/router/user/ProjectAPIRouter')
const newsAPIRouter = require('./api/router/user/NewsApiRouter')
const createAdminRouter = require('./api/router/admin/AdminAuth')


app.use(express.static("public", { maxAge: 60 * 60 * 1000 }))
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: "session_secret_123",
    saveUninitialized: true,
    secure: true,
    resave: true,
    cookie: {
        maxAge: 259200000,
        expires: 259200000
    },
    rolling: true,
    expires: 259200000
}))
app.use(flash())
app.use(responseTime())


app.use(userRouter)
app.use('/admin', adminAuth)
app.use('/admin', adminDashboard)
app.use('/admin', adminCrud)
app.use(blogRouter)
app.use(newsRouter)
app.use(serviceRouter)
app.use(projectRouter)
app.use(contactRouter)
app.use('/admin', quotesRouter)
app.use('/admin', adminProfileRouter)


// API Routes
app.use('/api', apiContactRouter)
app.use('/api', userAuthAPIRouter)
app.use('/api', apiBlogsRouter)
app.use('/api', userProjectAPIRouter)
app.use('/api', servieAPIRouter)
app.use('/api', projectAPIRouter)
app.use('/api', newsAPIRouter)
app.use('/api', createAdminRouter)
    //404 page
app.get('*', function(req, res) {
    res.render("404")
})

db.sync().then(data => {
    db.authenticate()
        .then(() => {
            app.listen(process.env.PORT||80)
            console.log("Syncing... " + "https://bizzcons.herokuapp.com")
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });

}).catch(err => {
    console.log(err)
})