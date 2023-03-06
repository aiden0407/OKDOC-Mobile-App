//React
import styled from 'styled-components/native';

//Components
import { Ionicons } from '@expo/vector-icons';
import { SafeArea, ContainerTop } from 'components/Common';

export default function PolicyScreen({ navigation }) {

  function PolicyButton({ title }) {
    return (
      <PolicyBox>
        <PolicyRow
          activeOpacity={0.4}
          onPress={() => navigation.push('PolicyDetails', {
            title: title,
          })}
        >
          <PolicyTitle>{title}</PolicyTitle>
          <Ionicons name="chevron-forward" size={20} />
        </PolicyRow>
      </PolicyBox>
    )
  }

  return (
    <SafeArea>
      <ContainerTop paddingTop={50}>

        <TitleContainer>
          <Title>약관 및 정책</Title>
        </TitleContainer>

        <PolicyButton title="서비스 이용약관"/>
        <PolicyButton title="개인정보 보호정책"/>

      </ContainerTop>
    </SafeArea>
  );
}

const TitleContainer = styled.View`
  width: 100%;
  margin-bottom: 10px;
`;

const Title = styled.Text`
  margin-left: 20px;
  font-weight: 500;
  font-size: 20px;
`;

const PolicyBox = styled.View`
  width: 100%;
  padding: 26px 24px;
  border-bottom-width: 2px;
  border-bottom-color: #F7F8FA;
`;

const PolicyRow = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const PolicyTitle = styled.Text`
  font-weight: 600;
  font-size: 16px;
`;