//API
import axios from 'axios';
import getEnvVars from 'api/environment.js';
const { apiUrl } = getEnvVars();

export const loginByKauthCode = async function (id, password) {

    try {

        let options = {
            url: `${apiUrl}/authentication/:authentication_type?identity=family`,
            method: 'POST',
            data: {
                id: id,
                password: password,
            }
        }
        const response = await axios(options);

        return response;

    } catch (error) {

        throw error.response;

    }

}