//React
import { useState } from 'react';
import { AppContext } from 'context/AppContext';
import styled from 'styled-components/native';

//Components
import { COLOR } from 'constants/design'
import { Ionicons } from '@expo/vector-icons';
import { SafeArea, Container, Row } from 'components/Layout';
import { Text } from 'components/Text';
import { SolidButton } from 'components/Button';

export default function RegisterPolicyScreen({ navigation }) {

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
  const [policy11Agreement, setPolicy11Agreement] = useState(false);

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
      setPolicy11Agreement(false);
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
      setPolicy11Agreement(true);
    }
  }

  function handleNextScreen() {
    navigation.navigate('PassportPhoneCertifiaction');
  }

  function PolicyButton({ essential, title, state, setState, navigate }) {
    return (
      <Row marginTop={15} align>
        <AgreeRow onPress={() => setState(!state)}>
          <Ionicons name="checkmark-sharp" size={22} color={state ? COLOR.MAIN : COLOR.GRAY3} marginLeft={3} marginRight={12} marginTop={1} />
          <Text T6 medium color={COLOR.GRAY0}>{essential ? '[필수] ' : '[선택] '}{title}</Text>
        </AgreeRow>
        <PolicyDetailIconWrapper onPress={() => { }}>
          <Ionicons name="chevron-forward" size={22} />
        </PolicyDetailIconWrapper>
      </Row>
    )
  }

  return (
    <SafeArea>
      <Container paddingHorizontal={20}>
        <Container>

          <Text T3 bold marginTop={30}>아래 약관을{'\n'}꼼꼼히 읽고 동의해 주세요</Text>

          <AgreeRow marginTop={30} onPress={() => handleAgreeAllPolicy()}>
            <Ionicons name="checkbox" size={30} color={allPolicyAgreement ? COLOR.MAIN : COLOR.GRAY3} marginRight={6} marginTop={1} />
            <Text T4 bold>모든 약관에 모두 확인, 동의합니다.</Text>
          </AgreeRow>
          <PolicyButton
            essential
            title="서비스 이용약관_내국인"
            state={policy1Agreement}
            setState={setPolicy1Agreement}
          />
          <PolicyButton
            essential
            title="Okdoc 이용약관"
            state={policy2Agreement}
            setState={setPolicy2Agreement}
          />
          <PolicyButton
            essential
            title="위치기반 서비스 이용약관"
            state={policy3Agreement}
            setState={setPolicy3Agreement}
          />
          <PolicyButton
            essential
            title="개인정보 수집 및 이용동의"
            state={policy4Agreement}
            setState={setPolicy4Agreement}
          />
          <PolicyButton
            essential
            title="민감정보 수집 및 이용동의"
            state={policy5Agreement}
            setState={setPolicy5Agreement}
          />
          <PolicyButton
            essential
            title="고유식별 정보 수집 및 이용동의"
            state={policy6Agreement}
            setState={setPolicy6Agreement}
          />
          <PolicyButton
            essential
            title="개인정보 제 3자 제공동의"
            state={policy7Agreement}
            setState={setPolicy7Agreement}
          />
          <PolicyButton
            essential
            title="민감정보 제 3자 제공동의"
            state={policy8Agreement}
            setState={setPolicy8Agreement}
          />
          <PolicyButton
            essential
            title="회원가입 유의사항"
            state={policy9Agreement}
            setState={setPolicy9Agreement}
          />
          <PolicyButton
            title="Okdoc 개인정보처리방침"
            state={policy10Agreement}
            setState={setPolicy10Agreement}
          />
          <PolicyButton
            title="광고성 메세지 수신 동의"
            state={policy11Agreement}
            setState={setPolicy11Agreement}
          />
        </Container>

        <SolidButton
          text="확인"
          marginBottom={20}
          disabled={!policy1Agreement || !policy2Agreement || !policy3Agreement || !policy4Agreement || !policy5Agreement || !policy6Agreement || !policy7Agreement || !policy8Agreement || !policy9Agreement}
          action={() => handleNextScreen()}
        />
      </Container>
    </SafeArea>
  );
}

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