//React
import { useState, useEffect, useRef } from 'react';

//Components
import { COLOR } from 'constants/design'
import { Alert } from 'react-native';
import { SafeArea, Container, ContainerCenter } from 'components/Layout';
import { Text } from 'components/Text';
import { SolidButton, OutlineButton } from 'components/Button';

export default function TelemedicineWhetherFinishedScreen({ navigation, route }) {

  const telemedicineData = route.params.telemedicineData;
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(600);
  const savedCallback = useRef();

  useEffect(() => {
    const originalTime = new Date(telemedicineData.wish_at);
    const addedTime = new Date(originalTime.getTime() + 10 * 60 * 1000);
    const currentTime = new Date();
    const remainingTime = Math.floor((addedTime - currentTime) / 1000);

    if (remainingTime < 1){
      setTimeout(() => {
        navigation.navigate('TelemedicineComplete', {
          telemedicineData: telemedicineData,
        });
      }, 1000);
    } else {
      setCount(remainingTime);
      setIsLoading(false);
    }

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

  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  function handleNotFinish() {
    navigation.navigate('HistoryStackNavigation', { 
      screen: 'SymptomDetailCheck',
      params: { telemedicineData: telemedicineData }
    });
  }

  function handleFinish() {
    if (count < 600) {
      navigation.navigate('TelemedicineComplete', {
        telemedicineData: telemedicineData,
      });
    } else {
      Alert.alert('진료 종료 확정 불가', '진료 입장 시간 전의 스케줄은 종료할 수 없습니다.');
    }
  }

  if (isLoading) {
    return null;
  }

  return (
    <SafeArea>
      <Container paddingHorizontal={20}>
        <ContainerCenter>

          <Text T2 bold marginTop={18}>진료가 끝났나요?</Text>
          <Text T4 bold color={COLOR.GRAY1} marginTop={6}>(자동 종료까지 남은 시간 {formatTime(count)})</Text>
          <Text T6 center color={COLOR.GRAY1} marginTop={12}>진료 종료를 확정해야만 화상 진료 통화방이 닫히고{'\n'}의사가 작성한 소견서를 확인할 수 있습니다.</Text>
          <OutlineButton
            large
            marginTop={24}
            text="진료실 재입장 하기"
            action={() => handleNotFinish()}
          />
          <SolidButton
            large
            marginTop={6}
            text="진료 종료"
            disabled={false}
            action={() => handleFinish()}
          />

        </ContainerCenter>
      </Container>
    </SafeArea>
  );
}