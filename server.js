import cors from 'cors';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloExpressMiddleWare } from '@apollo/server/express4';
import { authMiddleware, handleLogin } from './auth.js';
import { readFile } from 'node:fs/promises';
import { resolvers } from './resolvers.js';

const PORT = 9000;

const app = express();
app.use(cors(), express.json(), authMiddleware);

const querySchema = await readFile('./schema.graphql', 'utf-8');

const apolloServer = new ApolloServer({ typeDefs: querySchema, resolvers });
await apolloServer.start();

app.use('/graphql', apolloExpressMiddleWare(apolloServer));

app.post('/login', handleLogin);

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Graphql running http://localhost:${PORT}/graphql`);
});
