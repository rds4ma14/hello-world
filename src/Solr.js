const SolrNode = require("solr-node");
const fs = require("fs");

const client = new SolrNode({
    host: "127.0.0.1",
    port: "8983",
    core: "my-core",
    protocol: "http"
});

// let consulta1 = client.query().q({ text: "test", title: "test" });
// let consulta2 = 'q=*%3A*&wt=json';
let consulta3 = "q=*%3A*&rows=20&wt=json";

var results = client
    .search(consulta3)
    .then(function(result, resolve) {
        // console.log('Response:', result.response.docs);
        return result.response.docs;
    })
    .then(results => {
        console.log("test", results);
        var data = results.map(function(result) {
            // console.log("testinho", result);
            return {
                id: result.id,
                name: result.name[0],
                value: result.price[0]
            };
        });
        return data;
    })
    .then(data => {
        data.sort(function(a, b) {
            return a.value > b.value ? -1 : a.value < b.value ? 1 : 0;
        });

        data = { subvalues: data };

        fs.writeFile(
            "./src/resultado.json",
            JSON.stringify(data, null, 4),
            function(err) {
                console.log("JSON escrito com sucesso!");
            }
        );
    })
    .catch(function(err) {
        console.error(err);
    });
