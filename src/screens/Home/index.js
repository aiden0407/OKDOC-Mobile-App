//React
import { useState } from 'react';
import styled from 'styled-components/native';
import { useIsFocused } from '@react-navigation/native';

//Components
import { StatusBar } from 'expo-status-bar';
import { StatusBarArea, SafeArea, ContainerTop } from 'components/Common';
import { COLOR } from 'constants/design';

//Assets
import bannerImage1 from 'assets/images/banner_image1.png';
import category1 from 'assets/icons/category1.png';
import category2 from 'assets/icons/category2.png';
import category3 from 'assets/icons/category3.png';
import category4 from 'assets/icons/category4.png';
import category5 from 'assets/icons/category5.png';
import category6 from 'assets/icons/category6.png';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused && <StatusBar {...props} />;
}

export default function HomeScreen({ navigation }) {

  function Icon({ category, source }) {
    return (
      <IconButton
        underlayColor={'#F0F0F0'}
        onPress={() => {
          navigation.navigate('TreatmentReservation', {
            screen: 'Category2',
            params: {
              category: category
            },
          });
        }}
      >
        <>
          <IconImage source={source} />
          <IconText>{category}</IconText>
        </>
      </IconButton>
    )
  }

  return (
    <>
      <StatusBarArea backgroundColor={COLOR.MAIN}>
        <FocusAwareStatusBar animated style="light" />
      </StatusBarArea>

      <SafeArea backgroundColor={COLOR.MAIN}>
        <ContainerTop>
          {/* <SectionContainer>

          </SectionContainer> */}

          <BannerContainer>
            <BannerImage source={bannerImage1} />
          </BannerContainer>

          <ContentsContainer>
            <Subtitle>해외에서도 한국 대학병원 전문의에게</Subtitle>
            <Title>비대면 진료</Title>

            <Center>
              <IconsWrapper>
                <Icon category='감기' source={category1} />
                <Icon category='소아과' source={category2} />
                <Icon category='고열+미열' source={category3} />
                <Icon category='산부인과' source={category4} />
                <Icon category='두통' source={category5} />
                <Icon category='안과' source={category6} />
                <Icon category='소아과' source={category2} />
                <Icon category='고열+미열' source={category3} />
                <Icon category='감기' source={category1} />
              </IconsWrapper>

              <FullCategoryButton
                underlayColor={'#F0F0F0'}
                onPress={() => navigation.navigate('TreatmentReservation')}
              >
                <FullCategoryText>증상/진료과 전체 보기 +</FullCategoryText>
              </FullCategoryButton>
            </Center>
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
  align-items: center;
  justify-content: center;
  //padding: 0 30px;
  //background-color: blue;
`;

const BannerImage = styled.Image`
  width: 300px;
  height: 110px;
`;

const ContentsContainer = styled.View`
  flex: 1;
  width: 100%;
  padding: 42px 24px 0px 24px;
  background-color: white;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

const Subtitle = styled.Text`
  font-weight: 400;
  font-size: 14px;
  color: #63656E;
`;

const Title = styled.Text`
  margin-top: 12px;
  font-weight: 600;
  font-size: 20px;
`;

const Center = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  //background-color: tomato;
`;

const IconsWrapper = styled.View`
  width: 300px;
  flex-flow: row wrap;
  gap: 30px;
`;

const IconButton = styled.TouchableHighlight`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  background-color: #F7F8FA;
  align-items: center;
`;

const IconImage = styled.Image`
  margin-top: 4px;
  width: 48px;
  height: 48px;
`;

const IconText = styled.Text`
  margin-top: 4px;
  font-weight: 500;
  font-size: 12px;
`;

const FullCategoryButton = styled.TouchableHighlight`
  margin-top: 30px;
  width: 300px;
  height: 55px;
  border-radius: 10px;
  background-color: #F7F8FA;
  align-items: center;
  justify-content: center;
`;

const FullCategoryText = styled.Text`
  font-weight: 500;
  font-size: 16px;
`;