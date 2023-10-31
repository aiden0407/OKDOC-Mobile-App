//React
import { useState, useEffect, useContext } from 'react';
import { ApiContext } from 'context/ApiContext';
import { AppContext } from 'context/AppContext';
import styled from 'styled-components/native';

//Components
import * as Device from 'expo-device';
import { COLOR } from 'constants/design';
import { Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeArea, ScrollView, Container, ContainerCenter, Row, DividingLine, Box } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { SolidButton } from 'components/Button';
import NeedLogin from 'components/NeedLogin';

//Api
import { getBiddingInformation } from 'api/Home';
import { getScheduleByPatientId, getPurchaseInformation, getInvoiceInformation, canclePayment, treatmentCancel } from 'api/History';

//Assets
import letterIcon from 'assets/icons/mypage-letter.png';

export default function HistoryScreen({ navigation }) {

  const { state: { accountData, profileData, productList, historyData }, dispatch: apiContextDispatch } = useContext(ApiContext);
  const { state: { historyDataId }, dispatch: appContextDispatch } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (accountData.loginToken) {
      getAppointmentHistory();
    } else {
      setIsLoading(false);
    }
  }, [profileData, historyDataId]);

  const onRefresh = () => {
    setRefreshing(true);
    getAppointmentHistory();
  };

  const getAppointmentHistory = async function () {
    try {
      const response = await getScheduleByPatientId(accountData.loginToken, profileData?.[0]?.id);
      const historyList = response.data.response;
      const contextHistorySet = {
        underReservation: [
        ],
        pastHistory: [
        ],
      };

      for (let ii = 0; ii < historyList.length; ii++) {
        const history = historyList[ii];
        history.productInfo = productList[2];

        try {
          const response = await getBiddingInformation(accountData.loginToken, history.bidding_id);
          const biddingInfo = response.data.response;
          history.biddingInfo = biddingInfo;
          history.doctorInfo = biddingInfo.doctor;
          history.profileInfo = biddingInfo.patient;
          history.department = biddingInfo.department;
          history.wish_at = biddingInfo.wish_at;
          history.explain_symptom = biddingInfo.explain_symptom;
          history.attachments = biddingInfo.attachments;
        } catch (error) {
          Alert.alert('네트워크 오류로 인해 정보를 불러오지 못했습니다.');
        }

        try {
          const response = await getPurchaseInformation(accountData.loginToken, history.id);
          const purchaseInfo = response.data.response[0];
          history.purchaseInfo = purchaseInfo;
          history.purchaseId = purchaseInfo.id;
        } catch (error) {
          Alert.alert('네트워크 오류로 인해 정보를 불러오지 못했습니다.');
        }

        try {
          const response = await getInvoiceInformation(accountData.loginToken, history.bidding_id);
          history.invoiceInfo = response.data.response?.[0];
        } catch (error) {
          if (error.data.statusCode !== 404) {
            Alert.alert('네트워크 오류로 인해 정보를 불러오지 못했습니다.');
          }
        }

        const date = new Date(history.wish_at);
        const day = date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replaceAll(' ', '').slice(0, -1);
        let time = date.toLocaleTimeString('ko-KR', { hour12: false, hour: '2-digit', minute: '2-digit' });
        if (time.startsWith('24:')) {
          time = time.replace('24:', '00:');
        }
        history.date = day;
        history.time = time;

        if (history.status === 'RESERVATION_CONFIRMED') {
          contextHistorySet.underReservation.unshift(history);
        } else {
          contextHistorySet.pastHistory.unshift(history);
        }
      }

      setTimeout(function () {
        apiContextDispatch({
          type: 'HISTORY_DATA_UPDATE',
          historyData: contextHistorySet,
        });
        setRefreshing(false);
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      if(error.status===404){
        const contextHistorySet = {
          underReservation: [
          ],
          pastHistory: [
          ],
        };
        apiContextDispatch({
          type: 'HISTORY_DATA_UPDATE',
          historyData: contextHistorySet,
        });
        setIsLoading(false);
      } else {
        Alert.alert('네트워크 에러', '진료 목록 정보 불러오기를 실패하였습니다. 다시 시도해 주시기 바랍니다.');
      }
      setRefreshing(false);
    }
  };

  function getRemainingTime(wishAt) {
    const wishTime = new Date(wishAt).getTime();
    const currentTime = Date.now();
    const remainingTime = wishTime - currentTime;
    const remainingSeconds = Math.floor(remainingTime / 1000);
    return remainingSeconds;
  }
  
  function convertToHashtags(dataArray) {
    const hashtags = dataArray.map(tag => `#${tag}`).join(' ');
    return hashtags;
  }

  function handleCancleReservation(item) {
    Alert.alert('해당 진료 예약을 취소하시겠습니까?', '환불 규정에 따라 취소\n수수료가 발생할 수 있습니다.', [
      {
        text: '이전으로',
      },
      {
        text: '예약 취소',
        style: 'destructive',
        onPress: () => handleCancleComplete(item)
      },
    ]);
  }

  const handleCancleComplete = async function (item) {
    try {
      await canclePayment(accountData.loginToken, item.purchaseId, item.biddingInfo.P_TID);
      Alert.alert('해당 예약이 정상적으로 취소되었습니다.', '', [
        {
          text: '확인',
          onPress: () => handleConfirm(item)
        }
      ]);
    } catch (error) {
      if(error.data.statusCode===410){
        if(getRemainingTime(item.wish_at) > -600){
          Alert.alert('취소 불가 안내', '진료 예약 시간이 초과되어 취소가 불가능합니다.', [
            {
              text: '확인',
              onPress: () => handleConfirm(item)
            },
          ]);
        }else{
          handleCancelNotice(item)
        }
      }else{
        Alert.alert('네트워크 에러', '진료 취소 중 에러가 발생했습니다. 다시 시도해 주시기 바랍니다.');
      }
    }
  }

  function handleConfirm(item) {
    setIsLoading(true);
    appContextDispatch({ type: 'HISTORY_DATA_ID_ADD', historyDataId: item.id });
    appContextDispatch({ type: 'HISTORY_DATA_ID_ADD', historyDataId: undefined });
  }

  function handleCancelNotice(item) {
    Alert.alert('취소 불가 안내', '진료 예약 시간이 초과되어 취소가 불가능합니다.', [
      {
        text: '확인',
        onPress: () => letTreatmentStatusCANCELLED(item)
      },
    ]);
  }

  const letTreatmentStatusCANCELLED = async function (item) {
    try {
      await treatmentCancel(accountData.loginToken, item.id);
      handleConfirm(item);
    } catch (error) {
      Alert.alert('네트워크 오류로 인해 정보를 불러오지 못했습니다.');
    }
  }

  function handleEnterTelemedicine(item) {
    appContextDispatch({ type: 'HISTORY_DATA_ID_ADD', historyDataId: item.id });
    navigation.navigate('HistoryStackNavigation', {
      screen: 'SymptomDetailCheck',
      params: { telemedicineData: item }
    });
  }

  function handleViewTelemedicineDetail(item) {
    appContextDispatch({ type: 'HISTORY_DATA_ID_ADD', historyDataId: item.id });
    navigation.navigate('HistoryStackNavigation', {
      screen: 'TelemedicineDetail',
      params: { telemedicineData: item }
    });
  }

  function handleInvoicePaymnt(item) {
    appContextDispatch({ type: 'HISTORY_DATA_ID_ADD', historyDataId: item.id });
    navigation.navigate('TelemedicineRoomNavigation', {
      screen: 'Payment',
      params: { telemedicineData: item }
    });
  }

  function handleMakeReservation() {
    navigation.navigate('TelemedicineReservation', { screen: 'Category' });
  }

  function handleLogin() {
    navigation.navigate('LoginStackNavigation');
  }

  function HistoryCard({ item, type }) {
    return (
      <HistoryCardContainer>
        <CardTitleSection>
          <CardTitleColumn>
            <Text T6 bold>
              {item.doctorInfo.department} / {item.profileInfo.passport?.user_name ?? item.profileInfo.passapp_certification?.name}님 ({item.profileInfo.relationship})
            </Text>
            <Text T7 color={COLOR.GRAY1}>
              {item.date} ({item.time})
            </Text>
            {type === 'pastHistory' ? <Text T7 color={COLOR.GRAY1}>결제 {item?.invoiceInfo?.P_TID ? (item?.biddingInfo?.product?.price + 50000).toLocaleString() : item?.biddingInfo?.product?.price.toLocaleString()}원</Text> : null}
          </CardTitleColumn>
          {type === 'underReservation'
            ? getRemainingTime(item?.wish_at) > 0
              ? <CardTitleButton
                underlayColor={COLOR.GRAY5}
                onPress={() => handleCancleReservation(item)}
              >
                <Text T7 medium color={COLOR.GRAY1}>예약 취소</Text>
              </CardTitleButton>
              : getRemainingTime(item?.wish_at) > -600 || item?.invoiceInfo
                ? <CardTitleButton
                  underlayColor={COLOR.GRAY5}
                >
                  <Text T7 medium color={COLOR.GRAY1}>진료중</Text>
                </CardTitleButton>
                : <CardTitleButton
                  underlayColor={COLOR.GRAY5}
                  onPress={() => handleCancelNotice(item)}
                >
                  <Text T7 medium color={COLOR.GRAY1}>취소 불가</Text>
                </CardTitleButton>
            : item.status === 'CANCELLED'
              ? <CardTitleButton>
                <Text T7 medium color={COLOR.GRAY1}>취소됨</Text>
              </CardTitleButton>
              : !(item?.invoiceInfo) || item?.invoiceInfo?.P_TID
                ? <CardTitleButton>
                  <Text T7 medium color={COLOR.GRAY1}>완료</Text>
                </CardTitleButton>
                : <CardTitleButton>
                  <Text T7 medium color={COLOR.GRAY1}>결제 필요</Text>
                </CardTitleButton>
          }
        </CardTitleSection>

        <DividingLine thin />

        <CardDoctorInfoSection>
          <Row>
            <Image source={{ uri: item.doctorInfo?.attachments?.[0]?.Location ?? item.doctorInfo.photo }} width={66} height={66} circle />
            <CardDoctorInfoColumn>
              <Text T4 bold>{item.doctorInfo.name} 의사</Text>
              <Text T7 bold color={COLOR.GRAY2}>
                {item.doctorInfo.hospital} / {item.doctorInfo.department}
              </Text>
              <StyledText T7 color={COLOR.GRAY1} numberOfLines={1} ellipsizeMode="tail">{convertToHashtags(item.doctorInfo.strength)}</StyledText>
            </CardDoctorInfoColumn>
          </Row>
          {type === 'underReservation'
            ? getRemainingTime(item?.wish_at) > -600 || item?.invoiceInfo
              ? <CustomSolidButton
                underlayColor={COLOR.SUB1}
                onPress={() => handleEnterTelemedicine(item)}
              >
                <Text T5 medium color="#FFFFFF">진료 예약 정보</Text>
              </CustomSolidButton>
              : <CustomSolidButton
                style={{ backgroundColor: COLOR.GRAY3 }}
              >
                <Text T5 medium color="#FFFFFF">입장 시간 초과</Text>
              </CustomSolidButton>
            : item.status === 'CANCELLED'
              ? <CustomSolidButton
                style={{ backgroundColor: COLOR.GRAY3 }}
              >
                <Text T5 medium color="#FFFFFF">입장 시간 초과</Text>
              </CustomSolidButton>
              : !(item?.invoiceInfo) || item?.invoiceInfo?.P_TID
                ? <CustomSolidButton
                  underlayColor={COLOR.SUB1}
                  onPress={() => handleViewTelemedicineDetail(item)}
                >
                  <Text T5 medium color="#FFFFFF">진료 내역</Text>
                </CustomSolidButton>
                : <CustomSolidButton
                  underlayColor={COLOR.SUB1}
                  onPress={() => handleInvoicePaymnt(item)}
                >
                  <Text T5 medium color="#FFFFFF">추가 결제하기</Text>
                </CustomSolidButton>
          }
        </CardDoctorInfoSection>
      </HistoryCardContainer>
    )
  }

  if (isLoading) {
    return (
      <LoadingBackground>
        <ActivityIndicator size="large" color="#5500CC" />
      </LoadingBackground>
    )
  }

  return (
    <SafeArea>
      {
        accountData.loginToken
          ? (<>
            {(historyData?.underReservation?.length || historyData?.pastHistory?.length)
              ? <Container backgroundColor={COLOR.GRAY6} paddingHorizontal={20} paddingTop={Device.osName === 'Android' ? 0 : refreshing ? 30 : 0}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLOR.MAIN} />
                  }
                  overScrollMode='never'
                >
                  {historyData?.underReservation?.length
                    ? (<>
                      <Text T3 bold marginTop={30}>예약 / 접수 내역</Text>
                      <HistoryColumn>
                        {historyData?.underReservation?.map((item, index) =>
                          <HistoryCard key={`underReservation${index}`} item={item} type="underReservation" />
                        )}
                      </HistoryColumn>
                    </>)
                    : null
                  }
                  {historyData?.pastHistory?.length
                    ? (<>
                      <Row marginTop={30}>
                        <Text T3 bold>지난 내역</Text>
                        <Text T7 medium color={COLOR.GRAY1} marginLeft={6} marginTop={9}>전체 {historyData.pastHistory.length}건</Text>
                      </Row>
                      <HistoryColumn>
                        {historyData?.pastHistory?.map((item, index) =>
                          <HistoryCard key={`pastHistory${index}`} item={item} type="pastHistory" />
                        )}
                      </HistoryColumn>
                    </>)
                    : null
                  }
                  <Box height={40} />
                </ScrollView>
              </Container>

              : <ContainerCenter backgroundColor={COLOR.GRAY6} paddingHorizontal={20}>
                <HistoryEmptyContainer marginTop={-40}>
                  <Image source={letterIcon} width={70} height={74} />
                  <Text T3 bold marginTop={24}>진료 내역이 없습니다</Text>
                  <Text T6 medium center color={COLOR.GRAY1} marginTop={12}>해외에서도 비대면으로{'\n'}한국 대학병원 전문의를 만나보세요</Text>
                  <SolidButton
                    large
                    marginTop={24}
                    text="진료 예약"
                    action={() => handleMakeReservation()}
                  />
                </HistoryEmptyContainer>
              </ContainerCenter>
            }
          </>)

          : <ContainerCenter backgroundColor={COLOR.GRAY6} paddingHorizontal={20}>
            <NeedLogin marginTop={-40} action={() => handleLogin()} />
          </ContainerCenter>
      }

    </SafeArea>
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
  background: ${COLOR.GRAY6};
`;

const HistoryColumn = styled.View`
  margin-top: 30px;
  width: 100%;
  gap: 20px;
`;

const HistoryCardContainer = styled.View`
  width: 100%;
  background-color: #FFFFFF;
  border-radius: 10px;
`;

const CardTitleSection = styled.View`
  width: 100%;
  padding: 20px 20px 12px 20px;
  flex-direction: row;
  justify-content: space-between;
`;

const CardTitleColumn = styled.View`
  gap: 4px;
`;

const CardTitleButton = styled.TouchableHighlight`
  width: 74px;
  height: 38px;
  background-color: ${COLOR.GRAY6};
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

const CardDoctorInfoSection = styled.View`
  width: 100%;
  padding: 24px 20px 30px 20px;
`;

const CardDoctorInfoColumn = styled.View`
  margin-left: 24px;
`;

const CustomSolidButton = styled.TouchableHighlight`
  margin-top: 24px;
  width: 100%; 
  height: 48px;
  background-color: ${COLOR.MAIN};
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

const HistoryEmptyContainer = styled.View`
  width: 100%;
  padding: 40px 20px;
  border-radius: 10px;
  background-color: #FFFFFF;
  align-items: center;
`;

const StyledText = styled(Text)`
  width: 230px;
  margin-top: 12px;
`;