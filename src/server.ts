import express from 'express';
const router = express.Router()


const app = express();

app.use(express.json({ limit: "5mb" }))

app.get('/', (request: express.Request, response) => {
  response.send('Hello world!');
});

app.listen(5000, () => { console.log("Express is UP") });