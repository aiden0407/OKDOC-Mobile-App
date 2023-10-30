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
import { getInvoiceInformation, getTreatmentResults } from 'api/History';

//Expo Print
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

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

    try {
      const response = await getTreatmentResults(accountData.loginToken, telemedicineData.id);
      telemedicineData.opinion = response.data.response[0];
    } catch (error) {
      telemedicineData.opinion = 'asdf';
      //Alert.alert('네트워크 오류로 인해 정보를 불러오지 못했습니다.');
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

  const handleViewTelemedicineOpinion = async () => {
    const html = `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
          <!-- Pretendard Fonts -->
          <link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.7/dist/web/static/pretendard-dynamic-subset.css" />
          <!-- Pretendard Fonts End -->
          <style>
            body {
              font-family: 'Pretendard';
              text-align: center;
            }
            .main {
              font-size: 20;
            }
            .title: {
              font-size: 11;
              textAlign: center;
            },
            .content: {
              font-size: 11;
            },
            ,row1: {
              margin-top: 30;
              width: 100%;
              display: flex;
              flexDirection: row;
            },
          </style>
        </head>

        <body style="text-align: center;">
          <p class='main'>소견서</p>

          <div style={styles.row1}>
            <div style={styles.titleBox1}>
              <p style={styles.title}>환자의 성명</p>
            </div>
            <div style={styles.contentBox1}>
              <p style={styles.content}>{treatmentData?.patient?.passport?.user_name ?? treatmentData?.patient?.passapp_certification?.name}</p>
            </div>
            <div style={styles.titleBox1}>
              <p style={styles.title}>환자 생년월일</p>
            </div>
            <div style={styles.contentBox1}>
              <p style={styles.content}>{treatmentData?.patient?.passport ? formatDate(String(treatmentData?.patient?.passport?.birth)) : treatmentData?.patient?.passapp_certification?.birthday.replaceAll('-', '.')}</p>
            </div>
          </div>

          <div style={styles.row2}>
            <div style={styles.titleBox2}>
              <p style={styles.title}>병명</p>
              <div style={styles.column1}>
                <p style={styles.content}>{diagnosisType === 'presumptive' ? '◉ 임상적 추정' : '○ 임상적 추정'}</p>
                <p style={styles.content}>{diagnosisType === 'definitive' ? '◉ 최종 진단' : '○ 최종 진단'}</p>
              </div>
            </div>
            <div style={styles.contentBox2}>
              <p style={styles.content}>{diagnosis}</p>
            </div>
            <div style={styles.titleBox2}>
              <p style={styles.title}>질병 분류 기호</p>
            </div>
            <div style={styles.contentBox2}>
              <p style={styles.content}>{diagnosisCode}</p>
            </div>
          </div>

          <div style={styles.row2}>
            <div style={styles.titleBox3}>
              <p style={styles.title}>진료 내용 및{'\n'}향후 치료에 대한{'\n'}소견</p>
            </div>
            <div style={styles.contentBox3}>
              <div style={styles.column2}>
                <p style={styles.title}>(환자 호소 증상)</p>
                <p style={styles.content}>{CC}</p>
                <p style={styles.content}>{subjectiveSymtoms}</p>
              </div>
              
              <div style={styles.column2}>
                <p style={styles.title}>(본 의사의 판단)</p>
                <p style={styles.content}>{objectiveFindings}</p>
                <p style={styles.content}>{assessment}</p>
              </div>
              
              <div style={styles.column2}>
                <p style={styles.title}>(치료 계획)</p>
                <p style={styles.content}>{plan}</p>
              </div>
              
              <div style={styles.column2}>
                <p style={styles.title}>(본 의사의 판단)</p>
                <p style={styles.content}>{medicalOpinion}</p>
              </div>
            </div>
          </div>

          <div style={styles.contentBox4}>
            <p style={styles.content}>상기 진료는 ㈜인성정보의 OK DOC 플랫폼을 통한 원격진료로 진행되었으며, 위와 같이 소견합니다.</p>
            <div style={styles.row3}>
              <p style={styles.content}>{returnToday()}</p>
            </div>
            <div style={styles.row4}>
              <p style={styles.content}>의료기관 명칭 : 의정부을지대학교병원</p>
              <p style={styles.content}> </p>
              <p style={styles.content}>주소 : 경기도 의정부시 동일로 712 (금오동)</p>
              <p style={styles.content}> </p>
              <p style={styles.content}> </p>
              <p style={styles.content}> </p>
              <p style={styles.content}>[○]의사 [ ]치과의사 [ ]한의사 면허번호 : 제 {treatmentData?.doctor?.id} 호</p>
              <p style={styles.content}> </p>
              <p style={styles.content}>성명:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{treatmentData?.doctor?.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(서명)</p>
            </div>
          </div>
        </body>
      </html>
    `;
    const { uri } = await Print.printToFileAsync({ html });
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  // function handleViewTelemedicineOpinion() {
  //   navigation.navigate('TelemedicineOpinion', {telemedicineData: telemedicineData});
  // }

  if (isLoading) {
    return null;
  }

  return (
    <SafeArea>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>

          <PaddingContainer>
            <Text T7 color={COLOR.GRAY1} marginTop={30}>{telemedicineData.date} ({telemedicineData.time})</Text>
            <Text T3 bold marginTop={6}>{telemedicineData.doctorInfo.department} / {telemedicineData.profileInfo.passport?.user_name ?? telemedicineData.profileInfo.passapp_certification?.name}님 ({telemedicineData.profileInfo.relationship})</Text>
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