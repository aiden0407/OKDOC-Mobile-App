//React
import { useState, useContext } from 'react';
import { AppContext } from 'context/AppContext';
import styled from 'styled-components/native';

//Components
import { COLOR } from 'constants/design';
import { Ionicons } from '@expo/vector-icons';
import { SafeArea, Container, ScrollView, DividingLine } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';

export default function ReservationScreen({ navigation, route }) {

  const { state: {telemedicineReservationStatus}, dispatch } = useContext(AppContext);
  const [dateIndex, setDateIndex] = useState(0);
  const [timeIndex, setTimeIndex] = useState(0);

  const bookableData = [
    ['27일', '목요일', [
      ['11:00',[
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
      ['11:30',[
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
      ['12:30',[
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
      ['16:00',[
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
      ['18:30',[
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
  ];

  function handleSelectDoctor(date, time, doctorInfo) {
    dispatch({ 
      type: 'TELEMEDICINE_RESERVATION_DOCTOR', 
      date: date, 
      time: time, 
      doctorId: doctorInfo.name,
    });
    navigation.navigate('DoctorProfile', {doctorInfo: doctorInfo});
  }

  return (
    <SafeArea>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>

          <ReservationContainer>
            <Text T3 bold marginTop={42}>진료시간을 선택해주세요</Text>

            <Text T6 medium marginTop={36}>날짜선택</Text>
            <DateContainer>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {bookableData.map((item, index) =>
                  <DateButton
                    key={`date${index}`}
                    isSellected={dateIndex === index}
                    onPress={() => {
                      if (dateIndex !== index) {
                        setDateIndex(index);
                        setTimeIndex(0);
                      }
                    }}
                    underlayColor={dateIndex !== index && COLOR.GRAY5}
                  >
                    <>
                      <Text T4 bold color={dateIndex === index ? COLOR.MAIN : COLOR.GRAY1}>{item[0]}</Text>
                      <Text T7 color={dateIndex === index ? COLOR.MAIN : COLOR.GRAY2}>{item[1]}</Text>
                    </>
                  </DateButton>
                )}
              </ScrollView>
            </DateContainer>

            <Text T6 medium marginTop={24}>시간선택</Text>
            <TimeContainer>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {bookableData[dateIndex][2].map((item, index) =>
                  <TimeButton
                    key={`time${index}`}
                    isSellected={timeIndex === index}
                    onPress={() => setTimeIndex(index)}
                    underlayColor={timeIndex !== index && COLOR.GRAY5}
                  >
                    <Text T6 bold color={timeIndex === index ? COLOR.MAIN : COLOR.GRAY1}>{item[0]}</Text>
                  </TimeButton>
                )}
              </ScrollView>
            </TimeContainer>
          </ReservationContainer>

          <DividingLine marginTop={42} />

          <DoctorContainer>
            <Text T6 medium>진료 가능 의사 선택</Text>
            {bookableData[dateIndex][2][timeIndex][1].map((item, index) =>
              <DoctorRow
                key={`doctor${index}`}
                onPress={() => handleSelectDoctor(bookableData[dateIndex][0], bookableData[dateIndex][2][timeIndex][0], item)}
              >
                <Image source={{ uri: item.image }} width={66} height={66} circle />
                <DoctorColumn>
                  <Text T4 bold>{item.name} 의사</Text>
                  <Text T7 medium color={COLOR.GRAY1}>{item.hospital} / {item.subject}</Text>
                  <MedicalFieldRow>
                    { item.medicalField.map((item, index) => 
                      <Text key={`field${index}`} T7 color={COLOR.GRAY2}>#{item} </Text>
                    )}
                  </MedicalFieldRow>
                </DoctorColumn>
                <Ionicons name="chevron-forward" size={24} color={COLOR.MAIN}/>
              </DoctorRow>
            )}
          </DoctorContainer>

        </ScrollView>
      </Container>
    </SafeArea>
  );
}

const ReservationContainer = styled.View`
  margin-left: 20px;
`;

const DateContainer = styled.View`
  margin-top: 12px;
  width: 100%;
  height: 80px;
`;

const DateButton = styled.TouchableHighlight`
  margin-right: 8px;
  width: 74px;
  height: 80px;
  border-radius: 5px;
  background-color: ${(props) => props.isSellected ? COLOR.SUB3 : COLOR.GRAY6};
  align-items: center;
  justify-content: center;
`;

const TimeContainer = styled.View`
  margin-top: 12px;
  width: 100%;
  height: 46px;
`;

const TimeButton = styled.TouchableHighlight`
  margin-right: 8px;
  width: 84px;
  height: 46px;
  border-radius: 5px;
  background-color: ${(props) => props.isSellected ? COLOR.SUB3 : COLOR.GRAY6};
  align-items: center;
  justify-content: center;
`;

const DoctorContainer = styled.View`
  margin-top: 42px;
  margin-bottom: 120px;
  padding: 0 20px;
`;

const DoctorRow = styled.Pressable`
  margin-top: 24px;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const DoctorColumn = styled.View`
  margin-left: 24px;
  flex: 1;
`;

const MedicalFieldRow = styled.View`
  margin-top: 12px;
  flex-direction: row;
`;