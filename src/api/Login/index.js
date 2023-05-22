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

export const emailCheckClose = async function (email, certificationNumber) {

    try {
        let options = {
            url: `${apiUrl}/authentication/EMAIL_CHECK_CLOSE`,
            method: 'POST',
            data: {
                email: email,
                claim: certificationNumber,
            }
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error;
    }
}

export const createFamilyAccount = async function (email, emailToken, password) {

    try {
        let options = {
            url: `${apiUrl}/families/${email}`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${emailToken}`
            },
            data: {
                password: password,
                agreements: '1',
                agreements: '2',
                agreements: '3',
            }
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error;
    }
}

export const checkPassportInformation = async function (loginToken, name, birth, passportNumber, dateOfIssue, dateOfExpiry) {

    try {
        let options = {
            url: `${apiUrl}/authentication/PASSPORT_CHECK`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${loginToken}`
            },
            data: {
                USERNAME: name,
                BIRTH: birth,
                PASSPORTNUMBER: passportNumber,
                ISSUEDATE: dateOfIssue,
                CLOSEDATE: dateOfExpiry,
            }
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error;
    }
}

export const createPatientProfileInit = async function (loginToken, familyId, name, birth, passportNumber, dateOfIssue, dateOfExpiry, gender) {

    try {
        let options = {
            url: `${apiUrl}/families/${familyId}/patients/${passportNumber}`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${loginToken}`
            },
            data: {
                USERNAME: name,
                BIRTH: birth,
                PASSPORTNUMBER: passportNumber,
                ISSUEDATE: dateOfIssue,
                CLOSEDATE: dateOfExpiry,
                gender: gender,
                relationship: '본인',
            }
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error;
    }
}