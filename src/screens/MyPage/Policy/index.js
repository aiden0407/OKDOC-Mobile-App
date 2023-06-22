//React
import { useState, useEffect } from 'react';
import styled from 'styled-components/native';

//Components
import { POLICY } from 'constants/service';
import { Ionicons } from '@expo/vector-icons';
import { SafeArea, Container, Box } from 'components/Layout';
import { Text } from 'components/Text';

//Api
import { getRegisterTerms } from 'api/Login';

export default function PolicyScreen({ navigation }) {

  const [policyList, setPolicyList] = useState([]);

  useEffect(() => {
    initPolicy();
  }, []);

  const initPolicy = async function () {
    try {
      const response = await getRegisterTerms();
      setPolicyList(response.data.response);
    } catch (error) {
      Alert.alert('네트워크 오류로 인해 정보를 불러오지 못했습니다.');
    }
  }

  function handleDetailScreen(content) {
    navigation.navigate('PolicyDetail', {
      content: content,
    })
  }

  function PolicyButton({ title, content }) {
    return (
      <PolicyBox>
        <PolicyRow
          onPress={() => handleDetailScreen(content)}
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
        {policyList.map((item, index) => {
          if (item.level === 'required') {
            return (
              <PolicyButton
                key={`policy${index}`}
                title={POLICY[item.type]?.TITLE ?? item.type}
                content={item.html}
              />
            )
          }
        })}
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