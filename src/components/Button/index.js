//Styled Components
import styled from 'styled-components/native';
import { COLOR, TYPOGRAPHY, BUTTON } from 'constants/design'

function buttonSizeSelector(large, medium, tiny){
  if(large) return `width: ${BUTTON.LARGE.WIDTH}; height: ${BUTTON.LARGE.HEIGHT}; border-radius: 5px;`
  if(medium) return `width: ${BUTTON.MEDIUM.WIDTH}; height: ${BUTTON.MEDIUM.HEIGHT}; border-radius: 5px;`
  if(tiny) return `padding: ${BUTTON.TINY.PADDING}; border-radius: 50%;`
  return `width: ${BUTTON.FULL.WIDTH}; height: ${BUTTON.FULL.HEIGHT}; border-radius: 5px;`
}

function textSizeSelector(large, medium, tiny, double){
  if(large || medium || double) return `font-size: ${TYPOGRAPHY.T5.SIZE}; line-height: ${TYPOGRAPHY.T5.LEADING}; font-family: Pretendard-Medium;`
  if(tiny) return `font-size: ${TYPOGRAPHY.T5.SIZE}; line-height: ${TYPOGRAPHY.T5.LEADING}; font-family: Pretendard-Regular;`
  return `font-size: ${TYPOGRAPHY.T4.SIZE}; line-height: ${TYPOGRAPHY.T4.LEADING}; font-family: Pretendard-Medium;`
}

export function SolidButton({ text, action, marginTop, large, medium, tiny, double, disabled }) {
  return (
    <SolidButtonBackground
      disabled={disabled}
      large={large}
      medium={medium}
      tiny={tiny}
      double={double}
      marginTop={marginTop}
      underlayColor={!disabled && COLOR.SUB1}
      onPress={action}
    >
      <SolidButtonText disabled={disabled} large={large} medium={medium} tiny={tiny} double={double}>{text}</SolidButtonText>
    </SolidButtonBackground>
  );
}

const SolidButtonBackground = styled.TouchableHighlight`
  ${(props) => buttonSizeSelector(props.large, props.medium, props.tiny)}
  margin-top: ${(props) => `${props.marginTop ?? 0}px`};
  background-color: ${(props) => props.disabled ? COLOR.GRAY4 : COLOR.MAIN};
  align-items: center;
  justify-content: center;
`;

const SolidButtonText = styled.Text`
  ${(props) => textSizeSelector(props.large, props.medium, props.tiny, props.double)}
  color: ${(props) => props.disabled ? COLOR.GRAY2 : '#FFFFFF'};
`;

export function OutlineButton({ text, action, marginTop, large, medium, tiny, double, disabled }) {
  return (
    <OutlineButtonBackground
      disabled={disabled}
      large={large}
      medium={medium}
      tiny={tiny}
      double={double}
      marginTop={marginTop}
      underlayColor={!disabled && COLOR.SUB4}
      onPress={action}
    >
      <OutlineButtonText disabled={disabled} large={large} medium={medium} tiny={tiny} double={double}>{text}</OutlineButtonText>
    </OutlineButtonBackground>
  );
}

const OutlineButtonBackground = styled.TouchableHighlight`
  ${(props) => buttonSizeSelector(props.large, props.medium, props.tiny)}
  margin-top: ${(props) => `${props.marginTop ?? 0}px`};
  border-width: 1.5px;
  border-color: ${(props) => props.disabled ? COLOR.GRAY3 : COLOR.MAIN};
  background-color: #FFFFFF;
  align-items: center;
  justify-content: center;
`;

const OutlineButtonText = styled.Text`
  ${(props) => textSizeSelector(props.large, props.medium, props.tiny, props.double)}
  color: ${(props) => props.disabled ? COLOR.GRAY2 : COLOR.MAIN};
`;

export function SubColorButton({ text, action, marginTop, large, medium, tiny, double, disabled }) {
  return (
    <SubColorButtonBackground
      disabled={disabled}
      large={large}
      medium={medium}
      tiny={tiny}
      double={double}
      marginTop={marginTop}
      underlayColor={!disabled && COLOR.SUB2}
      onPress={action}
    >
      <SubColorButtonText disabled={disabled} large={large} medium={medium} tiny={tiny} double={double}>{text}</SubColorButtonText>
    </SubColorButtonBackground>
  );
}

const SubColorButtonBackground = styled.TouchableHighlight`
  ${(props) => buttonSizeSelector(props.large, props.medium, props.tiny)}
  margin-top: ${(props) => `${props.marginTop ?? 0}px`};
  background-color: ${(props) => props.disabled ? COLOR.GRAY6 : COLOR.SUB3};
  align-items: center;
  justify-content: center;
`;

const SubColorButtonText = styled.Text`
  ${(props) => textSizeSelector(props.large, props.medium, props.tiny, props.double)}
  color: ${(props) => props.disabled ? COLOR.GRAY2 : COLOR.MAIN};
`;