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

export default function SearchCountryCodeScreen({ navigation }) {

  function handleNextScreen() {
    //navigation.navigate('');
  }

  return (
    <SafeArea>
      <Container paddingHorizontal={20}>
        <Container>

          <Text T3 bold marginTop={30}>국가 코드 검색</Text>

          
        </Container>

        <SolidButton
          text="다음"
          marginBottom={20}
          disabled={false}
          action={() => handleNextScreen()}
        />
      </Container>
    </SafeArea>
  );
}