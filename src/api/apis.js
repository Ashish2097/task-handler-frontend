const axios = require('axios');

export const getAllUsers = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    return {
      isSuccess: true,
      data: response,
    };
  } catch (e) {
    return {
      isSuccess: false,
      errorMessage: 'api nahi chal ri',
    }
  }
}