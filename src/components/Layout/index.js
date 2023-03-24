//Styled Components
import styled from 'styled-components/native';

//Components
import { COLOR } from 'constants/design';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

export function KeyboardAvoiding({ children }) {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex:1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {children}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export const StatusBarArea = styled.SafeAreaView`
  flex: 0;
  background-color: ${(props) => props.backgroundColor ?? '#FFFFFF'};
`;

export const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.backgroundColor ?? '#FFFFFF'};
`;

export const Container = styled.View`
  flex: 1;
`;

export const ContainerTop = styled.View`
  flex: 1;
  align-items: center;
`;

export const ContainerCenter = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Center = styled.View`
  width: 100%;
  align-items: center;
`;

export const Row = styled.View`
  flex-direction: row;
  ${(props) => props.align && 'align-items: center'}
`;

export const ScrollView = styled.ScrollView`
`;

export const DividingLine = styled.View`
  width: 100%;
  height: ${(props) => `${props.thin ? 2 : 10}px`};
  background-color: ${COLOR.GRAY6};
`;

export const PaddingContainer = styled.View`
  width: 100%;
  padding: 0 20px;
`;

export const Box = styled.View`
  width: ${(props) => `${props.width ?? 0}px`};
  height: ${(props) => `${props.height ?? 0}px`};
`;