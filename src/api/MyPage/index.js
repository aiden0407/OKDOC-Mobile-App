//API
import axios from 'axios';
import getEnvVars from 'api/environment.js';
const { apiUrl } = getEnvVars();

export const getPatientList = async function (loginToken) {

    try {
        let options = {
            url: `${apiUrl}/patients/`,
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
            url: `${apiUrl}/patients/${patientId}`,
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${loginToken}`
            },
            data: patientInformation,
            // patientInformation 객체 데이터 형식
            // {
            //     "height": 178,
            //     "weight": 65,
            //     "drinker": "heavy",
            //     "smoker": true,
            //     "medical_history": "코로나 걸렸었음.",
            //     "family_medical_history": "당뇨",
            //     "medication": "탁센, 타이레놀",
            //     "allergic_reaction": "새우 알러지",
            //     "consideration": "기관지가 안좋음",
            // }
            
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error.response;
    }
}