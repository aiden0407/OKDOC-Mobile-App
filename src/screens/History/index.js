//React
import { useState } from 'react';
import styled from 'styled-components/native';

//Components
import { SafeArea, ContainerTop } from 'components/Common';
import { COLOR } from 'constants/design';

export default function HistoryScreen({ navigation }) {

  return (
    <SafeArea>
      <ContainerTop backgroundColor="#F7F8FA" paddingHorizontal={20} paddingTop={30}>
        <Title>예약 • 접수 내역</Title>
      </ContainerTop>
    </SafeArea>
  );
}

const Title = styled.Text`
  width: 100%;
  font-weight: 600;
  font-size: 20px;
`;