import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/api/agents',
    withCredentials: true,
});

export const createSellerAgent = (data) => API.post('/seller', data);
export const getMyAgents = () => API.get('/seller/mine');
export const getAgentBySlug = (slug) => API.get(`/${slug}`);
export const chatWithAgent = (slug, messages) => API.post(`/${slug}/chat`, { messages });
