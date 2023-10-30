//API
import axios from 'axios';
import { APIURL } from 'constants/api'

export const getFamilyInfo = async function (loginToken, email) {

    try {
        let options = {
            url: `${APIURL}/families/${email}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${loginToken}`
            }
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error;
    }
}

export const getPatientList = async function (loginToken, email) {

    try {
        let options = {
            url: `${APIURL}/patients/?family_id=${email}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${loginToken}`
            }
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error;
    }
}

export const modifyPatientInformation = async function (loginToken, patientId, patientInformation) {
    const data = {
        height: patientInformation.height,
        weight: patientInformation.weight,
        drinker: patientInformation.drinker,
        smoker: patientInformation.smoker,
    }
    if(patientInformation.medical_history.length){
        data.medical_history = patientInformation.medical_history
    }
    if(patientInformation.family_medical_history.length){
        data.family_medical_history = patientInformation.family_medical_history
    }
    if(patientInformation.medication.length){
        data.medication = patientInformation.medication
    }
    if(patientInformation.allergic_reaction.length){
        data.allergic_reaction = patientInformation.allergic_reaction
    }
    if(patientInformation.consideration.length){
        data.consideration = patientInformation.consideration
    }

    try {
        let options = {
            url: `${APIURL}/patients/${patientId}`,
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${loginToken}`
            },
            data: data
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error;
    }
}

export const changePassword = async function (loginToken, email, password, newPassword) {
    try {
        let options = {
            url: `${APIURL}/authentication/change-password`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${loginToken}`
            },
            data: {
                email: email,
                password: password,
                new_password: newPassword,
            },
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error;
    }
}

export const deleteFamilyAccout = async function (loginToken, email, password) {

    try {
        let options = {
            url: `${APIURL}/authentication/withdrawal`,
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${loginToken}`
            },
            data: {
                id: email,
                password: password,
            }
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error;
    }
}