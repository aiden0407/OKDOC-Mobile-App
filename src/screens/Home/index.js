//React
import { useState } from 'react';
import styled from 'styled-components/native';
import { useIsFocused } from '@react-navigation/native';

//Components
import { StatusBar } from 'expo-status-bar';
import { StatusBarArea, SafeArea, ContainerTop } from 'components/Common';
import DefaultButton from 'components/Button/Default';
import { COLOR } from 'constants/design';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused && <StatusBar {...props} />;
}

export default function HomeScreen({ navigation }) {

  return (
    <>
      <StatusBarArea backgroundColor={COLOR.MAIN}>
        <FocusAwareStatusBar animated style="light" />
      </StatusBarArea>

      <SafeArea backgroundColor={COLOR.MAIN}>
        <ContainerTop>
          <SectionContainer>

          </SectionContainer>

          <BannerContainer>

          </BannerContainer>

          <ContentsContainer>
            <DefaultButton
              marginTop={20}
              text="2차 소견"
              action={() => navigation.navigate('NeedLoginSecondOpinion')}
            />
            <DefaultButton
              marginTop={10}
              text="의료 질문"
              action={() => navigation.navigate('NeedLoginMedicalQuestion')}
            />

          </ContentsContainer>
        </ContainerTop>
      </SafeArea>
    </>
  );
}

const SectionContainer = styled.View`
  width: 100%;
  height: 70px;
  //background-color: red;
`;

const BannerContainer = styled.View`
  width: 100%;
  height: 130px;
  //background-color: blue;
`;

const ContentsContainer = styled.View`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 15px 15px 0px 0px;
`;