const jsonServer = require('json-server');

const fetchData = require('./index.js');
const adsMiddleware = require('./handle-ads.js');
const delayMiddleware = require('./handle-delay.js');

/**
 * Handles the server creation
 * @param {Function}
 */
async function createServer() {
  // API port
  const port = 3001;

  // creates a new json-server
  const server = jsonServer.create();

  // get default middleware and require our owns
  const middleware = jsonServer.defaults();

  // rewrite the routes
  const rewriter = jsonServer.rewriter(require('./routes.json'));

  // generate random data and give it to json-server
  const data = fetchData();

  const router = jsonServer.router(data);

  // use default and our middleware
  server.use(middleware);
  server.use(delayMiddleware);
  server.use(adsMiddleware);
  // use our route rewriter and our data
  server.use(rewriter);
  server.use(router);
  // listen the server
  server.listen(port, () => {
    const serverUrl = `http://localhost:${port}`;
    console.log(serverUrl);
  });
}

createServer();
