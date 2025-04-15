const respond = (request, response, content, type, status) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const getUsers = (request, response) => {
  const message = "";

  const userData = {
    users: {},
  };

  if(request.method == "GET"){
    return respond(request, response, JSON.stringify(userData), 'application/json', 200);
  }

  return respond(request, response, message, 'application/json', 200);
  
  };

const notFound = (request, response) => {
  let message = "";

  if(request.method == "GET"){
    message = 'The page you are looking for was not found.';
    return respond(request, response, message, 'application/json', 404);
  }

  return respond(request, response, message, 'application/json', 404);
};

const addUser = (request, response) => {
  const userData = {
    message: '',
    users: {
      name: '',
      age: '',
    },
  };

  // if user is new, return 201 status
  // if user is not new and age is updated, return 204 status
  // if user data is missing name or age, return 400 status

  const message = `User added: ${userData.name}, ${userData.age}`;
  console.log(message);
  return respond(request, response, JSON.stringify(userData), 'application/json', 200);
};

module.exports = {
  getUsers, notFound, addUser,
};
