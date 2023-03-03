//React
import { useState } from 'react';
import styled from 'styled-components/native';

//Components
import { Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeArea, ContainerTop } from 'components/Common';
import { COLOR } from 'constants/design';

export default function HistoryScreen({ navigation }) {

  function LoginOnClick() {
    navigation.navigate('LoginStackNavigation');
  }

  function InquiryOnClick() {
    navigation.navigate('InquiryStackNavigation');
  }

  function PolicyOnClick() {
    navigation.navigate('PolicyStackNavigation');
  }

  function FaqOnClick() {
    Alert.alert('자주하는 질문 스크린');
  }

  function NotificationOnClick() {
    Alert.alert('공지사항 스크린');
  }

  return (
    <SafeArea>
      <ContainerTop paddingTop={30}>
        <LoginContainer>
          <LoginButton onPress={() => LoginOnClick()}>
            <LoginText>로그인을 해주세요</LoginText>
            <Ionicons name="chevron-forward" size={20} />
          </LoginButton>
        </LoginContainer>

        <ProfileContainer>

        </ProfileContainer>

        <DividingLine/>

        <CustomerSurviceContainer>
          <CustomerSurvice>고객센터</CustomerSurvice>
          <CustomerSurviceRow onPress={() => InquiryOnClick()}>
            <CustomerSurviceTitle>1:1 문의</CustomerSurviceTitle>
            <Ionicons name="chevron-forward" size={20} />
          </CustomerSurviceRow>
          <CustomerSurviceRow onPress={() => PolicyOnClick()}>
            <CustomerSurviceTitle>서비스 이용약관</CustomerSurviceTitle>
            <Ionicons name="chevron-forward" size={20} />
          </CustomerSurviceRow>
          <CustomerSurviceRow onPress={() => FaqOnClick()}>
            <CustomerSurviceTitle>자주하는 질문</CustomerSurviceTitle>
            <Ionicons name="chevron-forward" size={20} />
          </CustomerSurviceRow>
          <CustomerSurviceRow onPress={() => NotificationOnClick()}>
            <CustomerSurviceTitle>공지사항</CustomerSurviceTitle>
            <Ionicons name="chevron-forward" size={20} />
          </CustomerSurviceRow>
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

const LoginText = styled.Text`
  margin-right: 12px;
  font-weight: 500;
  font-size: 20px;
`;

const ProfileContainer = styled.View`
  width: 100%;
  height: 190px;
`;

const DividingLine = styled.View`
  width: 100%;
  height: 10px;
  background-color: #F7F8FA;
`;

const CustomerSurviceContainer = styled.View`
  width: 100%;
  height: 100%;
  padding: 40px 20px 0 20px;
`;

const CustomerSurvice = styled.Text`
  font-weight: 500;
  font-size: 14px;
  color: #7C7E88;
`;

const CustomerSurviceRow = styled.TouchableOpacity`
  margin-top: 26px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CustomerSurviceTitle = styled.Text`
  font-weight: 600;
  font-size: 16px;
`;