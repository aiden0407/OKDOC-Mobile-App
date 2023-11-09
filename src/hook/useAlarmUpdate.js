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
        //let contextAlarmSet = [];
        let contextAlarmSet = [
            //RESERVATION_CANCLED
            //INVOICE_CONFIRMED
            //INVOICE_CANCLED
            {
                "_id": "649266beceefd680de5d00ef",
                "type": "TREATMENT_CONFIRMED",
                "message": "진료 소견서가 전달되었습니다. 확인해 보세요.",
                "patient_id": "7aa6cf9d-aef5-42f0-bdd3-32387c424e26",
                "created_at": "2023-11-08T13:32:29.203Z",
                "updated_at": "2023-11-08T13:32:29.203Z",
                "id": "aeb68b45-376e-4e26-a0a2-248ab4ce3eec"
            },
            {
                "_id": "649266beceefd680de5d00ef",
                "type": "APPOINTMENT_5_M_BEFORE",
                "message": "예약하신 이비인후과 장윤희 의사 진료 5분 전입니다. 진료실에 입장해주세요.",
                "patient_id": "7aa6cf9d-aef5-42f0-bdd3-32387c424e26",
                "created_at": "2023-11-08T13:12:29.203Z",
                "updated_at": "2023-11-08T13:12:29.203Z",
                "id": "aeb68b45-376e-4e26-a0a2-248ab4ce3eec"
            },
            {
                "_id": "649266beceefd680de5d00ef",
                "type": "APPOINTMENT_1_H_BEFORE",
                "message": "예약하신 이비인후과 장윤희 의사 진료 1시간 전입니다.",
                "patient_id": "7aa6cf9d-aef5-42f0-bdd3-32387c424e26",
                "created_at": "2023-11-08T12:17:29.203Z",
                "updated_at": "2023-11-08T12:17:29.203Z",
                "id": "aeb68b45-376e-4e26-a0a2-248ab4ce3eec"
            },
            {
                "_id": "649266beceefd680de5d00ef",
                "type": "APPOINTMENT_24_H_BEFORE",
                "message": "예약하신 이비인후과 장윤희 의사 진료 24시간 전입니다.",
                "patient_id": "7aa6cf9d-aef5-42f0-bdd3-32387c424e26",
                "created_at": "2023-11-07T10:17:29.203Z",
                "updated_at": "2023-11-07T10:17:29.203Z",
                "id": "aeb68b45-376e-4e26-a0a2-248ab4ce3eec"
            },
            {
                "_id": "649266beceefd680de5d00ef",
                "type": "RESERVATION_CONFIRMED",
                "message": "2023년 11월 08일 (22:20) 이비인후과 장윤희 의사 진료 예약이 완료되었습니다.",
                "patient_id": "7aa6cf9d-aef5-42f0-bdd3-32387c424e26",
                "created_at": "2023-11-06T13:17:29.203Z",
                "updated_at": "2023-11-06T13:17:29.203Z",
                "id": "aeb68b45-376e-4e26-a0a2-248ab4ce3eec"
            }
        ];

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