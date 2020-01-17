const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

// construct a schema, using graphql schema language
const schema = buildSchema(`
    type RandomDie {
        numSides: Int!
        rollOnce: Int!
        roll(numRolls: Int!): [Int]
        message: String
    }


    type Query {
        getDie(numSides: Int): RandomDie
        quoteOfTheDay: String
        random: Float!
        rollThreeDice: [Int]
        hello: String
    }
`);

class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({ numRolls }) {
    const output = [];
    for (let i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }

  message() {
    return "RollDie Class";
  }
}

// the root providers a resolver function for each API endpoint
const root = {
  quoteOfTheDay: () =>
    Math.random() < 0.5 ? "Take it easy" : "Salvation lies within",
  random: () => Math.random(),
  rollThreeDice: () => {
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
  },
  hello: () => "Hello, Wolrd",
  getDie: ({ numSides }) => new RandomDie(numSides || 6)
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
