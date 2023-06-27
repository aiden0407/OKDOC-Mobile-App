//React
import { useState, useRef } from 'react';
import styled from 'styled-components/native';

//Components
import { COLOR, TYPOGRAPHY } from 'constants/design'
import { Alert } from 'react-native';
import { SafeArea, KeyboardAvoiding, Container, Center, Box } from 'components/Layout';
import { Text } from 'components/Text';
import { LineInput } from 'components/TextInput';
import { SolidButton } from 'components/Button';
import NavigationBackArrow from 'components/NavigationBackArrow';

export default function FindEmailPasswordScreen({ navigation }) {

  const [pageStatus, setPageStatus] = useState('EMAIL');
  const [isFindEmailSubmitted, setIsFindEmailSubmitted] = useState(false);
  const [findEmailName, setFindEmailName] = useState();
  const [findEmailBirth, setFindEmailBirth] = useState();
  const findEmailBirthRef = useRef();
  const [isFindPasswordSubmitted, setIsFindPasswordSubmitted] = useState(false);
  const [findPasswordEmail, setFindPasswordEmail] = useState();
  const [findPasswordName, setFindPasswordName] = useState();
  const [findPasswordBirth, setFindPasswordBirth] = useState();
  const [findPasswordCertificationNumber, setFindPasswordCertificationNumber] = useState('');
  const [isEmailCertificated, setIsEmailCertificated] = useState(false);
  const [newPassword, setNewPassword] = useState();
  const [newPasswordCheck, setNewPasswordCheck] = useState();
  const findPasswordNameRef = useRef();
  const findPasswordBirthRef = useRef();
  const newPasswordCheckRef = useRef();

  function handleGoBackToLogin() {
    navigation.goBack();
  }

  function handleOpenChannelTalk() {
    Alert.alert('채널톡');
  }

  function handleFindEmail() {
    setIsFindEmailSubmitted(true);
  }

  function handleFindPassword() {
    setIsFindPasswordSubmitted(true);
  }

  function handleEmailResend() {
    Alert.alert('해당 이메일로 인증번호가 재전송 되었습니다.');
  }

  function handleCheckCertificationNumber(certificationNumber) {
    if (certificationNumber === '123123') {
      Alert.alert('인증되었습니다.');
      setIsEmailCertificated(true);
    } else {
      Alert.alert('인증 실패', '인증번호가 일치하지 않습니다.\n다시 입력해주시기 바랍니다.');
    }
  }

  function handleChangePassword() {
    Alert.alert('비밀번호가 변경', '비밀번호가 변경되었습니다. 변경된 비밀번호로 로그인을 해주시기 바랍니다.', [{
      text: '확인',
      onPress: () => handleGoBackToLogin()
    }]);
  }

  return (
    <SafeArea>
      <KeyboardAvoiding>
        <Container >
          <CustomHeader>
            <BackArrowWrapper>
              <NavigationBackArrow action={() => handleGoBackToLogin()} />
            </BackArrowWrapper>
            <HeaderColumn onPress={() => setPageStatus('EMAIL')}>
              <Text T5 bold={pageStatus === 'EMAIL'} medium={pageStatus !== 'EMAIL'} marginTop={10}>이메일 찾기</Text>
              {pageStatus === 'EMAIL' && <SelectedBorderBottom />}
            </HeaderColumn>
            <HeaderColumn onPress={() => setPageStatus('PASSWORD')}>
              <Text T5 bold={pageStatus === 'PASSWORD'} medium={pageStatus !== 'PASSWORD'} marginTop={10}>비밀번호 찾기</Text>
              {pageStatus === 'PASSWORD' && <SelectedBorderBottom />}
            </HeaderColumn>
          </CustomHeader>

          {(pageStatus === 'EMAIL' && !isFindEmailSubmitted) && (
            <Container paddingHorizontal={20}>
              <Container>
                <Text T3 bold marginTop={42}>회원정보를 입력해 주세요</Text>
                <Text T6 color={COLOR.GRAY1} marginTop={12}>회원 가입 시 입력했던 정보와{'\n'}동일하게 입력해주세요</Text>
                <LineInput
                  marginTop={42}
                  placeholder="이름"
                  value={findEmailName}
                  onChangeText={setFindEmailName}
                  returnKeyType="next"
                  onSubmitEditing={() => findEmailBirthRef.current.focus()}
                />
                <LineInput
                  marginTop={24}
                  placeholder="생년월일 8자리"
                  value={findEmailBirth}
                  onChangeText={setFindEmailBirth}
                  inputMode="numeric"
                  maxLength={8}
                  ref={findEmailBirthRef}
                  onSubmitEditing={() => handleFindEmail()}
                />
              </Container>

              <Center>
                <FindEmailPasswordContainer onPress={() => handleOpenChannelTalk()}>
                  <Text T6 color={COLOR.GRAY2}>이메일/비밀번호 찾는데 문제가 있으신가요?</Text>
                </FindEmailPasswordContainer>
              </Center>

              <SolidButton
                text="확인"
                marginBottom={20}
                disabled={!findEmailName || !findEmailBirth}
                action={() => handleFindEmail()}
              />
            </Container>
          )}

          {(pageStatus === 'EMAIL' && isFindEmailSubmitted) && (
            <Container paddingHorizontal={20}>
              <Container>
                <Text T3 bold marginTop={42}>이메일을 확인해주세요</Text>
                <Text T6 color={COLOR.GRAY1} marginTop={12}>입력하신 정보로 조회되는{'\n'}계정 이메일 정보입니다</Text>
                <EmailBox>
                  <Text T6 medium>ok**c@i**unginfo.co.kr</Text>
                </EmailBox>
              </Container>

              <Center>
                <FindEmailPasswordContainer onPress={() => handleOpenChannelTalk()}>
                  <Text T6 color={COLOR.GRAY2}>이메일/비밀번호 찾는데 문제가 있으신가요?</Text>
                </FindEmailPasswordContainer>
              </Center>

              <SolidButton
                text="뒤로가기"
                marginBottom={20}
                action={() => handleGoBackToLogin()}
              />
            </Container>
          )}

          {(pageStatus === 'PASSWORD' && !isFindPasswordSubmitted) && (
            <Container paddingHorizontal={20}>
              <Container>
                <Text T3 bold marginTop={42}>회원정보를 입력해 주세요</Text>
                <Text T6 color={COLOR.GRAY1} marginTop={12}>회원 가입 시 입력했던 정보와{'\n'}동일하게 입력해주세요</Text>
                <LineInput
                  marginTop={42}
                  placeholder="이메일"
                  value={findPasswordEmail}
                  onChangeText={setFindPasswordEmail}
                  autoComplete="email"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() => findPasswordNameRef.current.focus()}
                />
                <LineInput
                  marginTop={24}
                  placeholder="이름"
                  value={findPasswordName}
                  onChangeText={setFindPasswordName}
                  returnKeyType="next"
                  ref={findPasswordNameRef}
                  onSubmitEditing={() => findPasswordBirthRef.current.focus()}
                />
                <LineInput
                  marginTop={24}
                  placeholder="생년월일 8자리"
                  value={findPasswordBirth}
                  onChangeText={setFindPasswordBirth}
                  returnKeyType="next"
                  ref={findPasswordBirthRef}
                  onSubmitEditing={() => handleFindPassword()}
                />
              </Container>

              <Center>
                <FindEmailPasswordContainer onPress={() => handleOpenChannelTalk()}>
                  <Text T6 color={COLOR.GRAY2}>이메일/비밀번호 찾는데 문제가 있으신가요?</Text>
                </FindEmailPasswordContainer>
              </Center>

              <SolidButton
                text="확인"
                marginBottom={20}
                disabled={!findPasswordEmail || !findPasswordName || !findPasswordBirth}
                action={() => handleFindPassword()}
              />
            </Container>
          )}

          {(pageStatus === 'PASSWORD' && isFindPasswordSubmitted && !isEmailCertificated) && (
            <Container paddingHorizontal={20}>
              <Container>
                <Text T3 bold marginTop={42}>이메일로 인증번호를 보냈습니다</Text>
                <Text T6 color={COLOR.GRAY1} marginTop={12}>아래 이메일로 인증번호를 발송하였습니다{'\n'}인증번호를 입력하고, 비밀번호를 변경해주세요</Text>
                <EmailBox>
                  <Text T6 medium>ok**c@i**unginfo.co.kr</Text>
                  <CustomOutlineButtonBackground
                    onPress={() => handleEmailResend()}
                    underlayColor={COLOR.SUB4}
                  >
                    <Text T7 medium color={COLOR.MAIN}>재전송</Text>
                  </CustomOutlineButtonBackground>
                </EmailBox>
                <CustomOutlineButtonBackground
                  disabled={findPasswordCertificationNumber?.length < 6}
                  onPress={() => handleCheckCertificationNumber(findPasswordCertificationNumber)}
                  underlayColor={COLOR.SUB4}
                  style={{ position: 'absolute', right: 16, top: 240, zIndex: 1 }}
                >
                  <Text T7 medium color={findPasswordCertificationNumber?.length < 6 ? COLOR.GRAY2 : COLOR.MAIN}>인증확인</Text>
                </CustomOutlineButtonBackground>
                <CustomLineInput
                  placeholder="인증번호 6자리"
                  value={findPasswordCertificationNumber}
                  onChangeText={setFindPasswordCertificationNumber}
                  maxLength={6}
                  returnKeyType="next"
                  onSubmitEditing={() => handleFindPassword()}
                />
              </Container>

              <Center>
                <FindEmailPasswordContainer onPress={() => handleOpenChannelTalk()}>
                  <Text T6 color={COLOR.GRAY2}>이메일/비밀번호 찾는데 문제가 있으신가요?</Text>
                </FindEmailPasswordContainer>
              </Center>

            </Container>
          )}

          {(pageStatus === 'PASSWORD' && isFindPasswordSubmitted && isEmailCertificated) && (
            <Container paddingHorizontal={20}>
              <Container>
                <Text T3 bold marginTop={42}>이메일로 인증번호를 보냈습니다</Text>
                <Text T6 color={COLOR.GRAY1} marginTop={12}>아래 이메일로 인증번호를 발송하였습니다{'\n'}인증번호를 입력하고, 비밀번호를 변경해주세요</Text>
                <EmailBox>
                  <Text T6 medium>ok**c@i**unginfo.co.kr</Text>
                  <Box height={36} />
                </EmailBox>
                {
                  !newPassword && <Text T8 color={COLOR.GRAY1} style={{ position: 'absolute', top: 251, left: 90 }}>(영어, 숫자, 특수문자 포함 6자~14자 이내)</Text>
                }
                <LineInput
                  marginTop={24}
                  placeholder="비밀번호 입력"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                  returnKeyType="next"
                  onSubmitEditing={() => newPasswordCheckRef.current.focus()}
                />
                {
                  newPassword && newPassword?.length < 6 && <Text T8 color='#FF0000CC' marginTop={6}>* 영어, 숫자, 특수문자 포함 6자~14자 이내를 충족하지 않습니다</Text>
                }
                <LineInput
                  marginTop={24}
                  placeholder="비밀번호 확인"
                  value={newPasswordCheck}
                  onChangeText={setNewPasswordCheck}
                  secureTextEntry
                  returnKeyType="done"
                  ref={newPasswordCheckRef}
                  onSubmitEditing={() => handleChangePassword()}
                />
                {
                  newPassword && newPasswordCheck && newPassword !== newPasswordCheck && <Text T8 color='#FF0000CC' marginTop={6}>* 비밀번호가 일치하지 않습니다</Text>
                }
              </Container>

              <Center>
                <FindEmailPasswordContainer onPress={() => handleOpenChannelTalk()}>
                  <Text T6 color={COLOR.GRAY2}>이메일/비밀번호 찾는데 문제가 있으신가요?</Text>
                </FindEmailPasswordContainer>
              </Center>

              <SolidButton
                text="비밀번호 변경"
                marginBottom={20}
                disabled={newPassword?.length < 6 || newPassword !== newPasswordCheck}
                action={() => handleChangePassword()}
              />
            </Container>
          )}
        </Container>
      </KeyboardAvoiding>
    </SafeArea>
  );
}

