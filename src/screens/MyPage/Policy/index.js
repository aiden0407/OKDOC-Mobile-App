//React
import styled from 'styled-components/native';

//Components
import { Ionicons } from '@expo/vector-icons';
import { SafeArea, Container, Box } from 'components/Layout';
import { Text } from 'components/Text';

export default function PolicyScreen({ navigation }) {

  function PolicyButton({ title }) {
    return (
      <PolicyBox>
        <PolicyRow
          onPress={() => navigation.navigate('PolicyDetail', {
            headerTitle: title,
          })}
        >
          <Text T5 medium>{title}</Text>
          <Ionicons name="chevron-forward" size={20} />
        </PolicyRow>
      </PolicyBox>
    )
  }

  return (
    <SafeArea>
      <Container>

        <Text T3 bold marginTop={30} marginLeft={20}>약관 및 정책</Text>
        <Box height={18}/>
        <PolicyButton title="서비스 이용약관"/>
        <PolicyButton title="개인정보 보호정책"/>

      </Container>
    </SafeArea>
  );
}

const PolicyBox = styled.View`
  width: 100%;
  padding: 24px;
  border-bottom-width: 2px;
  border-bottom-color: #F7F8FA;
`;

const PolicyRow = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;