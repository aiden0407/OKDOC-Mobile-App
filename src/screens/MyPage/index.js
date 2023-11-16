//React
import { useContext } from 'react';
import { ApiContext } from 'context/ApiContext';
import styled from 'styled-components/native';

//Components
import { COLOR } from 'constants/design'
import { Ionicons } from '@expo/vector-icons';
import { SafeArea, ContainerTop, DividingLine, Row } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';

//Assets
import accountPerson from 'assets/icons/mypage-account.png';
import profileCard from 'assets/icons/mypage-profile.png';

export default function MyPageScreen({ navigation }) {

  const { state: { accountData, profileData } } = useContext(ApiContext);
  const mainProfile = profileData?.[0]

  function handleLogin() {
    navigation.navigate('LoginStackNavigation');
  }

  function handleAccountInformation() {
    if (accountData.loginToken) {
      navigation.navigate('MyPageStackNavigation', {
        screen: 'AccountSetting',
      });
    } else {
      navigation.navigate('NeedLoginNavigation', {
        screen: 'NeedLogin',
        params: { headerTitle: '마이페이지' },
      });
    }
  }

  function handleProfileList() {
    if (accountData?.loginToken) {
      if (mainProfile?.id) {
        navigation.navigate('MyPageStackNavigation', { screen: 'ProfileDetail' });
      } else {
        navigation.navigate('MyPageStackNavigation', { screen: 'PassportInformation' });
      }
    } else {
      navigation.navigate('NeedLoginNavigation', {
        screen: 'NeedLogin',
        params: { headerTitle: '마이페이지' },
      });
    }
  }

  function handleMyPageScreen(navigate) {
    navigation.navigate('MyPageStackNavigation', { 
      screen: navigate,
      params: navigate==="Inquiry" && { headerTitle: '1:1 문의' },
    });
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
            accountData?.loginToken
              ? mainProfile?.id
                ? (<>
                  <LoginButton activeOpacity={1}>
                    <Text T3 bold>안녕하세요, <Text T3 bold color={COLOR.MAIN} marginRight={12}>{mainProfile.name}</Text>님</Text>
                  </LoginButton>
                </>)
                : (<Row>
                  <StyledLoginButton onPress={() => handleProfileList()}>
                    <Text T3 bold color={COLOR.MAIN}>프로필 등록</Text>
                  </StyledLoginButton>
                  <Text T3 bold>&nbsp;&nbsp;<Text T4 bold>후 서비스 이용이 가능합니다</Text> </Text>
                </Row>)
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
              {
                (accountData?.loginToken && !mainProfile?.id)
                  ? <Text T6 marginTop={14}>프로필 등록</Text>
                  : <Text T6 marginTop={14}>프로필 정보</Text>
              }
            </>
          </InformationButton>
        </InformationContainer>

        <DividingLine />

        <CustomerSurviceContainer>
          <Text T6 medium color={COLOR.GRAY1}>고객센터</Text>
          <ServicesButton title="1:1 문의" navigate="Inquiry" />
          <ServicesButton title="약관 및 정책" navigate="Policy" />
          {/* <ServicesButton title="자주하는 질문" navigate="FAQ"/>
          <ServicesButton title="공지사항" navigate="Notification"/> */}
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
  flex-direction: row;
  align-items: center;
`;

const StyledLoginButton = styled(LoginButton)`
  border-bottom-width: 1px;
  border-bottom-color: ${COLOR.MAIN};
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