const http = require('http');
const url = require('url');
const query = require('querystring');
const api = require('./api.js');
const htmlHandler = require('./htmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const getGrabbers = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getStyles,
  '/getUsers': api.getUsers,
  '/notReal': api.notFound,
};

const postHandlers = {
  '/addUser': api.addUser,
};

const handlePost = (request, response, poster) => {
  const body = [];
  request.on('error', (error) => {
    console.dir(error);
    response.statusCode = 400;
    response.end();
  });
  request.on('data', (chunk) => {
    body.push(chunk);
  });
  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    request.body = query.parse(bodyString);
    poster(request, response);
  });
};

const onRequest = (request, response) => {
  console.log(request.url);
  const protocol = request.connection.encrypted ? 'https' : 'http';
  const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);
  request.acceptedTypes = request.headers.accept ? request.headers.accept.split(',') : [];
  request.query = Object.fromEntries(parsedUrl.searchParams);

  if (request.method === 'POST') {
    if (postHandlers[parsedUrl.pathname]) {
      handlePost(request, response, postHandlers[parsedUrl.pathname]);
    } else {
      api.notFound(request, response);
    }
  } else if (getGrabbers[parsedUrl.pathname]) {
    getGrabbers[parsedUrl.pathname](request, response);
  } else {
    api.notFound(request, response);
  }
};

// const onRequest = (request, response) => {
//   console.log(request.url);

//   const parsedUrl = url.parse(request.url);
//   // const acceptedTypes = request.headers.accept.split(',');
//   // const params = query.parse(parsedUrl.query);

//   switch (parsedUrl.pathname) {
//     case '/':
//       htmlHandler.getIndex(request, response);
//       break;
//     case '/style.css':
//       htmlHandler.getStyles(request, response);
//       break;
//     case '/getUsers':
//       api.getUsers(request, response);
//       break;
//     case '/addUser':
//       api.addUser(request, response);
//       break;
//     case 'notReal':
//       api.notFound(request, response);
//       break;
//     default:
//       api.notFound(request, response);
//       break;
//   }
// };

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.01:${port}`);
});
