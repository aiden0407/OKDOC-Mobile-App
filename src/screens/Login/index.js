//React
import { useState, useRef, useContext } from 'react';
import { ApiContext } from 'context/ApiContext';
import styled from 'styled-components/native';

//Components
import { COLOR } from 'constants/design'
import { Alert, ActivityIndicator } from 'react-native';
import { SafeArea, KeyboardAvoiding, ContainerCenter, Center } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { BorderInput } from 'components/TextInput';
import { SolidButton, OutlineButton } from 'components/Button';

//Api
import { familyLocalLogin } from 'api/Login';
import { getPatientList } from 'api/MyPage';

//Assets
import mainLogo from 'assets/main/main_logo.png';

export default function LoginPage({ navigation }) {

  const { dispatch } = useContext(ApiContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const passwordRef = useRef();

  const handleLogin = async function (email, password) {

    setLoading(true);

    try {
      //const familyLocalLoginResponse = await familyLocalLogin(email, password);
      const familyLocalLoginResponse = await familyLocalLogin('패밀리아이디', 'r7csY|T66y');
      const loginToken = familyLocalLoginResponse.data.response.login_token;
      dispatch({
        type: 'LOGIN',
        loginToken: loginToken,
        email: email,
      });

      try {
        const getPatientListResponse = await getPatientList(loginToken);
        const mainProfile = getPatientListResponse.data.response[0];

        dispatch({
          type: 'PROFILE_UPDATE_MAIN',
          name: mainProfile.passport.USERNAME,
          relationship: mainProfile.relationship,
          birth: mainProfile.passport.BIRTH,
          gender: mainProfile.gender,
          height: mainProfile.height,
          weight: mainProfile.weight,
          drinker: mainProfile.drinker,
          smoker: mainProfile.smoker,
          medicalHistory: mainProfile?.medicalHistory,
          medicalHistoryFamily: mainProfile?.medicalHistoryFamily,
          medication: mainProfile?.medication,
          allergicReaction: mainProfile?.allergicReaction,
          etcConsideration: mainProfile?.etcConsideration,
        });
        navigation.pop(2);
        setLoading(false);

      } catch (error) {
        setLoading(false);
        Alert.alert('회원 정보 불러오기를 실패하였습니다.');
      }

    } catch (error) {
      setLoading(false);
      Alert.alert('로그인 에러가 발생했습니다.');
    }
  }

  function handleRegister() {
    navigation.navigate('RegisterPolicy');
  }

  function handleFindEmailPassword() {
    navigation.navigate('FindEmailPassword');
  }

  return (
    <>
      {
        loading && (
          <LoadingBackground>
            <ActivityIndicator size="large" color="#5500CC" />
          </LoadingBackground>
        )
      }
      <SafeArea>
        <KeyboardAvoiding>
          <ContainerCenter paddingHorizontal={20}>
            <Center>
              <Image source={mainLogo} width={182} height={40} />
              <Text T5 medium color={COLOR.MAIN} marginTop={20}>해외에서도 <Text T5 bold color={COLOR.MAIN}>대학병원 전문의</Text>를 만나보세요</Text>
            </Center>

            <BorderInput
              marginTop={30}
              value={email}
              onChangeText={setEmail}
              placeholder="이메일"
              autoComplete="email"
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
              autoComplete="current-password"
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
    </>
  );
}

const LoadingBackground = styled.Pressable`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #00000022;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FindEmailPasswordContainer = styled.TouchableOpacity`
  margin-top: 40px;
  border-bottom-width: 1px;
  border-bottom-color: ${COLOR.GRAY3};
`;