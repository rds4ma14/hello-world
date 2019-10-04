const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const cors = require("cors");
const helmet = require("helmet");

const app = express();
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
app.use(cors());
app.use((req, res, next) => {
    //  o ideal seria trocar o "*" por um whitelist de dominios que podem fazer "crossorigin"
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.get("/api/greeting", async (req, res) => {
    const SolrNode = require("solr-node");
    const Solr = require("./../src/Solr");

    const cliente = new SolrNode({
        host: "127.0.0.1",
        port: "8983",
        core: "my-core",
        protocol: "http"
    });

    const { name } = req.query;
    const { search } = req.query;

    const test = await Solr.execute(name, search, cliente);

    // console.log(test);

    res.send(test);
    // res.send({ greeting: `${test}` });
    // res.send(
    //     JSON.stringify({ greeting: `Solr Query: q="${name}:${search}"!` })
    // );
    // res.send(JSON.stringify({ greeting: `Hello ${test}!` }));
});

app.listen(3001, () =>
    console.log("Express server is running on localhost:3001")
);
