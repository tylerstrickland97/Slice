const express = require('express');
const path = require('path');

const port = process.env.PORT || 3001;

const app = express();

app.use(express.static(__dirname + '/static'));

const html_dir = __dirname + "/static/templates";

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// All other GET requests not handled before will return our React app
app.get('/', (req, res) => {
  res.sendFile(html_dir + "/login.html");
});

app.get('/home', (req, res) => {
  res.sendFile(html_dir + "/home.html");
});

app.get('/register', (req, res) => {
  res.sendFile(html_dir + "/register.html");
});

app.listen(port, () => {
    console.log("Listening on port: " + port);
});