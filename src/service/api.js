import axios from 'axios';
const API_BASE_URL = process.env.NODE_ENV === 'production' ? 'https://localhost:8080.herokuapp.com/api':'http://localhost:8080/api';
console.log('API base URL:',API_BASE_URL);
const api = axios.create({baseURL: API_BASE_URL,});
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    console.log('token:',token);
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
        console.log('Interceptor добавил заголовок Authorization');
    }
    return config;
});
export default api;