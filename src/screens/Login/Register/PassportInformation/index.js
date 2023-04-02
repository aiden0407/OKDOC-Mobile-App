//React
import { useState, useRef } from 'react';
import { AppContext } from 'context/AppContext';
import styled from 'styled-components/native';

//Components
import { COLOR, BUTTON, INPUT_BOX } from 'constants/design';
import { ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeArea, Container, ScrollView, Row, Center, Box } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { BoxInput } from 'components/TextInput';
import { SolidButton } from 'components/Button';

//Assets
import exclamationIcon from 'assets/icons/circle-exclamation.png';

export default function PassportInformationScreen({ navigation }) {

  const [name, setName] = useState();
  const [passportNumber, setPassportNumber] = useState();
  const [gender, setGender] = useState();
  
  const today = new Date();
  const [birth, setBirth] = useState(today);
  const [isBirthPickerShow, setIsBirthPickerShow] = useState(false);
  const onBirthChange = (event, selectedDate) => {
    setBirth(selectedDate);
  };
  const [issuanceDate, setIssuanceDate] = useState(today);
  const [isIssuanceDatePickerShow, setIsIssuanceDatePickerShow] = useState(false);
  const onIssuanceDateChange = (event, selectedDate) => {
    setIssuanceDate(selectedDate);
  };
  const [expirationDate, setExpirationDate] = useState(today);
  const [isExpirationDatePickerShow, setIsExpirationDatePickerShow] = useState(false);
  const onExpirationDateChange = (event, selectedDate) => {
    setExpirationDate(selectedDate);
  };

  const [passportCertifiactionState, setPassportCertifiactionState] = useState('NONE');
  function handleNextScreen() {
    setPassportCertifiactionState('CHECKING');
    setTimeout(() => {
      if(passportNumber==='123123'){
        setPassportCertifiactionState('NONE');
        navigation.navigate('PersonalInformation');
      } else {
        setPassportCertifiactionState('ERROR');
      }
    }, 2000);
  }

  const scrollRef = useRef();
  function handleTextInputFocus(value) {
    scrollRef.current?.scrollTo({
      y: value,
      animated: true,
    });
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
              <Text T6 color={birth.toDateString()===today.toDateString() ? COLOR.GRAY2 : '#000000'}>{birth.toDateString()===today.toDateString() ? '생년월일 8자리' : `${birth.toISOString().split('T')[0]}`}</Text>
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
            <DateTimePickerOpenButton onPress={() => setIsIssuanceDatePickerShow(true)} underlayColor={COLOR.GRAY4}>
              <Text T6 color={issuanceDate.toDateString()===today.toDateString() ? COLOR.GRAY2 : '#000000'}>{issuanceDate.toDateString()===today.toDateString() ? '발급일 숫자 8자리' : `${issuanceDate.toISOString().split('T')[0]}`}</Text>
            </DateTimePickerOpenButton>
            <Text T6 bold marginTop={24}>기간 만료일</Text>
            <DateTimePickerOpenButton onPress={() => setIsExpirationDatePickerShow(true)} underlayColor={COLOR.GRAY4}>
              <Text T6 color={expirationDate.toDateString()===today.toDateString() ? COLOR.GRAY2 : '#000000'}>{expirationDate.toDateString()===today.toDateString() ? '기간 만료일 숫자 8자리' : `${expirationDate.toISOString().split('T')[0]}`}</Text>
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
              //disabled={!name || !passportNumber || !gender || birth.toDateString()===today.toDateString() || issuanceDate.toDateString()===today.toDateString() || expirationDate.toDateString()===today.toDateString()}
              action={() => handleNextScreen()}
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
      {isIssuanceDatePickerShow && (
        <BottomSheetBackground onPress={() => setIsIssuanceDatePickerShow(false)}>
          <DateTimePickerContainer>
            <DateTimePicker
              display="spinner"
              value={issuanceDate}
              onChange={onIssuanceDateChange}
              style={{ backgroundColor: COLOR.GRAY5 }}
            />
            <CustomSolidButton
              underlayColor={COLOR.SUB1}
              onPress={() => setIsIssuanceDatePickerShow(false)}
            >
              <Text T5 medium color="#FFFFFF">확인</Text>
            </CustomSolidButton>
          </DateTimePickerContainer>
        </BottomSheetBackground>
      )}
      {isExpirationDatePickerShow && (
        <BottomSheetBackground onPress={() => setIsExpirationDatePickerShow(false)}>
          <DateTimePickerContainer>
            <DateTimePicker
              display="spinner"
              value={expirationDate}
              onChange={onExpirationDateChange}
              style={{ backgroundColor: COLOR.GRAY5 }}
            />
            <CustomSolidButton
              underlayColor={COLOR.SUB1}
              onPress={() => setIsExpirationDatePickerShow(false)}
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
            <Image source={exclamationIcon} width={70} height={70} marginTop={-20}/>
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