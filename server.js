// global object instead of window object
// console.log(global)

// const  os =require('os')
// console.log(os.type())
// console.log(os.version())

const express = require('express')
const app = express(); 
const path =  require('path')
const PORT = process.env.PORT || 3500;
const cors = require('cors');

//This is how you apply middleware: NOte middle are applied with () brackets

//custome middleware
app.use((req, res, next) => {
    console.log(req.method, req.path)
    next();
});

//Third party middleare:

//! NOTE: You can add a whitelist to allow specific front-end domains to access this backend, check documentation 
app.use(cors());


app.use(express.urlencoded({extended: false}));
app.use(express.json());
//All static routes should be put in the public folder
app.use(express.static(path.join(__dirname, '/public'))); // serve static files from public folder

//('^/$|/index.html', (req, res) : must begin with a slash, end with a slash or index,html
//('^/$|/index(.html)?', (req, res) : makes .html optional, route can work as /index
app.get('^/$|index(.html)?', (req, res) => { 
    res.sendFile(path.join(__dirname, 'views', 'index.html')); // 301 - permamnent redirect
});

// redirect permanently with 301 / temporarly with 302 when page does not exist
app.get('^/$|oldpage(.html)?', (req, res) => { //oldpage does not exists
    res.redirect(301, 'index'); // 301 - permamnent redirect
});

//==================================

// routes are navigated like a waterfall, so the not found route should be last
// app.get('/*', (req, res) => {
//     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// })

// we can update the catch all route like abelow
app.all('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})


//=================

//middleware: builtin, custom, 3rd party



// You can also catch errors using middleware
app.use(function(err, req, res, next) {
    console.log(err.stack)
    res.status(500).send(err.message);
    
});

app.listen(PORT, console.log(`server running on port ${PORT}`));
