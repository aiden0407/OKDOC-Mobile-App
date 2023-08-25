//API
import axios from 'axios';
import { APIURL } from 'constants/api'

export const familyLocalLogin = async function (id, password) {
    try {
        let options = {
            url: `${APIURL}/authentication/sign-in`,
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
            url: `${APIURL}/terms/`,
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
            url: `${APIURL}/authentication/email-check-open`,
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

export const emailCheckClose = async function (email, certificationNumber, emailToken) {
    try {
        let options = {
            url: `${APIURL}/authentication/email-check-close`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${emailToken}`
            },
            data: {
                email: email,
                verification_number: Number(certificationNumber),
            }
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error;
    }
}

export const phoneCheckOpen = async function (phone) {
    try {
        let options = {
            url: `${APIURL}/authentication/sms-check-open`,
            method: 'POST',
            data: {
                phone: phone,
            }
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error;
    }
}

export const phoneCheckClose = async function (phone, certificationNumber, phoneToken) {
    try {
        let options = {
            url: `${APIURL}/authentication/sms-check-close`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${phoneToken}`
            },
            data: {
                phone: phone,
                verification_number: Number(certificationNumber),
            }
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error;
    }
}

export const checkPassportInformation = async function (name, birth, passportNumber, dateOfIssue, dateOfExpiry) {
    try {
        let options = {
            url: `${APIURL}/authentication/passport-check`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                user_name: name,
                birth: birth,
                passport_number: passportNumber,
                issue_date: dateOfIssue,
                close_date: dateOfExpiry,
            }
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error;
    }
}

export const createFamilyAccount = async function (email, password, policy) {
    try {
        let options = {
            url: `${APIURL}/authentication/sign-up`,
            method: 'POST',
            data: {
                id: email,
                password: password,
                agreements: policy
            },
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error;
    }
}

export const createPatientProfileInit = async function (loginToken, email, name, birth, passportNumber, dateOfIssue, dateOfExpiry, gender) {
    try {
        let options = {
            url: `${APIURL}/families/${email}/patients/${passportNumber}`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${loginToken}`
            },
            data: {
                user_name: name,
                birth: birth,
                passport_number: passportNumber,
                issue_date: dateOfIssue,
                close_date: dateOfExpiry,
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

export const findFamilyAccount = async function (name, birth) {
    try {
        let options = {
            url: `${APIURL}/authentication/email-find`,
            method: 'POST',
            data: {
                name: name,
                birth: birth,
            },
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error;
    }
}

export const findPasswordOpen = async function (email, name, birth) {
    try {
        let options = {
            url: `${APIURL}/authentication/password-find-open`,
            method: 'POST',
            data: {
                email: email,
                name: name,
                birth: birth,
            },
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error;
    }
}

export const findPasswordClose = async function (emailToken, email, verificationNumber) {
    try {
        let options = {
            url: `${APIURL}/authentication/password-find-close`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${emailToken}`
            },
            data: {
                email: email,
                verification_number: verificationNumber,
            },
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error;
    }
}

export const changePassword = async function (emailToken, email, newPassword) {
    try {
        let options = {
            url: `${APIURL}/authentication/password-find-change`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${emailToken}`
            },
            data: {
                email: email,
                new_password: newPassword,
            },
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error;
    }
}