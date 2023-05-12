//React
import { useState, useEffect, useContext, useRef } from 'react';
import { ApiContext } from 'context/ApiContext';
import styled from 'styled-components/native';

//Components
import { COLOR } from 'constants/design';
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons';
import { SafeArea, KeyboardAvoiding, Container, ScrollView, Row, Box } from 'components/Layout';
import { Text } from 'components/Text';
import { LineInput, BoxInput } from 'components/TextInput';
import { SolidButton } from 'components/Button';

export default function ProfileDetailScreen({ navigation, route }) {

  const { state: { profileData } } = useContext(ApiContext);
  const [informationCategory, setInformationCategory] = useState('personalInfo');
  const [isEditable, setIsEditable] = useState(false);
  const [height, setHeight] = useState(profileData[0]?.height?.toString());
  const [weight, setWeight] = useState(profileData[0]?.weight?.toString());
  const [drinker, setDrinker] = useState(profileData[0]?.drinker);
  const [smoker, setSmoker] = useState(profileData[0]?.smoker);
  const [medicalHistory, setMedicalHistory] = useState(profileData[0]?.medicalHistory);
  const [medicalHistoryFamily, setMedicalHistoryFamily] = useState(profileData[0]?.medicalHistoryFamily);
  const [medication, setMedication] = useState(profileData[0]?.medication);
  const [allergyReaction, setAllergyReaction] = useState(profileData[0]?.allergyReaction);
  const [etcConsideration, setEtcConsideration] = useState(profileData[0]?.etcConsideration);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (informationCategory === 'healthInfo') {
          if (isEditable) {
            return (
              <EditButton onPress={() => setIsEditable(false)}>
                <Text T6 bold color={COLOR.MAIN}>완료</Text>
              </EditButton>
            )
          } else {
            return (
              <EditButton onPress={() => setIsEditable(true)}>
                <Text T6 bold color={COLOR.MAIN}>수정</Text>
              </EditButton>
            )
          }
        }
      }
    });
  }, [navigation, isEditable, informationCategory]);

  const scrollRef = useRef();
  function handleTextInputFocus(value){
    scrollRef.current?.scrollTo({
      y: value,
      animated: true,
    });
  }

  function TinySolidButton({ isEditable, isSelected, action, text }) {
    return (
      <TinySolidButtonBackground isEditable={isEditable} isSelected={isSelected} onPress={action}>
        <Text T6 medium={!isSelected} bold={isSelected} color={isSelected ? '#FFFFFF' : COLOR.GRAY2}>{text}</Text>
      </TinySolidButtonBackground>
    )
  }

  return (
    <SafeArea>
      <KeyboardAvoiding>
        <>
          <LinearGradient
            colors={['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', 'rgba(255,255,255,0)']}
            style={{
              width: '100%',
              padding: 20,
              paddingBottom: 50,
              position: 'absolute',
              zIndex: 1,
              top: 0
            }}
          >
            <ButtonsArea>
              {informationCategory === 'personalInfo' && (
                <>
                  <SellectedButton>
                    <Text T5 bold color={COLOR.MAIN}>개인정보</Text>
                  </SellectedButton>
                  <UnsellectedButtonRight
                    underlayColor='transparent'
                    onPress={() => setInformationCategory('healthInfo')}
                  >
                    <Text T5 color={COLOR.GRAY1}>건강정보</Text>
                  </UnsellectedButtonRight>
                </>
              )}
              {informationCategory === 'healthInfo' && (
                <>
                  <UnsellectedButtonLeft
                    underlayColor='transparent'
                    onPress={() => setInformationCategory('personalInfo')}
                  >
                    <Text T5 color={COLOR.GRAY1}>개인정보</Text>
                  </UnsellectedButtonLeft>
                  <SellectedButton>
                    <Text T5 bold color={COLOR.MAIN}>건강정보</Text>
                  </SellectedButton>
                </>
              )}
            </ButtonsArea>
          </LinearGradient>

          {informationCategory === 'personalInfo' && (
            <Container paddingHorizontal={20} paddingTop={80}>
              <Text T6 bold marginTop={30}>이름</Text>
              <LineInput
                marginTop={12}
                value={profileData[0]?.name}
                editable={false}
              />
              <Text T6 bold marginTop={30}>관계</Text>
              <LineInput
                marginTop={12}
                value={profileData[0]?.relationship}
                editable={false}
              />
              <Text T6 bold marginTop={30}>생년월일</Text>
              <LineInput
                marginTop={12}
                value={profileData[0]?.birth}
                editable={false}
              />
              <Text T6 bold marginTop={30}>성별</Text>
              <Row marginTop={12} gap={12}>
                <SolidButton medium text="남성" disabled={profileData[0]?.gender !== 'male'} />
                <SolidButton medium text="여성" disabled={profileData[0]?.gender !== 'female'} />
              </Row>
            </Container>
          )}

          {informationCategory === 'healthInfo' && (
            <ScrollView 
              showsVerticalScrollIndicator={false} 
              paddingHorizontal={20} 
              paddingTop={80}
              ref={scrollRef}
            >
              <Text T6 bold marginTop={30}>키 & 몸무게</Text>
              <Row marginTop={12} align>
                <LineInput
                  value={height}
                  onChangeText={setHeight}
                  onBlur={() => 
                    height?.replace(/[^0-9.]/g, '')
                      ? setHeight(parseFloat(height.replace(/[^0-9.]/g, '')).toFixed(1)) 
                      : setHeight('')
                  }
                  editable={isEditable}
                  style={{ width: 100 }}
                  placeholder="몸무게"
                  inputMode="decimal"
                />
                <Text T5 medium marginLeft={6}>cm</Text>
                <LineInput
                  marginLeft={30}
                  value={weight}
                  onChangeText={setWeight}
                  onBlur={() => 
                    weight?.replace(/[^0-9.]/g, '')
                      ? setWeight(parseFloat(weight.replace(/[^0-9.]/g, '')).toFixed(1)) 
                      : setWeight('')
                  }
                  editable={isEditable}
                  style={{ width: 100 }}
                  placeholder="키"
                  inputMode="decimal"
                />
                <Text T5 medium marginLeft={6}>kg</Text>
              </Row>
              <Row marginTop={30} align>
                <Text T6 bold>음주 여부</Text>
                <Ionicons name="alert-circle-outline" size={14} color={COLOR.GRAY2} marginLeft={12} marginRight={2} />
                <Text T8 color={COLOR.GRAY0} marginBottom={0.5}>주 2회 미만 '가끔'/ 주 2회 이상 '자주'</Text>
              </Row>
              <Row marginTop={12} gap={12}>
                <TinySolidButton
                  isEditable={isEditable}
                  isSelected={drinker === 'frequently'}
                  action={() => isEditable && setDrinker('frequently')}
                  text='자주'
                />
                <TinySolidButton
                  isEditable={isEditable}
                  isSelected={drinker === 'sometimes'}
                  action={() => isEditable && setDrinker('sometimes')}
                  text='가끔'
                />
                <TinySolidButton
                  isEditable={isEditable}
                  isSelected={drinker === 'none'}
                  action={() => isEditable && setDrinker('none')}
                  text='안함'
                />
              </Row>
              <Text T6 bold marginTop={30}>흡연 여부</Text>
              <Row marginTop={12} gap={12}>
                <TinySolidButton
                  isEditable={isEditable}
                  isSelected={smoker}
                  action={() => isEditable && setSmoker(true)}
                  text='흡연'
                />
                <TinySolidButton
                  isEditable={isEditable}
                  isSelected={!smoker}
                  action={() => isEditable && setSmoker(false)}
                  text='비흡연'
                />
              </Row>
              <Text T6 bold marginTop={30}>본인 병력</Text>
              <BoxInput
                medium
                marginTop={12}
                editable={isEditable}
                placeholder="현재 앓고 있는 병이나 과거에 앓았던 질병이 있으면 병명을 입력해 주세요."
                value={medicalHistory}
                onChangeText={setMedicalHistory}
                onFocus={()=>handleTextInputFocus(200)}
              />
              <Text T6 bold marginTop={30}>가족 병력</Text>
              <BoxInput
                medium
                marginTop={12}
                editable={isEditable}
                placeholder="부모, 형제 등 직계 가족이 앓고 있거나 과거에 앓았던 질병이 있으면 병명을 입력해 주세요."
                value={medicalHistoryFamily}
                onChangeText={setMedicalHistoryFamily}
                onFocus={()=>handleTextInputFocus(360)}
              />
              <Text T6 bold marginTop={30}>현재 복용중인 약</Text>
              <BoxInput
                medium
                marginTop={12}
                editable={isEditable}
                placeholder="현재 복용중인 약을 입력해 주세요."
                value={medication}
                onChangeText={setMedication}
                onFocus={()=>handleTextInputFocus(520)}
              />
              <Row marginTop={30} align>
                <Text T6 bold>알러지 유무</Text>
              </Row>
              <BoxInput
                medium
                marginTop={12}
                editable={isEditable}
                placeholder="본인에게 알러지를 유발하는 음식이나 환경이 있다면 알러지 반응과 함께 입력해 주세요."
                value={allergyReaction}
                onChangeText={setAllergyReaction}
                onFocus={() => handleTextInputFocus(680)}
              />
              <Text T6 bold marginTop={30}>기타 사항</Text>
              <BoxInput
                medium
                marginTop={12}
                editable={isEditable}
                placeholder="의사 선생님이 알아야 하는 기타 사항이 있다면 입력해 주세요."
                value={etcConsideration}
                onChangeText={setEtcConsideration}
                onFocus={()=>handleTextInputFocus(840)}
              />
              <Box height={200} />
            </ScrollView>
          )}
        </>
      </KeyboardAvoiding>
    </SafeArea>
  );
}

const EditButton = styled.Pressable`
`;

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

const TinySolidButtonBackground = styled.Pressable`
  width: 82px;
  height: 36px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.isSelected
      ? COLOR.MAIN
      : props.isEditable
        ? COLOR.GRAY6
        : COLOR.GRAY4
  };
  border-radius: 25px;
`;