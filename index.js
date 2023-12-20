const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const functionExecutor = require('./routes/serverless-execution.route');
const serverlessFunctionRoute = require('./routes/serverless-function.route');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client", "dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
})

app.use('/serverless-function', serverlessFunctionRoute);
app.use('/execute', functionExecutor);
app.all("*", (req, res) => {
  res.send("404 Not Found");
})

app.listen(port, () => {
  console.log(`Listening on port \n\nhttp://localhost:${port}/`)
});