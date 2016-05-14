import express from "express";
import schema from "./data/schema";
import GraphQLHTTP from "express-graphql";

import {MongoClient} from "mongodb";

let app = express();

app.use(express.static("public"));

app.use("/graphql", GraphQLHTTP({
  schema: schema,
  graphiql: true
}));

// MongoDb url is expected as first cli argument, default url otherwise
let mongoUrl = "mongodb://rgrjs:123456@ds025469.mlab.com:25469/rgrjs";
let db

console.log(mongoUrl);
MongoClient.connect(mongoUrl, (err, database) => {
  if (err) throw err;

  db = database;

});

app.get("/data/links", (req, res) => {
  db.collection("links").find({}).toArray((err, links) => {
    if (err) throw err;

    res.json(links);
  });
});

app.listen(3000);
