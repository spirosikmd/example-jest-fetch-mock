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
});
