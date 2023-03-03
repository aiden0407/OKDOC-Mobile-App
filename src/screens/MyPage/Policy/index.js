//React
import styled from 'styled-components/native';

//Components
import { Ionicons } from '@expo/vector-icons';
import { SafeArea, ContainerTop } from 'components/Common';

export default function PolicyScreen({ navigation }) {

  function TermsOfServiceOnClick() {
    navigation.navigate('TermsOfService');
  }

  function PrivacyPolicyOnClick() {
    navigation.navigate('PrivacyPolicy');
  }

  return (
    <SafeArea>
      <ContainerTop paddingTop={50}>
        <TitleContainer>
          <Title>약관 및 정책</Title>
        </TitleContainer>

        <PolicyRow onPress={() => TermsOfServiceOnClick()}>
          <CustomerSurviceTitle>서비스 이용약관</CustomerSurviceTitle>
          <Ionicons name="chevron-forward" size={20} />
        </PolicyRow>

        <PolicyRow onPress={() => PrivacyPolicyOnClick()}>
          <CustomerSurviceTitle>개인정보 보호정책</CustomerSurviceTitle>
          <Ionicons name="chevron-forward" size={20} />
        </PolicyRow>

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

const PolicyRow = styled.TouchableOpacity`
  width: 100%;
  padding: 26px 24px;
  border-bottom-width: 2px;
  border-bottom-color: #F7F8FA;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CustomerSurviceTitle = styled.Text`
  font-weight: 600;
  font-size: 16px;
`;