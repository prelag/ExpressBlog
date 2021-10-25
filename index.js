const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginuserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');
const validationMiddleware = require('./middleware/validationMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const authMiddleware = require('./middleware/authMiddleware');

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true, useUnifiedTopology: true});

const app = new express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use(expressSession({
    secret: 'keyboard cat'
}));

app.use(flash());

const customMiddleWare = (req, res, next) =>{
    console.log('Custom middleware was called');
    next();
}

app.use(customMiddleWare);

app.use('/posts/store', validationMiddleware);

app.listen(4000, ()=> {
    console.log('App listening on port 4000');
});

global.loggedIn = null;

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});

/*
app.get('/', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'pages/index.html'));
});
*/
app.get('/', homeController);

/*
app.get('/contact', (req, res)=> {
    //res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
    res.render('about');
});

app.get('/about', (req, res)=> {
    //res.sendFile(path.resolve(__dirname, 'pages/about.html'));
    res.render('contact');
});
*/

app.get('/post/:id', getPostController);

app.get('/create', (req, res)=> {
    res.render('create');
});

app.get('/posts/new', authMiddleware, newPostController);
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.get('/auth/logout', logoutController);
	

app.post('/posts/store', authMiddleware, storePostController);
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginuserController);

//404 page
app.use((req, res) => res.render('notfound'));
