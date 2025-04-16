const http = require('http');
const url = require('url');
const query = require('querystring');
const api = require('./api.js');
const htmlHandler = require('./htmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (request, response) => {
  console.log(request.url);

  const parsedUrl = url.parse(request.url);
  const acceptedTypes = request.headers.accept.split(',');
  const params = query.parse(parsedUrl.query);

  switch (parsedUrl.pathname) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    case '/style.css':
      htmlHandler.getStyles(request, response);
      break;
    case '/getUsers':
      api.getUsers(request, response);
      break;
    case '/addUser':
      api.addUser(request, response);
      break;
    case 'notReal':
      api.notFound(request, response);
      break;
    default:
      api.notFound(request, response);
      break;
  }
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.01:${port}`);
});
