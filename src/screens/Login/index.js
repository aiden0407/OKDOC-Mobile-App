//React
import { useState, useRef } from 'react';
import styled from 'styled-components/native';

//Components
import { Alert } from 'react-native';
import { SafeArea, KeyboardAvoiding, ContainerCenter, Center } from 'components/Common';
import BorderTextInput from 'components/Input/Border';
import DefaultButton from 'components/Button/Default';
import BorderButton from 'components/Button/Border';
import { COLOR } from 'constants/design'

//Assets
import mainLogo from 'assets/main/main_logo.png';

export default function LoginPage({ navigation }) {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const passwordRef = useRef();

  function LoginEvent(email, password) {
    if (email === 'test' && password === 'test') {
      navigation.goBack();
    } else {
      Alert.alert('로그인 실패');
    }
  }

  function RegisterEvent() {
    Alert.alert('회원가입 이벤트');
  }

  function FindEvent() {
    Alert.alert('이메일/비밀번호 찾기 이벤트');
  }

  return (
    <SafeArea>
      <KeyboardAvoiding>
        <ContainerCenter paddingHorizontal={15}>

          <Center>
            <Logo source={mainLogo} />
            <Title>해외에서도 <Bold>대학병원 전문의</Bold>를 만나보세요</Title>
          </Center>

          <BorderTextInput
            marginTop={20}
            value={email}
            onChangeText={setEmail}
            placeholder="이메일"
            autoCompleteType="email"
            keyboardType="email-address"
            returnKeyType="next"
            placeholderTextColor="#CDCFD7"
            onSubmitEditing={() => {
              passwordRef.current.focus();
            }}
          />
          <BorderTextInput
            marginTop={10}
            value={password}
            onChangeText={setPassword}
            placeholder="비밀번호"
            secureTextEntry
            returnKeyType="done"
            onSubmitEditing={() => {
              LoginEvent(email, password);
            }}
            ref={passwordRef}
          />

          <DefaultButton
            marginTop={60}
            text="로그인 하기"
            action={() => LoginEvent(email, password)}
          />
          <BorderButton
            marginTop={15}
            text="회원가입 하기"
            action={() => RegisterEvent()}
          />

          <FindEmailPasswordContainer
            activeOpacity={0.8}
            onPress={() => FindEvent()}
          >
            <FindEmailPasswordText>이메일/비밀번호가 기억나지 않나요?</FindEmailPasswordText>
          </FindEmailPasswordContainer>

        </ContainerCenter>
      </KeyboardAvoiding>
    </SafeArea>
  );
}

const Logo = styled.Image`
  width: 171px;
  height: 40px;
`;

const Title = styled.Text`
  margin-top: 20px;
  font-size: 16px;
  font-weight: 500;
  color: ${COLOR.MAIN};
`;

const Bold = styled.Text`
  font-weight: 700;
`;

const FindEmailPasswordContainer = styled.TouchableOpacity`
  margin-top: 40px;
  border-bottom-width: 1px;
  border-bottom-color: #DDDDDD;
`;

const FindEmailPasswordText = styled.Text`
  font-size: 13px;
  font-weight: 500;
  color: #8B8E99;
`;