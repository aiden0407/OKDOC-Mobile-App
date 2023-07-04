//React
import { useState, useContext } from 'react';
import { AppContext } from 'context/AppContext';
import styled from 'styled-components/native';

//Components
import { COLOR } from 'constants/design';
import { Ionicons } from '@expo/vector-icons';
import { SafeArea, KeyboardAvoiding, Row, Container } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { BoxInput } from 'components/TextInput';
import { SolidButton } from 'components/Button';

//Assets
import addImageIcon from 'assets/icons/add-image.png';

export default function SymptomDetailScreen({ navigation }) {

  const { state: { telemedicineReservationStatus }, dispatch } = useContext(AppContext);
  const [symptom, setSymptom] = useState(telemedicineReservationStatus?.symptom);

  function handleSubmitSymptomDetail() {
    dispatch({
      type: 'TELEMEDICINE_RESERVATION_SYMPTOM',
      symptom: symptom,
    });
    navigation.navigate('PaymentNotification');
  }

  return (
    <SafeArea>
      <KeyboardAvoiding>
        <Container paddingHorizontal={20}>
          <Container>
            <Text T3 bold marginTop={30}>증상을 설명해주세요</Text>
            <BoxInput
              large
              marginTop={12}
              placeholder="진료받고자 하는 증상을 서술해 주세요."
              value={symptom}
              onChangeText={setSymptom}
            />
            {/* <Row marginTop={30}>
              <Text T3 bold>파일을 첨부해주세요</Text><Text T3 bold color={COLOR.GRAY2} marginLeft={2}>(선택)</Text>
            </Row>
            <Text T6 medium color={COLOR.GRAY1} marginTop={6}>증상과 관련된 이미지, 파일을 첨부해주세요</Text>

            <IconContainer>
              <IconColumn>
                <IconButton onPress={() => console.log(1)}>
                  <Image source={addImageIcon} width={44} height={44} marginLeft={4} marginBottom={4} />
                </IconButton>
                <Text T7 medium color={COLOR.GRAY1}>첨부사진 (1)</Text>
              </IconColumn>
              <IconColumn>
                <IconButton onPress={() => console.log(2)}>
                  <Image source={addImageIcon} width={44} height={44} marginLeft={4} marginBottom={4} />
                </IconButton>
                <Text T7 medium color={COLOR.GRAY1}>첨부사진 (2)</Text>
              </IconColumn>
            </IconContainer>

            <Row marginTop={24} align>
              <Ionicons name="alert-circle-outline" size={14} color={COLOR.GRAY2} marginRight={2} />
              <Text T8 color={COLOR.GRAY0} marginBottom={1}>10MB 이내 이미지 파일(jpg, png) 2개까지 첨부가 가능합니다.</Text>
            </Row> */}
          </Container>

          <SolidButton
            text="다음"
            marginBottom={20}
            disabled={!symptom}
            action={() => handleSubmitSymptomDetail()}
          />
        </Container>
      </KeyboardAvoiding>
    </SafeArea>
  );
}

const IconContainer = styled.View`
  margin-top: 24px;
  width: 100%;
  flex-direction: row;
  gap: 24px;
`;

const IconButton = styled.Pressable`
  width: 85px;
  height: 80px;
  border-width: 1px;
  border-color: ${COLOR.GRAY3};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

const IconColumn = styled.View`
  gap: 6px;
  align-items: center;
`;