import axios from 'axios';
import { apiPrefix } from '../../server/config.json';

export default {
    listCars(userId) {
	   return axios.get(`${apiPrefix}/user_id/${userId}`);
    },

    getAuth(authData) {
        return axios.post(`${apiPrefix}/auth`, authData);
    }	
}