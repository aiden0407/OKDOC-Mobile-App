//React
import { useContext } from 'react';
import { AppContext } from 'context/AppContext';
import { useIsFocused } from '@react-navigation/native';
import styled from 'styled-components/native';

//Components
import { COLOR } from 'constants/design';
import { SYMPTOM, SUBJECT } from 'constants/service';
import { StatusBar } from 'expo-status-bar';
import { StatusBarArea, SafeArea, ContainerTop, ContainerCenter } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';

//Assets
import bannerImage1 from 'assets/images/banner_image1.png';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused && <StatusBar {...props} />;
}

export default function HomeScreen({ navigation }) {

  const { dispatch } = useContext(AppContext);

  function handleNextStep(category, item) {
    dispatch({ type: 'TELEMEDICINE_RESERVATION_CATEGORY', category: category, item: item });
    dispatch({ type: 'SHORTCUT' });
    navigation.navigate('TelemedicineReservation', {screen: 'Reservation'});
  }

  function handleFullCategory() {
    navigation.navigate('TelemedicineReservation', { screen: 'Category' });
  }

  function Icon({ category, item }) {
    return (
      <IconButton
        underlayColor={COLOR.GRAY5}
        onPress={() => handleNextStep(category, item)}
      >
        <>
          {category === 'symptom' && (<>
            <Image source={SYMPTOM[item]?.ICON} marginTop={6} width={48} height={48} />
            <Text T7 medium>{SYMPTOM[item]?.NAME}</Text>
          </>)}
          {category === 'medicalSubject' && (<>
            <Image source={SUBJECT[item]?.ICON} marginTop={6} width={48} height={48} />
            <Text T7 medium>{SUBJECT[item]?.NAME}</Text>
          </>)}
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

          <BannerContainer>
            <Image source={bannerImage1} width={300} height={110} />
          </BannerContainer>

          <ContentsContainer>
            <Text T6 color={COLOR.GRAY1}>해외에서도 한국 대학병원 전문의에게</Text>
            <Text T3 bold marginTop={6}>비대면 진료</Text>

            <ContainerCenter>
              <IconsWrapper>
                <Icon category="symptom" item="flu" />
                <Icon category="symptom" item="headache" />
                <Icon category="symptom" item="highFever" />
                <Icon category="symptom" item="stomachache" />
                <Icon category="symptom" item="indigestion" />
                <Icon category="symptom" item="ache" />
                <Icon category="medicalSubject" item="internalMedicine" />
                <Icon category="medicalSubject" item="otolaryngology" />
                <Icon category="medicalSubject" item="ophthalmology" />
              </IconsWrapper>

              <FullCategoryButton underlayColor={COLOR.GRAY5} onPress={() => handleFullCategory()}>
                <Text T5 medium>증상/진료과 전체 보기 +</Text>
              </FullCategoryButton>
            </ContainerCenter>
          </ContentsContainer>
        </ContainerTop>
      </SafeArea>
    </>
  );
}

const BannerContainer = styled.View`
  width: 100%;
  height: 130px;
  align-items: center;
  justify-content: center;
`;

const ContentsContainer = styled.View`
  flex: 1;
  width: 100%;
  padding: 42px 24px 0px 24px;
  background-color: #FFFFFF;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
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
  background-color: ${COLOR.GRAY6};
  align-items: center;
`;

const FullCategoryButton = styled.TouchableHighlight`
  margin-top: 30px;
  width: 300px;
  height: 56px;
  border-radius: 5px;
  background-color: ${COLOR.GRAY6};
  align-items: center;
  justify-content: center;
`;