//React
import { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import * as AppleAuthentication from 'expo-apple-authentication';

//Components
import { COLOR } from 'constants/design'
import { Alert, StyleSheet } from 'react-native';
import { SafeArea, KeyboardAvoiding, ContainerCenter, Center, Row } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';

//Assets
import mainLogo from 'assets/main/main_logo.png';

export default function LoginPage({ navigation }) {

  const [appleAuthAvailable, setAppleAuthAvailable] = useState(false);

  useEffect(() => {
    const checkAvailable = async () => {
      const isAvailable = await AppleAuthentication.isAvailableAsync();
      setAppleAuthAvailable(isAvailable);
    }
    checkAvailable();
  }, []);

  function handleLocalLogin() {
    navigation.navigate('LocalLogin');
  }

  function handleRegister() {
    Alert.alert('안내', '회원가입을 진행하기 위해서는 한국 여권과 전화 번호가 필요합니다.', [
      {
        text: '확인',
        onPress: () => navigation.navigate('RegisterPolicy')
      }
    ]);
  }

  return (
    <SafeArea>
      <KeyboardAvoiding>
        <ContainerCenter paddingHorizontal={20}>
          <Center>
            <Image source={mainLogo} width={182} height={40} />
            <Text T5 medium color={COLOR.MAIN} marginTop={20}>해외에서도 <Text T5 bold color={COLOR.MAIN}>대학병원 전문의</Text>를 만나보세요</Text>
          </Center>



          {
            appleAuthAvailable &&
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
              buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
              cornerRadius={5}
              style={styles.button}
              onPress={async () => {
                try {
                  const credential = await AppleAuthentication.signInAsync({
                    requestedScopes: [
                      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                      AppleAuthentication.AppleAuthenticationScope.EMAIL,
                    ],
                  });
                  console.log(credential)
                  // signed in
                } catch (e) {
                  if (e.code === 'ERR_REQUEST_CANCELED') {
                    // handle that the user canceled the sign-in flow
                  } else {
                    // handle other errors
                  }
                }
              }}
            />
          }

          <Row gap={10}>
            <LocalLoginContainer onPress={() => handleLocalLogin()}>
              <Text T6 medium color={COLOR.GRAY2}>이메일로 로그인</Text>
            </LocalLoginContainer>

            <LocalLoginContainer onPress={() => handleRegister()}>
              <Text T6 medium color={COLOR.GRAY2}>이메일로 회원가입</Text>
            </LocalLoginContainer>
          </Row>

        </ContainerCenter>
      </KeyboardAvoiding>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 58,
    marginTop: 25
  },
});

const LocalLoginContainer = styled.TouchableOpacity`
  margin-top: 40px;
  border-bottom-width: 1px;
  border-bottom-color: ${COLOR.GRAY3};
`;