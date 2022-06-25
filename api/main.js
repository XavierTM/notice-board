

console.clear();

const express = require('express');
const morgan = require('morgan');


// request handlers
function postMessage(req, res) {
  
   if (!req.body.notice)
      res.status(400).send('Notice is required.');

   notices.push(req.body.notice.substring(0, 24));
   notices.shift();

   res.send();

}

function getNotices(req, res) {
   res.send(notices);
}


function clearNotices(req, res) {
   notices.length = 0;
   notices.push('', '', '', '');
   res.send();
}



const app = express();

// middlewares
app.use(express.static('static'));
app.use(morgan('dev'));
app.use(express.json());



// routes
app.post('/api/notices', postMessage);
app.get('/api/notices', getNotices);
app.delete('/api/notices', clearNotices);


// start server
const PORT = process.env.PORT || 8080;

app.listen(PORT, function() {
   console.log('Server started at PORT', PORT);
})


const notices = ['', '', '', ''];