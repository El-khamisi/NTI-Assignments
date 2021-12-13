const express = require('express');
const request = require('request');
const path = require('path');
const hbs = require('hbs');
const controllers = require('./controllers/news.js');


require('dotenv').config(); //Now you can use environment variables with process.env 

const app = express();
const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, './public/views');
// app.use(express.static(viewsPath));

const partialsPath = path.join(__dirname, './public/views/partials');
hbs.registerPartials(partialsPath);


app.set('views', viewsPath);
app.set('view engine', 'hbs');



// --------- Routers -----------

const newsapi = (contry, callback) => {
    const apiKey = process.env.API_KEY;
    const urlString = `https://newsapi.org/v2/everything?q=${contry}&apiKey=${apiKey}`;

    request({ url: urlString, json: true }, (error, response) => {
        if (!error && response.body.status === 'ok') {
            callback(undefined, response.body.articles)
        }
    });
}



app.get('/', (req, res, next) => {
        const searchWord = 'egypt';

        newsapi(searchWord, (error, data) => {
            res.render('index', {articles: data});
        });
    }

);


app.listen(port, () => {
    console.log(`Now listening on PORT ${port}...!!`);
})