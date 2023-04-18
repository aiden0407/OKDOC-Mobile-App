//React
import { useState, useContext } from 'react';
import { AppContext } from 'context/AppContext';
import styled from 'styled-components/native';

//Components
import { COLOR } from 'constants/design';
import { SafeArea, Container, Row, PaddingContainer } from 'components/Layout';
import { Text } from 'components/Text';
import { SolidButton } from 'components/Button';

export default function PaymentConfirmScreen({ navigation, route }) {

  const telemedicineData = route.params.telemedicineData;

  function handleConfirm() {
    navigation.replace('HistoryStackNavigation', { 
      screen: 'TelemedicineDetail' ,
      params: { telemedicineData: telemedicineData }
    });
  }

  return (
    <SafeArea>
      <Container>
        <Container>
        <PaddingContainer>
          <Text T3 bold marginTop={30}>결제가 완료되었어요</Text>
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