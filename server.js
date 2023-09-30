// global object instead of window object
// console.log(global)

// const  os =require('os')
// console.log(os.type())
// console.log(os.version())

const express = require('express')
const app = express(); 
const path =  require('path')
const PORT = process.env.PORT || 3500;

//('^/$|/index.html', (req, res) : must begin with a slash, end with a slash or index,html
//('^/$|/index(.html)?', (req, res) : makes .html optional, route can work as /index
app.get('^/$|index(.html)?', (req, res) => { 
    res.sendFile(path.join(__dirname, 'views', 'index.html')); // 301 - permamnent redirect
});

app.get('^/$|oldpage(.html)?', (req, res) => { //oldpage does not exists
    res.redirect(301, 'index'); // 301 - permamnent redirect
});



app.listen(PORT, console.log(`server running on port: ${PORT}`));