const CustomHeader = styled.View`
  width: 100%;
  height: 48px;
  padding: 0 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  border-bottom-width: 1.5px;
  border-color: ${COLOR.GRAY3};
`;

const BackArrowWrapper = styled.View`
  position: absolute;
  top: 8px;
  left: 16px;
`;

const HeaderColumn = styled.Pressable`
  width: 120px;
  height: 100%;
  align-items: center;
`;

const SelectedBorderBottom = styled.View`
  position: absolute;
  width: 120px;
  height: 3px;
  bottom: -2px;
  background-color: ${COLOR.MAIN};
`;

const EmailBox = styled.View`
  margin-top: 42px;
  width: 100%;
  padding: 12px 16px;
  background-color: ${COLOR.GRAY5};
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

const CustomLineInput = styled.TextInput`
  margin-top: 24px;
  width: 100%;
  padding: 0 0 18px 8px;
  border-bottom-width: 1.5px;
  border-color: ${COLOR.GRAY3};
  font-family: 'Pretendard-Regular';
  font-size: ${TYPOGRAPHY.T5.SIZE};
  color: ${(props) => props.editable === false ? COLOR.GRAY0 : '#000000'};
`;

const FindEmailPasswordContainer = styled.TouchableOpacity`
  margin-bottom: 40px;
  border-bottom-width: 1px;
  border-bottom-color: ${COLOR.GRAY3};
`;