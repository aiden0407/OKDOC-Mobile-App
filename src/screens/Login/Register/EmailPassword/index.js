//React
import { useState, useContext, useRef } from 'react';
import { AppContext } from 'context/AppContext';
import { ApiContext } from 'context/ApiContext';
import styled from 'styled-components/native';

//Components
import { COLOR, TYPOGRAPHY } from 'constants/design'
import { Alert } from 'react-native';
import { SafeArea, Container, Row } from 'components/Layout';
import { Text } from 'components/Text';
import { SolidButton } from 'components/Button';

export default function EmailPasswordScreen({ navigation }) {

  const { state: { registerStatus }, dispatch } = useContext(AppContext);
  const { dispatch: apiContextDispatch } = useContext(ApiContext);
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

  function handleRequestCertification() {
    setIsEmailSent(true);
    Alert.alert('인증번호 전송', '해당 이메일 주소로\n인증번호가 전송되었습니다.');
  }

  function handleCheckCertificationNumber() {
    if (certificationNumber === '123123') {
      Alert.alert('인증되었습니다.');
      setIsEmailCertificated(true);
    } else {
      Alert.alert('인증 실패', '인증번호가 일치하지 않습니다.\n다시 입력해주시기 바랍니다.');
    }
  }

  function handleNextScreen() {
    apiContextDispatch({ 
      type: 'LOGIN', 
      name: registerStatus?.name, 
      email: email, 
      phoneNumber: `${registerStatus?.countryCode} ${registerStatus?.phoneNumber}`,
    });
    dispatch({type: 'REGISTER_COMPLETE'});
    navigation.navigate('RegisterComplete');
  }

  return (
    <SafeArea>

      <Container paddingHorizontal={20}>
        <Container>
          <Text T3 bold marginTop={30}>사용하실 이메일과{'\n'}비밀번호를 입력해주세요</Text>

          <CustomLineInput
            editable={!isEmailSent}
            placeholder="이메일"
            value={email}
            onChangeText={setEmail}
            returnKeyType="next"
            onSubmitEditing={() => handleRequestCertification()}
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
              maxLength={6}
              returnKeyType="next"
              onSubmitEditing={() => handleCheckCertificationNumber()}
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
    </SafeArea>
  );
}

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