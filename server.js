const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

// construct a schema, using graphql schema language
const schema = buildSchema(`
    type Query {
        quoteOfTheDay: String
        random: Float!
        rollThreeDice: [Int]
        hello: String
        rollDice(numDice: Int!, numSides: Int): [Int]
    }
`);

// the root providers a resolver function for each API endpoint
const root = {
  quoteOfTheDay: () =>
    Math.random() < 0.5 ? "Take it easy" : "Salvation lies within",
  random: () => Math.random(),
  rollThreeDice: () => {
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
  },
  hello: () => "Hello, Wolrd",
  rollDice: ({ numDice, numSides }) => {
    const output = [];
    for (let i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  }
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
