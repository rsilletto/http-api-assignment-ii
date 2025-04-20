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
  // const message = `User added: ${users.name}, ${users.age}`;
  const message = 'User added';
  console.log(message);

  const responseData = {
    message,
    id: 'addUser',
    users,
  };

  const {name, age} = request.body;

  if(!name || !age){
    const obj = {
      message: 'Both fields are required',
      id: 'missingData'
    };
    writeResponse(request, response, 400, obj);
    return;
  }
  let statusCode = 204;

  if(!users[name]){
    statusCode = 201;
    users[name] = {name,}
  }
  users[name].age = age;

  if(statusCode === 201){
    const obj = {
      message: 'Created Successfully',
    }
    writeResponse(request, response, statusCode, obj);
    return;
  }
  writeResponse(request, response, statusCode, {});
}

module.exports = {
  getUsers, notFound, addUser,
}
