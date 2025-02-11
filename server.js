require('dotenv').config();
const express = require('express');
const pathResolver = require('path');
const router = require('./router');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const csurf = require('csurf');
const session = require('express-session');
const MongoStore =require('connect-mongo');
const flash = require('express-flash')
const middleware = require('./src/middlewares/middleware');

const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.connectionString)
.then(() => { 
    app.emit('Conectado');
})
.catch(e => console.log(e));

const port = 3000;

const sessionOptions = session({
    secret: process.env.SESSION_SECRET,
    store:  MongoStore.create({ mongoUrl: process.env.connectionString}),
    resave: true,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
});

app.use(sessionOptions)
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(pathResolver.resolve(__dirname,'public')));
app.set('views',pathResolver.resolve(__dirname,'src','views'));
app.set('view engine', 'ejs');

app.use(
    flash()
  );

app.use(helmet());
app.use(cookieParser());
app.use(csurf({cookie:{httpOnly:true}}));
app.use(middleware.newCsrftoken);
app.use(middleware.chechCsfrError);

app.on('Conectado', ()=>{
   
    app.listen(port, ()=> {
        console.log(`Rodando em: http://localhost:${port}`);
    });
});



app.use(router);