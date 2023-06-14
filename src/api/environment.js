//* environment.js
import Constants from "expo-constants";

const ENV = {
    dev: {
        apiUrl: 'https://api.okdoc.app',
        passportApiToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NzgxNzg4OTQsImV4cCI6MTY3ODY5NzI5NCwianRpIjoid2o0TExnNWd5MlNWIiwiYXBwbGljYXRpb25faWQiOiI4YTZiNmMzYi1mNDU3LTRmNmYtYjUyMC0zNzkwOTg4ZTZkZjYiLCJzdWIiOiIiLCJhY2wiOiIifQ.vJkzm05lSTv5tX3TawdEp5cf0K-BSXCuiMADz2F0pMi2f6MmgH-02gmpMguyqKDvJ5Icf2Tf1QMSCfYXhQLAgTV0jcMfYdpBA6XdWiWZrIb5Hhw1-C9jhnA3YluR28NWygFoHzzpzZQk2n_cakL9RoPF8HjtZWGO1NRtxoHlH4TemtC_VdGlaZ4NCXoUVKjayJG8R3GiqhoZfmJCvFSTB5mnUNhZIY_79gpNk4PvExy0KCtS_73_qWCB40-1i5KJ1DorW0Fbke8vT7MMwaAORrBWR2A9KJbSCackxpcFavhJcZalHih_VaYmjKefaqIgZlPrhbqEkQ0cwMkZzPKYGA',
    },
    staging: {
        apiUrl: 'https://58715333-07ae-429d-a6d0-cfdc916aba7d.mock.pstmn.io',
        passportApiToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NzgxNzg4OTQsImV4cCI6MTY3ODY5NzI5NCwianRpIjoid2o0TExnNWd5MlNWIiwiYXBwbGljYXRpb25faWQiOiI4YTZiNmMzYi1mNDU3LTRmNmYtYjUyMC0zNzkwOTg4ZTZkZjYiLCJzdWIiOiIiLCJhY2wiOiIifQ.vJkzm05lSTv5tX3TawdEp5cf0K-BSXCuiMADz2F0pMi2f6MmgH-02gmpMguyqKDvJ5Icf2Tf1QMSCfYXhQLAgTV0jcMfYdpBA6XdWiWZrIb5Hhw1-C9jhnA3YluR28NWygFoHzzpzZQk2n_cakL9RoPF8HjtZWGO1NRtxoHlH4TemtC_VdGlaZ4NCXoUVKjayJG8R3GiqhoZfmJCvFSTB5mnUNhZIY_79gpNk4PvExy0KCtS_73_qWCB40-1i5KJ1DorW0Fbke8vT7MMwaAORrBWR2A9KJbSCackxpcFavhJcZalHih_VaYmjKefaqIgZlPrhbqEkQ0cwMkZzPKYGA',
    },
    prod: {
        apiUrl: "[your.production.api.here]",
    }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
    // What is __DEV__ ?
    // This variable is set to true when react-native is running in Dev mode.
    // __DEV__ is true when run locally, but false when published.
    if (__DEV__) {
        return ENV.dev;
    } else if (env === 'staging') {
        return ENV.staging;
    } else if (env === 'prod') {
        return ENV.prod;
    }
};

export default getEnvVars;