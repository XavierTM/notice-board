

console.clear();

const express = require('express');
const morgan = require('morgan');


// request handlers
function postMessage(req, res) {
  
   if (!req.body.notice)
      res.status(400).send('Notice is required.');

   notice = req.body.notice;

   res.send();

}

function getNotice(req, res) {
   res.send(notice);
}



const app = express();

// middlewares
app.use(express.static('static'));
app.use(morgan('dev'));
app.use(express.json());



// routes
app.post('/api/notice', postMessage);
app.get('/api/notice', getNotice);


// start server
const PORT = process.env.PORT || 8080;

app.listen(PORT, function() {
   console.log('Server started at PORT', PORT);
})


let notice = '';