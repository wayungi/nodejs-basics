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
app.use('/subdir', express.static(path.join(__dirname, '/public'))); // serve static files from public folder



// Routes

// NOTE: express now supoports regex inside app.use('^/$')
// add the routes for subdir routes which were added through a router
app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));

//api routes
app.use('/employees', require('./routes/api/employees'));



//==================================
// routes are navigated like a waterfall, so the not found route should be last
// app.get('/*', (req, res) => {
//     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// })

// we can update the catch all route like abelow, app.all is for routes and catches all http methods at once
app.all('*', (req, res) => {

    res.status(404);

    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }else if(req.accepts('json')){
        res.json({error: "404 Not Found"});
    }else {
        res.type('txt').send('404 Not found');
    }
})


//=================

//middleware: builtin, custom, 3rd party



// You can also catch errors using middleware
app.use(function(err, req, res, next) {
    console.log(err.stack)
    res.status(500).send(err.message);
    
});

app.listen(PORT, console.log(`server running on port ${PORT}`));
