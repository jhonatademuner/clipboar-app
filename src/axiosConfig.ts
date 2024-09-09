import axios from 'axios';

// Set the base URL for your API
const instance = axios.create({
  baseURL: 'http://localhost:8080/', // Replace with your actual base URL
  timeout: 10000, // Optional: Set a timeout (in milliseconds)
  headers: {
    'Content-Type': 'application/json',
    
  },
});

export default instance;
