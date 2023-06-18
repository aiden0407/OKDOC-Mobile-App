//React
import { useState, useContext, useRef } from 'react';
import { ApiContext } from 'context/ApiContext';
import { AppContext } from 'context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';

//Components
import { COLOR, BUTTON, INPUT_BOX } from 'constants/design';
import { Alert, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeArea, Container, ScrollView, Row, Center, Box } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { BoxInput } from 'components/TextInput';
import { SolidButton } from 'components/Button';

//Api
import { checkPassportInformation, createFamilyAccount, createPatientProfileInit } from 'api/Login';

//Assets
import exclamationIcon from 'assets/icons/circle-exclamation.png';

export default function PassportInformationScreen({ navigation }) {

  const { state: { accountData }, dispatch: apiContextDispatch } = useContext(ApiContext);
  const { state: { registerStatus }, dispatch: appContextDispatch } = useContext(AppContext);
  const [name, setName] = useState(registerStatus?.name);
  const [passportNumber, setPassportNumber] = useState(registerStatus?.passportNumber);
  const [gender, setGender] = useState(registerStatus?.gender);

  const today = new Date();
  const [birth, setBirth] = useState(registerStatus?.birth ?? today);
  const [isBirthPickerShow, setIsBirthPickerShow] = useState(false);
  const onBirthChange = (event, selectedDate) => {
    setBirth(selectedDate);
  };
  const [dateOfIssue, setDateOfIssue] = useState(registerStatus?.dateOfIssue ?? today);
  const [isDateOfIssuePickerShow, setIsDateOfIssuePickerShow] = useState(false);
  const onDateOfIssueChange = (event, selectedDate) => {
    setDateOfIssue(selectedDate);
  };
  const [dateOfExpiry, setDateOfExpiry] = useState(registerStatus?.dateOfExpiry ?? today);
  const [isDateOfExpiryPickerShow, setIsDateOfExpiryPickerShow] = useState(false);
  const onDateOfExpiryChange = (event, selectedDate) => {
    setDateOfExpiry(selectedDate);
  };

  const scrollRef = useRef();
  function handleTextInputFocus(value) {
    scrollRef.current?.scrollTo({
      y: value,
      animated: true,
    });
  }

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

  function formatDate2(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const [passportCertifiactionState, setPassportCertifiactionState] = useState('NONE');

  const passportCheck = async function () {
    setPassportCertifiactionState('CHECKING');
    try {
      //await checkPassportInformation(name, formatDate(birth), passportNumber, formatDate(dateOfIssue), formatDate(dateOfExpiry));
      registerFamily();
    } catch (error) {
      setPassportCertifiactionState('ERROR');
    }
  }

  const registerFamily = async function () {
    try {
      const createFamilyAccountResponse = await createFamilyAccount(registerStatus.email, registerStatus.password, registerStatus.policy);
      const loginToken = createFamilyAccountResponse.data.response.login_token;
      apiContextDispatch({ 
        type: 'LOGIN', 
        loginToken: loginToken,
        email: registerStatus.email, 
      });
      try {
        const accountData = {
          loginToken: loginToken,
          email: email,
        };
        await AsyncStorage.setItem('accountData', JSON.stringify(accountData));
      } catch (error) {
        console.log(error);
      }
      setPassportCertifiactionState('NONE');
      initPatient(loginToken);
    } catch (error) {
      setPassportCertifiactionState('NONE');
      Alert.alert('계정 생성에 실패하였습니다.');
    }
  }

  const initPatient = async function (loginToken) {
    try {
      const createPatientProfileInitResponse = await createPatientProfileInit(loginToken, registerStatus.email, name, formatDate(birth), passportNumber, formatDate(dateOfIssue), formatDate(dateOfExpiry), gender);
      const mainProfile = createPatientProfileInitResponse.data.response;
      apiContextDispatch({
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
      setPassportCertifiactionState('NONE');
      appContextDispatch({type: 'REGISTER_COMPLETE'});
      navigation.navigate('RegisterComplete');
    } catch (error) {
      setPassportCertifiactionState('NONE');
      Alert.alert('프로필 정보 생성에 실패하였습니다.');
    }
  }

  return (
    <>
      <SafeArea>
        <Container paddingHorizontal={20}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            ref={scrollRef}
          >
            <Text T3 bold marginTop={30}>본인 여권정보를 입력해주세요</Text>
            <Text T6 color={COLOR.GRAY1} marginTop={12}>재외국민이신 경우, 여권인증이 더 수월해요{'\n'}* 재외국민 : 30일 이상 해외 체류자</Text>

            <Text T6 bold marginTop={30}>한글 성명</Text>
            <BoxInput
              marginTop={12}
              placeholder="한글 성명"
              value={name}
              onChangeText={setName}
              onFocus={() => handleTextInputFocus(0)}
              returnKeyType="next"
            />
            <Text T6 bold marginTop={24}>생년월일</Text>
            <DateTimePickerOpenButton onPress={() => setIsBirthPickerShow(true)} underlayColor={COLOR.GRAY4}>
              <Text T6 color={birth.toDateString() === today.toDateString() ? COLOR.GRAY2 : '#000000'}>{birth.toDateString() === today.toDateString() ? '생년월일 8자리' : formatDate2(birth)}</Text>
            </DateTimePickerOpenButton>
            <Text T6 bold marginTop={24}>여권번호</Text>
            <BoxInput
              marginTop={12}
              placeholder="알파벳+숫자 8자리"
              value={passportNumber}
              onChangeText={setPassportNumber}
              onFocus={() => handleTextInputFocus(200)}
            />
            <Text T6 bold marginTop={24}>발급일</Text>
            <DateTimePickerOpenButton onPress={() => setIsDateOfIssuePickerShow(true)} underlayColor={COLOR.GRAY4}>
              <Text T6 color={dateOfIssue.toDateString() === today.toDateString() ? COLOR.GRAY2 : '#000000'}>{dateOfIssue.toDateString() === today.toDateString() ? '발급일 숫자 8자리' : formatDate2(dateOfIssue)}</Text>
            </DateTimePickerOpenButton>
            <Text T6 bold marginTop={24}>기간 만료일</Text>
            <DateTimePickerOpenButton onPress={() => setIsDateOfExpiryPickerShow(true)} underlayColor={COLOR.GRAY4}>
              <Text T6 color={dateOfExpiry.toDateString() === today.toDateString() ? COLOR.GRAY2 : '#000000'}>{dateOfExpiry.toDateString() === today.toDateString() ? '기간 만료일 숫자 8자리' : formatDate2(dateOfExpiry)}</Text>
            </DateTimePickerOpenButton>
            <Text T6 bold marginTop={24}>성별</Text>
            <Row marginTop={12} gap={12}>
              <MediumSolidButtonBackground isSelected={gender === 'male'} onPress={() => setGender('male')}>
                <Text T6 medium={!gender === 'male'} bold={gender === 'male'} color={gender === 'male' ? '#FFFFFF' : COLOR.GRAY2}>남성</Text>
              </MediumSolidButtonBackground>
              <MediumSolidButtonBackground isSelected={gender === 'female'} onPress={() => setGender('female')}>
                <Text T6 medium={!gender === 'female'} bold={gender === 'female'} color={gender === 'female' ? '#FFFFFF' : COLOR.GRAY2}>여성</Text>
              </MediumSolidButtonBackground>
            </Row>

            <Box height={100} />

            <SolidButton
              text="다음"
              marginBottom={20}
              disabled={!validateName(name) || !passportNumber || !gender || birth.toDateString() === today.toDateString() || dateOfIssue.toDateString() === today.toDateString() || dateOfExpiry.toDateString() === today.toDateString()}
              action={() => passportCheck()}
            />
          </ScrollView>
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

      {isDateOfIssuePickerShow && (
        <BottomSheetBackground onPress={() => setIsDateOfIssuePickerShow(false)}>
          <DateTimePickerContainer>
            <DateTimePicker
              display="spinner"
              value={dateOfIssue}
              onChange={onDateOfIssueChange}
              style={{ backgroundColor: COLOR.GRAY5 }}
            />
            <CustomSolidButton
              underlayColor={COLOR.SUB1}
              onPress={() => setIsDateOfIssuePickerShow(false)}
            >
              <Text T5 medium color="#FFFFFF">확인</Text>
            </CustomSolidButton>
          </DateTimePickerContainer>
        </BottomSheetBackground>
      )}

      {isDateOfExpiryPickerShow && (
        <BottomSheetBackground onPress={() => setIsDateOfExpiryPickerShow(false)}>
          <DateTimePickerContainer>
            <DateTimePicker
              display="spinner"
              value={dateOfExpiry}
              onChange={onDateOfExpiryChange}
              style={{ backgroundColor: COLOR.GRAY5 }}
            />
            <CustomSolidButton
              underlayColor={COLOR.SUB1}
              onPress={() => setIsDateOfExpiryPickerShow(false)}
            >
              <Text T5 medium color="#FFFFFF">확인</Text>
            </CustomSolidButton>
          </DateTimePickerContainer>
        </BottomSheetBackground>
      )}

      {passportCertifiactionState === 'CHECKING' && (
        <BottomSheetBackground>
          <PassportCertifiactionContainer gap={30}>
            <ActivityIndicator size="large" color="#5500CC" />
            <Text T4 medium center>잠시만 기다려주세요{'\n'}여권 정보를 확인중이에요</Text>
          </PassportCertifiactionContainer>
        </BottomSheetBackground>
      )}

      {passportCertifiactionState === 'ERROR' && (
        <BottomSheetBackground>
          <PassportCertifiactionContainer>
            <Image source={exclamationIcon} width={70} height={70} marginTop={-20} />
            <Text T4 medium center marginTop={12}>입력하신 정보와 일치하는{'\n'}여권정보가 존재하지 않아요</Text>
            <Row gap={24} marginTop={18}>
              <CustomSolidButtonBackground onPress={() => setPassportCertifiactionState('NONE')} underlayColor={COLOR.SUB3}>
                <Text T6 medium color={COLOR.MAIN}>여권정보 재입력</Text>
              </CustomSolidButtonBackground>
              <CustomSolidButtonBackground>
                <Text T6 medium color={COLOR.MAIN}>휴대폰 인증</Text>
              </CustomSolidButtonBackground>
            </Row>
          </PassportCertifiactionContainer>
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

const CustomSolidButtonBackground = styled.TouchableHighlight`
  width: ${BUTTON.MEDIUM.WIDTH};
  height: ${BUTTON.MEDIUM.HEIGHT};
  border-radius: ${BUTTON.MEDIUM.BORDER_RADIUS};
  background-color: ${COLOR.SUB4};
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

const PassportCertifiactionContainer = styled.View`
  position: absolute;
  height: 314px;
  width: 100%;
  bottom: 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: #FFFFFF;
  align-items: center;
  justify-content: center;
`;

const CustomSolidButton = styled.TouchableHighlight`
  width: 100%; 
  height: 70px;
  padding-bottom: 14px;
  background-color: ${COLOR.MAIN};
  align-items: center;
  justify-content: center;
`;