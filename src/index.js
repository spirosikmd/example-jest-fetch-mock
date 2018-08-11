const fetch = require('cross-fetch');

function request() {
  return fetch('https://randomuser.me/api', {})
    .then(response => {
      const contentType = response.headers.get('content-type');

      if (/application\/json/.test(contentType)) {
        return response.json();
      }

      if (/text\/csv/.test(contentType)) {
        return response.blob();
      }

      if (!contentType || /^text\/|charset=utf-8$/.test(contentType)) {
        return response.text();
      }

      return response;
    })
    .catch(error => {
      const errorData = JSON.parse(error);
      throw new Error(errorData.error);
    });
}

module.exports = request;
