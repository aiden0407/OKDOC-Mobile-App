//React
import { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from 'context/AppContext';
import styled from 'styled-components/native';

//Components
import { SafeArea, ContainerCenter } from 'components/Layout';
import { Text } from 'components/Text';

export default function TelemedicineOpinion({ navigation, route }) {

  return (
    <SafeArea>
      <ContainerCenter>
        <Text T5 bold>전자 소견서 pdf</Text>
      </ContainerCenter>
    </SafeArea>
  );
}