const fs = require("fs");

// let consulta1 = client.query().q({ text: "test", title: "test" });
// let consulta2 = 'q=*%3A*&wt=json';

function execute(param1, param2, client) {
    // cat%3A*&rows=50&sort=price%desc&wt=json
    const consulta = `q=${param1}%3A${param2}&rows=50&sort=price%20desc&wt=json`;
    console.log(consulta);
    return client
        .search(consulta)
        .then(function(result, resolve) {
            // console.log('Response:', result.response.docs);
            return result.response.docs;
        })
        .then(results => {
            // console.log("test", results);
            const data = results.map(function(result) {
                // console.log("testinho", result);
                if (!result.price) {
                    return {
                        id: null,
                        name: null,
                        value: null
                    };
                }
                return {
                    id: result.id,
                    name: result.name[0],
                    value: result.price[0]
                };
            });
            return data;
        })
        .then(data => {
            // data.sort(function(a, b) {
            //     // eslint-disable-next-line no-nested-ternary
            //     return a.value > b.value ? -1 : a.value < b.value ? 1 : 0;
            // });

            const datan = { subvalues: data };

            fs.writeFile(
                "./src/resultado.json",
                JSON.stringify(datan, null, 4),
                function(err) {
                    console.log("JSON escrito com sucesso!");
                }
            );
            return datan;
        })
        .catch(function(err) {
            console.error(err);
        });
}

module.exports = {
    execute
};
