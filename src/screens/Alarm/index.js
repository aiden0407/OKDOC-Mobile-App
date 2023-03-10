//React
import { useState } from 'react';
import styled from 'styled-components/native';

//Components
import { SafeArea, ContainerCenter } from 'components/Layout';
import { COLOR } from 'constants/design';

export default function AlarmScreen({ navigation }) {

  return (
    <SafeArea>
        <ContainerCenter>
          <Title>알림 스크린</Title>
        </ContainerCenter>
      </SafeArea>
  );
}

const Title = styled.Text`

`;