//React
import styled from 'styled-components/native';

//Components
import { COLOR } from 'constants/design'
import { SafeArea, Container } from 'components/Layout';
import { Text } from 'components/Text';

export default function NotificationDetailScreen({ route }) {
  
  const title = route.params.title;
  const contentsText = `테스트용으로 쓰이는 더미 텍스트다. 디자인을 할 때 가제로 쓰이고 레이아웃을 테스트할 때 든지 프린트의 테스트, 기계 테스트, 폰트 테스트, 컨텐츠의 양을 측정할 때도 쓰인다. 테스트용으로 쓰이는 더미 텍스트다.\n\n테스트용으로 쓰이는 더미 텍스트다. 디자인을 할 때 가제로 쓰이고 레이아웃을 테스트할 때 든지 프린트의 테스트, 기계 테스트, 폰트 테스트, 컨텐츠의 양을 측정할 때도 쓰인다. 테스트용으로 쓰이는 더미 텍스트다.\n\n테스트용으로 쓰이는 더미 텍스트다. 디자인을 할 때 가제로 쓰이고 레이아웃을 테스트할 때 든지 프린트의 테스트, 기계 테스트, 폰트 테스트, 컨텐츠의 양을 측정할 때도 쓰인다. 테스트용으로 쓰이는 더미 텍스트다.`

  return (
    <SafeArea>
      <Container paddingHorizontal={20}>

        <Text T3 bold marginTop={30}>{title}</Text>
        <Text T6 marginTop={23} color={COLOR.GRAY1}>{contentsText}</Text>

      </Container>
    </SafeArea>
  );
}