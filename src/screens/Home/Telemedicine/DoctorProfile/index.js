//React
import { useState, useContext } from 'react';
import { AppContext } from 'context/AppContext';
import { ApiContext } from 'context/ApiContext';
import styled from 'styled-components/native';

//Components
import * as Device from 'expo-device';
import { COLOR } from 'constants/design';
import { LinearGradient } from 'expo-linear-gradient'
import { SafeArea, ScrollView, Row, DividingLine, Box } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { SolidButton } from 'components/Button';

//Assets
import starEmpty from 'assets/icons/star-empty.png';
import starHalf from 'assets/icons/star-half.png';
import starFull from 'assets/icons/star-full.png';

export default function DoctorProfileScreen({ navigation }) {

  const { state: { telemedicineReservationStatus }, dispatch } = useContext(AppContext);
  const { state: { accountData, profileData } } = useContext(ApiContext);
  const [informationCategory, setInformationCategory] = useState('profile');
  const doctorInfo = telemedicineReservationStatus.doctorInfo

  const title = doctorInfo?.selfIntrodectionTitle;
  const text = doctorInfo?.selfIntrodectionDetale;

  function handleApplyReservation() {
    if (accountData.loginToken) {
      // navigation.navigate('ProfileList');
      dispatch({ type: 'TELEMEDICINE_RESERVATION_PROFILE', profileType: 'my', profileInfo: profileData[0] });
      navigation.navigate('ProfileDetail');
    } else {
      navigation.navigate('NeedLoginNavigation', {
        screen: 'NeedLogin',
        params: { headerTitle: '비대면 진료실' },
      });
    }
  }

  // function Review() {
  //   return (<>
  //     <Row marginTop={24} align>
  //       <ServiceSection>
  //         <Text T8 medium color={COLOR.MAIN}>진료</Text>
  //       </ServiceSection>
  //       <Row marginLeft={6} gap={2}>
  //         <Image source={starFull} width={12} height={12} />
  //         <Image source={starFull} width={12} height={12} />
  //         <Image source={starFull} width={12} height={12} />
  //         <Image source={starFull} width={12} height={12} />
  //         <Image source={starFull} width={12} height={12} />
  //       </Row>
  //     </Row>
  //     <Text T6 marginTop={12}>친절하시고 책임감 있으신거 같아요. {'\n'}만족할 때까지상담해주셨어요.</Text>
  //     <Text T7 medium marginTop={12} color={COLOR.GRAY1}>전**님 | 23.04.07</Text>
  //   </>)
  // }

  return (
    <SafeArea>
      {/* <LinearGradient
        colors={['#FFFFFF', '#FFFFFF', '#FFFFFF', 'rgba(255,255,255,0)']}
        style={{
          width: '100%',
          padding: 20,
          paddingBottom: 60,
          position: 'absolute',
          zIndex: 1,
          top: 0
        }}
      >
        <ButtonsArea>
          {informationCategory === 'profile' && (
            <>
              <SellectedButton>
                <Text T5 bold color={COLOR.MAIN}>의사정보</Text>
              </SellectedButton>
              <UnsellectedButtonRight
                underlayColor='transparent'
                onPress={() => setInformationCategory('review')}
              >
                <Text T5 color={COLOR.GRAY1}>진료후기</Text>
              </UnsellectedButtonRight>
            </>
          )}
          {informationCategory === 'review' && (
            <>
              <UnsellectedButtonLeft
                underlayColor='transparent'
                onPress={() => setInformationCategory('profile')}
              >
                <Text T5 color={COLOR.GRAY1}>의사정보</Text>
              </UnsellectedButtonLeft>
              <SellectedButton>
                <Text T5 bold color={COLOR.MAIN}>진료후기</Text>
              </SellectedButton>
            </>
          )}
        </ButtonsArea>
      </LinearGradient> */}

      {/* <ScrollView showsVerticalScrollIndicator={false} paddingHorizontal={20} paddingTop={80}> */}
      <ScrollView showsVerticalScrollIndicator={false} paddingHorizontal={20} paddingTop={0} overScrollMode='never'>
        {informationCategory === 'profile' && (
          <>
            <Row align marginTop={36}>
              <Image source={{ uri: doctorInfo.image }} width={66} height={66} circle />
              <DoctorColumn>
                <Text T4 bold>{doctorInfo.name} 의사</Text>
                <Text T7 medium color={COLOR.GRAY1}>{doctorInfo.hospital} / {doctorInfo.subject}</Text>
                <Row marginTop={12}>
                  {doctorInfo?.strength?.map((item, index) =>
                    <Text key={`field${index}`} T7 color={COLOR.GRAY2}>#{item} </Text>
                  )}
                </Row>
              </DoctorColumn>
            </Row>

            <DividingLine thin marginTop={24} />

            <Text T4 bold marginTop={24} marginBottom={3}>학력 및 이력</Text>
            {doctorInfo?.field?.map((item, index) =>
              <Row align marginTop={9} key={`date${index}`}>
                <BulletPoint />
                <Text T6 color={COLOR.GRAY1}>{item}</Text>
              </Row>
            )}

            <DividingLine thin marginTop={24} />

            {
              title
                ? <Text T4 bold marginTop={36}>{title}</Text>
                : <Text T4 bold marginTop={36}>{doctorInfo.hospital} {doctorInfo.subject} {doctorInfo.name}입니다</Text>
            }

            {
              text
                ? <Text T6 marginTop={18} marginBottom={60}>{text}</Text>
                : <Text T6 marginTop={18} marginBottom={60}>바른 진료, 진심을 담은 진료 약속 드립니다.</Text>
            }
          </>
        )}
        {/* {informationCategory === 'review' && (
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

            <DividingLine thin marginTop={42} />

            <Text T5 medium color={COLOR.GRAY1} marginTop={24}>리뷰 34개</Text>

            <Review />
            <Review />
            <Review />
            <Review />
            <Review />
          </>
        )} */}
        <Box height={100} />
      </ScrollView>

      <LinearGradient
        colors={['rgba(255,255,255,0)', '#FFFFFF', '#FFFFFF', '#FFFFFF']}
        style={{
          width: '100%',
          marginBottom: Device.osName==='Android' ? 0 : 34,
          padding: 20,
          paddingTop: 70,
          position: 'absolute',
          bottom: 0
        }}
      >
        <SolidButton
          text="진료 예약 신청"
          action={() => handleApplyReservation()}
        />
      </LinearGradient>
    </SafeArea>
  );
}

const ButtonsArea = styled.View`
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
  border-radius: 50px;
  background-color: ${COLOR.GRAY3};
`;

const ReviewContainer = styled.View`
  margin-top: 30px;
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