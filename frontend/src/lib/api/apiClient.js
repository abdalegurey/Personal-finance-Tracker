import useAuthStore from '@/Store/authStore';
import axios from 'axios';
// import useAuthStore from '../Store/authStore';
const API_URL="https://personal-finance-3l6w.onrender.com/api"

const api = axios.create({
   
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use((config) => {

    const token = useAuthStore.getState().token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})


export default api