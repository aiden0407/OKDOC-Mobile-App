//Styled Components
import styled from 'styled-components/native';
import { COLOR, TYPOGRAPHY } from 'constants/design'

export const BorderInput = styled.TextInput`
  width: 100%;
  height: 56px;
  padding: 16px;
  border-width: 1.5px;
  border-color: ${COLOR.GRAY3};
  border-radius: 5px;
  font-family: 'Pretendard-Regular';
  font-size: ${TYPOGRAPHY.T5.SIZE};
`;

export const LineInput = styled.TextInput`
  width: 100%;
  padding-bottom: 8px;
  border-bottom-width: 1.5px;
  border-color: ${COLOR.GRAY3};
  font-family: 'Pretendard-Regular';
  font-size: ${TYPOGRAPHY.T5.SIZE};
  color: ${(props) => props.editable===false ? COLOR.GRAY0 : '#000000' };
`;

export function BoxInputMedium({ ...props }) {
  return (
    <MediumTextInputBackground
      editable={props.editable}
      marginTop={props.marginTop}
    >
      <MediumTextInput {...props} marginTop={0}/>
    </MediumTextInputBackground>
  );
}

export const MediumTextInputBackground = styled.View`
  width: 100%;
  padding: 12px 6px 16px 16px;
  background-color: ${(props) => props.editable===false ? COLOR.GRAY4 : COLOR.GRAY6 };
  border-radius: 5px;
`;

export const MediumTextInput = styled.TextInput`
  width: 100%;
  height: 66px;
  padding: 0 6px 0 0;
  font-family: 'Pretendard-Regular';
  font-size: ${TYPOGRAPHY.T6.SIZE};
  color: ${(props) => props.editable===false ? '#333333' : '#000000' };
`;