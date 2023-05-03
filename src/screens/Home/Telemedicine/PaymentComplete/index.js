//React
import { useState, useContext } from 'react';
import { AppContext } from 'context/AppContext';
import styled from 'styled-components/native';

//Components
import { COLOR } from 'constants/design';
import { SYMPTOM, DEPARTMENT } from 'constants/service';
import { Ionicons } from '@expo/vector-icons';
import { SafeArea, Container, Row, DividingLine, PaddingContainer } from 'components/Layout';
import { Text } from 'components/Text';
import { SolidButton } from 'components/Button';

export default function PaymentConfirmScreen({ navigation }) {

  const { state: { telemedicineReservationStatus }, dispatch } = useContext(AppContext);

  function handleConfirm() {
    dispatch({ type: 'TELEMEDICINE_RESERVATION_CONFIRMED' });
    navigation.navigate('BottomTapNavigation', { screen: 'History'});
  }

  return (
    <SafeArea>
      <Container>
        <Container>
        <PaddingContainer>
          <Text T3 bold marginTop={30}>결제가 완료되었어요</Text>
          <Text T3 bold color={COLOR.MAIN} marginTop={9}>비용 120,000원</Text>
          <Row marginTop={18}>
            <Text T6 medium color={COLOR.GRAY1} marginRight={42}>결제 금액</Text>
            <Text T6 color={COLOR.GRAY1}>120,000원 | 일시불</Text>
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

        <DividingLine marginTop={30} />

        <PaddingContainer>
          <Text T3 bold marginTop={30}>예약하신 내역을 확인해주세요</Text>
          <Row align marginTop={15}>
            <Ionicons name="checkmark-sharp" size={18} color={COLOR.MAIN} marginRight={6} />
            <Text T6 medium>{telemedicineReservationStatus.doctorInfo.name} 의사 (을지대학교병원)</Text>
          </Row>
          <Row align marginTop={12}>
            <Ionicons name="checkmark-sharp" size={18} color={COLOR.MAIN} marginRight={6} />
            <Text T6 medium>{telemedicineReservationStatus.doctorInfo.subject} / 진료</Text>
          </Row>
          <Row align marginTop={12}>
            <Ionicons name="checkmark-sharp" size={18} color={COLOR.MAIN} marginRight={6} />
            <Text T6 medium>2023년 4월 {telemedicineReservationStatus.date} ({telemedicineReservationStatus.time})</Text>
          </Row>
          <Row align marginTop={12}>
            <Ionicons name="checkmark-sharp" size={18} color={COLOR.MAIN} marginRight={6} />
            <Text T6 medium>예약자: {telemedicineReservationStatus.profileInfo.name}</Text>
          </Row>
        </PaddingContainer>
        </Container>

        <PaddingContainer>
          <SolidButton
            text="확인"
            marginBottom={20}
            action={() => handleConfirm()}
          />
        </PaddingContainer>
      </Container>
    </SafeArea>
  );
}