//React
import { useContext } from 'react';
import { ApiContext } from 'context/ApiContext';
import { AppContext } from 'context/AppContext';
import * as Clipboard from 'expo-clipboard';

//Api
import { getAlarmHistory } from 'api/Alarm';

export default function useAlarmUpdate() {

    const { state: { accountData, profileData }, dispatch: apiContextDispatch } = useContext(ApiContext);
    const { dispatch: appContextDispatch } = useContext(AppContext);

    const refreshAlarm = () => {
        if (accountData.loginToken && profileData)
            appContextDispatch({ type: 'ALARM_DATA_UPDATING' });
        updateAlarm();
    };

    const updateAlarm = async function () {
        const contextAlarmSet = [];

        try {
            setTimeout(() => {
                apiContextDispatch({
                    type: 'ALARM_DATA_UPDATE',
                    alarmData: contextAlarmSet,
                });
                appContextDispatch({ type: 'ALARM_DATA_UPDATED' });
                // await Clipboard.setStringAsync(JSON.stringify(contextAlarmSet));
                console.log('alarm update!!!!!!!!!!!!!!!!')
            }, 1000);
        } catch (error) {
            // console.log(error);
        }
    };

    return { refreshAlarm };
}