if (process.env.NODE_ENV !== 'production') 
{
    require('dotenv').config();
}

const express = require('express');

const server = express();
const path = require('path');
const hbs = require('hbs');
const router = require('./routes/pages');


const {PORT} = process.env;

// define paths for express config
const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');

server.set('view engine', 'hbs');
server.set('views', viewsPath);
hbs.registerPartials(partialsPath);

server.use('/public',express.static(path.join(__dirname, 'public')))
server.use(express.json());
server.use(middleware = (req,res,next)=>
{
    // Authenticate Method// 
    console.log("Authenticated...");
    next();
})
server.use(express.urlencoded({ extended: false }));
server.use('/', router)



server.listen(PORT, (err) => {
    if(err) console.log(err);
    console.log(`Listening on port => http://localhost:${PORT}`);
})

