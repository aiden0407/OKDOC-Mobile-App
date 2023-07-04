//React
import { useState, useContext } from 'react';
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

export default function SymptomDetailCheckScreen({ navigation, route }) {

  const telemedicineData = route.params.telemedicineData;

  const [symptom, setSymptom] = useState(telemedicineData.explain_symptom);

  function handleEnterTelemedicineRoom() {
    navigation.navigate('TelemedicineRoom', {
      telemedicineData: telemedicineData,
    });
  }

  return (
    <SafeArea>
      <KeyboardAvoiding>
        <Container paddingHorizontal={20}>
          <Container>
            <Text T3 bold marginTop={30}>아래 내용을 확인해 주세요</Text>
            <Text T6 medium color={COLOR.GRAY1} marginTop={12}>아래 내용은 진료 예약 시점에 입력하신 내용입니다{'\n'}달라진 점이 있거나, 추가할 내용이 있으면 수정해주세요</Text>
            <Text T6 bold marginTop={30}>증상</Text>
            <BoxInput
              large
              marginTop={12}
              placeholder="진료받고자 하는 증상을 서술해 주세요."
              value={symptom}
              onChangeText={setSymptom}
            />
            {/* <Text T6 bold marginTop={30}>파일선택</Text>

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

            <Row marginTop={18} align>
              <Ionicons name="alert-circle-outline" size={14} color={COLOR.GRAY2} marginRight={2} />
              <Text T8 color={COLOR.GRAY0} marginBottom={1}>10MB 이내 이미지 파일(jpg, png) 2개까지 첨부가 가능합니다.</Text>
            </Row> */}
          </Container>

          <SolidButton
            text="진료실 입장하기"
            marginBottom={20}
            disabled={!symptom}
            action={() => handleEnterTelemedicineRoom()}
          />
        </Container>
      </KeyboardAvoiding>
    </SafeArea>
  );
}

const IconContainer = styled.Pressable`
  margin-top: 18px;
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