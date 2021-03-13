import config from '../config';
const axios = require('axios');

const { baseUrl } = config;

export const getAllUsers = async () => {
  try {
    const response = await axios.get(baseUrl+'/users/fetch');
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

export const getAllTasks = async (userId) => {
  try {
    const response = await axios.get(baseUrl+'/task/fetch?userId='+userId);
    return {
      isSuccess: true,
      data: response,
    };
  } catch (e) {
    return {
      isSuccess: false,
      errorMessage: 'task api nahi chal ri',
    }
  }
}

export const markDoneApi = async (params) => {
  try {
    const response = await axios.patch(baseUrl+'/task/markdone', params);
    return {
      isSuccess: true,
    };
  } catch (e) {
    return {
      isSuccess: false,
      errorMessage: 'markdone api nahi chal rahi',
    }
  }
  
}
export const pickTaskApi = async (body) => {
  try {
    const response = await axios.patch(baseUrl+'/task/pick', body);
    return {
      isSuccess: true,
    };
  } catch (e) {
    return {
      isSuccess: false,
      errorMessage: 'task add api nahi chal rahi',
    }
  }
}

export const addTaskToQueue = async (body) => {
  try {
    const response = await axios.post(baseUrl+'/task/add', body);
    return {
      isSuccess: true,
    };
  } catch (e) {
    return {
      isSuccess: false,
      errorMessage: 'task add api nahi chal rahi',
    }
  }
}
