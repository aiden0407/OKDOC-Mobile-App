//React
import { useState, useContext, useRef } from 'react';
import { AppContext } from 'context/AppContext';
import styled from 'styled-components/native';

//Components
import { COLOR, TYPOGRAPHY } from 'constants/design'
import { Alert, ActivityIndicator } from 'react-native';
import { SafeArea, KeyboardAvoiding, Container } from 'components/Layout';
import { Text } from 'components/Text';
import { SolidButton } from 'components/Button';

//Api
import { emailCheckOpen, emailCheckClose } from 'api/Login';

export default function EmailPasswordScreen({ navigation }) {

  const { dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [invitationToken, setInvitationToken] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [certificationNumber, setCertificationNumber] = useState('');
  const [isEmailCertificated, setIsEmailCertificated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const passwordCheckRef = useRef();

  function validateEmail(email) {
    const regExp = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regExp.test(email);
  }

  function validatePassword(password) {
    const regExp = /^.*(?=^.{6,14}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[.?!@#$%^&*+=]).*$/;
    return regExp.test(password);
  }

  const handleRequestCertification = async function () {
    setLoading(true);
    try {
      const emailCheckOpenResponse = await emailCheckOpen(email);
      setInvitationToken(emailCheckOpenResponse.data.response.message)
      setIsEmailSent(true);
      setLoading(false);
      Alert.alert('해당 이메일 주소로\n인증번호가 전송되었습니다.');
    } catch (error) {
      setLoading(false);
      Alert.alert('인증번호 발송을 실패하였습니다.');
    }
  }

  const handleCheckCertificationNumber = async function () {
    setLoading(true);
    try {
      await emailCheckClose(email, certificationNumber, invitationToken);
      setIsEmailCertificated(true);
      setLoading(false);
      Alert.alert('이메일이 인증되었습니다.');
    } catch (error) {
      setLoading(false);
      Alert.alert('인증번호가 일치하지 않습니다.\n다시 입력해주시기 바랍니다.');
    }
  }

  function handleNextScreen() {
    dispatch({
      type: 'REGISTER_EMAIL_PASSWORD_INVITATION_TOKEN',
      email: email,
      password: password,
      invitationToken: invitationToken,
    });
    navigation.navigate('PassportInformation');
  }

  return (
    <SafeArea>
      {
        loading && (
          <LoadingBackground>
            <ActivityIndicator size="large" color="#5500CC" />
          </LoadingBackground>
        )
      }
      <KeyboardAvoiding>
        <Container paddingHorizontal={20}>
          <Container>
            <Text T3 bold marginTop={30}>사용하실 이메일과{'\n'}비밀번호를 입력해주세요</Text>

            <CustomLineInput
              editable={!isEmailSent}
              placeholder="이메일"
              value={email}
              onChangeText={setEmail}
              inputMode="email"
              returnKeyType="next"
              onSubmitEditing={() => {
                if (!validateEmail(email)) {
                  handleRequestCertification();
                }
              }}
            />
            {!isEmailCertificated
              && <CustomOutlineButtonBackground
                disabled={!validateEmail(email)}
                onPress={() => handleRequestCertification()}
                underlayColor={COLOR.SUB4}
                style={{ position: 'absolute', right: 16, top: 100, zIndex: 1 }}
              >
                <Text T7 medium color={validateEmail(email) ? COLOR.MAIN : COLOR.GRAY1}>{isEmailSent ? '재전송' : '인증요청'}</Text>
              </CustomOutlineButtonBackground>
            }

            {isEmailSent && !isEmailCertificated && (<>
              <CustomLineInput
                placeholder="인증번호 6자리"
                value={certificationNumber}
                onChangeText={setCertificationNumber}
                inputMode="numeric"
                maxLength={6}
                returnKeyType="next"
                onSubmitEditing={() => {
                  if (certificationNumber?.length < 6) {
                    handleCheckCertificationNumber();
                  }
                }}
              />
              <CustomOutlineButtonBackground
                disabled={certificationNumber?.length < 6}
                onPress={() => handleCheckCertificationNumber()}
                underlayColor={COLOR.SUB4}
                style={{ position: 'absolute', right: 16, top: 157, zIndex: 1 }}
              >
                <Text T7 medium color={certificationNumber?.length < 6 ? COLOR.GRAY2 : COLOR.MAIN}>인증확인</Text>
              </CustomOutlineButtonBackground>
            </>)}

            {isEmailCertificated && (<>
              {
                !password && <Text T8 color={COLOR.GRAY1} style={{ position: 'absolute', top: 170, left: 98 }}>(영어, 숫자, 특수문자 포함 6자~14자 이내)</Text>
              }
              <CustomLineInput
                placeholder="비밀번호 입력"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                returnKeyType="next"
                maxLength={14}
                onSubmitEditing={() => passwordCheckRef.current.focus()}
              />
              {
                password && !validatePassword(password) && <Text T8 color='#FF0000CC' marginTop={6}>* 영어, 숫자, 특수문자 포함 6자~14자 이내를 충족하지 않습니다</Text>
              }
              <CustomLineInput
                placeholder="비밀번호 확인"
                value={passwordCheck}
                onChangeText={setPasswordCheck}
                secureTextEntry
                returnKeyType="next"
                maxLength={14}
                ref={passwordCheckRef}
                onSubmitEditing={() => {
                  (isEmailCertificated && validatePassword(password) && password === passwordCheck) && handleNextScreen()
                }}
              />
              {
                passwordCheck && password !== passwordCheck && <Text T8 color='#FF0000CC' marginTop={6}>* 비밀번호가 일치하지 않습니다</Text>
              }
            </>)}
          </Container>

          <SolidButton
            text="다음"
            marginBottom={20}
            disabled={!isEmailCertificated || !validatePassword(password) || password !== passwordCheck}
            action={() => handleNextScreen()}
          />
        </Container>
      </KeyboardAvoiding>
    </SafeArea>
  );
}

const LoadingBackground = styled.Pressable`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CustomLineInput = styled.TextInput`
  margin-top: 24px;
  width: 100%;
  padding: 0 0 12px 8px;
  border-bottom-width: 1.5px;
  border-color: ${(props) => props.editable === false ? COLOR.MAIN : COLOR.GRAY3};
  font-family: 'Pretendard-Regular';
  font-size: ${TYPOGRAPHY.T5.SIZE};
  color: ${(props) => props.editable === false ? COLOR.GRAY0 : '#000000'};
`;

const CustomOutlineButtonBackground = styled.TouchableHighlight`
  width: 72px;
  height: 36px;
  border-width: 1px;
  border-radius: 5px;
  border-color: ${(props) => props.disabled ? COLOR.GRAY3 : COLOR.MAIN};
  background-color: #FFFFFF;
  align-items: center;
  justify-content: center;
`;