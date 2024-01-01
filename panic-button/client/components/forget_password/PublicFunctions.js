import axios from 'axios';
import { SERVER_BASE_URL } from '@env';


export const sendVerificationCode = async (email) => {
        return await axios.post(`${SERVER_BASE_URL}/api/reset-password/initiate-reset`, { email })
            .then(response => {
                return response.data;
            }).catch(error => {
                const { data, status } = error.response;
                throw {data, status}});

}

