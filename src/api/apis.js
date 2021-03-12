const axios = require('axios');

export const getAllUsers = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    return {
      isSuccess: true,
      data: [{
        id: 1,
        name: 'Adam',
        email: 'adam@shipsy.co.in',
        team: 'Dynamite',
        department: 'Engineering',
        managerId: 4,
      },
      {
        id: 2,
        name: 'Eve',
        email: 'eve@shipsy.co.in',
        team: 'Dynamite',
        department: 'Engineering',
        managerId: 4,
      },
      {
        id: 3,
        name: 'Snape',
        email: 'snape@shipsy.co.in',
        team: 'Hogwarts',
        department: 'Teaching',
        managerId: 4,
      }],
    };
  } catch (e) {
    return {
      isSuccess: false,
      errorMessage: 'api nahi chal ri',
    }
  }
}

export const getAllTasks = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    return {
      isSuccess: true,
      data: [{
        id: 1,
        assigneeId: 2,
        assigneeName: 'Eve', 
        assignorId: 1,
        assignorName: 'Adam',
        title: 'ED-1234',
        description: 'Task Handler: App to help you complete your tasks on time',
        jiraID: 'ED-1234',
        timeEstimate: 4,
        timeElapsed: 2.5,
      },
      {
        id: 2,  
        assigneeId: 3,
        assigneeName: 'Snape', 
        assignorId: 4,
        assignorName: 'Dumbledore',
        title: 'ED-0001',
        description: 'Find General Zod',
        jiraID: 'ED-1234',
        timeEstimate: 4,
        timeElapsed: 0,
      }],
    };
  } catch (e) {
    return {
      isSuccess: false,
      errorMessage: 'task api nahi chal ri',
    }
  }
}