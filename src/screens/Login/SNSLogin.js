//React
import { useContext, useState, useEffect } from 'react';
import { ApiContext } from 'context/ApiContext';
import { AppContext } from 'context/AppContext';
import { getLocales } from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';

//SNS Login
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-auth-session/providers/google';

//Components
import { COLOR } from 'constants/design'
import { Alert, StyleSheet } from 'react-native';
import { SafeArea, KeyboardAvoiding, ContainerCenter, Center, Row } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';

//Api
import { familyAppleLogin, familyGoogleLogin } from 'api/Login';

//Assets
import mainLogo from 'assets/main/main_logo.png';
import googleLogo from 'assets/icons/google-logo.png';

export default function LoginPage({ navigation }) {

  const { dispatch } = useContext(ApiContext);
  const { dispatch: appContextDispatch } = useContext(AppContext);
  const [deviceLocale, setDeviceLocale] = useState('');
  const [appleAuthAvailable, setAppleAuthAvailable] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: '73186981279-rf6plirme3crocphitmssnrlb5o1koem.apps.googleusercontent.com',
    androidClientId: '73186981279-get8upmndqvj3l96lpqdk1q8snrdlk8d.apps.googleusercontent.com',
    expoClientId: '73186981279-8a8012fca0dq616i7rff9s7kqfhi61rn.apps.googleusercontent.com',
  });

  useEffect(() => {
    const locale = getLocales()[0];
    setDeviceLocale(locale);
  }, []);

  useEffect(() => {
    const checkAvailable = async () => {
      const isAvailable = await AppleAuthentication.isAvailableAsync();
      setAppleAuthAvailable(isAvailable);
    }
    checkAvailable();
  }, []);

  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  async function handleSignInWithGoogle() {
    if(response?.type === "success") {
      await getGoogleUserInfo(response);
    }
  }

  const getGoogleUserInfo = async (credential) => {
    if(!credential) return;
    
    try {
      const response = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: { Authorization: `Bearer ${credential.authentication.accessToken}` },
        }
      );
      const user = await response.json();

      try {
        const familyGoogleLoginResponse = await familyGoogleLogin(credential);
        const loginToken = familyGoogleLoginResponse.data.response.accessToken;
        
        dispatch({
          type: 'LOGIN',
          loginToken: loginToken,
          email: user.email,
        });

        try {
          const accountData = {
            loginToken: loginToken,
            email: user.email,
          };
          await AsyncStorage.setItem('accountData', JSON.stringify(accountData));
          navigation.goBack();
        } catch (error) {
          //console.log(error);
        }
        
      } catch (error) {
        if (error.response.data.statusCode === 404) {
          appContextDispatch({
            type: 'REGISTER_ROUTE',
            route: 'GOOGLE_REGISTER',
          });
          Alert.alert('안내', '해당 계정이 존재하지 않습니다. 회원가입을 진행합니다.', [
            {
              text: '확인',
              onPress: () => {
                appContextDispatch({
                  type: 'REGISTER_EMAIL_PASSWORD_INVITATION_TOKEN',
                  email: user.email,
                  password: undefined,
                  invitationToken: user.id,
                });
                navigation.navigate('RegisterPolicy');
              }
            }
          ]);
        } else {
          Alert.alert('네트워크 오류로 인해 로그인에 실패했습니다.');
        }
      }

    } catch (error) {
      console.log(error);
    }
  }

  async function handleSignInWithApple(credential) {
    try {
      const familyAppleLoginResponse = await familyAppleLogin(credential);
      const loginToken = familyAppleLoginResponse.data.response.accessToken;
      const email = familyAppleLoginResponse.data.response.email;
      
      dispatch({
        type: 'LOGIN',
        loginToken: loginToken,
        email: email,
      });

      try {
        const accountData = {
          loginToken: loginToken,
          email: email,
        };
        await AsyncStorage.setItem('accountData', JSON.stringify(accountData));
        navigation.goBack();
      } catch (error) {
        //console.log(error);
      }

    } catch (error) {
      if (error.response.data.statusCode === 404) {
        const eamil = extractEmailFromString(error.response.data.message);
        appContextDispatch({
          type: 'REGISTER_ROUTE',
          route: 'APPLE_EMAIL_EXISTENT',
        });
        Alert.alert('안내', '해당 계정이 존재하지 않습니다. 회원가입을 진행합니다.', [
          {
            text: '확인',
            onPress: () => {
              appContextDispatch({
                type: 'REGISTER_EMAIL_PASSWORD_INVITATION_TOKEN',
                email: eamil,
                password: undefined,
                invitationToken: credential.user,
              });
              navigation.navigate('RegisterPolicy');
            }
          }
        ]);
      } else if (error.response.data.statusCode === 422) {
        appContextDispatch({
          type: 'REGISTER_ROUTE',
          route: 'APPLE_EMAIL_UNDEFINED',
        });
        Alert.alert('안내', '해당 계정이 존재하지 않습니다. 회원가입을 진행합니다.', [
          {
            text: '확인',
            onPress: () => {
              appContextDispatch({
                type: 'REGISTER_EMAIL_PASSWORD_INVITATION_TOKEN',
                email: undefined,
                password: undefined,
                invitationToken: credential.user,
              });
              navigation.navigate('RegisterPolicy');
            }
          }
        ]);
      } else {
        Alert.alert('네트워크 오류로 인해 로그인에 실패했습니다.');
      }
    }
  }

  function handleLocalLogin() {
    navigation.navigate('LocalLogin');
  }

  function handleOpenChannelTalk() {
    navigation.navigate('InquiryStackNavigation', { 
      screen: 'Inquiry',
      params: { headerTitle: '계정 관련 문의' },
    });
  }

  function extractEmailFromString(inputString) {
    const start = inputString.indexOf('User ') + 5;
    const end = inputString.indexOf(' not found', start);
    if (start !== -1 && end !== -1) {
      return inputString.substring(start, end);
    } else {
      return null;
    }
  }

  return (
    <SafeArea>
      <KeyboardAvoiding>
        <ContainerCenter paddingHorizontal={20}>
          <Center>
            <Image source={mainLogo} width={182} height={40} />
            <Text T5 medium color={COLOR.MAIN} marginTop={20}>해외에서도 <Text T5 bold color={COLOR.MAIN}>대학병원 전문의</Text>를 만나보세요</Text>
          </Center>

          <GoogleSignInButton onPress={() => promptAsync()}>
            <GoogleIconWrapper>
              <Image source={googleLogo} width={20} height={20} />
            </GoogleIconWrapper>
            {
              deviceLocale?.regionCode === 'KR'
                ? <Text T4 color="rgba(0, 0, 0, 0.54)">Google로 로그인</Text>
                : <Text T4 color="rgba(0, 0, 0, 0.54)">Sign in with Google</Text>
            }
          </GoogleSignInButton>

          {
            appleAuthAvailable &&
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
              buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
              cornerRadius={5}
              style={styles.button}
              onPress={async () => {
                try {
                  // const credential = await AppleAuthentication.signInAsync({
                  //   requestedScopes: [
                  //     AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                  //     AppleAuthentication.AppleAuthenticationScope.EMAIL,
                  //   ],
                  // });
                  const credential = {"email":null,"identityToken":"eyJraWQiOiJXNldjT0tCIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoia3IuY28uaW5zdW5naW5mby5va2RvYyIsImV4cCI6MTY5OTAwMjIxOCwiaWF0IjoxNjk4OTE1ODE4LCJzdWIiOiIwMDE2NTguMGMwYTQ1NTgzZDMwNDE3MWEwYTc2ZTcwYmYwNDVlNTUuMDUxOSIsImNfaGFzaCI6IndOQ2JwdVNqZ2pxMEtZMVZWT1g0THciLCJlbWFpbCI6ImNhaWx5ZW50MDQwN0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6InRydWUiLCJhdXRoX3RpbWUiOjE2OTg5MTU4MTgsIm5vbmNlX3N1cHBvcnRlZCI6dHJ1ZX0.uhZz0vPtnn2ZXgeeKQDuN4ToiJy8kG8TVEX59_vQEwAiWECXbE4Lu_yqxhefLBRWdRCbVm2DKTzv_po5PT4EIkXJJY9w-i01DaA2SSytQs81-WhRpYVnLRMVD1869faOlVsWbUF_KmhwIvekFPLrAITmhBgZEgXABjjpWdUVOez0W1NgKBFhvQbyiQFsQqtXQEedgx4BT81PTWC6kP4YU0GnrjFWtGMXeFUro_5wFdWiJT2g616jDVLkER9m7G9GMoEzYgnSSs8PoZRU_iYrO_JD5UuQkSg16dZxqLy-MUc93sohF4Btb2MstPIH_t9uzQF05bLgfzfLWAyY0lKmSw","user":"001658.0c0a45583d304171a0a76e70bf045e55.0519","state":null,"authorizationCode":"c8311b475d0794bffbf8a5d671d847000.0.srwvy.Sh8jbvLulZeBWQuXHmGjLQ","fullName":{"nickname":null,"givenName":null,"nameSuffix":null,"familyName":null,"middleName":null,"namePrefix":null},"realUserStatus":1}
                  handleSignInWithApple(credential);
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

          <LocalLoginContainer onPress={() => handleLocalLogin()}>
            <Text T6 medium color={COLOR.GRAY2}>이메일로 로그인</Text>
          </LocalLoginContainer>

          <HelpContainer onPress={() => handleOpenChannelTalk()}>
            <Text T6 medium color={COLOR.GRAY2}>로그인에 문제가 있으신가요?</Text>
          </HelpContainer>

        </ContainerCenter>
      </KeyboardAvoiding>
    </SafeArea>
  );
}

const GoogleSignInButton = styled.TouchableOpacity`
  position: relative;
  margin-top: 30px;
  width: 100%;
  height: 49px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.54);
`;

const GoogleIconWrapper = styled.View`
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 49,
    marginTop: 10,
  },
});

const LocalLoginContainer = styled.TouchableOpacity`
  margin-top: 30px;
  margin-bottom: 90px;
  border-bottom-width: 1px;
  border-bottom-color: ${COLOR.GRAY3};
`;

const HelpContainer = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
`;