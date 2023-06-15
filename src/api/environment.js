//* environment.js
import Constants from "expo-constants";

const ENV = {
    dev: {
        apiUrl: 'https://api.okdoc.app',
    },
    staging: {
        apiUrl: 'https://58715333-07ae-429d-a6d0-cfdc916aba7d.mock.pstmn.io',
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