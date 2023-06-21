//React
import { useState, useContext } from 'react';
import { AppContext } from 'context/AppContext';
import styled from 'styled-components/native';

//Components
import { COLOR, TYPOGRAPHY, INPUT_BOX } from 'constants/design';
import { Dimensions } from 'react-native';
import { SafeArea, KeyboardAvoiding, Container, Row } from 'components/Layout';
import { Text } from 'components/Text';
import { SolidButton } from 'components/Button';

export default function RegisterPolicyScreen({ navigation }) {

  const { state: { registerStatus }, dispatch } = useContext(AppContext);
  const [countryCode, setCountryCode] = useState('+82');
  const [phoneNumber, setPhoneNumber] = useState(registerStatus?.phoneNumber);
  const windowWidth = Dimensions.get('window').width;

  function handleNextScreen() {
    dispatch({
      type: 'REGISTER_PASSPORT_PHONE_NUMBER',
      countryCode: countryCode,
      phoneNumber: phoneNumber,
    });
    navigation.navigate('EmailPassword');
  }

  return (
    <SafeArea>
      <KeyboardAvoiding>
        <Container paddingHorizontal={20}>
          <Container>

            <Text T3 bold marginTop={30}>인증된 아래 정보들을 확인해주세요</Text>
            <Text T6 color={COLOR.GRAY1} marginTop={12}>국가번호와 전화번호를 정확히 입력해주세요</Text>

            <Text T6 bold marginTop={30}>한글 성명</Text>
            <TextBox>
              <Text T5>{registerStatus?.name ?? ' '}</Text>
            </TextBox>
            <Text T6 bold marginTop={30}>생년월일</Text>
            <TextBox>
              <Text T5>{registerStatus?.birth?.toISOString()?.split('T')[0] ?? ' '}</Text>
            </TextBox>
            {/* <Text T6 bold marginTop={30}>성별</Text>
            <Row marginTop={12} gap={12}>
              <SolidButton medium text="남성" disabled={false} />
              <SolidButton medium text="여성" disabled={true} />
            </Row> */}
            <Text T6 bold marginTop={30}>전화번호</Text>
            <Row marginTop={12} gap={6}>
              <CountryCallingCodeBox>
                <Text T5>{countryCode}</Text>
              </CountryCallingCodeBox>
              <PhoneNumberBox
                placeholder="전화번호"
                windowWidth={windowWidth}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                inputMode="numeric"
              />
            </Row>

          </Container>

          <SolidButton
            text="다음"
            marginBottom={20}
            disabled={!phoneNumber}
            action={() => handleNextScreen()}
          />
        </Container>
      </KeyboardAvoiding>
    </SafeArea>
  );
}

const TextBox = styled.TouchableHighlight`
  margin-top: 12px;
  width: 100%;
  padding: ${INPUT_BOX.DEFAULT.BACKGROUND_PADDING};
  background-color: ${COLOR.GRAY4};
  border-radius: 5px;
`;

const CountryCallingCodeBox = styled.Pressable`
  width: 66px;
  padding: 8px 0 8px 12px;
  background-color: ${COLOR.GRAY6};
  border-radius: 3px;
`;

const PhoneNumberBox = styled.TextInput`
  width: ${(props) => `${props.windowWidth - 112}px`};
  padding: 0 0 0 14px;
  background-color: ${COLOR.GRAY6};
  border-radius: 3px;
  font-family: 'Pretendard-Regular';
  font-size: ${TYPOGRAPHY.T5.SIZE};
`;