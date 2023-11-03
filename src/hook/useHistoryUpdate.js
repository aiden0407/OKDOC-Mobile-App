//React
import { useState, useEffect, useContext } from 'react';
import { ApiContext } from 'context/ApiContext';
import * as Clipboard from 'expo-clipboard';

//Api
import { getHistoryListByPatientId, getHistoryStatus, getAuditLog, getTreatmentResults, getCCTVInformation } from 'api/History';

export default function useHistoryUpdate() {

    const { state: { accountData, profileData }, dispatch } = useContext(ApiContext);
    const [loading, setLoading] = useState(true);
    const [historyData, setHistoryData] = useState();
    const [needPayment, setNeedPayment] = useState();

    const refresh = () => {
        if(accountData.loginToken && profileData)
        setLoading(true);
        updateHistory();
    };

    const updateHistory = async function () {
        try {
            const response = await getHistoryListByPatientId(profileData?.[0]?.id);
            let puchaseHistory = response.data.response;

            // 비딩 결제건에 대한 구매 목록만 필터링
            puchaseHistory = puchaseHistory.filter(obj => obj.fullDocument?.bidding_id);

            // 진료일시 빠른 순으로 정렬
            puchaseHistory.sort((a, b) => {
                const startTimeA = new Date(a.fullDocument.treatment_appointment.hospital_treatment_room.start_time);
                const startTimeB = new Date(b.fullDocument.treatment_appointment.hospital_treatment_room.start_time);
                if (startTimeA.getTime() === startTimeB.getTime()) {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                }
                return startTimeB - startTimeA;
            });

            // 각 히스토리의 도큐멘트 조회 후 취소 여부 확인
            for (const obj of puchaseHistory) {
                try {
                    const response = await getHistoryStatus(obj.documentKey._id);
                    const document = response.data.response;
                    if (document[document.length - 1].operationType === 'insert') {
                        obj.status = 'RESERVED';
                    } else {
                        try {
                            const response = await getAuditLog(accountData.loginToken, obj.fullDocument.id);
                            const auditLog = response.data.response[0];

                            // 취소 시간과 role 데이터를 통한 취소 주체 규명
                            const wishAtTime = new Date(obj.fullDocument.treatment_appointment.hospital_treatment_room.start_time);
                            const CanceledTime = new Date(auditLog.createdAt);
                            if(CanceledTime < wishAtTime){
                                if(auditLog.principal?.role==='family') obj.canceler = 'PATIENT';
                                if(auditLog.principal?.role==='administrator') obj.canceler = 'DOCTOR';
                            } else {
                                if(auditLog.principal?.role==='administrator') {
                                    obj.canceler = 'ADMIN';
                                } else {
                                    obj.canceler = 'SYSTEM';
                                }
                            }
                            obj.status = 'CANCELED';
                        } catch (error) {
                            //console.log(error);
                        }
                    }
                } catch (error) {
                    //console.log(error);
                }
            }

            // 취소되지 않은 히스토리의 소견서 조회
            for (const obj of puchaseHistory) {
                if(obj.status === 'RESERVED') {
                    try {
                        const response = await getTreatmentResults(accountData.loginToken, obj.fullDocument.treatment_appointment.id);
                        const opinion = response.data.response[0];
                        obj.opinion = opinion;
                        
                    } catch (error) {
                        //소견서 제출 안된 케이스
                        //console.log(error);
                    }
                }
            }

            await Clipboard.setStringAsync(JSON.stringify(puchaseHistory));
            // setLoading(false);
            // setNeedPayment({});

        } catch (error) {
            console.log(error);
            console.log(error.data);
        }
    };

    return { loading, needPayment, refresh };
}