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

export const getDoctorInformationByDoctorId = async function (doctorId) {

    try {
        let options = {
            url: `${apiUrl}/doctor/${doctorId}`,
            method: 'GET',
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error.response;
    }
}

export const getScheduleByDoctorId = async function (loginToken, doctorId) {

    try {
        let options = {
            url: `${apiUrl}/treatment_appointments/?doctor_id=${doctorId}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${loginToken}`
            }
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error.response;
    }
}

export const getBiddings = async function (loginToken) {

    try {
        let options = {
            url: `${apiUrl}/biddings/`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${loginToken}`
            }
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error.response;
    }
}