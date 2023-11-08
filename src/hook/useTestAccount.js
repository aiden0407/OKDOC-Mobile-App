export default function useTestAccount(email) {

    const testAccountList = [
        'aiden@insunginfo.co.kr',
        'cailyent0407@gmail.com', 
        'logan@insunginfo.co.kr', 
        'zloganway@gmail.com', 
        'rlagudeh123@naver.com', 
        'dbckd22@gmail.com'
    ];

    return testAccountList.includes(email);
}