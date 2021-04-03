const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res, next) => {
 res.send("main route");
});

app.get("/index", (req, res, next) => {
    res.send("index route");
   });

app.get("/notes", (req, res, next) => {
 res.send("notes route");
});


app.listen(port, () => console.log(`App listening on port: ${port}`));