//React
import { useContext } from 'react';
import { ApiContext } from 'context/ApiContext';
import styled from 'styled-components/native';

//Components
import { COLOR } from 'constants/design'
import { Ionicons } from '@expo/vector-icons';
import { SafeArea, ContainerTop, DividingLine } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';

//Assets
import accountPerson from 'assets/icons/mypage-account.png';
import profileCard from 'assets/icons/mypage-profile.png';

export default function MyPageScreen({ navigation }) {

  const { state: { userData } } = useContext(ApiContext);

  function handleLogin() {
    navigation.navigate('LoginStackNavigation');
  }

  function handleAccountInformation() {
    if(userData.loginStatus){
      navigation.navigate('MyPageStackNavigation', { screen: 'AccountSettings' });
    } else {
      navigation.navigate('NeedLoginNavigation', {
        screen: 'NeedLogin',
        params: { headerTitle: '마이페이지' },
      });
    }
  }

  function handleProfileList() {
    if(userData.loginStatus){
      navigation.navigate('MyPageStackNavigation', { screen: 'MyPageProfileDetail' });
    } else {
      navigation.navigate('NeedLoginNavigation', {
        screen: 'NeedLogin',
        params: { headerTitle: '마이페이지' },
      });
    }
  }

  function handleMyPageScreen(navigate) {
    navigation.navigate('MyPageStackNavigation', { screen: navigate });
  }

  function ServicesButton({ title, navigate }) {
    return (
      <CustomerSurviceRow onPress={() => handleMyPageScreen(navigate)}>
        <Text T5 medium>{title}</Text>
        <Ionicons name="chevron-forward" size={20} />
      </CustomerSurviceRow>
    )
  }

  return (
    <SafeArea>
      <ContainerTop paddingTop={30}>
        <LoginContainer>
          {
            userData?.loginStatus
              ? (<>
                <LoginButton activeOpacity={1}>
                  <Text T3 bold>안녕하세요, <Text T3 bold color={COLOR.MAIN} marginRight={12}>{userData.name}</Text>님</Text>
                </LoginButton>
              </>)
              : (<>
                <LoginButton onPress={() => handleLogin()}>
                  <Text T3 bold marginRight={12}>로그인을 해주세요</Text>
                  <Ionicons name="chevron-forward" size={20} />
                </LoginButton>
              </>)
          }
        </LoginContainer>

        <InformationContainer>
          <InformationButton underlayColor={COLOR.GRAY5} onPress={() => handleAccountInformation()}>
            <>
              <Image source={accountPerson} width={35} height={40.25} marginTop={13} />
              <Text T6 marginTop={11}>계정 설정</Text>
            </>
          </InformationButton>

          <InformationButton underlayColor={COLOR.GRAY5} onPress={() => handleProfileList()}>
            <>
              <Image source={profileCard} width={54} height={32} marginTop={18} />
              <Text T6 marginTop={14}>프로필 정보</Text>
            </>
          </InformationButton>
        </InformationContainer>

        <DividingLine />

        <CustomerSurviceContainer>
          <Text T6 medium color={COLOR.GRAY1}>고객센터</Text>
          <ServicesButton title="1:1 문의" navigate="Inquiry"/>
          <ServicesButton title="서비스 이용약관" navigate="Policy"/>
          <ServicesButton title="자주하는 질문" navigate="FAQ"/>
          <ServicesButton title="공지사항" navigate="Notification"/>
        </CustomerSurviceContainer>
      </ContainerTop>
    </SafeArea>
  );
}

const LoginContainer = styled.View`
  width: 100%;
`;

const LoginButton = styled.TouchableOpacity`
  margin-left: 20px;
  width: 180px;
  flex-direction: row;
  align-items: center;
`;

const InformationContainer = styled.View`
  width: 100%;
  height: 190px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 60px;
`;

const InformationButton = styled.TouchableHighlight`
  width: 100px;
  height: 94px;
  border-radius: 10px;
  background-color: ${COLOR.GRAY6};
  align-items: center;
`;

const CustomerSurviceContainer = styled.View`
  width: 100%;
  height: 100%;
  padding: 30px 20px 0 20px;
`;

const CustomerSurviceRow = styled.TouchableOpacity`
  margin-top: 26px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;