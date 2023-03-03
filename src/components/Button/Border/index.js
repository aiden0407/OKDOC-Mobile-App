//Styled Components
import styled from 'styled-components/native';

//Constants
import { COLOR } from 'constants/design'

export default function BorderButton({ text, action, marginTop }) {
  return (
    <Button
      activeOpacity={0.8}
      onPress={action}
      marginTop={marginTop}
    >
      <ButtonText>{text}</ButtonText>
    </Button>
  );
}

const Button = styled.TouchableOpacity`
  width: 100%;
  height: 56px;
  margin-top: ${(props) => `${props.marginTop ?? 0}px`};
  border-width: 1px;
  border-color: ${COLOR.MAIN};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${COLOR.MAIN};
`;