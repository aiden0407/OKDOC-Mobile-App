//React
import { useEffect } from 'react';

//Components
import { COLOR } from 'constants/design'
import { SafeArea, ContainerCenter } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { SolidButton } from 'components/Button';

//Assets
import profileCard from 'assets/images/profile_card.png';

export default function NeedLoginScreen({ navigation, route }) {

  useEffect(() => {
    navigation.setOptions({
      title: route.params?.title ?? '로그인'
    });
  }, [navigation, route]);

  return (
    <SafeArea>
      <ContainerCenter>

        <Image source={profileCard} marginTop={-80} width={94} height={55}/>
        <Text T3 bold marginTop={24}>로그인이 필요해요</Text>
        <Text T6 medium center color={COLOR.GRAY1} marginTop={12}>해외에서도 비대면으로{'\n'}한국 대학병원 전문의를 만나보세요</Text>
        <SolidButton
          large
          marginTop={24}
          text="로그인 / 회원가입"
          action={() => navigation.navigate('LoginStackNavigation')}
        />
        
      </ContainerCenter>
    </SafeArea>
  );
}