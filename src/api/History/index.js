//API
import axios from 'axios';
import { APIURL } from 'constants/api'
import uuid from 'react-native-uuid';

export const getScheduleByPatientId = async function (loginToken, patientId) {
    try {
        let options = {
            url: `${APIURL}/treatment_appointments/?patient_id=${patientId}`,
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

export const getTreatmentInformation = async function (loginToken, appointmentId) {
    try {
        let options = {
            url: `${APIURL}/treatment_appointments/${appointmentId}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${loginToken}`
            },
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error.response;
    }
}

export const getPurchaseInformation = async function (loginToken, appointmentId) {
    try {
        let options = {
            url: `${APIURL}/purchases/?treatment_appointment_id=${appointmentId}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${loginToken}`
            },
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
            url: `${APIURL}/treatment_appointments/${appointmentId}`,
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

export const canclePayment = async function (loginToken, purchaseId, P_TID) {
    try {
        let options = {
            url: `${APIURL}/merchant/cancel/${purchaseId}`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${loginToken}`
            },
            data: {
                tid: P_TID,
                msg: "진료 예약 취소입니다.",
            },
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error.response;
    }
}

export const treatmentCancel = async function (loginToken, appointmentId) {
    try {
        let options = {
            url: `${APIURL}/treatment_appointments/${appointmentId}`,
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${loginToken}`
            },
            data: {
                "status": "CANCELLED",
            },
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error.response;
    }
}

export const treatmentComplete = async function (loginToken, appointmentId) {
    try {
        let options = {
            url: `${APIURL}/treatment_appointments/${appointmentId}`,
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${loginToken}`
            },
            data: {
                "status": "EXIT",
            },
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error.response;
    }
}

export const getInvoiceInformation = async function (loginToken, biddingId) {
    try {
        let options = {
            url: `${APIURL}/invoices/?bidding_id=${biddingId}`,
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

export const createInvoicePaymentRequest = async function (telemedicineData, email) {
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
                P_NOTI: telemedicineData.invoiceInfo.id,
                P_AMT: email==='aiden@insunginfo.co.kr' ? Number(1000) : Number(telemedicineData.productInfo.price),
                P_GOODS: encodeURIComponent(telemedicineData.productInfo.hospital+' '+telemedicineData.productInfo.name),
                P_UNAME: encodeURIComponent(telemedicineData.profileInfo.passport.user_name),
                P_NEXT_URL: `https://api.okdoc.app/merchant-webhook/post-paid/${telemedicineData.invoiceInfo.id}/${telemedicineData.id}`,
                P_EMAIL: email,
                P_RESERVED: 'global_visa3d=Y&apprun_check=Y',
                P_CHARSET: 'utf8'
            },
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error.response;
    }
}