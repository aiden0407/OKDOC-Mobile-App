//React
import { useState, useContext } from 'react';
import { ApiContext } from 'context/ApiContext';
import styled from 'styled-components/native';

//Components
import { COLOR } from 'constants/design';
import { SafeArea, ScrollView, Row, DividingLine, Box } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { SolidButton } from 'components/Button';

//Assets
import starEmpty from 'assets/icons/star-empty.png';
import starHalf from 'assets/icons/star-half.png';
import starFull from 'assets/icons/star-full.png';

export default function DoctorProfileScreen({ navigation, route }) {

  const { state: { userData } } = useContext(ApiContext);
  const [informationGroup, setInformationGroup] = useState('profile');
  const doctorInfo = route.params.doctorInfo

  const title = `연세튼튼치과/내과 건강검진센터 병원장\n${doctorInfo.name}입니다.`
  const text = `안녕하세요, 인천 검단신도시 아라동에 위치한 연세튼튼치과 원장 ${doctorInfo.name}입니다.

<우리가족 건강주치의>라는 슬로건 하에 바른 진료, 진심을 담은 진료 약속 드립니다.

평일 진료시간이 오후 6시간 마감으로 오후 6시부터 ~  오후 6시 30분간 비대면 진료 합니다.

직장 시간때문에 진료 시간내 오지못하는 경우, 거리가 멀어서 직접 못오시는 경우 진료 신청 해주시면 감사하겠습니다.`;

  function handleApplyReservation() {
    if(userData.loginStatus){
      
    } else {
      navigation.navigate('NeedLoginNavigation', {
        screen: 'NeedLogin',
        params: { title: '비대면 진료실' },
      });
    }
  }

  function Review() {
    return (<>
      <Row marginTop={24} align>
        <ServiceSection>
          <Text T8 medium color={COLOR.MAIN}>진료</Text>
        </ServiceSection>
        <Row marginLeft={6} gap={2}>
          <Image source={starFull} width={12} height={12} />
          <Image source={starFull} width={12} height={12} />
          <Image source={starFull} width={12} height={12} />
          <Image source={starFull} width={12} height={12} />
          <Image source={starFull} width={12} height={12} />
        </Row>
      </Row>
      <Text T6 marginTop={12}>친절하시고 책임감 있으신거 같아요. {'\n'}만족할 때까지상담해주셨어요.</Text>
      <Text T7 medium marginTop={12} color={COLOR.GRAY1}>전**님 | 23.04.07</Text>
    </>)
  }

  return (
    <SafeArea>
      <ScrollView showsVerticalScrollIndicator={false} paddingHorizontal={20}>

        <ButtonsArea>
          {informationGroup === 'profile' && (
            <>
              <SellectedButton>
                <Text T5 bold color={COLOR.MAIN}>의사정보</Text>
              </SellectedButton>
              <UnsellectedButtonRight
                underlayColor='transparent'
                onPress={() => setInformationGroup('review')}
              >
                <Text T5 color={COLOR.GRAY1}>진료후기</Text>
              </UnsellectedButtonRight>
            </>
          )}
          {informationGroup === 'review' && (
            <>
              <UnsellectedButtonLeft
                underlayColor='transparent'
                onPress={() => setInformationGroup('profile')}
              >
                <Text T5 color={COLOR.GRAY1}>의사정보</Text>
              </UnsellectedButtonLeft>
              <SellectedButton>
                <Text T5 bold color={COLOR.MAIN}>진료후기</Text>
              </SellectedButton>
            </>
          )}
        </ButtonsArea>

        {informationGroup === 'profile' && (
          <>
            <Row align marginTop={36}>
              <Image source={{ uri: doctorInfo.image }} width={66} height={66} circle />
              <DoctorColumn>
                <Text T4 bold>{doctorInfo.name} 의사</Text>
                <Text T7 medium color={COLOR.GRAY1}>{doctorInfo.hospital} / {doctorInfo.subject}</Text>
                <Row marginTop={12}>
                  {doctorInfo.medicalField.map((item, index) =>
                    <Text key={`field${index}`} T7 color={COLOR.GRAY2}>#{item} </Text>
                  )}
                </Row>
              </DoctorColumn>
            </Row>

            <DividingLine thin marginTop={24} />

            <Text T4 bold marginTop={24} marginBottom={3}>학력 및 이력</Text>
            <Row align marginTop={9}>
              <BulletPoint />
              <Text T6 color={COLOR.GRAY1}>연세대학교 의과대학 졸업</Text>
            </Row>
            <Row align marginTop={9}>
              <BulletPoint />
              <Text T6 color={COLOR.GRAY1}>제너럴닥터 원장</Text>
            </Row>
            <Row align marginTop={9}>
              <BulletPoint />
              <Text T6 color={COLOR.GRAY1}>연세장튼튼의원 설립, 대표원장</Text>
            </Row>
            <Row align marginTop={9}>
              <BulletPoint />
              <Text T6 color={COLOR.GRAY1}>안산의료재단 인선요양병원, 병원장</Text>
            </Row>

            <DividingLine thin marginTop={24} />

            <Text T4 bold marginTop={36}>{title}</Text>
            <Text T6 marginTop={18} marginBottom={60}>{text}</Text>
          </>
        )}
        {informationGroup === 'review' && (
          <>
            <ReviewContainer>
              <Text T1 bold>4.5</Text>
              <Row marginTop={6} gap={6}>
                <Image source={starFull} width={24} height={24} />
                <Image source={starFull} width={24} height={24} />
                <Image source={starFull} width={24} height={24} />
                <Image source={starFull} width={24} height={24} />
                <Image source={starHalf} width={24} height={24} />
              </Row>
            </ReviewContainer>

            <DividingLine thin marginTop={24} />

            <Text T5 medium color={COLOR.GRAY1} marginTop={24}>리뷰 34개</Text>

            <Review />
            <Review />
            <Review />
            <Review />
            <Review />
            <Box height={60}/>
          </>
        )}
      </ScrollView>

      <BottomButtonContainer>
        <SolidButton
          text="진료 예약 신청"
          action={() => handleApplyReservation()}
        />
      </BottomButtonContainer>
    </SafeArea>
  );
}

const ButtonsArea = styled.View`
  margin-top: 24px;
  width: 100%;
  height: 48px;
  background: ${COLOR.GRAY6};
  border-radius: 40px;
  flex-direction: row;
  align-items: center;
`;

const SellectedButton = styled.View`
  width: 55%;
  height: 48px;
  background: ${COLOR.SUB2};
  border-radius: 40px;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const UnsellectedButtonRight = styled.TouchableHighlight`
  margin-left: -10%;
  width: 55%;
  height: 48px;
  border-radius: 40px;
  align-items: center;
  justify-content: center;
`;

const UnsellectedButtonLeft = styled.TouchableHighlight`
  margin-right: -10%;
  width: 55%;
  height: 48px;
  border-radius: 40px;
  align-items: center;
  justify-content: center;
`;

const DoctorColumn = styled.View`
  margin-left: 24px;
  flex: 1;
`;

const BulletPoint = styled.View`
  margin-right: 14px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${COLOR.GRAY3};
`;

const BottomButtonContainer = styled.View`
  width: 100%;
  padding: 20px;
`;

const ReviewContainer = styled.View`
  margin-top: 42px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const ServiceSection = styled.View`
  width: 58px;
  height: 26px;
  background-color: ${COLOR.SUB4};
  align-items: center;
  justify-content: center;
  border-radius: 25px;
`;