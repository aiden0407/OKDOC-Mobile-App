//React
import { useContext } from 'react';
import { ApiContext } from 'context/ApiContext';
import { AppContext } from 'context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Api
import { getAlarmHistory } from 'api/Alarm';

export default function useAlarmUpdate() {

    const { state: { accountData, profileData }, dispatch: apiContextDispatch } = useContext(ApiContext);
    const { dispatch: appContextDispatch } = useContext(AppContext);

    function formatTimeAgo(timestamp) {
        const now = new Date();
        const targetDate = new Date(timestamp);

        const timeDifference = now - targetDate;
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        if (seconds < 60) {
            return '방금';
        } else if (minutes < 60) {
            return `${minutes}분 전`;
        } else if (hours < 24) {
            return `${hours}시간 전`;
        } else if (days < 7) {
            return `${days}일 전`;
        } else if (weeks < 4) {
            return `${weeks}주 전`;
        } else if (months < 12) {
            return `${months}개월 전`;
        } else {
            return `${years}년 전`;
        }
    }

    const refreshAlarm = () => {
        if (accountData.loginToken && profileData) {
            appContextDispatch({ type: 'ALARM_DATA_UPDATING' });
        }
        updateAlarm();
    };

    const updateAlarm = async function () {
        let contextAlarmSet = [];
        let readAlarmIdList = [];

        try {
            const jsonValue = await AsyncStorage.getItem('@readAlarmIdList');
            if (jsonValue !== null) {
                readAlarmIdList = JSON.parse(jsonValue);
            }
        } catch (error) {
            //console.log(error);
        }

        try {
            //const response = await getAlarmHistory(accountData.loginToken, profileData?.[0]?.id);
            // contextAlarmSet = response.data.response;
            contextAlarmSet = [
                {
                    "_id": "649266beceefd680de5d00ef",
                    "title": "소견서 작성 완료",
                    "message": "진료 소견서가 전달되었습니다. 확인해 보세요.",
                    "patient_id": "7aa6cf9d-aef5-42f0-bdd3-32387c424e26",
                    "created_at": "2023-11-10T00:02:29.203Z",
                    "updated_at": "2023-11-10T00:02:29.203Z",
                    "id": "aeb68b45-376e-4e26-a0a2-248agd3eec"
                },
                {
                    "_id": "649266beceefd680de5d00ef",
                    "title": "진료 5분 전",
                    "message": "예약하신 이비인후과 장윤희 의사 진료 5분 전입니다. 진료실에 입장해주세요.",
                    "patient_id": "7aa6cf9d-aef5-42f0-bdd3-32387c424e26",
                    "created_at": "2023-11-09T23:12:29.203Z",
                    "updated_at": "2023-11-09T23:12:29.203Z",
                    "id": "aeb68b45-376e-4e26-a0a2-asgfab4ce3eec"
                },
                {
                    "_id": "649266beceefd680de5d00ef",
                    "title": "진료 1시간 전",
                    "message": "예약하신 이비인후과 장윤희 의사 진료 1시간 전입니다.",
                    "patient_id": "7aa6cf9d-aef5-42f0-bdd3-32387c424e26",
                    "created_at": "2023-11-09T22:17:29.203Z",
                    "updated_at": "2023-11-09T22:17:29.203Z",
                    "id": "aeb68b45-376e-4e26-a0a2-248asafe3eec"
                },
                {
                    "_id": "649266beceefd680de5d00ef",
                    "title": "진료 24시간 전",
                    "message": "예약하신 이비인후과 장윤희 의사 진료 24시간 전입니다.",
                    "patient_id": "7aa6cf9d-aef5-42f0-bdd3-32387c424e26",
                    "created_at": "2023-11-08T10:17:29.203Z",
                    "updated_at": "2023-11-08T10:17:29.203Z",
                    "id": "aeb68b45-376e-4e26-a0a2-242sdg3eec"
                },
                {
                    "_id": "649266beceefd680de5d00ef",
                    "title": "예약 완료",
                    "message": "2023년 11월 08일 (22:20) 이비인후과 장윤희 의사 진료 예약이 완료되었습니다.",
                    "patient_id": "7aa6cf9d-aef5-42f0-bdd3-32387c424e26",
                    "created_at": "2023-11-06T13:17:29.203Z",
                    "updated_at": "2023-11-06T13:17:29.203Z",
                    "id": "aeb68b45-376e-4e26-a0a2-24sdg3e2c"
                }
            ];

            for (const obj of contextAlarmSet) {
                obj.time = formatTimeAgo(obj.created_at) ?? obj.created_at
                if (!readAlarmIdList.includes(obj.id)) {
                    obj.new = true;
                    readAlarmIdList.push(obj.id);
                    try {
                        await AsyncStorage.setItem('@readAlarmIdList', JSON.stringify(readAlarmIdList));
                    } catch (error) {
                        //console.log(error);
                    }
                }
            }

            apiContextDispatch({
                type: 'ALARM_DATA_UPDATE',
                alarmData: contextAlarmSet,
            });
            setTimeout(() => {
                appContextDispatch({ type: 'ALARM_DATA_UPDATED' });
                // console.log('alarm update!!!!!!!!!!!!!!!!')
            }, 1000);
        } catch (error) {
            // console.log(error);
        }
    };

    return { refreshAlarm };
}