//React
import { useEffect } from 'react';

//Components
import { SafeArea, ContainerCenter } from 'components/Layout';
import NeedLogin from 'components/NeedLogin';

export default function NeedLoginScreen({ navigation, route }) {

  useEffect(() => {
    navigation.setOptions({
      title: route.params?.title ?? '로그인'
    });
  }, [navigation, route]);

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