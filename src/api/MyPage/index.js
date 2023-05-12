//API
import axios from 'axios';
import getEnvVars from 'api/environment.js';
const { apiUrl } = getEnvVars();

export const getPatientList = async function (token) {

    try {
        let options = {
            url: `${apiUrl}/patients/`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const response = await axios(options);
        return response;
        
    } catch (error) {
        throw error;
    }
}