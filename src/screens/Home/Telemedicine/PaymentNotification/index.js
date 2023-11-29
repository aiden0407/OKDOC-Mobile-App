//React
import { useState, useContext } from 'react';
import { ApiContext } from 'context/ApiContext';
import { AppContext } from 'context/AppContext';
import styled from 'styled-components/native';

//Components
import { CONSTANT_POLICY } from 'constants/service';
import { COLOR } from 'constants/design';
import { Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'components/Image';
import { SafeArea, ScrollView, Row, DividingLine, PaddingContainer } from 'components/Layout';
import { Text } from 'components/Text';
import { SolidButton } from 'components/Button';

//Api
import { getScheduleByPatientId, getBiddingInformation, createBidding } from 'api/Home';

//Assets
import exclamationIcon from 'assets/icons/circle-exclamation.png';

export default function PaymentNotificationScreen({ navigation }) {

  const { state: { accountData } } = useContext(ApiContext);
  const { state: { telemedicineReservationStatus }, dispatch } = useContext(AppContext);
  const [paymentAgreement, setPaymentAgreement] = useState(false);
  const [refundAgreement, setRefundAgreement] = useState(false);
  const [processStatus, setProcessStatus] = useState('BEFORE');

  function handlePaymentPolicyDetail() {
    navigation.navigate('PaymentPolicyDetail', {
      content: CONSTANT_POLICY.THIRD_PARTY,
    })
  }

  function handleRefundPolicyDetail() {
    navigation.navigate('PaymentPolicyDetail', {
      content: CONSTANT_POLICY.REFUND,
    })
  }

  const handleProceedPayment = async function () {
    setProcessStatus('LOADING');

    try {
      const response = await getScheduleByPatientId(accountData.loginToken, telemedicineReservationStatus.profileInfo?.id);
      const appointmentList = response.data.response;
      let appointmentExist = false;

      for (let ii = 0; ii < appointmentList.length; ii++) {
        const appointment = appointmentList[ii];
        try {
          const response = await getBiddingInformation(accountData.loginToken, appointment.bidding_id);
          const biddingInfo = response.data.response;
          if (biddingInfo.wish_at === telemedicineReservationStatus.doctorInfo.scheduleTime) {
            appointmentExist = true;
          }
        } catch (error) {
          setProcessStatus('BEFORE');
          Alert.alert('네트워크 오류로 인해 정보를 불러오지 못했습니다.');
          break ;
        }
      }

      if (appointmentExist) {
        setProcessStatus('BEFORE');
        Alert.alert('예약 오류', '동일 시간대에 이미 예약이 되어있습니다.');
      } else {
        try {
          const response = await createBidding(accountData.loginToken, telemedicineReservationStatus);
          dispatch({
            type: 'TELEMEDICINE_RESERVATION_BIDDING_ID',
            biddingId: response.data.response.id,
          });
          navigation.navigate('TelemedicineReservationPayment', { screen: 'Payment' });
          setProcessStatus('BEFORE');
        } catch (error) {
          console.log(error.data)
          setProcessStatus('BEFORE');
          Alert.alert('결제 정보 생성 실패', '고객센터로 문의해주시기 바랍니다.');
        }
      }
    } catch (error) {
      if(error.status===404){
        // 예약되어 있는 진료 없음
        try {
          const response = await createBidding(accountData.loginToken, telemedicineReservationStatus);
          dispatch({
            type: 'TELEMEDICINE_RESERVATION_BIDDING_ID',
            biddingId: response.data.response.id,
          });
          navigation.navigate('TelemedicineReservationPayment', { screen: 'Payment' });
          setProcessStatus('BEFORE');
        } catch (error) {
          setProcessStatus('BEFORE');
          Alert.alert('결제 정보 생성 실패', '고객센터로 문의해주시기 바랍니다.');
        }
      } else {
        setProcessStatus('BEFORE');
        Alert.alert('네트워크 에러', '진료 목록 불러오기를 실패하였습니다. 다시 시도해 주시기 바랍니다.');
      }
    }
  }

  return (
    <>
      <SafeArea>
        <ScrollView showsVerticalScrollIndicator={false} overScrollMode='never'>
          <PaddingContainer>
            <Text T3 bold marginTop={30}>의료 상담을 위해{'\n'}예약하신 정보를 확인 해주세요</Text>
            <Row marginTop={24}>
              <Text T3 bold color={COLOR.MAIN}>비용 {telemedicineReservationStatus.product.price?.toLocaleString()}원</Text>
            </Row>
            <Row align marginTop={15}>
              <Ionicons name="checkmark-sharp" size={18} color={COLOR.MAIN} marginRight={6} />
              <Text T6 medium>{telemedicineReservationStatus.doctorInfo.name} 의사 ({telemedicineReservationStatus.doctorInfo.hospital})</Text>
            </Row>
            <Row align marginTop={12}>
              <Ionicons name="checkmark-sharp" size={18} color={COLOR.MAIN} marginRight={6} />
              <Text T6 medium>{telemedicineReservationStatus.doctorInfo.subject} / 의료 상담</Text>
            </Row>
            <Row align marginTop={12}>
              <Ionicons name="checkmark-sharp" size={18} color={COLOR.MAIN} marginRight={6} />
              <Text T6 medium>2023년 {telemedicineReservationStatus.date.substr(0, 2)}월 {telemedicineReservationStatus.date.substr(-2)}일 ({telemedicineReservationStatus.time})</Text>
            </Row>
            <Row align marginTop={12}>
              <Ionicons name="checkmark-sharp" size={18} color={COLOR.MAIN} marginRight={6} />
              <Text T6 medium>예약자 : {telemedicineReservationStatus.profileInfo.name}</Text>
            </Row>
          </PaddingContainer>

          <DividingLine marginTop={30} />

          <PaddingContainer>
            <Text T3 bold marginTop={30}>유의사항</Text>
            <Row marginTop={15}>
              <Ionicons name="checkmark-sharp" size={18} color={COLOR.MAIN} marginRight={6} />
              <Text T6 medium>대한민국에서는 상담실 입장이 불가능합니다.</Text>
            </Row>
            <Row marginTop={15}>
              <Ionicons name="checkmark-sharp" size={18} color={COLOR.MAIN} marginRight={6} />
              <Text T6 medium>재외국민 비대면 의료 상담은 비급여 항목 입니다.</Text>
            </Row>
            <Row marginTop={15}>
              <Ionicons name="checkmark-sharp" size={18} color={COLOR.MAIN} marginRight={6} />
              <Text T6 medium>현지 약 처방 및 배송은 제공하지 않습니다.</Text>
            </Row>
            <Row marginTop={15}>
              <Ionicons name="checkmark-sharp" size={18} color={COLOR.MAIN} marginRight={6} />
              <Text T6 medium>기본 10분 상담이며, 추가로 5분 연장 가능합니다.</Text>
            </Row>
            <Row marginTop={15}>
              <Ionicons name="checkmark-sharp" size={18} color={COLOR.MAIN} marginRight={6} />
              <Text T6 medium>진료시간 연장 시 50,000원의 추가 비용이 발생합니다.</Text>
            </Row>
          </PaddingContainer>

          <DividingLine marginTop={30} />

          <PaddingContainer>
            <Text T3 bold marginTop={30}>결제 내용 확인 및 결제 동의</Text>
            <Row marginTop={15} align>
              <AgreeRow onPress={() => setPaymentAgreement(!paymentAgreement)}>
                <Ionicons name="checkbox" size={22} color={paymentAgreement ? COLOR.MAIN : COLOR.GRAY3} marginRight={6} />
                <Text T6 bold marginBottom={1.5}>[필수] </Text>
                <Text T6 medium>개인정보 제3자 제공 동의</Text>
              </AgreeRow>
              <PolicyDetailIconWrapper onPress={() => handlePaymentPolicyDetail()}>
                <Ionicons name="chevron-forward" size={22} />
              </PolicyDetailIconWrapper>
            </Row>
            <Row marginTop={15} align>
              <AgreeRow onPress={() => setRefundAgreement(!refundAgreement)}>
                <Ionicons name="checkbox" size={22} color={refundAgreement ? COLOR.MAIN : COLOR.GRAY3} marginRight={6} />
                <Text T6 bold marginBottom={1.5}>[필수] </Text>
                <Text T6 medium>취소 및 환불 규정 동의</Text>
              </AgreeRow>
              <PolicyDetailIconWrapper onPress={() => handleRefundPolicyDetail()}>
                <Ionicons name="chevron-forward" size={22} />
              </PolicyDetailIconWrapper>
            </Row>
            <RefundPolicyNotificationContainer>
              <Row align>
                <BulletPoint />
                <Text T7 color={COLOR.GRAY2}>상담 시작 5분 전 : 100% 환불</Text>
              </Row>
              <Row align>
                <BulletPoint />
                <Text T7 color={COLOR.GRAY2}>이외 시간 : 환불 불가</Text>
              </Row>
              <Text T7 color={COLOR.GRAY2}>결제되는 상품에 대한 배송, 환불, 민원등의 책임은 (주)인성정보에서 진행합니다 | 민원 담당자 : 김형도 02-3400-7419</Text>
            </RefundPolicyNotificationContainer>

            <SolidButton
              marginTop={60}
              marginBottom={20}
              text="결제하기"
              disabled={!paymentAgreement || !refundAgreement}
              action={() => setProcessStatus('NOTICE')}
            />
          </PaddingContainer>
        </ScrollView>
      </SafeArea>

      {processStatus !== 'BEFORE' && (
        <BottomSheetBackground>
          <BottomSheetContainer>
            {
              processStatus === 'NOTICE' && (<>
                <Image source={exclamationIcon} width={70} height={70} marginTop={-20} />
                <Text T4 medium center marginTop={12}>유의사항을 모두 확인하였으며,{'\n'}이에 동의하고 결제를 진행하시겠습니까?</Text>
                <Row gap={24} marginTop={30}>
                  <DisabledButtonWrapper onPress={() => setProcessStatus('BEFORE')}>
                    <SolidButton
                      disabled
                      medium
                      text="뒤로가기"
                    />
                  </DisabledButtonWrapper>
                  <SolidButton
                    medium
                    text="결제하기"
                    action={() => handleProceedPayment()}
                  />
                </Row>
              </>)
            }
            {
              processStatus === 'LOADING' && (<>
                <ActivityIndicator size="large" color="#5500CC" />
                <Text T4 medium center marginTop={30} marginBottom={50}>결제를 준비중입니다.{'\n'}잠시만 기다려 주시기 바랍니다.</Text>
              </>)
            }
          </BottomSheetContainer>
        </BottomSheetBackground>
      )}
    </>
  );
}

const LoadingBackground = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFFFFFDD;
`;

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

const BottomSheetBackground = styled.Pressable`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #000000AA;
`;

const BottomSheetContainer = styled.View`
  position: absolute;
  height: 340px;
  width: 100%;
  bottom: 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #FFFFFF;
  align-items: center;
  justify-content: center;
`;

const DisabledButtonWrapper = styled.Pressable`
`;