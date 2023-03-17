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
  color: ${(props) => props.editable ? '#000000' : COLOR.GRAY0 };
`;