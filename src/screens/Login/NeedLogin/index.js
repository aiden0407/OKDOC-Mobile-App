//React
import { useEffect, useContext } from 'react';
import { ApiContext } from 'context/ApiContext';

//Components
import { SafeArea, ContainerCenter } from 'components/Layout';
import NeedLogin from 'components/NeedLogin';

export default function NeedLoginScreen({ navigation, route }) {

  const { state: { accountData } } = useContext(ApiContext);

  useEffect(() => {
    if (accountData.loginToken) {
      navigation.goBack();
    }
  }, [accountData]);

  useEffect(() => {
    navigation.setOptions({
      title: route.params?.headerTitle ?? '로그인'
    });
  }, [navigation]);

  return (
    <SafeArea>
      <ContainerCenter>
        <NeedLogin 
          marginTop={-80}
          action={() => navigation.navigate('LoginStackNavigation')} 
        />
      </ContainerCenter>
    </SafeArea>
  );
}