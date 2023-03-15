//React
import styled from 'styled-components/native';

//Components
import { SafeArea, ContainerTop } from 'components/Layout';

export default function NotificationDetailsScreen({ route }) {
  
  const title = route.params.title;

  return (
    <SafeArea>
      <ContainerTop paddingTop={50}>
        <TitleContainer>
          <Title>{title}</Title>
        </TitleContainer>

        <ContentsContainer>
          <Contents>
            테스트용으로 쓰이는 더미 텍스트다. 디자인을 할 때 가제로 쓰이고 레이아웃을 테스트할 때 든지 프린트의 테스트, 기계 테스트, 폰트 테스트, 컨텐츠의 양을 측정할 때도 쓰인다. 테스트용으로 쓰이는 더미 텍스트다.
            {'\n'}{'\n'}
            테스트용으로 쓰이는 더미 텍스트다. 디자인을 할 때 가제로 쓰이고 레이아웃을 테스트할 때 든지 프린트의 테스트, 기계 테스트, 폰트 테스트, 컨텐츠의 양을 측정할 때도 쓰인다. 테스트용으로 쓰이는 더미 텍스트다. 테스트용으로 쓰이는 더미 텍스트다. 디자인을 할 때 가제로 쓰이고 레이아웃을 테스트할 때 든지 프린트의 테스트, 기계 테스트, 폰트 테스트, 컨텐츠의 양을 측정할 때도 쓰인다.
            {'\n'}{'\n'}
            테스트용으로 쓰이는 더미 텍스트다. 디자인을 할 때 가제로 쓰이고 레이아웃을 테스트할 때 든지 프린트의 테스트, 기계 테스트, 폰트 테스트, 컨텐츠의 양을 측정할 때도 쓰인다. 테스트용으로 쓰이는 더미 텍스트다. 디자인을 할 때 가제로 쓰이고 레이아웃을 테스트할 때 든지 프린트의 테스트, 기계 테스트, 폰트 테스트, 컨텐츠의 양을 측정할 때도 쓰인다.
          </Contents>
        </ContentsContainer>
      </ContainerTop>
    </SafeArea>
  );
}

const TitleContainer = styled.View`
  width: 100%;
`;

const Title = styled.Text`
  margin-left: 20px;
  font-weight: 500;
  font-size: 20px;
`;

const ContentsContainer = styled.View`
  width: 100%;
  padding: 26px 20px;
`;

const Contents = styled.Text`
  font-weight: 500;
  font-size: 14px;
  color: #8B8E99;
`;