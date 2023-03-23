//React
import { useContext } from 'react';
import { ApiContext } from 'context/ApiContext';
import styled from 'styled-components/native';

//Components
import { COLOR } from 'constants/design';
import { SafeArea, Container, ContainerCenter } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import NeedLogin from 'components/NeedLogin';

export default function HistoryScreen({ navigation }) {

  const { state: { accountData } } = useContext(ApiContext);

  return (
    <SafeArea>
      {
        accountData.loginStatus
          ? (<>
            <Container backgroundColor={COLOR.GRAY6} paddingHorizontal={20} paddingTop={30}>
              <Text T3 bold>예약 / 접수 내역</Text>
            </Container>
          </>)
          
          : (<>
            <ContainerCenter backgroundColor={COLOR.GRAY6} paddingHorizontal={20}>
              <NeedLogin marginTop={-40} action={() => navigation.navigate('LoginStackNavigation')}/>
            </ContainerCenter>
          </>)
      }

    </SafeArea>
  );
}