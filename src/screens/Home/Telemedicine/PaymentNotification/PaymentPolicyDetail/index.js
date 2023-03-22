//React
import { useState, useContext } from 'react';
import { AppContext } from 'context/AppContext';
import styled from 'styled-components/native';

//Components
import { COLOR } from 'constants/design';
import { Ionicons } from '@expo/vector-icons';
import { SafeArea, ContainerCenter } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { BoxInput } from 'components/TextInput';
import { SolidButton } from 'components/Button';

export default function PaymentPolicyDetailScreen({ navigation }) {

  return (
    <SafeArea>
      <ContainerCenter>
        <Text T5 bold>결제 약관</Text>
      </ContainerCenter>
    </SafeArea>
  );
}