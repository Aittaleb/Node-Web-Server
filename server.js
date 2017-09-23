var express = require('express');
var handlebars = require('handlebars');
const fs = require('fs');
var hbs = require('hbs');
var app = express();

const port = process.env.PORT || 3000;


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear' , () => {
        return new Date().getFullYear();
    });
    
    hbs.registerHelper('screamIt', (text) => {
            return text.toUpperCase();
        })
        
        
        app.use((req,res,next) => {
            var now = new Date().toString();
            var log = `${now} : ${req.method} ${req.url}`;
            fs.appendFile('server.log' , log + '\n' , (err) => {
                if(err){
                    console.log('unable to fetch data');
                }
            } );
            next();
        });
        
        // app.use((req , res , next) => {
        //     res.render('maintenance.hbs' , {
        //             message : 'this site is under maintnance !!'
        //         });
        //     });
            
            app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
   
    res.render('home.hbs', {
        pageTitle: 'Home',
        date: new Date().getFullYear(),
        welcomeMessage: 'Hello again !! its nice to have you back ;) '
    })

   
}).get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        date: new Date().getFullYear()
    });
  
}).get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfill task'
    })
}).get('/projects',(req,res) => {
    res.render('projects.hbs',{
        pageTitle : 'Projects page'
    })

});

app.listen(port, () => {
    console.log(`Listening on port  ${port}`);
})