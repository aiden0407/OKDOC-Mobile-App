//React
import styled from 'styled-components/native';

//Components
import { SafeArea, ContainerTop } from 'components/Common';

export default function InquiryScreen() {
  return (
    <SafeArea>
      <ContainerTop paddingTop={50}>
        <Title>카테고리 선택</Title>
      </ContainerTop>
    </SafeArea>
  );
}

const Title = styled.Text`

`;