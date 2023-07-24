//React
import { useState, useContext } from 'react';
import { ApiContext } from 'context/ApiContext';
import { AppContext } from 'context/AppContext';
import styled from 'styled-components/native';

//Components
import { COLOR } from 'constants/design';
import { Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeArea, KeyboardAvoiding, Row, Container } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { BoxInput } from 'components/TextInput';
import { SolidButton } from 'components/Button';

//Assets
import addImageIcon from 'assets/icons/add-image.png';

//Api
import { modifyTreatmentAppointmentBeforeEnter } from 'api/History';

export default function SymptomDetailCheckScreen({ navigation, route }) {

  const { state: { accountData } } = useContext(ApiContext);
  const { dispatch } = useContext(AppContext);
  const telemedicineData = route.params.telemedicineData;
  const [symptom, setSymptom] = useState(telemedicineData.explain_symptom);

  const submitSymptomDetail = async function () {
    if(telemedicineData.explain_symptom===symptom){
      handleNotice1();
    }else{
      try {
        await modifyTreatmentAppointmentBeforeEnter(accountData.loginToken, telemedicineData.id, symptom);
        dispatch({ type: 'HISTORY_DATA_ID_ADD', historyDataId: undefined });
        dispatch({ type: 'HISTORY_DATA_ID_ADD', historyDataId: telemedicineData.id });
        telemedicineData.explain_symptom = symptom;
        Alert.alert('안내', '증상을 성공적으로 업데이트 하였습니다.', [
          {
            text: '확인',
            onPress: () =>  handleNotice1()
          },
        ]);
      } catch (error) {
        Alert.alert('네트워크 오류로 인해 증상을 업데이트하지 못했습니다.');
      }
    }
  }

  function handleNotice1() {
    Alert.alert('진료실에 입장하시겠습니까?', '진료는 예약하신 시간부터 시작됩니다.', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '확인',
        onPress: () => handleNotice2()
      },
    ]);
  }

  function handleNotice2() {
    Alert.alert('안내', '화상 진료를 받기 위해서는 카메라와 마이크 사용 권한을 허가해야 합니다. 또한 정확한 의료 진단을 위해 화상 진료 녹화를 허가해야 합니다.', [
      {
        text: '확인',
        onPress: () => handleConfirm()
      },
    ]);
  }

  function handleConfirm() {
    navigation.navigate('TelemedicineRoomNavigation', { 
      screen: 'TelemedicineRoom',
      params: { telemedicineData: telemedicineData }
    });
  }

  return (
    <SafeArea>
      <KeyboardAvoiding>
        <Container paddingHorizontal={20}>
          <Container>
            <Text T3 bold marginTop={30}>아래 내용을 확인해 주세요</Text>
            {/* <Text T6 medium color={COLOR.GRAY1} marginTop={12}>아래 내용은 진료 예약 시점에 입력하신 내용입니다{'\n'}달라진 점이 있거나, 추가할 내용이 있으면 수정해주세요</Text> */}
            <Text T6 medium color={COLOR.GRAY1} marginTop={12}>아래 내용은 진료 예약 시점에 입력하신 내용입니다.{'\n'}달라진 점이 있거나, 추가하실 내용이 있으면{'\n'}진료 시작 시 말해주시기 바랍니다.</Text>
            <Text T6 bold marginTop={30}>증상</Text>
            <BoxInput
              editable={false}
              large
              marginTop={12}
              placeholder="진료받고자 하는 증상을 서술해 주세요."
              value={symptom}
              onChangeText={setSymptom}
            />
            <Text T6 bold marginTop={30}>첨부 파일 확인</Text>

            <IconContainer>
              {
                telemedicineData?.attachments?.[0]
                  ? <IconColumn>
                    <IconButton onPress={() => { }}>
                      <Image source={{ uri: telemedicineData.attachments?.[0].Location }} width={85} height={80} borderRadius={8} />
                    </IconButton>
                    <Text T7 medium color={COLOR.GRAY1}>첨부사진 (1)</Text>
                  </IconColumn>
                  : <IconColumn>
                    <IconButton onPress={() => { }}>
                      <Image source={addImageIcon} width={44} height={44} marginLeft={4} marginBottom={4} />
                    </IconButton>
                    <Text T7 medium color={COLOR.GRAY1}>첨부사진 없음</Text>
                  </IconColumn>
              }
              {
                telemedicineData?.attachments?.[1]
                && <IconColumn>
                  <IconButton onPress={() => { }}>
                    <Image source={{ uri: telemedicineData.attachments?.[1].Location }} width={85} height={80} borderRadius={8} />
                  </IconButton>
                  <Text T7 medium color={COLOR.GRAY1}>첨부사진 (2)</Text>
                </IconColumn>
              }
            </IconContainer>

            {/* <Row marginTop={18} align>
              <Ionicons name="alert-circle-outline" size={14} color={COLOR.GRAY2} marginRight={2} />
              <Text T8 color={COLOR.GRAY0} marginBottom={1}>10MB 이내 이미지 파일(jpg, png) 2개까지 첨부가 가능합니다.</Text>
            </Row> */}
          </Container>

          <SolidButton
            text={telemedicineData.explain_symptom===symptom?"진료실 입장하기":"증상 수정하기"}
            marginBottom={20}
            disabled={!symptom}
            action={() => submitSymptomDetail()}
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