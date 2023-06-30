//React
import { useState, useContext } from 'react';
import { ApiContext } from 'context/ApiContext';
import { AppContext } from 'context/AppContext';
import styled from 'styled-components/native';

//Components
import { COLOR } from 'constants/design';
import { Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeArea, ScrollView, Row, DividingLine, PaddingContainer } from 'components/Layout';
import { Text } from 'components/Text';
import { SolidButton } from 'components/Button';

//Api
import { createBidding } from 'api/Home';

export default function PaymentNotificationScreen({ navigation }) {

  const { state: { accountData } } = useContext(ApiContext);
  const { state: { telemedicineReservationStatus }, dispatch } = useContext(AppContext);
  const [paymentAgreement, setPaymentAgreement] = useState(false);
  const [refundAgreement, setRefundAgreement] = useState(false);

  function handlePaymentPolicyDetail() {
    // navigation.navigate('PaymentPolicyDetail', {
    //   content: policyHTML,
    // })
  }

  function handleRefundPolicyDetail() {
    // navigation.navigate('PaymentPolicyDetail', {
    //   content: refundHTML,
    // })
  }

  const handleProceedPayment = async function () {
    try {
      const response = await createBidding(accountData.loginToken, telemedicineReservationStatus);
      console.log(response.data.response[0].id);
      dispatch({
        type: 'TELEMEDICINE_RESERVATION_BIDDING_ID',
        biddingId: response.data.response[0].id,
      });
      navigation.navigate('TelemedicineReservationPayment', { screen: 'Payment' });
    } catch (error) {
      Alert.alert('예약 오류', '진료 예약 중 문제가 발생했습니다. 다시 시도해 주시기 바랍니다.');
    }
  }

  return (
    <SafeArea>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PaddingContainer>
          <Text T3 bold marginTop={30}>진료를 위해{'\n'}예약하신 정보를 확인 해주세요</Text>
          <Row marginTop={24}>
            <Text T3 bold color={COLOR.MAIN}>비용 {telemedicineReservationStatus.product.price?.toLocaleString()}원</Text>
            <Text T3 bold color={COLOR.GRAY1}> (비급여 진료)</Text>
          </Row>
          <Row align marginTop={15}>
            <Ionicons name="checkmark-sharp" size={18} color={COLOR.MAIN} marginRight={6}/>
            <Text T6 medium>{telemedicineReservationStatus.doctorInfo.name} 의사 ({telemedicineReservationStatus.doctorInfo.hospital})</Text>
          </Row>
          <Row align marginTop={12}>
            <Ionicons name="checkmark-sharp" size={18} color={COLOR.MAIN} marginRight={6} />
            <Text T6 medium>{telemedicineReservationStatus.doctorInfo.subject} / {telemedicineReservationStatus.product.name}</Text>
          </Row>
          <Row align marginTop={12}>
            <Ionicons name="checkmark-sharp" size={18} color={COLOR.MAIN} marginRight={6}/>
            <Text T6 medium>2023년 {telemedicineReservationStatus.date.substr(0, 2)}월 {telemedicineReservationStatus.date.substr(-2)}일 ({telemedicineReservationStatus.time})</Text>
          </Row>
          <Row align marginTop={12}>
            <Ionicons name="checkmark-sharp" size={18} color={COLOR.MAIN} marginRight={6}/>
            <Text T6 medium>예약자: {telemedicineReservationStatus.profileInfo.name}</Text>
          </Row>
        </PaddingContainer>

        <DividingLine marginTop={30} />

        <PaddingContainer>
          <Text T3 bold marginTop={30}>진료 유의사항</Text>
          <Row marginTop={15}>
            <Ionicons name="checkmark-sharp" size={18} color={COLOR.MAIN} marginRight={6} />
            <Text T6 medium>대한민국에서는 진료실 입장이 불가능합니다.</Text>
          </Row>
          <Row marginTop={15}>
            <Ionicons name="checkmark-sharp" size={18} color={COLOR.MAIN} marginRight={6} />
            <Text T6 medium>재외국민 진료는 비급여 진료 입니다.</Text>
          </Row>
          <Row marginTop={15}>
            <Ionicons name="checkmark-sharp" size={18} color={COLOR.MAIN} marginRight={6} />
            <Text T6 medium>현지 약 처방 및 배송은 제공하지 않습니다.</Text>
          </Row>
          <Row marginTop={15}>
            <Ionicons name="checkmark-sharp" size={18} color={COLOR.MAIN} marginRight={6} />
            <Text T6 medium>진료시간은 10분입니다.</Text>
          </Row>
          {/* <Row marginTop={15}>
            <Ionicons name="checkmark-sharp" size={18} color={COLOR.MAIN} marginRight={6} />
            <Text T6 medium>기본 진료시간은 10분이며, 추가로 5분 연장 가능합니다.</Text>
          </Row>
          <Row marginTop={15}>
            <Ionicons name="checkmark-sharp" size={18} color={COLOR.MAIN} marginRight={6} />
            <Text T6 medium>진료시간 연장 시 50,000원의 추가 비용이 발생합니다.</Text>
          </Row> */}
        </PaddingContainer>

        <DividingLine marginTop={30} />

        <PaddingContainer>
          <Text T3 bold marginTop={30}>결제 내용 확인 및 결제 동의</Text>
          <Row marginTop={15} align>
            <AgreeRow onPress={()=>setPaymentAgreement(!paymentAgreement)}>
              <Ionicons name="checkbox" size={22} color={paymentAgreement ? COLOR.MAIN : COLOR.GRAY3} marginRight={6} />
              <Text T6 bold marginBottom={1.5}>[필수] </Text>
              <Text T6 medium>결제 대행 서비스 이용 약관에 동의합니다</Text>
            </AgreeRow>
            <PolicyDetailIconWrapper onPress={()=>handlePaymentPolicyDetail()}>
              <Ionicons name="chevron-forward" size={22} />
            </PolicyDetailIconWrapper>
          </Row>
          <Row marginTop={15} align>
            <AgreeRow onPress={()=>setRefundAgreement(!refundAgreement)}>
              <Ionicons name="checkbox" size={22} color={refundAgreement ? COLOR.MAIN : COLOR.GRAY3} marginRight={6} />
              <Text T6 bold marginBottom={1.5}>[필수] </Text>
              <Text T6 medium>취소 및 환불 규정에 동의합니다</Text>
            </AgreeRow>
            <PolicyDetailIconWrapper onPress={()=>handleRefundPolicyDetail()}>
              <Ionicons name="chevron-forward" size={22} />
            </PolicyDetailIconWrapper>
          </Row>
          <RefundPolicyNotificationContainer>
            <Row align>
              <BulletPoint />
              <Text T7 color={COLOR.GRAY2}>진료 1일 전 취소 : 100% 환불</Text>
            </Row>
            <Row align>
              <BulletPoint />
              <Text T7 color={COLOR.GRAY2}>진료 1시간 전 취소 : 50% 환불</Text>
            </Row>
            <Row align>
              <BulletPoint />
              <Text T7 color={COLOR.GRAY2}>진료 입장 전 취소 : 30% 환불</Text>
            </Row>
            <Row align>
              <BulletPoint />
              <Text T7 color={COLOR.GRAY2}>진료 입장 시간 이후 : 환불 불가</Text>
            </Row>
          </RefundPolicyNotificationContainer>
          <SolidButton
            marginTop={60}
            marginBottom={20}
            text="결제하기"
            disabled={!paymentAgreement || !refundAgreement}
            action={() => handleProceedPayment()}
          />
        </PaddingContainer>
      </ScrollView>
    </SafeArea>
  );
}

const AgreeRow = styled.Pressable`
  flex-direction: row;
  align-items: center;
`;

const PolicyDetailIconWrapper = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  bottom: -3px;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
`;

const RefundPolicyNotificationContainer = styled.View`
  margin-top: 18px;
  width: 100%;
  padding: 18px 24px;
  background-color: ${COLOR.GRAY6};
  border-radius: 10px;
  gap: 8px;
`;

const BulletPoint = styled.View`
  margin-right: 6px;
  width: 3px;
  height: 3px;
  border-radius: 50px;
  background-color: ${COLOR.GRAY1};
`;