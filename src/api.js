const respond = (request, response, content, type, status) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const success = (request, response, acceptedTypes) => {
  const message = 'Success!';
  if (acceptedTypes[0] === 'text/xml') { // acceptedTypes is an array of MIME types, sourced from client file
    const responseXml = `<response><message>${message}</message></response>`;
    console.log(responseXml);
    return respond(request, response, responseXml, 'text/xml', 200);
  }
  return respond(request, response, message, 'application/json', 200);
};

const getUsers = (request, response) => {
  const message = 'get users';

  return respond(request, response, message, 'application/json', 200);
};

const notFound = (request, response, acceptedTypes) => {
  const message = 'The page you are looking for was not found.';
  if (acceptedTypes[0] === 'text/xml') {
    const responseXml = `<response><message>${message}</message></response>`;
    console.log(responseXml);
    return respond(request, response, responseXml, 'text/xml', 404);
  }
  return respond(request, response, message, 'application/json', 404);
};

module.exports = {
  success, getUsers, notFound,
};
