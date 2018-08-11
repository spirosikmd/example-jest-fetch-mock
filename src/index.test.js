const request = require('./');
const fetch = require('jest-fetch-mock');

describe('request', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('returns object when response is json', done => {
    const mockResponse = {
      results: [{ gender: 'neutral' }],
      info: { seed: '0123456789123456', results: 1, page: 1, version: '1.2' }
    };
    fetch.mockResponseOnce(JSON.stringify(mockResponse), {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    request()
      .then(response => {
        expect(fetch).toHaveBeenCalledWith('https://randomuser.me/api', {});
        expect(response).toEqual(mockResponse);
        done();
      })
      .catch(done.fail);
  });

  it('returns text when response is text', done => {
    fetch.mockResponseOnce('ok');

    request()
      .then(response => {
        expect(fetch).toHaveBeenCalledWith('https://randomuser.me/api', {});
        expect(response).toEqual('ok');
        done();
      })
      .catch(done.fail);
  });

  it('returns blob when response is text/csv', done => {
    const contentType = 'text/csv; charset=utf-8';
    fetch.mockResponseOnce('csv data', {
      headers: {
        'Content-Type': contentType
      }
    });

    request()
      .then(response => {
        expect(fetch).toHaveBeenCalledWith('https://randomuser.me/api', {});
        // Blob responses have a type.
        expect(response.type).toBe(contentType);
        done();
      })
      .catch(done.fail);
  });

  it('rejects with error data', done => {
    const errorData = {
      error:
        'Uh oh, something has gone wrong. Please tweet us @randomapi about the issue. Thank you.'
    };
    fetch.mockRejectOnce(JSON.stringify(errorData));

    request()
      .then(done.fail)
      .catch(error => {
        expect(error.message).toBe(errorData.error);
        done();
      });
  });
});
