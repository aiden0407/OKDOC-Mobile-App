//React
import { useState, useEffect, useContext } from 'react';
import { ApiContext } from 'context/ApiContext';
import { AppContext } from 'context/AppContext';
import useAlarmUpdate from 'hook/useAlarmUpdate';
import styled from 'styled-components/native';

//Components
import * as Device from 'expo-device';
import { COLOR } from 'constants/design';
import { StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeArea, ScrollView, Container, ContainerCenter, Row, DividingLine, Box } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import NeedLogin from 'components/NeedLogin';

//Assets
import letterIcon from 'assets/icons/mypage-letter.png';

export default function AlarmScreen({ navigation }) {

  const { refreshAlarm } = useAlarmUpdate();
  const { state: { accountData, alarmData } } = useContext(ApiContext);
  const { state: { alarmDataLoading } } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    refreshAlarm();
  };

  useEffect(() => {
    if(alarmDataLoading){
      if(!refreshing){
        setIsLoading(true);
      }
    } else {
      setRefreshing(false);
      setIsLoading(false);
    }
  }, [alarmDataLoading]);

  function handleLogin() {
    navigation.navigate('LoginStackNavigation');
  }

  function AlarmCard({ item }) {
    return (
      <>
      </>
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
            {alarmData.length
              ? <Container backgroundColor={COLOR.GRAY6} paddingHorizontal={20} paddingTop={Device.osName === 'Android' ? 0 : refreshing ? 30 : 0}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLOR.MAIN} />
                  }
                  overScrollMode='never'
                >
                  {/* <>알림 내역 카드</> */}
                </ScrollView>
              </Container>

              : <AlarmEmptyContainer backgroundColor={COLOR.GRAY6} paddingHorizontal={20} paddingTop={Device.osName === 'Android' ? 0 : refreshing ? 30 : 0}>
                <AlarmEmptyScrollView
                  showsVerticalScrollIndicator={false}
                  refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLOR.MAIN} />
                  }
                  overScrollMode='never'
                  contentContainerStyle={styles.container}
                >
                  <AlarmEmptyBox>
                    <Image source={letterIcon} width={70} height={74} />
                    <Text T3 bold marginTop={24}>알림함이 비어있습니다</Text>
                    <Text T6 medium center color={COLOR.GRAY1} marginTop={12}>예약하신 진료와 관련된 안내 사항을{'\n'} 알림으로 보내드립니다</Text>
                  </AlarmEmptyBox>
                </AlarmEmptyScrollView>
              </AlarmEmptyContainer>
            }
          </>)

          : <ContainerCenter backgroundColor={COLOR.GRAY6} paddingHorizontal={20}>
            <NeedLogin marginTop={-40} action={() => handleLogin()} />
          </ContainerCenter>
      }
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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

const AlarmEmptyContainer = styled(Container)`
  justify-content: center;
  align-items: center;
`;

const AlarmEmptyScrollView = styled(ScrollView)`
  width: 100%;
`;

const AlarmEmptyBox = styled.View`
  width: 100%;
  padding: 40px 20px;
  border-radius: 10px;
  background-color: #FFFFFF;
  align-items: center;
`;