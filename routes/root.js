const express = require('express');
const router = express.Router();
const path = require('path');

//('^/$|/index.html', (req, res) : must begin with a slash, end with a slash or index,html
//('^/$|/index(.html)?', (req, res) : makes .html optional, route can work as /index
router.get('^/$|index(.html)?', (req, res) => { 
    res.sendFile(path.join(__dirname, '..','views', 'index.html')); // 301 - permamnent redirect
});

router.get('^/$|test(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..','views', 'test.html'));
});

// redirect permanently with 301 / temporarly with 302 when page does not exist
router.get('^/$|oldpage(.html)?', (req, res) => { //oldpage does not exists
    res.redirect(301, 'index'); // 301 - permamnent redirect
});


module.exports = router;
