//API
import axios from 'axios';
import getEnvVars from 'api/environment.js';
const { apiUrl } = getEnvVars();

export const getProducts = async function () {

    try {
        let options = {
            url: `${apiUrl}/products/`,
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
            url: `${apiUrl}/symptoms/`,
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

//export const postPaymentRequest = async function (loginToken) {
export const postPaymentRequest = async function (orderNumber, productPrice, productName, patientName, patientPhone, patientEmail) {

    try {
        let options = {
            url: `https://mobile.inicis.com/smart/payment/`,
            method: 'POST',
            // data: {
            //     P_INI_PAYMENT: 'CARD',
            //     P_MID: 'insungif01',
            //     P_OID: '123123123123123',
            //     P_AMT: Number(5000),
            //     P_GOODS: '[진료]홍길동의사-김길동환자, 2023년3월3일/수요일/오후3시30분 ~ 오후3시45분',
            //     P_UNAME: '구매자패밀리명(환자명)',
            //     P_NEXT_URL: 'https://m.ok-doc.com/',
            //     P_MOBILE: '01012345678',
            //     P_EMAIL: 'test@test.com',
            // },
            data: {
                P_INI_PAYMENT: 'CARD',
                P_MID: 'insungif01',
                P_OID: orderNumber,
                P_AMT: Number(productPrice),
                P_GOODS: productName,
                P_UNAME: patientName,
                P_NEXT_URL: 'https://m.ok-doc.com/',
                P_MOBILE: patientPhone,
                P_EMAIL: patientEmail,
            },
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error.response;
    }
}