//API
import axios from 'axios';
import { APIURL } from 'constants/api'
import uuid from 'react-native-uuid';

function generateRandomPassword() {
    const length = Math.floor(Math.random() * 9) + 6; // 6에서 14 글자 사이의 길이 생성
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.?!@#$%^&*+=';

    let password = '';

    while (password.length < length) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }

    if (password.match(/^.*(?=^.{6,14}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[.?!@#$%^&*+=]).*$/)) {
        return password;
    } else {
        return generateRandomPassword(); // 조건을 만족하지 않으면 다시 생성
    }
}

export const familyAppleLogin = async function (credential) {
    try {
        let options = {
            url: `${APIURL}/apple/sign-in`,
            method: 'POST',
            data: {
                code: `${credential.authorizationCode}`,
            }
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error;
    }
}

export const familyGoogleLogin = async function (credential) {
    try {
        let options = {
            url: `${APIURL}/google/sign-in`,
            method: 'POST',
            data: {
                access_token: `${credential.authentication.accessToken}`,
            }
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error;
    }
}

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

export const createAppleAccount = async function (email, policy, deviceType, deviceToken, apple_id) {
    try {
        let options = {
            url: `${APIURL}/authentication/sign-up`,
            method: 'POST',
            data: {
                id: email,
                password: generateRandomPassword(),
                agreements: policy,
                device_type: deviceType,
                device_token: deviceToken,
                apple_id: apple_id
            },
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error;
    }
}

export const createGoogleAccount = async function (email, policy, deviceType, deviceToken, google_id) {
    try {
        let options = {
            url: `${APIURL}/authentication/sign-up`,
            method: 'POST',
            data: {
                id: email,
                password: generateRandomPassword(),
                agreements: policy,
                device_type: deviceType,
                device_token: deviceToken,
                google_id: google_id,
            },
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error;
    }
}

export const createLocalAccount = async function (email, password, policy, deviceType, deviceToken, emailToken) {
    try {
        let options = {
            url: `${APIURL}/authentication/sign-up`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${emailToken}`
            },
            data: {
                id: email,
                password: password,
                agreements: policy,
                device_type: deviceType,
                device_token: deviceToken
            },
        }
        const response = await axios(options);
        return response;

    } catch (error) {
        throw error;
    }
}

export const createPatientByPassport = async function (loginToken, email, name, birth, passportNumber, dateOfIssue, dateOfExpiry, gender) {
    try {
        let options = {
            url: `${APIURL}/families/${email}/patients/${uuid.v4()}`,
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

export const createPatientByPassApp = async function (loginToken, imp_uid) {
    try {
        let options = {
            url: `${APIURL}/authentication/give-birth-by-passapp`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${loginToken}`
            },
            data: {
                id: uuid.v4(),
                imp_uid: imp_uid,
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