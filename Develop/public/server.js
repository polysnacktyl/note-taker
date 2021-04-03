const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('/public/'));
app.use(express.static(path.join(__dirname, 'assets/js/')));

app.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('indexjs', function (req, res) {
    res.sendFile('index.js');
});

app.get("/index", (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get("/notes", (req, res, next) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
});

app.get("/api/notes", (req, res, next) => {
    res.json(notes);
        console.log(notes);
    });

    app.listen(port, () => console.log(`App listening on port: ${port}`));