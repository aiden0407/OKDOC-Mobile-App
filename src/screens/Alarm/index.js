//React
import { useEffect, useState, useContext } from 'react';
import { ApiContext } from 'context/ApiContext';
import styled from 'styled-components/native';

//Components
import { COLOR } from 'constants/design';
import { SafeArea, Container, ContainerCenter } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import NeedLogin from 'components/NeedLogin';

//Assets
import letterIcon from 'assets/icons/mypage-letter.png';

export default function AlarmScreen({ navigation }) {

  const { state: { accountData } } = useContext(ApiContext);
  const [notificationHistory, setNotificationHistory] = useState([]);

  useEffect(() => {
    getNotificationHistory();
  }, []);

  const getNotificationHistory = async function () {
    try {

    } catch (error) {
      
    }
  };

  return (
    <SafeArea>
      {
        accountData.loginToken
          ? notificationHistory.length
            ? <Container backgroundColor={COLOR.GRAY6} paddingHorizontal={20}>
              <Text T3 bold marginTop={24}>{JSON.stringify(notificationHistory)}</Text>
            </Container>

            : <ContainerCenter backgroundColor={COLOR.GRAY6} paddingHorizontal={20}>
              <AlarmEmptyContainer marginTop={-40}>
                <Image source={letterIcon} width={70} height={74} />
                <Text T3 bold marginTop={24}>알림함이 비어있습니다</Text>
                <Text T6 medium center color={COLOR.GRAY1} marginTop={12}>비대면 진료와 관련된 안내 사항을{'\n'} 알림으로 보내드립니다</Text>
              </AlarmEmptyContainer>
            </ContainerCenter>

          : <ContainerCenter backgroundColor={COLOR.GRAY6} paddingHorizontal={20}>
            <NeedLogin marginTop={-40} action={() => navigation.navigate('LoginStackNavigation')} />
          </ContainerCenter>
      }
    </SafeArea>
  );
}

const AlarmEmptyContainer = styled.View`
  width: 100%;
  padding: 40px 20px;
  border-radius: 10px;
  background-color: #FFFFFF;
  align-items: center;
`;