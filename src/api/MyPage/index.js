//API
import axios from 'axios';
import { APIURL } from 'constants/api'

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

    try {
        let options = {
            url: `${APIURL}/patients/${patientId}`,
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${loginToken}`
            },
            data: {
                height: patientInformation.height,
                weight: patientInformation.weight,
                drinker: patientInformation.drinker,
                smoker: patientInformation.smoker,
                medical_history: patientInformation.medical_history,
                family_medical_history: patientInformation.family_medical_history,
                medication: patientInformation.medication,
                allergic_reaction: patientInformation.allergic_reaction,
                consideration: patientInformation.consideration,
            }
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error;
    }
}