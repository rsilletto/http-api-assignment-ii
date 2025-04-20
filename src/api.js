// const respond = (request, response, content, type, status) => {
//   response.writeHead(status, { 'Content-Type': type });
//   response.write(content);
//   response.end();
// };

const users = {};

const getUsers = (request, response) => {
  const responseData = {
    users,
  };

  const responseMessage = JSON.stringify(responseData);

  response.writeHead(200, { 'Content-Type': 'application/json' });

  if (request.method !== 'HEAD') {
    response.write(responseMessage);
  }
  response.end();

  // if(request.method == "GET"){
  //   return respond(request, response, responseMessage, 'application/json', 200);
  // }

  // return respond(request, response, message, 'application/json', 200);
};

const notFound = (request, response) => {
  let message = '';

  const responseData = {
    message,
    id: 'notFound',
  };

  const responseMessage = JSON.stringify(responseData);

  response.writeHead(200, { 'Content-Type': 'application/json' });

  if (request.method === 'GET') {
    message = 'The page you are looking for was not found.';
    response.write(responseMessage);
  }

  // return respond(request, response, message, 'application/json', 404);
};

const addUser = (request, response) => {
  const message = `User added: ${users.name}, ${users.age}`;
  console.log(message);

  const responseData = {
    message,
    id: 'addUser',
    users,
  };

  // if user is new, return 201 status
  // if user is not new and age is updated, return 204 status
  // if user data is missing name or age, return 400 status

  const responseMessage = JSON.stringify(responseData);

  response.writeHead(200, { 'Content-Type': 'application/json' });

  if (request.method === 'GET') {
    response.write(responseMessage);
  }
  // return respond(request, response, JSON.stringify(responseData), 'application/json', 200);
};

module.exports = {
  getUsers, notFound, addUser,
};
