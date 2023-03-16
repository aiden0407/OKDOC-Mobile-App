//Components
import styled from 'styled-components/native';
import { COLOR } from 'constants/design'
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { SolidButton } from 'components/Button';

//Assets
import profileCard from 'assets/images/profile_card.png';

export default function NeedLoginBox({ marginTop, action }) {
  return (
    <NeedLoginContainer marginTop={marginTop}>
      <Image source={profileCard} width={94} height={55} />
      <Text T3 bold marginTop={24}>로그인이 필요해요</Text>
      <Text T6 medium center color={COLOR.GRAY1} marginTop={12}>해외에서도 비대면으로{'\n'}한국 대학병원 전문의를 만나보세요</Text>
      <SolidButton
        large
        marginTop={24}
        text="로그인 / 회원가입"
        action={action}
      />
    </NeedLoginContainer>
  );
}

const NeedLoginContainer = styled.View`
  width: 100%;
  padding: 40px 20px;
  border-radius: 10px;
  background-color: #FFFFFF;
  align-items: center;
`;