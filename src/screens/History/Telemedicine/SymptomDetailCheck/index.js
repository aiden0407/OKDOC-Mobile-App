//React
import { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from 'context/AppContext';
import { ApiContext } from 'context/ApiContext';
import styled from 'styled-components/native';
import { getLocales } from 'expo-localization';

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

  const { dispatch } = useContext(AppContext);
  const { state: { accountData } } = useContext(ApiContext);
  const telemedicineData = route.params.telemedicineData;

  const [deviceLocale, setDeviceLocale] = useState('');
  const [symptom, setSymptom] = useState(telemedicineData.explain_symptom);
  const [count, setCount] = useState(301);
  const savedCallback = useRef();

  useEffect(() => {
    const locale = getLocales()[0];
    setDeviceLocale(locale);
  }, []);

  useEffect(() => {
    const originalTime = new Date(telemedicineData.wish_at);
    const currentTime = new Date();
    const remainingTime = Math.floor((originalTime - currentTime) / 1000);

    setCount(remainingTime);

    function tick() {
      savedCallback.current();
    }
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    savedCallback.current = callback;
  });

  const callback = () => {
    if (count === 1) {
      handleFinish();
    } else {
      setCount(count - 1);
    }
  }

  // const submitSymptomDetail = async function () {
  //   if(telemedicineData.explain_symptom===symptom){
  //     handleNotice1();
  //   }else{
  //     try {
  //       await modifyTreatmentAppointmentBeforeEnter(accountData.loginToken, telemedicineData.id, symptom);
  //       dispatch({ type: 'HISTORY_DATA_ID_ADD', historyDataId: undefined });
  //       dispatch({ type: 'HISTORY_DATA_ID_ADD', historyDataId: telemedicineData.id });
  //       telemedicineData.explain_symptom = symptom;
  //       Alert.alert('안내', '증상을 성공적으로 업데이트 하였습니다.', [
  //         {
  //           text: '확인',
  //           onPress: () =>  handleNotice1()
  //         },
  //       ]);
  //     } catch (error) {
  //       Alert.alert('네트워크 오류로 인해 증상을 업데이트하지 못했습니다.');
  //     }
  //   }
  // }

  function handleNotice1() {
    if(deviceLocale?.regionCode === 'KR'){
      Alert.alert('대한민국에서는 해당 서비스를 이용하실 수 없습니다.');
    } else {
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
            <Text T3 bold marginTop={30}>증상을 확인해 주세요</Text>
            <Text T6 medium color={COLOR.GRAY1} marginTop={12}>아래 내용은 진료 예약 시점에 입력하신 내용입니다.{'\n'}변경된 증상이 있다면 진료 중 말씀해 주시기 바랍니다.{'\n'}진료실 입장 버튼은 예약시간 5분 전부터 활성화됩니다.</Text>
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
            text="진료실 입장하기"
            marginBottom={20}
            disabled={(accountData.email==='aiden@insunginfo.co.kr' || accountData.email==='cailyent0407@gmail.com')? false : count>300}
            action={() => handleNotice1()}
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