//React
import { useState } from 'react';
import styled from 'styled-components/native';

//Components
import { COLOR } from 'constants/design';
import { SYMPTOM, SUBJECT } from 'constants/service';
import { SafeArea, ContainerTop } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';

export default function CategoryScreen({ navigation }) {

  const [categoryGroup, setCategoryGroup] = useState('symptoms');
  const symptomKeys = Object.keys(SYMPTOM);
  const medicalSubjectKeys = Object.keys(SUBJECT);

  function Icon({ category, item }) {
    return (
      <IconButton
        underlayColor={COLOR.GRAY5}
        onPress={() => navigation.navigate('Reservation', { category: category, item: item })}
      >
        <>
          {category === 'symptom' && (<>
            <Image source={SYMPTOM[item]?.ICON} marginTop={8} width={60} height={60} />
            <Text T6>{SYMPTOM[item]?.NAME}</Text>
          </>)}
          {category === 'medicalSubject' && (<>
            <Image source={SUBJECT[item]?.ICON} marginTop={8} width={60} height={60} />
            <Text T6>{SUBJECT[item]?.NAME}</Text>
          </>)}
        </>
      </IconButton>
    )
  }

  return (
    <SafeArea>
      <ContainerTop paddingHorizontal={20} paddingVertical={36}>

        {categoryGroup === 'symptoms' && (
          <ButtonsArea>
            <SellectedButton>
              <Text T5 bold color={COLOR.MAIN}>증상</Text>
            </SellectedButton>
            <UnsellectedButtonRight
              underlayColor='transparent'
              onPress={() => setCategoryGroup('subjects')}
            >
              <Text T5 color={COLOR.GRAY1}>진료과</Text>
            </UnsellectedButtonRight>
          </ButtonsArea>
        )}

        {categoryGroup === 'subjects' && (
          <ButtonsArea>
            <UnsellectedButtonLeft
              underlayColor='transparent'
              onPress={() => setCategoryGroup('symptoms')}
            >
              <Text T5 color={COLOR.GRAY1}>증상</Text>
            </UnsellectedButtonLeft>
            <SellectedButton>
              <Text T5 bold color={COLOR.MAIN}>진료과</Text>
            </SellectedButton>
          </ButtonsArea>
        )}

        <IconsContainer showsVerticalScrollIndicator={false}>
          <IconsWrapper>
            {categoryGroup === 'symptoms' && (
              symptomKeys.map((item) => <Icon key={item} category="symptom" item={item} />)
            )}
            {categoryGroup === 'subjects' && (
              medicalSubjectKeys.map((item) => <Icon key={item} category="medicalSubject" item={item} />)
            )}
          </IconsWrapper>
        </IconsContainer>

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