import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_DB_BASE_URL,
  headers: {
    "Content-type": "application/json"
  }
});