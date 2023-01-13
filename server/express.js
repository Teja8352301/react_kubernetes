const {default: axios} = require("axios");
const express = require("express");
require("dotenv").config();
const fs = require("fs");
var cors = require("cors");
const {get} = require("lodash");
const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const {StaticRouter, matchPath} = require("react-router-dom");
const app = express();
const {App} = require("../src/components/app");
const bodyParser = require("body-parser");
const logger = require("./logger");

const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
// configure the app to use bodyParser()
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// import App component
// const { App } = require( '../src/components' );
// import App from '../src/component'

app.get(
  /\.(js|css|map|ico|png)$/,
  express.static(path.resolve(__dirname, "../dist"))
);

app.disable("etag");

app.use("*", async (req, res) => {
  let componentData = {};
  let indexHTML = fs.readFileSync(
    path.resolve(__dirname, "../dist/index.html"),
    {
      encoding: "utf8",
    }
  );
  let appHTML = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={componentData}>
      <App />
    </StaticRouter>
  );

  indexHTML = indexHTML.replace(
    '<div id="app"></div>',
    `<div id="app">${appHTML}</div>`
  );

  res.contentType("text/html");
  res.status(200);

  return res.send(indexHTML);
});


    app.listen(PORT, () => {
      logger.info("Express server started at http://localhost:" + PORT);
    });
