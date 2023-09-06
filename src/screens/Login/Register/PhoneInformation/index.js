//React
import { useState, useContext, useRef } from 'react';
import { ApiContext } from 'context/ApiContext';
import { AppContext } from 'context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';

//Components
import * as Device from 'expo-device';
import { COLOR, TYPOGRAPHY } from 'constants/design'
import { Alert, ActivityIndicator } from 'react-native';
import { SafeArea, Container, Row } from 'components/Layout';
import { Text } from 'components/Text';
import { SolidButton } from 'components/Button';

//Api
import { phoneCheckOpen, phoneCheckClose, createFamilyAccount, createPatientProfileInit } from 'api/Login';

export default function EmailPasswordScreen({ navigation }) {

  const { dispatch: apiContextDispatch } = useContext(ApiContext);
  const { state: { registerStatus }, dispatch: appContextDispatch } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneToken, setPhoneToken] = useState('');
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [certificationNumber, setCertificationNumber] = useState('');
  const [isPhoneNumberCertificated, setIsPhoneNumberCertificated] = useState(false);

  const handlePhoneNumberChange = (text) => {
    let formattedNumber = '';
    if (text.length <= 13) {
      formattedNumber = text
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d{0,4})?(\d{0,4})?/, (match, p1, p2, p3) => {
          let result = p1;
          if (p2) result += `-${p2}`;
          if (p3) result += `-${p3}`;
          return result;
        });
    }
    setPhoneNumber(formattedNumber);
  };

  const handleRequestCertification = async function () {
    setLoading(true);
    try {
      const phoneCheckOpenResponse = await phoneCheckOpen(phoneNumber.replaceAll('-', ''));
      setPhoneToken(phoneCheckOpenResponse.data.response.message)
      setIsMessageSent(true);
      setLoading(false);
      Alert.alert('해당 전화 번호로\n인증번호가 전송되었습니다.');
    } catch (error) {
      setLoading(false);
      Alert.alert('인증번호 발송을 실패하였습니다.');
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return Number(year + month + day);
  }

  const handleCheckCertificationNumber = async function () {
    setLoading(true);

    // for submission demo phoneNumber & certificationNumber
    if(phoneNumber==='010-2427-8139' && certificationNumber==='123456'){
      setIsPhoneNumberCertificated(true);
      setLoading(false);
      Alert.alert('인증되었습니다.');
      return null;
    }

    try {
      const phoneCheckCloseResponse = await phoneCheckClose(phoneNumber.replaceAll('-', ''), certificationNumber, phoneToken);
      console.log(phoneCheckCloseResponse.data.response);
      if(phoneCheckCloseResponse.data.response.message === '휴대폰 인증 실패') {
        setLoading(false);
        Alert.alert('인증번호가 일치하지 않습니다.\n다시 입력해 주시기 바랍니다.');
      } else {
        setIsPhoneNumberCertificated(true);
        setLoading(false);
        Alert.alert('인증되었습니다.');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('네트워크 상태가 좋지 않습니다. 다시 입력해 주시기 바랍니다.');
    }
  }

  const handleNextScreen = async function () {
    try {
      const createFamilyAccountResponse = await createFamilyAccount(registerStatus.email, registerStatus.password, registerStatus.policy);
      const loginToken = createFamilyAccountResponse.data.response.accessToken;
      initPatient(loginToken);
    } catch (error) {
      Alert.alert('계정 생성에 실패하였습니다. 다시 시도해 주시기 바랍니다.');
    }
  }

  const initPatient = async function (loginToken) {
    try {
      const createPatientProfileInitResponse = await createPatientProfileInit(loginToken, registerStatus.email, registerStatus.name, formatDate(registerStatus.birth), registerStatus.passportNumber, formatDate(registerStatus.dateOfIssue), formatDate(registerStatus.dateOfExpiry), registerStatus.gender);
      const mainProfile = createPatientProfileInitResponse.data.response;
      apiContextDispatch({ 
        type: 'LOGIN', 
        loginToken: loginToken,
        email: registerStatus.email, 
      });
      try {
        const accountData = {
          loginToken: loginToken,
          email: registerStatus.email,
        };
        await AsyncStorage.setItem('accountData', JSON.stringify(accountData));
      } catch (error) {
        console.log(error);
      }
      apiContextDispatch({
        type: 'PROFILE_CREATE_MAIN',
        id: mainProfile.id,
        name: mainProfile.passport.user_name,
        relationship: mainProfile.relationship,
        birth: mainProfile.passport.birth,
        gender: mainProfile.gender,
      });
      appContextDispatch({type: 'REGISTER_COMPLETE'});
      navigation.navigate('RegisterComplete');
    } catch (error) {
      console.error(error);
      Alert.alert('프로필 정보 생성에 실패하였습니다. 다시 시도해 주시기 바랍니다.');
    }
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
      <Container paddingHorizontal={20}>
        <Container>
          <Text T3 bold marginTop={30}>휴대폰 번호를 입력해주세요</Text>

          <InputContainer>
            <CustomLineInput
              editable={!isMessageSent}
              placeholder="010-1234-5678"
              inputMode="numeric"
              maxLength={13}
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              returnKeyType="next"
              onSubmitEditing={() => {
                if (phoneNumber?.length === 13) {
                  handleRequestCertification();
                }
              }}
            />
            {
              !isPhoneNumberCertificated &&
              <CustomOutlineButtonBackground
                disabled={phoneNumber?.length !== 13}
                onPress={() => handleRequestCertification()}
                underlayColor={COLOR.SUB4}
                style={{ position: 'absolute', right: 4, top: Device.osName === 'Android' ? 21 : 13, zIndex: 1 }}
              >
                <Text T7 medium color={phoneNumber?.length === 13 ? COLOR.MAIN : COLOR.GRAY1}>{isMessageSent ? '재전송' : '인증요청'}</Text>
              </CustomOutlineButtonBackground>
            }
          </InputContainer>
          
          {
            isMessageSent && !isPhoneNumberCertificated &&
            (<InputContainer>
              <CustomLineInput
                placeholder="인증번호 6자리"
                inputMode="numeric"
                maxLength={6}
                value={certificationNumber}
                onChangeText={setCertificationNumber}
                returnKeyType="next"
                onSubmitEditing={() => {
                  if (certificationNumber?.length === 6) {
                    handleCheckCertificationNumber();
                  }
                }}
              />
              <CustomOutlineButtonBackground
                disabled={certificationNumber?.length < 6}
                onPress={() => handleCheckCertificationNumber()}
                underlayColor={COLOR.SUB4}
                style={{ position: 'absolute', right: 4, top: Device.osName === 'Android' ? 22 : 14, zIndex: 1 }}
              >
                <Text T7 medium color={certificationNumber?.length < 6 ? COLOR.GRAY2 : COLOR.MAIN}>인증확인</Text>
              </CustomOutlineButtonBackground>
            </InputContainer>)
          }
        </Container>

        <SolidButton
          text="다음"
          marginBottom={20}
          disabled={!isPhoneNumberCertificated}
          action={() => handleNextScreen()}
        />
      </Container>
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

const InputContainer = styled.View`
  width: 100%;
  position: relative;
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