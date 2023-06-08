//React
import { useState, useEffect, useContext } from 'react';
import { AppContext } from 'context/AppContext';
import { ApiContext } from 'context/ApiContext';
import styled from 'styled-components/native';

//Components
import { COLOR } from 'constants/design';
import { Ionicons } from '@expo/vector-icons';
import { SafeArea, Container, ScrollView, Row, DividingLine } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';

//Api
import { getDoctorsByDepartment, getDoctorInformationByDoctorId, getScheduleByDoctorId } from 'api/Home';

export default function ReservationScreen({ navigation, route }) {

  const { dispatch } = useContext(AppContext);
  const { state: { accountData: { loginToken: loginToken }, bookableData } } = useContext(ApiContext);
  const [dateIndex, setDateIndex] = useState(0);
  const [timeIndex, setTimeIndex] = useState(0);

  useEffect(() => {
    const initScheduleData = async function () {
      try {
        const getDoctorsByDepartmentResponse = await getDoctorsByDepartment('department');
        const getDoctorInformationByDoctorIdResponse = await getDoctorInformationByDoctorId('doctorId');
        const getScheduleByDoctorIdResponse = await getScheduleByDoctorId(loginToken, 'doctorId');

        dispatch({ 
          type: 'BOOKABLE_DATA_UPDATE', 
          bookableData: date,
        });
        

      } catch (error) {
        Alert.alert('네트워크 오류로 인해 정보를 불러오지 못했습니다.');
      }
    }

  }, []);

  function handleSelectDoctor(date, time, doctorInfo) {
    dispatch({ 
      type: 'TELEMEDICINE_RESERVATION_DOCTOR', 
      date: date, 
      time: time, 
      doctorInfo: doctorInfo,
    });
    navigation.navigate('DoctorProfile');
  }

  return (
    <SafeArea>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>

          <ReservationContainer>
            <Text T3 bold marginTop={30}>진료시간을 선택해주세요</Text>
            <Text T6 medium marginTop={36}>날짜선택</Text>
            <DateContainer>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {bookableData.map((item, index) =>
                  <DateButton
                    key={`date${index}`}
                    isSelected={dateIndex === index}
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
                    isSelected={timeIndex === index}
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
                  <Row marginTop={12}>
                    { item.medicalField.map((item, index) => 
                      <Text key={`field${index}`} T7 color={COLOR.GRAY1}>#{item} </Text>
                    )}
                  </Row>
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
  background-color: ${(props) => props.isSelected ? COLOR.SUB3 : COLOR.GRAY6};
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
  background-color: ${(props) => props.isSelected ? COLOR.SUB3 : COLOR.GRAY6};
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