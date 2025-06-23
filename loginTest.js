const axios = require('axios');

async function loginTest() {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'test31@example.com',
      password: '9999999999'
    });
    console.log('Login successful!');
    console.log('Token:', response.data.token);
    console.log('User:', response.data.user);
  } catch (error) {
    if (error.response) {
      console.error('Login failed:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

loginTest();