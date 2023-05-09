//API
import axios from 'axios';
import getEnvVars from 'api/environment.js';
const { apiUrl } = getEnvVars();

export const getDepartments = async function () {

    try {
        let options = {
            url: `${apiUrl}/departments/`,
            method: 'GET',
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error.response;
    }
}

export const getDoctorsByDepartment = async function (department) {

    try {
        let options = {
            url: `${apiUrl}/doctors/?department=${department}`,
            method: 'GET',
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error.response;
    }
}