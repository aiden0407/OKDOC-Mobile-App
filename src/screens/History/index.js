//React
import { useContext } from 'react';
import { AppContext } from 'context/AppContext';
import { ApiContext } from 'context/ApiContext';
import styled from 'styled-components/native';

//Components
import { COLOR } from 'constants/design';
import { Alert } from 'react-native';
import { SafeArea, ScrollView, Container, ContainerCenter, Row, DividingLine, Box } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { SolidButton } from 'components/Button';
import NeedLogin from 'components/NeedLogin';

//Assets
import letterIcon from 'assets/icons/mypage-letter.png';

export default function HistoryScreen({ navigation }) {

  const { dispatch } = useContext(AppContext);
  const { state: { accountData, historyData } } = useContext(ApiContext);

  function handleCancleReservation(item) {
    Alert.alert('해당 진료 예약을 취소하시겠습니까?', '환불 규정에 따라 취소\n수수료가 발생할 수 있습니다.', [
      {
        text: '이전으로',
      },
      {
        text: '예약 취소',
        style: 'destructive',
        onPress: () => handleCancleComplete()
      },
    ]);
  }

  function handleCancleComplete() {
    Alert.alert('해당 예약이 정상적으로 취소되었습니다.', '', [
      {
        text: '확인',
      }
    ]);
  }

  function handleEnterTelemedicine(item) {
    dispatch({ type: 'HISTORY_DATA_ADD', historyData: item });
    navigation.navigate('HistoryStackNavigation', { 
      screen: 'SymptomDetailCheck' ,
      params: { telemedicineData: item }
    });
  }

  function handleViewTelemedicineDetail(item) {
    dispatch({ type: 'HISTORY_DATA_ADD', historyData: item });
    navigation.navigate('HistoryStackNavigation', { screen: 'TelemedicineDetail' });
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
            <Text T6 bold>{item.doctorInfo.subject} / {item.profileInfo.name}님 ({item.profileType})</Text>
            <Text T7 color={COLOR.GRAY1}>{item.date} ({item.time})</Text>
            {type === 'pastHistory' && <Text T7 color={COLOR.GRAY1}>결제 120,000원</Text>}
          </CardTitleColumn>
          {type === 'underReservation'
            && <CardTitleButton
              underlayColor={COLOR.GRAY5}
              onPress={() => handleCancleReservation(item)}
            >
              <Text T7 medium color={COLOR.GRAY1}>예약 취소</Text>
            </CardTitleButton>
          }
          {type === 'pastHistory'
            && <CardTitleButton>
              <Text T7 medium color={COLOR.GRAY1}>완료</Text>
            </CardTitleButton>
          }
        </CardTitleSection>

        <DividingLine thin />

        <CardDoctorInfoSection>
          <Row>
            <Image source={{ uri: item.doctorInfo.image }} width={66} height={66} circle />
            <CardDoctorInfoColumn>
              <Text T4 bold>{item.doctorInfo.name} 의사</Text>
              <Text T7 bold color={COLOR.GRAY2}>{item.doctorInfo.hospital} / {item.doctorInfo.subject}</Text>
              <Row marginTop={12}>
                {item.doctorInfo.medicalField.map((item, index) =>
                  <Text key={`field${index}`} T7 color={COLOR.GRAY1}>#{item} </Text>
                )}
              </Row>
            </CardDoctorInfoColumn>
          </Row>
          {type === 'underReservation'
            && <CustomSolidButton
              underlayColor={COLOR.SUB1}
              onPress={() => handleEnterTelemedicine(item)}
            >
              <Text T5 medium color="#FFFFFF">진료실 입장</Text>
            </CustomSolidButton>
          }
          {type === 'pastHistory'
            && <CustomSolidButton
              underlayColor={COLOR.SUB1}
              onPress={() => handleViewTelemedicineDetail(item)}
            >
              <Text T5 medium color="#FFFFFF">진료 내역</Text>
            </CustomSolidButton>
          }
        </CardDoctorInfoSection>
      </HistoryCardContainer>
    )
  }

  return (
    <SafeArea>
      {
        accountData.loginStatus
          ? (<>
            {(historyData.underReservation.length || historyData.pastHistory.length)
              ? <Container backgroundColor={COLOR.GRAY6} paddingHorizontal={20}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {historyData.underReservation.length
                    && (<>
                      <Text T3 bold marginTop={30}>예약 / 접수 내역</Text>
                      <HistoryColumn>
                        {historyData.underReservation.map((item, index) =>
                          <HistoryCard key={`underReservation${index}`} item={item} type="underReservation" />
                        )}
                      </HistoryColumn>
                    </>)
                  }
                  {historyData.pastHistory.length
                    && (<>
                      <Row marginTop={30}>
                        <Text T3 bold>지난 내역</Text>
                        <Text T7 medium color={COLOR.GRAY1} marginLeft={6} marginTop={9}>전체 {historyData.pastHistory.length}건</Text>
                      </Row>
                      <HistoryColumn>
                        {historyData.pastHistory.map((item, index) =>
                          <HistoryCard key={`pastHistory${index}`} item={item} type="pastHistory" />
                        )}
                      </HistoryColumn>
                    </>)
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