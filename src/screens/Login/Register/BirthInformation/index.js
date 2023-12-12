//React
import { useState, useContext } from 'react';
import { ApiContext } from 'context/ApiContext';
import { AppContext } from 'context/AppContext';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Components
import * as Device from 'expo-device';
import { COLOR, BUTTON, INPUT_BOX } from 'constants/design';
import { Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { SafeArea, ScrollView, Container, PaddingContainer, Row, DividingLine } from 'components/Layout';
import { Text } from 'components/Text';
import { BoxInput } from 'components/TextInput';
import { SolidButton } from 'components/Button';

//Api
import { createAppleAccount, createGoogleAccount, createLocalAccount, createPatientByBirth } from 'api/Login';
import { deleteFamilyAccout } from 'api/MyPage';

export default function BirthInformationScreen({ navigation }) {

  const { dispatch: apiContextDispatch } = useContext(ApiContext);
  const { state: { registerStatus }, dispatch: appContextDispatch } = useContext(AppContext);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const today = new Date();
  const [birth, setBirth] = useState(today);
  const [isBirthPickerShow, setIsBirthPickerShow] = useState(false);
  const onBirthChange = (event, selectedDate) => {
    setBirth(selectedDate);
  };
  const showBirthSelector = () => {
    DateTimePickerAndroid.open({
      value: birth,
      onChange: onBirthChange,
      mode: 'date',
      display: 'spinner',
    });
  };
  const [koreanAgreement, setKoreanAgreement] = useState(false);
  const [factAgreement, setFactAgreement] = useState(false);

  function validateName(name) {
    const regExp = /^[가-힣]+$/;
    return regExp.test(name);
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return Number(year + month + day);
  }

  function formatDateString(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleRegister = async function () {
    try {
      const deviceType = await AsyncStorage.getItem('@device_type');
      const deviceToken = await AsyncStorage.getItem('@device_token');
      let createLocalAccountResponse;

      if (registerStatus.route === 'APPLE_EMAIL_EXISTENT' || registerStatus.route === 'APPLE_EMAIL_UNDEFINED') {
        createLocalAccountResponse = await createAppleAccount(registerStatus.email, registerStatus.policy, deviceType, deviceToken, registerStatus.invitationToken);
      }
      if (registerStatus.route === 'GOOGLE_REGISTER') {
        createLocalAccountResponse = await createGoogleAccount(registerStatus.email, registerStatus.policy, deviceType, deviceToken, registerStatus.invitationToken);
      }
      if (registerStatus.route === 'LOCAL_REGISTER') {
        createLocalAccountResponse = await createLocalAccount(registerStatus.email, registerStatus.password, registerStatus.policy, deviceType, deviceToken, registerStatus.invitationToken);
      }

      const loginToken = createLocalAccountResponse.data.response.accessToken;
      initPatient(loginToken);
    } catch (error) {
      Alert.alert('계정 생성에 실패하였습니다. 다시 시도해 주시기 바랍니다.');
    }
  }

  const initPatient = async function (loginToken) {
    try {
      const createPatientByBirthResponse = await createPatientByBirth(loginToken, registerStatus.email, name, formatDate(birth), gender);
      const mainProfile = createPatientByBirthResponse.data.response;

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
        await AsyncStorage.setItem('@account_data', JSON.stringify(accountData));
      } catch (error) {
        //console.log(error);
      }

      apiContextDispatch({
        type: 'PROFILE_CREATE_MAIN',
        id: mainProfile.id,
        name: mainProfile.user_name,
        relationship: mainProfile.relationship,
        birth: mainProfile.birth,
        gender: mainProfile.gender,
      });
      appContextDispatch({ type: 'REGISTER_COMPLETE' });
      navigation.navigate('RegisterComplete');

    } catch (error) {
      //중복 프로필 생성
      if (error.response.data.statusCode === 409) {
        try {
          await deleteFamilyAccout(loginToken, registerStatus.email);
          apiContextDispatch({ type: 'LOGOUT' });
          try {
            await AsyncStorage.removeItem('@account_data');
          } catch (error) {
            //console.log(error);
          }
          Alert.alert('계정 안내', '이미 가입된 회원입니다. 로그인 혹은 계정 찾기를 진행해주시기 바랍니다.', '', [
            {
              text: '확인',
              onPress: () => {
                appContextDispatch({ type: 'REGISTER_COMPLETE' });
                navigation.popToTop();
              }
            }
          ]);
        } catch (error) {
          //회원 탈퇴 실패
          Alert.alert('네트워크 에러', '프로필 생성에 실패했습니다. 관리자에게 문의해 주시기 바랍니다.');
        }
      } else {
        //중복 프로필 생성 외 프로필 생성 실패
        Alert.alert('네트워크 에러', '프로필 생성에 실패했습니다. 관리자에게 문의해 주시기 바랍니다.');
      }
    }
  }

  return (
    <>
      <SafeArea>
        <Container>
          
          <Container>
            <PaddingContainer>
              <Text T3 bold marginTop={30}>오케이닥 서비스 이용을 위해{'\n'}본인 정보를 기입해 주세요</Text>

              <Text T6 bold marginTop={30}>한글 성명</Text>
              <BoxInput
                marginTop={12}
                placeholder="한글 성명"
                value={name}
                onChangeText={setName}
                returnKeyType="next"
              />
              <Text T6 bold marginTop={24}>생년월일</Text>
              <DateTimePickerOpenButton onPress={() => Device.osName === 'Android' ? showBirthSelector() : setIsBirthPickerShow(true)} underlayColor={COLOR.GRAY4}>
                <Text T6 color={birth.toDateString() === today.toDateString() ? COLOR.GRAY2 : '#000000'}>{birth.toDateString() === today.toDateString() ? '생년월일 8자리' : formatDateString(birth)}</Text>
              </DateTimePickerOpenButton>
              <Text T6 bold marginTop={24}>성별</Text>
              <Row marginTop={12} gap={12}>
                <MediumSolidButtonBackground isSelected={gender === 'MALE'} onPress={() => setGender('MALE')}>
                  <Text T6 medium={!gender === 'MALE'} bold={gender === 'MALE'} color={gender === 'MALE' ? '#FFFFFF' : COLOR.GRAY2}>남성</Text>
                </MediumSolidButtonBackground>
                <MediumSolidButtonBackground isSelected={gender === 'FEMALE'} onPress={() => setGender('FEMALE')}>
                  <Text T6 medium={!gender === 'FEMALE'} bold={gender === 'FEMALE'} color={gender === 'FEMALE' ? '#FFFFFF' : COLOR.GRAY2}>여성</Text>
                </MediumSolidButtonBackground>
              </Row>
            </PaddingContainer>

            <DividingLine marginTop={30} />

            <PaddingContainer>
              <Text T3 bold marginTop={30}>재외국민 및 사실 확인</Text>
              <Row marginTop={20}>
                <AgreeRow onPress={() => setKoreanAgreement(!koreanAgreement)}>
                  <Ionicons name="checkbox" size={22} color={koreanAgreement ? COLOR.MAIN : COLOR.GRAY3} marginRight={6} />
                  <Text T6 medium color={koreanAgreement ? '#000000' : COLOR.GRAY1}>본인은 대한민국 국적이며, 재외국민입니다.</Text>
                </AgreeRow>
              </Row>
              <Row marginTop={-8}>
                <AgreeRow onPress={() => setFactAgreement(!factAgreement)}>
                  <Ionicons name="checkbox" size={22} color={factAgreement ? COLOR.MAIN : COLOR.GRAY3} marginRight={6} />
                  <Text T6 medium  marginTop={19} color={factAgreement ? '#000000' : COLOR.GRAY1}>상기 내용은 사실이며 사실이 아닐 경우,{`\n`}발생하는 문제에 대한 책임은 본인에게 있습니다.</Text>
                </AgreeRow>
              </Row>
            </PaddingContainer>
          </Container>

          <PaddingContainer>
            <SolidButton
              text="회원가입"
              marginBottom={20}
              disabled={!validateName(name) || !gender || birth.toDateString() === today.toDateString() || !koreanAgreement || !factAgreement}
              action={() => handleRegister()}
            />
          </PaddingContainer>

        </Container>
      </SafeArea>

      {isBirthPickerShow && (
        <BottomSheetBackground onPress={() => setIsBirthPickerShow(false)}>
          <DateTimePickerContainer>
            <DateTimePicker
              display="spinner"
              value={birth}
              onChange={onBirthChange}
              style={{ backgroundColor: COLOR.GRAY5 }}
              locale="ko-KO"
            />
            <CustomSolidButton
              underlayColor={COLOR.SUB1}
              onPress={() => setIsBirthPickerShow(false)}
            >
              <Text T5 medium color="#FFFFFF">확인</Text>
            </CustomSolidButton>
          </DateTimePickerContainer>
        </BottomSheetBackground>
      )}
    </>
  );
}

const DateTimePickerOpenButton = styled.TouchableHighlight`
  margin-top: 12px;
  width: 100%;
  padding: ${INPUT_BOX.DEFAULT.BACKGROUND_PADDING};
  background-color: ${COLOR.GRAY6};
  border-radius: 5px;
`;

const MediumSolidButtonBackground = styled.Pressable`
  width: ${BUTTON.MEDIUM.WIDTH};
  height: ${BUTTON.MEDIUM.HEIGHT};
  border-radius: ${BUTTON.MEDIUM.BORDER_RADIUS};
  background-color: ${(props) => props.isSelected ? COLOR.MAIN : COLOR.GRAY6};
  align-items: center;
  justify-content: center;
`;

const BottomSheetBackground = styled.Pressable`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #000000AA;
`;

const DateTimePickerContainer = styled.View`
  position: absolute;
  padding-top: 18px;
  width: 100%;
  bottom: 0;
  gap: 10px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${COLOR.GRAY5};
`;

const CustomSolidButton = styled.TouchableHighlight`
  width: 100%; 
  height: 70px;
  padding-bottom: 14px;
  background-color: ${COLOR.MAIN};
  align-items: center;
  justify-content: center;
`;

const AgreeRow = styled.Pressable`
  flex-direction: row;
  align-items: center;
`;