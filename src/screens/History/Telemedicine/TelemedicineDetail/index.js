//React
import { useState, useContext } from 'react';
import { AppContext } from 'context/AppContext';
import styled from 'styled-components/native';

//Components
import { COLOR, BUTTON } from 'constants/design';
import { ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeArea, Container, ScrollView, Row, DividingLine, PaddingContainer, Box } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { SubColorButton } from 'components/Button';

export default function TelemedicineDetailScreen({ navigation, route }) {

  const telemedicineData = route.params.telemedicineData;

  function handleViewTelemedicineOpinion() {
    navigation.navigate('TelemedicineOpinion');
  }

  return (
    <SafeArea>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>

          <PaddingContainer>
            <Text T7 color={COLOR.GRAY1} marginTop={30}>{telemedicineData.date} ({telemedicineData.time})</Text>
            <Text T3 bold marginTop={6}>{telemedicineData.doctorInfo.department} / {telemedicineData.profileInfo.passport?.user_name}님 ({telemedicineData.relationship})</Text>
            <Text T6 medium color={COLOR.GRAY1} marginTop={12}>{telemedicineData?.explain_symptom}</Text>
          </PaddingContainer>

          <DoctorContainer>
            <Image source={{ uri: telemedicineData.doctorInfo.photo }} circle width={66} height={66} />
            <CardDoctorInfoColumn>
              <Text T4 bold>{telemedicineData.doctorInfo.name} 의사</Text>
              <Text T7 bold color={COLOR.GRAY2}>{telemedicineData.doctorInfo.hospital} / {telemedicineData.doctorInfo.department}</Text>
              <Row marginTop={12}>
                {telemedicineData.doctorInfo.strength?.map((item, index) =>
                  <Text key={`field${index}`} T7 color={COLOR.GRAY1}>#{item} </Text>
                )}
              </Row>
            </CardDoctorInfoColumn>
          </DoctorContainer>

          <PaddingContainer>
            <Text T3 bold marginTop={24}>전자 소견서</Text>
            {
              telemedicineData?.opinion
                ? <CustomSubColorButton underlayColor={COLOR.SUB2} onPress={() => handleViewTelemedicineOpinion()}>
                  <Text T5 medium color={COLOR.MAIN}>전자 소견서 보기</Text>
                </CustomSubColorButton>
                : (<Center>
                  <Box height={24} />
                  <ActivityIndicator size="large" color="#5500CC" />
                  <Text T3 bold marginTop={12}>전자 소견서 작성중</Text>
                  <Text T6 medium center color={COLOR.GRAY1} marginTop={12}>담당 의사가 소견서를 작성중입니다{'\n'}잠시만 기다려주세요</Text>
                </Center>)
            }
          </PaddingContainer>

          <DividingLine marginTop={36} />

          <PaddingContainer>
            <Text T3 bold marginTop={24}>결제 내역</Text>
            <Text T3 bold color={COLOR.MAIN} marginTop={9}>진료 연장 50,000원</Text>
            <Row marginTop={18}>
              <Text T6 medium color={COLOR.GRAY1} marginRight={42}>결제 금액</Text>
              <Text T6 color={COLOR.GRAY1}>50,000원 | 일시불</Text>
            </Row>
            <Row marginTop={6}>
              <Text T6 medium color={COLOR.GRAY1} marginRight={42}>결제 수단</Text>
              <Text T6 color={COLOR.GRAY1}>삼성 마스타 5188</Text>
            </Row>
            <Row marginTop={6}>
              <Text T6 medium color={COLOR.GRAY1} marginRight={42}>결제 일시</Text>
              <Text T6 color={COLOR.GRAY1}>23.04.07 (11:30)</Text>
            </Row>
          </PaddingContainer>

        </ScrollView>
      </Container>
    </SafeArea>
  );
}

const DoctorContainer = styled.View`
  margin-top: 24px;
  width: 100%;
  padding: 20px;
  flex-direction: row;
  align-items: center;
  background-color: ${COLOR.GRAY6};
`;

const CardDoctorInfoColumn = styled.View`
  margin-left: 24px;
`;

const CustomSubColorButton = styled.TouchableHighlight`
  margin-top: 24px;
  width: ${BUTTON.FULL.WIDTH};
  height: 48px;
  border-radius: ${BUTTON.FULL.BORDER_RADIUS};
  background-color: ${COLOR.SUB3};
  align-items: center;
  justify-content: center;
`;

const Center = styled.View`
  width: 100%;
  align-items: center;
`;