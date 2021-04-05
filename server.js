const express = require('express')
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('/public/'));

app.use(express.static(path.join(__dirname, '')));
app.use('index.js', (req, res, next) => {
    res.sendFile('./index.js');
});

app.use(express.static(path.join(__dirname, '')));
app.use('styles.css', (req, res) => {
    res.sendFile('styles.css');
});

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/index', (req, res, next) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/notes', (req, res, next) => {
    res.sendFile(path.join(__dirname, './notes.html'));
});

app.get('/api/notes', (req, res, next) => {
    res.sendFile(path.join(__dirname, './db.json'));
});

app.get('/api/notes/:id', (req, res, next) => {
    let allTheNotes = JSON.parse(fs.readFileSync('./db.json'));
    res.json(allTheNotes[Number(req.params.id)]);
});

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.post('/api/notes', (req, res, next) => {
    let allTheNotes = JSON.parse(fs.readFileSync('./db.json'));
    let newNote = req.body;
    let noteID = (allTheNotes.length).toString();
    newNote.id = noteID;
    allTheNotes.push(newNote);

    fs.writeFileSync('db.json', JSON.stringify(allTheNotes));
    res.json(allTheNotes);
});

app.delete('/api/notes/:id', (req, res, next) => {
    let allTheNotes = JSON.parse(fs.readFileSync('./db.json'));
    let noteID = req.params.id;
    let newID = 0;
    allTheNotes = allTheNotes.filter(deleteThisNote => {
        return deleteThisNote.id != noteID;
    });

    for (deleteThisNote of allTheNotes) {
        deleteThisNote.id = newID.toString();
        newID++;
    }

    fs.writeFileSync('./db.json', JSON.stringify(allTheNotes));
    res.json(allTheNotes);
});

app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));
