//API
import axios from 'axios';
import getEnvVars from 'api/environment.js';
const { apiUrl } = getEnvVars();

export const familyLocalLogin = async function (id, password) {
    
    try {
        let options = {
            url: `${apiUrl}/authentication/LOGIN?identity=family`,
            method: 'POST',
            data: {
                id: id,
                password: password,
            }
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error;
    }
}

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