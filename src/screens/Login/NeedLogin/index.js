//React
import styled from 'styled-components/native';

//Components
import { SafeArea, ContainerCenter } from 'components/Common';
import DefaultButton from 'components/Button/Default';

export default function PolicyScreen({ navigation }) {
  return (
    <SafeArea>
      <ContainerCenter paddingHorizontal={40}>
        <DefaultButton
          marginTop={20}
          text="로그인 / 회원가입 하기"
          action={() => navigation.navigate('LoginStackNavigation')}
        />
      </ContainerCenter>
    </SafeArea>
  );
}