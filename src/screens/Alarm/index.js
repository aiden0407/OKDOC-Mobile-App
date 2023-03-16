//React
import { useEffect, useContext } from 'react';
import { AppContext } from 'context/AppContext';
import { ApiContext } from 'context/ApiContext';
import styled from 'styled-components/native';

//Components
import { COLOR } from 'constants/design';
import { SafeArea, Container, ContainerCenter } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import NeedLogin from 'components/NeedLogin';

export default function AlarmScreen({ navigation }) {

  const { dispatch } = useContext(AppContext);
  const { state: { userData } } = useContext(ApiContext);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch({ type: 'BOTTOM_TAP_NAVIGATION', menu: 'ALARM' });
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeArea>
      {
        userData.loginStatus
          ? (<>
            <Container backgroundColor={COLOR.GRAY6} paddingHorizontal={20} paddingTop={30}>
              <Text T3 bold>알림 기록</Text>
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