//React
import { useState } from 'react';
import styled from 'styled-components/native';

//Components
import { COLOR } from 'constants/design';
import { SafeArea, ContainerTop } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';

//Assets symptoms
import fluIcon from 'assets/icons/symptoms/flu.png';
import headacheIcon from 'assets/icons/symptoms/headache.png';
import highFeverIcon from 'assets/icons/symptoms/high-fever.png';
import stomachacheIcon from 'assets/icons/symptoms/stomachache.png';
import indigestionIcon from 'assets/icons/symptoms/indigestion.png';
import acheIcon from 'assets/icons/symptoms/ache.png';
import chillIcon from 'assets/icons/symptoms/chill.png';
import constipationIcon from 'assets/icons/symptoms/constipation.png';
import diarrheaIcon from 'assets/icons/symptoms/diarrhea.png';
import heartburnIcon from 'assets/icons/symptoms/heartburn.png';
import muscularPainIcon from 'assets/icons/symptoms/muscular-pain.png';
import arthralgiaIcon from 'assets/icons/symptoms/arthralgia.png';
//Assets medical-subjects
import internalMedicineIcon from 'assets/icons/medical-subjects/internal-medicine.png';
import otolaryngologyIcon from 'assets/icons/medical-subjects/otolaryngology.png';
import surgeryIcon from 'assets/icons/medical-subjects/surgery.png';
import dentistryIcon from 'assets/icons/medical-subjects/dentistry.png';
import pediatryIcon from 'assets/icons/medical-subjects/pediatry.png';
import gynecologyIcon from 'assets/icons/medical-subjects/gynecology.png';
import dermatologyIcon from 'assets/icons/medical-subjects/dermatology.png';
import ophthalmologyIcon from 'assets/icons/medical-subjects/ophthalmology.png';
import emergencyMedicineIcon from 'assets/icons/medical-subjects/emergency-medicine.png';
import familyMedicineIcon from 'assets/icons/medical-subjects/family-medicine.png';
import urologyIcon from 'assets/icons/medical-subjects/urology.png';
import psychiatryIcon from 'assets/icons/medical-subjects/psychiatry.png';
import orthopedicsIcon from 'assets/icons/medical-subjects/orthopedics.png';
import rehabilitationMedicineIcon from 'assets/icons/medical-subjects/rehabilitation-medicine.png';
import rheumatismIcon from 'assets/icons/medical-subjects/rheumatism.png';
import cardiologyIcon from 'assets/icons/medical-subjects/cardiology.png';
import laboratoryMedicineIcon from 'assets/icons/medical-subjects/laboratory-medicine.png';
import infectionMedicineIcon from 'assets/icons/medical-subjects/infection-medicine.png';
import endocrineMedicineIcon from 'assets/icons/medical-subjects/endocrine-medicine.png';
import anesthesiologyIcon from 'assets/icons/medical-subjects/anesthesiology.png';
import radiationOncologyIcon from 'assets/icons/medical-subjects/radiation-oncology.png';
import thoracicSurgeryIcon from 'assets/icons/medical-subjects/thoracic-surgery.png';
import pathologyIcon from 'assets/icons/medical-subjects/pathology.png';
import nuclearMedicineIcon from 'assets/icons/medical-subjects/nuclear-medicine.png';
import plasticSurgeryIcon from 'assets/icons/medical-subjects/plastic-surgery.png';
import hematoOncologyIcon from 'assets/icons/medical-subjects/hemato-oncology.png';
import pulmonologyIcon from 'assets/icons/medical-subjects/pulmonology.png';
import neurologyIcon from 'assets/icons/medical-subjects/neurology.png';
import neurosurgeryIcon from 'assets/icons/medical-subjects/neurosurgery.png';
import nephrologyIcon from 'assets/icons/medical-subjects/nephrology.png';
import radiologyIcon from 'assets/icons/medical-subjects/radiology.png';

