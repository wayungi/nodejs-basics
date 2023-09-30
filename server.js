// global object instead of window object
// console.log(global)

// const  os =require('os')
// console.log(os.type())
// console.log(os.version())

const express = require('express')
const app = express(); 
const path =  require('path')
const PORT = process.env.PORT || 3500;

//This is how you apply middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
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

// routes are navigated like a waterfall, so the not found route should be last
app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

//middleware: builtin, custom, 3rd party



app.listen(PORT, console.log(`server running on port ${PORT}`));
