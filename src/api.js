const respond = (request, response, content, type, status) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const getUsers = (request, response) => {
  // if Get, 200 and display results
  // if Head, 200 no results and don't parse JSON data

  const userData = {
    users: {},
  };

  return respond(request, response, JSON.stringify(userData), 'application/json', 200);
};

const notFound = (request, response) => {
  const message = 'The page you are looking for was not found.';

  // if Get, 404 and display error message
  // if Head, no error message
  return respond(request, response, message, 'application/json', 404);
};

const addUser = (request, response) => {
  const userData = {
    message: '',
    name: '',
    age: '',
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
