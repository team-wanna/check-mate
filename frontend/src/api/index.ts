import axios from 'axios';

const createApiInstance = () => axios.create({ baseURL: '/api' });

const apiInstance = createApiInstance();

export default { apiInstance };
