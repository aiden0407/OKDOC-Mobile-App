//API
import axios from 'axios';
import { APIURL } from 'constants/api'
import uuid from 'react-native-uuid';

export const getProducts = async function () {
    try {
        let options = {
            url: `${APIURL}/products/`,
            method: 'GET',
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error.response;
    }
}

export const getSymptoms = async function () {
    try {
        let options = {
            url: `${APIURL}/symptoms/`,
            method: 'GET',
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error.response;
    }
}

export const getDepartments = async function () {
    try {
        let options = {
            url: `${APIURL}/departments/`,
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
            url: `${APIURL}/doctors/?department=${department}`,
            method: 'GET',
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error.response;
    }
}

// export const getDoctorInformationByDoctorId = async function (doctorId) {
//     try {
//         let options = {
//             url: `${APIURL}/doctor/${doctorId}`,
//             method: 'GET',
//         }
//         const response = await axios(options);
//         return response;

//     } catch (error) {
//         throw error.response;
//     }
// }

export const getScheduleByDoctorId = async function (doctorId) {
    try {
        let options = {
            url: `${APIURL}/treatment_appointments/?doctor_id=${doctorId}`,
            method: 'GET',
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error.response;
    }
}

export const createBidding = async function (loginToken, reservationInfo) {
    try {
        let options = {
            url: `${APIURL}/products/1/biddings/${uuid.v4()}`,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${loginToken}`,
            },
            data: {
                doctor_id: reservationInfo.doctorInfo.doctorId,
                patient_id: reservationInfo.profileInfo.id,
                wish_at: reservationInfo.doctorInfo.scheduleTime,
                department: reservationInfo.doctorInfo.subject,
                explain_symptom: reservationInfo.symptom,
            },
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error.response;
    }
}

// export const createBidding = async function (loginToken, reservationInfo) {
//     const formData = new FormData();
//     formData.append('doctor_id', reservationInfo.doctorInfo.doctorId);
//     formData.append('patient_id', reservationInfo.profileInfo.id);
//     formData.append('wish_at', reservationInfo.doctorInfo.scheduleTime);
//     formData.append('explain_symptom', reservationInfo.symptom);

//     try {
//         let options = {
//             url: `${APIURL}/products/1/biddings/${uuid.v4()}`,
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${loginToken}`,
//                 'Content-Type': 'multipart/form-data'
//             },
//             data: formData,
//         }
//         //console.log(formData);
//         //const response = await axios(options);
//         //console.log(response.data.response);
//         //return response;

//     } catch (error) {
//         console.log(error.response);
//         throw error.response;
//     }
// }

export const getBiddings = async function (loginToken) {
    try {
        let options = {
            url: `${APIURL}/biddings/`,
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

export const postPaymentRequest = async function (reservationInfo, email) {
    try {
        let options = {
            url: `https://mobile.inicis.com/smart/payment/`,
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                P_INI_PAYMENT: 'CARD',
                P_MID: 'insungif01',
                P_OID: uuid.v4(),
                P_NOTI: reservationInfo.biddingId,
                P_AMT: Number(1000),
                P_GOODS: encodeURIComponent('오케이닥 진료예약'),
                P_UNAME: encodeURIComponent(reservationInfo.profileInfo.name),
                P_NEXT_URL: 'https://api.okdoc.app/payment-webhook/',
                P_EMAIL: email,
                P_RESERVED: 'global_visa3d=Y&apprun_check=Y',
            },
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error.response;
    }
}