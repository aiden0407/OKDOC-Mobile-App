export default function useTestAccount(email) {

    const testAccountList = [
        // 에이든 계정
        'aiden@insunginfo.co.kr',
        'cailyent0407@gmail.com',
        // 로건 계정
        'logan@insunginfo.co.kr', 
        'zloganway@gmail.com', 
        'rlagudeh123@naver.com', 
        // 레오 계정
        'reo.l@insunginfo.co.kr',
        'dbckd22@gmail.com',
        'dldbckd22@naver.com',
        // 무브 계정
        'move@insunginfo.co.kr',
        'on21life@gmail.com',
        'cras10@gmail.com',
        'on21life@naver.com',
        'cras10@naver.com'
    ];

    return testAccountList.includes(email);
}