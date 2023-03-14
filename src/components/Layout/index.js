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
  background-color: ${(props) => props.backgroundColor ?? 'transparent'};
`;

export const ContainerTop = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${(props) => props.backgroundColor ?? 'transparent'};
`;

export const ContainerCenter = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.backgroundColor ?? 'transparent'};
`;

export const Center = styled.View`
  width: 100%;
  align-items: center;
  margin-top: ${(props) => `${props.marginTop ?? 0}px`};
`;

export const ScrollView = styled.ScrollView`
  background-color: ${(props) => props.backgroundColor ?? 'transparent'};
`;

export const DividingLine = styled.View`
  width: 100%;
  height: ${(props) => `${props.thin ? 2 : 10}px`};
  background-color: ${COLOR.GRAY6};
  margin-top: ${(props) => `${props.marginTop ?? 0}px`};
`;