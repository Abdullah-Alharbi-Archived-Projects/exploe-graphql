const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

// construct a schema, using graphql schema language
const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

// the root providers a resolver function for each API endpoint
const root = {
  hello: () => "Hello, From Graphql Server!"
};

// express server
const app = express();
app.use("/static/", express.static("public"));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(4000, () =>
  console.log("Running a graphql API server at http://localhost:4000/graphql")
);
