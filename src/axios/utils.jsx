import axios, {isCancel, AxiosError} from 'axios';

/**
 * Makes an HTTP request using axios.
 * @param {string} url - The endpoint URL to make the request to.
 * @param {string} method - The HTTP method (e.g., 'GET', 'POST', 'PUT', 'DELETE').
 * @param {object} [data] - The payload for POST or PUT requests (default: null).
 * @param {object} [headers] - Custom headers for the request (default: {}).
 * @returns {Promise<object>} - The response data from the server.
 */
async function makeRequest(url, method, data = null, headers = {}) {
  try {
    const options = {
      url,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      data,
    };

    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error(`Error making ${method} request to ${url}:`, error.message);
    if (error.response) {
      // Server responded with a status outside of the 2xx range
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
      throw new Error(error.response.data?.message || 'Request failed with server error');
    } else if (error.request) {
      // Request was made but no response was received
      console.error('No response received:', error.request);
      throw new Error('No response received from server');
    } else {
      // Something happened setting up the request
      throw new Error(error.message);
    }
  }
}