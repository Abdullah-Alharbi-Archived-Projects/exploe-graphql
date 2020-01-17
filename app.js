const { graphql, buildSchema } = require("graphql");

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const root = { hello: () => "Hello, World!" };

(function() {
  graphql(schema, "{ hello }", root)
    .then(response => console.log(response))
    .catch(error => console.log(error));
})();
