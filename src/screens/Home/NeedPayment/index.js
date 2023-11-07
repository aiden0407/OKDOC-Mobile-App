//React
import { useEffect, useContext } from 'react';
import { AppContext } from 'context/AppContext';

//Components
import { COLOR } from 'constants/design'
import { SafeArea, Container, ContainerCenter } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { SolidButton, } from 'components/Button';

//Assets
import exclamationIcon from 'assets/icons/circle-exclamation.png';

export default function NeedPaymentScreen({ navigation, route }) {

  const { state: { needPaymentData } } = useContext(AppContext);

  function handleInvoicePaymnt() {
    navigation.navigate('NeedPaymentDetail', { telemedicineData: needPaymentData });
  }

  return (
    <SafeArea>
      <Container paddingHorizontal={20}>
        <ContainerCenter>
          <Image source={exclamationIcon} width={70} height={70} />
          <Text T2 bold marginTop={18}>결제되지 않은 항목이 있어요</Text>
          <Text T5 center color={COLOR.GRAY1} marginTop={18}>추가 결제를 진행 후{`\n`}서비스를 정상적으로 이용할 수 있어요</Text>
        </ContainerCenter>

        <SolidButton
          text="진료내역 확인하기"
          marginBottom={20}
          disabled={false}
          action={() => handleInvoicePaymnt()}
        />
      </Container>
    </SafeArea>
  );
}