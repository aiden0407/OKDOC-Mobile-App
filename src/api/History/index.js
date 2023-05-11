//API
import axios from 'axios';
import getEnvVars from 'api/environment.js';
const { apiUrl } = getEnvVars();

export const getScheduleByPatientId = async function (loginToken, patientId) {

    try {
        let options = {
            url: `${apiUrl}/treatment_appointments/?patient_id=${patientId}`,
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

export const modifyTreatmentAppointmentBeforeEnter = async function (loginToken, appointmentId, symptom) {

    try {
        let options = {
            url: `${apiUrl}/treatment_appointments/${appointmentId}`,
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${loginToken}`
            },
            data: {
                "explain_symptom": symptom,
            },
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error.response;
    }
}