//React
import { useState, useRef, useContext } from 'react';
import { AppContext } from 'context/AppContext';
import styled from 'styled-components/native';

//Components
import { COLOR } from 'constants/design'
import { Alert } from 'react-native';
import { SafeArea, KeyboardAvoiding, ContainerCenter, Center } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { BorderInput } from 'components/TextInput';
import { SolidButton, OutlineButton } from 'components/Button';

//Assets
import mainLogo from 'assets/main/main_logo.png';

export default function LoginPage({ navigation }) {

  const { dispatch } = useContext(AppContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const passwordRef = useRef();

  function handleLogin(email, password) {
    if (email === 'test' && password === 'test') {
      dispatch({ type: 'LOGIN', userName: '이준범' });
      navigation.pop(2);
    } else {
      Alert.alert('로그인 실패');
    }
  }

  function handleRegister() {
    Alert.alert('회원가입 이벤트');
  }

  function handleFindEmailPassword() {
    Alert.alert('이메일/비밀번호 찾기 이벤트');
  }

  return (
    <SafeArea>
      <KeyboardAvoiding>
        <ContainerCenter paddingHorizontal={15}>

          <Center>
            <Image source={mainLogo} width={182} height={40} />
            <Text T5 medium color={COLOR.MAIN} marginTop={20}>해외에서도 <Text T5 bold color={COLOR.MAIN}>대학병원 전문의</Text>를 만나보세요</Text>
          </Center>

          <BorderInput
            marginTop={30}
            value={email}
            onChangeText={setEmail}
            placeholder="이메일"
            autoCompleteType="email"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordRef.current.focus();
            }}
          />
          <BorderInput
            marginTop={8}
            value={password}
            onChangeText={setPassword}
            placeholder="비밀번호"
            secureTextEntry
            returnKeyType="done"
            onSubmitEditing={() => {
              handleLogin(email, password);
            }}
            ref={passwordRef}
          />

          <SolidButton
            marginTop={120}
            text="로그인"
            action={() => handleLogin(email, password)}
          />
          <OutlineButton
            marginTop={8}
            text="회원가입"
            action={() => handleRegister()}
          />

          <FindEmailPasswordContainer onPress={() => handleFindEmailPassword()}>
            <Text T6 medium color={COLOR.GRAY2}>이메일/비밀번호가 기억나지 않나요?</Text>
          </FindEmailPasswordContainer>

        </ContainerCenter>
      </KeyboardAvoiding>
    </SafeArea>
  );
}

const FindEmailPasswordContainer = styled.TouchableOpacity`
  margin-top: 40px;
  border-bottom-width: 1px;
  border-bottom-color: ${COLOR.GRAY3};
`;