export default function CategoryScreen({ navigation }) {

  const [category, setCategory] = useState('symptoms');

  function Icon({ source, category, title }) {
    return (
      <IconButton
        underlayColor={COLOR.GRAY5}
        onPress={() => {
          navigation.navigate('Booking', { category: category, name: title });
        }}
      >
        <>
          <Image source={source} marginTop={8} width={60} height={60} />
          <Text T6>{title}</Text>
        </>
      </IconButton>
    )
  }

  return (
    <SafeArea>
      <ContainerTop paddingHorizontal={20} paddingVertical={36}>

        {category === 'symptoms' && (
          <ButtonsArea>
            <SellectedButton>
              <Text T5 medium color={COLOR.MAIN}>증상</Text>
            </SellectedButton>
            <UnsellectedButtonRight
              underlayColor='transparent'
              onPress={() => setCategory('subjects')}
            >
              <Text T5 color={COLOR.GRAY1}>진료과</Text>
            </UnsellectedButtonRight>
          </ButtonsArea>
        )}

        {category === 'subjects' && (
          <ButtonsArea>
            <UnsellectedButtonLeft
              underlayColor='transparent'
              onPress={() => setCategory('symptoms')}
            >
              <Text T5 color={COLOR.GRAY1}>증상</Text>
            </UnsellectedButtonLeft>
            <SellectedButton>
              <Text T5 medium color={COLOR.MAIN}>진료과</Text>
            </SellectedButton>
          </ButtonsArea>
        )}

        {category === 'symptoms' && (
          <IconsContainer showsVerticalScrollIndicator={false}>
            <IconsWrapper>
              <Icon source={fluIcon} title="감기" category="flu" />
              <Icon source={headacheIcon} title="두통" category="headache" />
              <Icon source={highFeverIcon} title="고열/미열" category="highFever" />
              <Icon source={stomachacheIcon} title="복통" category="stomachache" />
              <Icon source={indigestionIcon} title="소화불량" category="indigestion" />
              <Icon source={acheIcon} title="몸살" category="ache" />
              <Icon source={chillIcon} title="오한" category="chill" />
              <Icon source={constipationIcon} title="변비" category="constipation" />
              <Icon source={diarrheaIcon} title="설사" category="diarrhea" />
              <Icon source={heartburnIcon} title="속쓰림" category="heartburn" />
              <Icon source={muscularPainIcon} title="근육통" category="muscularPain" />
              <Icon source={arthralgiaIcon} title="관절통" category="arthralgia" />
            </IconsWrapper>
          </IconsContainer>
        )}

        {category === 'subjects' && (
          <IconsContainer showsVerticalScrollIndicator={false}>
            <IconsWrapper>
              <Icon source={internalMedicineIcon} title="내과" category="internalMedicine" />
              <Icon source={otolaryngologyIcon} title="이비인후과" category="otolaryngology" />
              <Icon source={surgeryIcon} title="외과" category="surgery" />
              <Icon source={dentistryIcon} title="치과" category="dentistry" />
              <Icon source={pediatryIcon} title="소아청소년과" category="pediatry" />
              <Icon source={gynecologyIcon} title="산부인과" category="gynecology" />
              <Icon source={dermatologyIcon} title="피부과" category="dermatology" />
              <Icon source={ophthalmologyIcon} title="안과" category="ophthalmology" />
              <Icon source={emergencyMedicineIcon} title="응급의학과" category="emergencyMedicine" />
              <Icon source={familyMedicineIcon} title="가정의학과" category="familyMedicine" />
              <Icon source={urologyIcon} title="비뇨기과" category="urology" />
              <Icon source={psychiatryIcon} title="정신건강의학과" category="psychiatry" />
              <Icon source={orthopedicsIcon} title="정형외과" category="orthopedics" />
              <Icon source={rehabilitationMedicineIcon} title="재활의학과" category="rehabilitationMedicine" />
              <Icon source={rheumatismIcon} title="류마티스과" category="rheumatism" />
              <Icon source={cardiologyIcon} title="심장내과" category="cardiology" />
              <Icon source={laboratoryMedicineIcon} title="진단검사의학과" category="laboratory" />
              <Icon source={infectionMedicineIcon} title="감염내과" category="infection" />
              <Icon source={endocrineMedicineIcon} title="내분비과" category="endocrineMedicine" />
              <Icon source={anesthesiologyIcon} title="마취통증의학과" category="anesthesiology" />
              <Icon source={radiationOncologyIcon} title="방사선종양학과" category="radiationOncology" />
              <Icon source={thoracicSurgeryIcon} title="흉부외과" category="thoracicSurgery" />
              <Icon source={pathologyIcon} title="병리과" category="pathology" />
              <Icon source={nuclearMedicineIcon} title="핵의학과" category="nuclearMedicine" />
              <Icon source={plasticSurgeryIcon} title="성형외과" category="plasticSurgery" />
              <Icon source={hematoOncologyIcon} title="혈액종양내과" category="hematoOncology" />
              <Icon source={pulmonologyIcon} title="호흡기내과" category="pulmonology" />
              <Icon source={neurologyIcon} title="신경과" category="neurology" />
              <Icon source={neurosurgeryIcon} title="신경외과" category="neurosurgery" />
              <Icon source={nephrologyIcon} title="신장내과" category="nephrology" />
              <Icon source={radiologyIcon} title="영상의학과" category="radiology" />
            </IconsWrapper>
          </IconsContainer>
        )}

      </ContainerTop>
    </SafeArea>
  );
}

const ButtonsArea = styled.View`
  width: 320px;
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

const IconsContainer = styled.ScrollView`
  margin-top: 36px;
  width: 320px;
  flex: 1;
`;

const IconsWrapper = styled.View`
  width: 100%;
  flex-flow: row wrap;
  gap: 10px;
`;

const IconButton = styled.TouchableHighlight`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: ${COLOR.GRAY6};
  align-items: center;
`;