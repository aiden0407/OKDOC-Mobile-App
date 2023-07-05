//Components
import { COLOR } from 'constants/design'
import { SafeArea, Container, ContainerCenter, Row } from 'components/Layout';
import { Text } from 'components/Text';
import { SolidButton, OutlineButton } from 'components/Button';

export default function TelemedicineWhetherFinishedScreen({ navigation, route }) {

  const telemedicineData = route.params.telemedicineData;

  function handleNotFinish() {
    navigation.navigate('HistoryStackNavigation', { 
      screen: 'SymptomDetailCheck',
      params: { telemedicineData: telemedicineData }
    });
  }

  function handleFinish() {
    navigation.navigate('TelemedicineComplete', {
      telemedicineData: telemedicineData,
    });
  }

  return (
    <SafeArea>
      <Container paddingHorizontal={20}>
        <ContainerCenter>

          <Text T2 bold marginTop={18}>진료가 끝났나요?</Text>
          <Text T6 center color={COLOR.GRAY1} marginTop={18}>진료 종료를 확정해야만 화상 진료 통화방이 닫히고{'\n'}의사가 작성한 소견서를 확인할 수 있습니다.</Text>
          <OutlineButton
            large
            marginTop={24}
            text="돌아가기"
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