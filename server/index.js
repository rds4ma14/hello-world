const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const helmet = require("helmet");
const cors = require("cors");

const app = express();
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
app.use(cors());
app.use((req, res, next) => {
    //o ideal seria trocar o "*" por um whitelist de dominios que podem fazer "crossorigin"
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.get("/api/greeting", (req, res) => {
    // console.log("AAAAAAAA BENCOADO", req.query.name);

    const solr = require("./../src/Solr");
    const name = req.query.name || "World";
    // console.log("AAAAAAAA BENCOADO", req.query.name);
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.listen(3001, () =>
    console.log("Express server is running on localhost:3001")
);
