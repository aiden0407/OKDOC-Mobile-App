import { createContext, useReducer } from "react";

//initial state
const initialState = {
  accountData: {
    loginStatus: true,
    name: '이준범',
    email: 'aiden@insunginfo.co.kr',
    phoneNumber: '+82 10-2427-8139'
  },
  profileData: [
    {
      name: '이준범',
      relationship: '본인',
      birth: '1998-04-07',
      gender: 'male',
      height: '170.0',
      weight: '68.0',
      dringkingStatus: 'none',
      smokingStatus: true,
      medicalHistory: '',
      medicalHistoryFamily: '고혈압',
      medication: '',
      allergicReaction: '',
      etcConsideration: '없음'
    }
  ],
  bookableData: [
    ['27일', '목요일', [
      ['11:00', [
        {
          name: '이준범',
          image: 'https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*',
          hospital: '을지대병원',
          subject: '외과',
          medicalField: ['외과 수술', '13년차', '전문의'],
        },
        {
          name: '김형도',
          image: 'https://www.pinnaclecare.com/wp-content/uploads/2017/12/bigstock-African-young-doctor-portrait-28825394.jpg',
          hospital: '을지대병원',
          subject: '내과',
          medicalField: ['내과 수술', '20년차', '베테랑'],
        },
      ]],
      ['11:30', [
        {
          name: '이준범',
          image: 'https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*',
          hospital: '을지대병원',
          subject: '외과',
          medicalField: ['외과 수술', '13년차', '전문의'],
        },
        {
          name: '장윤희',
          image: 'https://media.istockphoto.com/id/1189304032/photo/doctor-holding-digital-tablet-at-meeting-room.jpg?s=612x612&w=0&k=20&c=RtQn8w_vhzGYbflSa1B5ea9Ji70O8wHpSgGBSh0anUg=',
          hospital: '을지대병원',
          subject: '산부인과',
          medicalField: ['5년차', '전문의'],
        },
        {
          name: '김형도',
          image: 'https://www.pinnaclecare.com/wp-content/uploads/2017/12/bigstock-African-young-doctor-portrait-28825394.jpg',
          hospital: '을지대병원',
          subject: '내과',
          medicalField: ['내과 수술', '20년차', '베테랑'],
        },
        {
          name: '해밍턴',
          image: 'https://cdn.houstonpublicmedia.org/wp-content/uploads/2015/09/22105535/Nuila.Ricardo.E.143882.Internal.Med_.jpg',
          hospital: '을지대병원',
          subject: '신경외과',
          medicalField: ['정신과 상담', '신경 수술', , '17년차', '베테랑'],
        },
      ]]
    ]],
    ['28일', '금요일', [
      ['12:30', [
        {
          name: '해밍턴',
          image: 'https://cdn.houstonpublicmedia.org/wp-content/uploads/2015/09/22105535/Nuila.Ricardo.E.143882.Internal.Med_.jpg',
          hospital: '을지대병원',
          subject: '신경외과',
          medicalField: ['정신과 상담', '신경 수술', , '17년차', '베테랑'],
        },
        {
          name: '이준범',
          image: 'https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*',
          hospital: '을지대병원',
          subject: '외과',
          medicalField: ['외과 수술', '13년차', '전문의'],
        },
        {
          name: '김형도',
          image: 'https://www.pinnaclecare.com/wp-content/uploads/2017/12/bigstock-African-young-doctor-portrait-28825394.jpg',
          hospital: '을지대병원',
          subject: '내과',
          medicalField: ['내과 수술', '20년차', '베테랑'],
        },
      ]],
      ['16:00', [
        {
          name: '이준범',
          image: 'https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*',
          hospital: '을지대병원',
          subject: '외과',
          medicalField: ['외과 수술', '13년차', '전문의'],
        },
        {
          name: '장윤희',
          image: 'https://media.istockphoto.com/id/1189304032/photo/doctor-holding-digital-tablet-at-meeting-room.jpg?s=612x612&w=0&k=20&c=RtQn8w_vhzGYbflSa1B5ea9Ji70O8wHpSgGBSh0anUg=',
          hospital: '을지대병원',
          subject: '산부인과',
          medicalField: ['5년차', '전문의'],
        },
        {
          name: '김형도',
          image: 'https://www.pinnaclecare.com/wp-content/uploads/2017/12/bigstock-African-young-doctor-portrait-28825394.jpg',
          hospital: '을지대병원',
          subject: '내과',
          medicalField: ['내과 수술', '20년차', '베테랑'],
        },
        {
          name: '해밍턴',
          image: 'https://cdn.houstonpublicmedia.org/wp-content/uploads/2015/09/22105535/Nuila.Ricardo.E.143882.Internal.Med_.jpg',
          hospital: '을지대병원',
          subject: '신경외과',
          medicalField: ['정신과 상담', '신경 수술', , '17년차', '베테랑'],
        },
      ]],
      ['18:30', [
        {
          name: '해밍턴',
          image: 'https://cdn.houstonpublicmedia.org/wp-content/uploads/2015/09/22105535/Nuila.Ricardo.E.143882.Internal.Med_.jpg',
          hospital: '을지대병원',
          subject: '신경외과',
          medicalField: ['정신과 상담', '신경 수술', , '17년차', '베테랑'],
        },
        {
          name: '장윤희',
          image: 'https://media.istockphoto.com/id/1189304032/photo/doctor-holding-digital-tablet-at-meeting-room.jpg?s=612x612&w=0&k=20&c=RtQn8w_vhzGYbflSa1B5ea9Ji70O8wHpSgGBSh0anUg=',
          hospital: '을지대병원',
          subject: '산부인과',
          medicalField: ['5년차', '전문의'],
        },
      ]]
    ]],
  ],
  historyData: {
    underReservation: [
      {
        date: '2023.04.21',
        time: '오전 11:30',
        doctorInfo: {
          name: '장윤희',
          image: 'https://media.istockphoto.com/id/1189304032/photo/doctor-holding-digital-tablet-at-meeting-room.jpg?s=612x612&w=0&k=20&c=RtQn8w_vhzGYbflSa1B5ea9Ji70O8wHpSgGBSh0anUg=',
          hospital: '을지대병원',
          subject: '이비인후과',
          medicalField: ['5년차', '전문의'],
        },
        profileType: '본인',
        profileInfo: {
          name: '이준범'
        },
        symptom: '콧물이 계속 흘러요',
      },
    ],
    pastHistory: [
      {
        date: '2023.04.07',
        time: '오후 04:00',
        doctorInfo: {
          name: '김형도',
          image: 'https://www.pinnaclecare.com/wp-content/uploads/2017/12/bigstock-African-young-doctor-portrait-28825394.jpg',
          hospital: '을지대병원',
          subject: '내과',
          medicalField: ['내과 수술', '20년차', '베테랑'],
        },
        profileType: '자녀',
        profileInfo: {
          name: '이재인'
        },
        symptom: '열이 좀 있는 것 같고 소화가 잘 안된대요',
      },
      {
        date: '2023.04.06',
        time: '오전 10:40',
        doctorInfo: {
          name: '해밍턴',
          image: 'https://cdn.houstonpublicmedia.org/wp-content/uploads/2015/09/22105535/Nuila.Ricardo.E.143882.Internal.Med_.jpg',
          hospital: '을지대병원',
          subject: '신경외과',
          medicalField: ['정신과 상담', '신경 수술', , '17년차', '베테랑'],
        },
        profileType: '본인',
        profileInfo: {
          name: '이준범'
        },
        symptom: '기침이 자주 나요',
        opinion: 'pdf파일 링크',
      },
    ],
  },
  alarmData: [

  ],
};

//create context
const ApiContext = createContext({});

//create reducer
const reducer = (state, action) => {
  switch (action.type) {

    case 'LOGIN':
      return {
        ...state,
        accountData: {
          ...state.accountData,
          loginStatus: true,
          name: action.name,
          email: action.email,
          phoneNumber: action.phoneNumber,
        },
      };

    case 'LOGOUT':
      return {
        ...state,
        accountData: {
          ...state.accountData,
          loginStatus: false,
        },
      };

    default:
      return state;
  }
};

//create Provider component
const ApiProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  //console.log(`ApiContext: ${JSON.stringify(state)}`);
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export { ApiContext, ApiProvider };