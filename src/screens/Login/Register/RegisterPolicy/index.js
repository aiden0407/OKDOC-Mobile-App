//React
import { useContext, useState, useEffect } from 'react';
import { AppContext } from 'context/AppContext';
import styled from 'styled-components/native';

//Components
import { COLOR } from 'constants/design'
import { POLICY } from 'constants/service';
import { Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeArea, Container, Row } from 'components/Layout';
import { Text } from 'components/Text';
import { SolidButton } from 'components/Button';

//Api
import { getRegisterTerms } from 'api/Login';

export default function RegisterPolicyScreen({ navigation }) {

  const { dispatch } = useContext(AppContext);
  const [policyList, setPolicyList] = useState([]);
  const [allPolicyAgreement, setAllPolicyAgreement] = useState(false);
  const [policy1Agreement, setPolicy1Agreement] = useState(false);
  const [policy2Agreement, setPolicy2Agreement] = useState(false);
  const [policy3Agreement, setPolicy3Agreement] = useState(false);
  const [policy4Agreement, setPolicy4Agreement] = useState(false);
  const [policy5Agreement, setPolicy5Agreement] = useState(false);
  const [policy6Agreement, setPolicy6Agreement] = useState(false);
  const [policy7Agreement, setPolicy7Agreement] = useState(false);
  const [policy8Agreement, setPolicy8Agreement] = useState(false);
  const [policy9Agreement, setPolicy9Agreement] = useState(false);
  const [policy10Agreement, setPolicy10Agreement] = useState(false);
  const [meetRequirement, setMeetRequirement] = useState(false);
  const [checkedPolicies, setCheckedPolicies] = useState([]);

  const useStateValues = [policy1Agreement, policy2Agreement, policy3Agreement, policy4Agreement, policy5Agreement, policy6Agreement, policy7Agreement, policy8Agreement, policy9Agreement, policy10Agreement];
  const setUseStateValues = [setPolicy1Agreement, setPolicy2Agreement, setPolicy3Agreement, setPolicy4Agreement, setPolicy5Agreement, setPolicy6Agreement, setPolicy7Agreement, setPolicy8Agreement, setPolicy9Agreement, setPolicy10Agreement];

  useEffect(() => {
    initPolicy();
  }, []);

  const initPolicy = async function () {
    try {
      const getRegisterTermsResponse = await getRegisterTerms();
      setPolicyList(getRegisterTermsResponse.data.response);
    } catch (error) {
      Alert.alert('네트워크 오류로 인해 정보를 불러오지 못했습니다.');
    }
  }

  function handleAgreeAllPolicy() {
    setAllPolicyAgreement(!allPolicyAgreement);
    if (allPolicyAgreement) {
      setPolicy1Agreement(false);
      setPolicy2Agreement(false);
      setPolicy3Agreement(false);
      setPolicy4Agreement(false);
      setPolicy5Agreement(false);
      setPolicy6Agreement(false);
      setPolicy7Agreement(false);
      setPolicy8Agreement(false);
      setPolicy9Agreement(false);
      setPolicy10Agreement(false);
      setMeetRequirement(false);
    } else {
      setPolicy1Agreement(true);
      setPolicy2Agreement(true);
      setPolicy3Agreement(true);
      setPolicy4Agreement(true);
      setPolicy5Agreement(true);
      setPolicy6Agreement(true);
      setPolicy7Agreement(true);
      setPolicy8Agreement(true);
      setPolicy9Agreement(true);
      setPolicy10Agreement(true);
      setMeetRequirement(true);
      const checkedList = [];
      for (let ii = 0; ii < policyList.length; ii++) {
        checkedList.push(ii+1);
      }
      setCheckedPolicies(checkedList);
    }
  }

  function requiredAgreementCheck(index) {
    const checkedList = [];
    for (let ii = 0; ii < policyList.length; ii++) {
      if (ii === index) {
        if (!useStateValues[ii]) {
          checkedList.push(ii+1);
        }
      } else {
        if (useStateValues[ii]) {
          checkedList.push(ii+1);
        }
      }
    }
    setCheckedPolicies(checkedList);

    for (let ii = 0; ii < policyList.length; ii++) {
      if (policyList[ii].level === 'required') {
        if (ii === index) {
          if (useStateValues[ii]) {
            setMeetRequirement(false);
            return;
          }
        } else {
          if (!useStateValues[ii]) {
            setMeetRequirement(false);
            return;
          }
        }
      }
    }
    setMeetRequirement(true);
  }

  function handleDetailScreen(content) {
    navigation.navigate('RegisterPolicyDetail', {
      content: content,
    })
  }

  function handleNextScreen() {
    dispatch({
      type: 'REGISTER_POLICY',
      policy: checkedPolicies,
    });
    navigation.navigate('EmailPassword');
  }

  function PolicyButton({ essential, title, content, index }) {
    return (
      <Row marginTop={15} align>
        <AgreeRow onPress={() => {
          setUseStateValues[index](!useStateValues[index]);
          requiredAgreementCheck(index);
        }}>
          <Ionicons name="checkmark-sharp" size={22} color={useStateValues[index] ? COLOR.MAIN : COLOR.GRAY3} marginLeft={3} marginRight={12} marginTop={1} />
          <Text T6 medium color={COLOR.GRAY0}>{essential ? '[필수] ' : '[선택] '}{title}</Text>
        </AgreeRow>
        <PolicyDetailIconWrapper onPress={() => { handleDetailScreen(content) }}>
          <Ionicons name="chevron-forward" size={22} />
        </PolicyDetailIconWrapper>
      </Row>
    );
  }

  return (
    <SafeArea>
      {
        !policyList.length && (
          <LoadingBackground>
            <ActivityIndicator size="large" color="#5500CC" />
          </LoadingBackground>
        )
      }

      <Container paddingHorizontal={20}>
        <Container>

          <Text T3 bold marginTop={30}>아래 약관을{'\n'}꼼꼼히 읽고 동의해 주세요</Text>

          <AgreeRow marginTop={30} onPress={() => handleAgreeAllPolicy()}>
            <Ionicons name="checkbox" size={30} color={allPolicyAgreement ? COLOR.MAIN : COLOR.GRAY3} marginRight={6} marginTop={1} />
            <Text T4 bold>모든 약관에 모두 확인, 동의합니다.</Text>
          </AgreeRow>
          {policyList.map((item, index) =>
            <PolicyButton
              key={`policy${index}`}
              essential={item.level === 'required'}
              title={POLICY[item.type]?.TITLE ?? item.type}
              content={item.html}
              index={index}
            />
          )}
        </Container>

        <SolidButton
          text="확인"
          marginBottom={20}
          disabled={!meetRequirement}
          action={() => handleNextScreen()}
        />
      </Container>
    </SafeArea>
  );
}

const LoadingBackground = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AgreeRow = styled.Pressable`
  flex-direction: row;
  align-items: center;
`;

const PolicyDetailIconWrapper = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  bottom: -3px;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
`;