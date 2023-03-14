//Styled Components
import styled from 'styled-components/native';

export const Image = styled.Image`
  margin-top: ${(props) => `${props.marginTop ?? 0}px`};
  width: ${(props) => `${props.width ?? 0}px`};
  height: ${(props) => `${props.height ?? 0}px`};
  ${(props) => props.circle && `border-radius: 100px`}
`;