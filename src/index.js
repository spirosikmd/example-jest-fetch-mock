const fetch = require('cross-fetch');

function request() {
  return fetch('https://randomuser.me/api', {}).then(response =>
    response.json()
  );
}

module.exports = request;
