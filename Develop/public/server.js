const express = require("express");
const app = express();
const port = 3000;
const path = require('path');
//process.env.PORT ||

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'));
   });

app.get("/notes", (req, res, next) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
});


app.listen(port, () => console.log(`App listening on port: ${port}`));