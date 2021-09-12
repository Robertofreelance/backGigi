const { ApolloServer, PubSub } = require("apollo-server-express");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const express = require("express");
const path = require("path");
const http = require("http");

const cors = require("cors");
const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config.js");

async function startApolloServer() {
  const PORT = process.env.PORT || 5000;
  const app = express();
  app.use(cors());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => req
  });
  await server.start();
  server.applyMiddleware({ app });

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  // Make sure to call listen on httpServer, NOT on app.
  await new Promise((resolve) => httpServer.listen(PORT, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  return { server, app, httpServer };
}

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(async () => {
    return await startApolloServer();
  })

  .catch((err) => {
    console.error(err);
  });
