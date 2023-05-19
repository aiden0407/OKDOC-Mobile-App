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

export const getRegisterTerms = async function () {

    try {
        let options = {
            url: `${apiUrl}/terms/`,
            method: 'GET',
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error;
    }
}

export const emailCheckOpen = async function (email) {

    try {
        let options = {
            url: `${apiUrl}/authentication/EMAIL_CHECK_OPEN`,
            method: 'POST',
            data: {
                email: email,
            }
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error;
    }
}

export const emailCheckClose = async function (email, claim) {

    try {
        let options = {
            url: `${apiUrl}/authentication/EMAIL_CHECK_CLOSE`,
            method: 'POST',
            data: {
                email: email,
                claim: claim,
            }
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error;
    }
}