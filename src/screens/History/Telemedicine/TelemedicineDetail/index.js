//React
import { useState, useEffect, useContext } from 'react';
import { ApiContext } from 'context/ApiContext';
import styled from 'styled-components/native';

//Components
import { COLOR, BUTTON } from 'constants/design';
import { Alert } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { SafeArea, Container, ScrollView, Row, DividingLine, PaddingContainer, Box } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { SubColorButton } from 'components/Button';

//Api
import { getBiddingInformation, getPaymentInformation } from 'api/Home';
import { getInvoiceInformation } from 'api/History';

export default function TelemedicineDetailScreen({ navigation, route }) {

  const { state: { accountData } } = useContext(ApiContext);
  const [isLoading, setIsLoading] = useState(true);
  const [biddingData, setBiddingData] = useState();
  const [invoiceData, setInvoiceData] = useState();
  const [biddingPaymentData, setBiddingPaymentData] = useState();
  const [invoicePaymentData, setInvoicePaymentData] = useState();
  const telemedicineData = route.params.telemedicineData;
  const biddingId = telemedicineData.bidding_id;

  useEffect(() => {
    initBiddingData();
  }, []);

  const initBiddingData = async function () {
    try {
      const response = await getBiddingInformation(accountData.loginToken, biddingId);
      setBiddingData(response.data.response);
      getBiddingPaymentData(response.data.response.P_TID);
    } catch (error) {
      Alert.alert('네트워크 오류로 인해 정보를 불러오지 못했습니다.');
    }
  }

  const getBiddingPaymentData = async function (P_TID) {
    try {
      const response = await getPaymentInformation(P_TID);
      setBiddingPaymentData(response.data.response);
      setIsLoading(false);
      initInvoiceData();
    } catch (error) {
      Alert.alert('결제 정보를 불러오지 못했습니다.');
    }
  }

  const initInvoiceData = async function () {
    try {
      const response = await getInvoiceInformation(accountData.loginToken, biddingId);
      setInvoiceData(response.data.response?.[0]);
      getInvoicePaymentData(response.data.response?.[0].P_TID);
    } catch (error) {
      if (error.data.statusCode === 404) {
        return null;
      } else {
        Alert.alert('네트워크 오류로 인해 정보를 불러오지 못했습니다.');
      }
    }
  }

  const getInvoicePaymentData = async function (P_TID) {
    try {
      const response = await getPaymentInformation(P_TID);
      setInvoicePaymentData(response.data.response);
      setIsLoading(false);
    } catch (error) {
      Alert.alert('결제 정보를 불러오지 못했습니다.');
    }
  }

  function formatDate(inputDate) {
    const year = inputDate.slice(0, 4);
    const month = inputDate.slice(4, 6);
    const day = inputDate.slice(6, 8);
    const hour = inputDate.slice(8, 10);
    const minute = inputDate.slice(10, 12);
    
    const formattedDate = `${year}.${month}.${day} (${hour}:${minute})`;
    return formattedDate;
  }

  function handleViewTelemedicineOpinion() {
    navigation.navigate('TelemedicineOpinion');
  }

  if (isLoading) {
    return null;
  }

  return (
    <SafeArea>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>

          <PaddingContainer>
            <Text T7 color={COLOR.GRAY1} marginTop={30}>{telemedicineData.date} ({telemedicineData.time})</Text>
            <Text T3 bold marginTop={6}>{telemedicineData.doctorInfo.department} / {telemedicineData.profileInfo.passport?.user_name}님 ({telemedicineData.profileInfo.relationship})</Text>
            <Text T6 medium color={COLOR.GRAY1} marginTop={12}>{telemedicineData?.explain_symptom}</Text>
          </PaddingContainer>

          <DoctorContainer>
            <Image source={{ uri: telemedicineData.doctorInfo?.attachments?.[0]?.Location ?? telemedicineData.doctorInfo.photo }} circle width={66} height={66} />
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
            <Text T3 bold color={COLOR.MAIN} marginTop={20}>진료 예약 {Number(biddingPaymentData.price)?.toLocaleString()}원</Text>
            <Row marginTop={18}>
              <Text T6 medium color={COLOR.GRAY1} marginRight={42}>결제 금액</Text>
              <Text T6 color={COLOR.GRAY1}>{Number(biddingPaymentData.price)?.toLocaleString()}원 | 일시불</Text>
            </Row>
            <Row marginTop={6}>
              <Text T6 medium color={COLOR.GRAY1} marginRight={42}>결제 수단</Text>
              <Text T6 color={COLOR.GRAY1}>신용카드</Text>
            </Row>
            <Row marginTop={6}>
              <Text T6 medium color={COLOR.GRAY1} marginRight={42}>결제 일시</Text>
              <Text T6 color={COLOR.GRAY1}>{formatDate(biddingData?.P_AUTH_DT)}</Text>
            </Row>
          </PaddingContainer>

          {
            invoicePaymentData
             ?<PaddingContainer>
             <Text T3 bold color={COLOR.MAIN} marginTop={36}>진료 연장 {Number(invoicePaymentData.price)?.toLocaleString()}원</Text>
             <Row marginTop={18}>
               <Text T6 medium color={COLOR.GRAY1} marginRight={42}>결제 금액</Text>
               <Text T6 color={COLOR.GRAY1}>{Number(invoicePaymentData.price)?.toLocaleString()}원 | 일시불</Text>
             </Row>
             <Row marginTop={6}>
               <Text T6 medium color={COLOR.GRAY1} marginRight={42}>결제 수단</Text>
               <Text T6 color={COLOR.GRAY1}>신용카드</Text>
             </Row>
             <Row marginTop={6}>
               <Text T6 medium color={COLOR.GRAY1} marginRight={42}>결제 일시</Text>
               <Text T6 color={COLOR.GRAY1}>{formatDate(invoiceData?.P_AUTH_DT)}</Text>
             </Row>
              </PaddingContainer>
              : null
          }

          <Box height={100} />

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