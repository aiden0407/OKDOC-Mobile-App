//React
import { useContext } from 'react';
import { ApiContext } from 'context/ApiContext';
import styled from 'styled-components/native';

//Components
import { COLOR } from 'constants/design';
import { SafeArea, ScrollView, Container, ContainerCenter, Row, DividingLine, Box } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import NeedLogin from 'components/NeedLogin';

export default function HistoryScreen({ navigation }) {

  const { state: { accountData, historyData } } = useContext(ApiContext);

  function HistoryCard({ item, type }) {
    return (
      <HistoryCardContainer>
        <CardTitleSection>
          <CardTitleColumn>
            <Text T6 bold>{item.doctorInfo.subject} / {item.profileInfo.name}님 ({item.profileType})</Text>
            <Text T7 color={COLOR.GRAY1}>{item.date} ({item.time})</Text>
            { type === 'pastHistory' && <Text T7 color={COLOR.GRAY1}>결제 120,000원</Text> }
          </CardTitleColumn>
          {type === 'underReservation'
            && <CardTitleButton
              underlayColor={COLOR.GRAY5}
              onPress={() => { }}
            >
              <Text T7 medium color={COLOR.GRAY1}>변경/취소</Text>
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
              onPress={() => { }}
            >
              <Text T5 medium color="#FFFFFF">진료실 입장</Text>
            </CustomSolidButton>
          }
          {type === 'pastHistory'
            && <CustomSolidButton
              underlayColor={COLOR.SUB1}
              onPress={() => { }}
            >
              <Text T5 medium color="#FFFFFF">진료 내역</Text>
            </CustomSolidButton>
          }
        </CardDoctorInfoSection>
      </HistoryCardContainer>
    )
  }

  function HistoryCardEmpty() {
    return (
      <HistoryCardEmptyContainer>
        <Text T6 color={COLOR.GRAY1}>예약 / 접수 내역이 존재하지 않습니다.</Text>
      </HistoryCardEmptyContainer>
    )
  }

  return (
    <SafeArea>
      {
        accountData.loginStatus
          ? (<Container backgroundColor={COLOR.GRAY6} paddingHorizontal={20}>
            <ScrollView showsVerticalScrollIndicator={false}>

              <Text T3 bold marginTop={30}>예약 / 접수 내역</Text>
              <HistoryColumn>
                {historyData.underReservation.length
                  ? (<>{historyData.underReservation.map((item, index) =>
                    <HistoryCard key={`underReservation${index}`} item={item} type="underReservation" />
                  )}</>)
                  : <HistoryCardEmpty />
                }
              </HistoryColumn>
              
              <Row marginTop={30}>
                <Text T3 bold>지난 내역</Text>
                {historyData.pastHistory.length
                  && <Text T7 medium color={COLOR.GRAY1} marginLeft={6} marginTop={9}>전체 {historyData.pastHistory.length}건</Text>
                }
              </Row>
              <HistoryColumn>
                {historyData.pastHistory.length
                  ? (<>{historyData.pastHistory.map((item, index) =>
                    <HistoryCard key={`pastHistory${index}`} item={item} type="pastHistory" />
                  )}</>)
                  : <HistoryCardEmpty />
                }
              </HistoryColumn>

              <Box height={100} />

            </ScrollView>
          </Container>)

          : (<>
            <ContainerCenter backgroundColor={COLOR.GRAY6} paddingHorizontal={20}>
              <NeedLogin marginTop={-40} action={() => navigation.navigate('LoginStackNavigation')} />
            </ContainerCenter>
          </>)
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

const HistoryCardEmptyContainer = styled.View`
  width: 100%;
  height: 100px;
  align-items: center;
  justify-content: center;
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