//React
import { useEffect } from 'react';
import styled from 'styled-components/native';

//Components
import { COLOR } from 'constants/design'
import { SafeArea, Container, ContainerCenter, Row } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { SolidButton, OutlineButton } from 'components/Button';

//Assets
import checkIcon from 'assets/icons/circle-check.png';

export default function TelemedicineCompleteScreen({ navigation, route }) {

  const telemedicineData = route.params.telemedicineData;

  function handleFeedback() {
  }

  function handleNextScreen() {
    navigation.navigate('Payment', {
      telemedicineData: telemedicineData,
    });
  }

  return (
    <SafeArea>
      <Container paddingHorizontal={20}>
        <ContainerCenter>

          <Image source={checkIcon} width={70} height={70} />
          <Text T2 bold marginTop={18}>진료가 종료되었습니다</Text>
          <Text T6 center color={COLOR.GRAY1} marginTop={18}>진료 중 좋았던 점이나{'\n'}불편한 점이 있었다면  알려주세요</Text>
          <OutlineButton
            large
            marginTop={24}
            text="진료 후기 남기기"
            action={() => handleFeedback()}
          />

        </ContainerCenter>

        <SolidButton
          text="진료 연장 요금 결제하기"
          marginBottom={20}
          disabled={false}
          action={() => handleNextScreen()}
        />
      </Container>
    </SafeArea>
  );
}