//React
import { useState, useEffect, useContext } from 'react';
import { AppContext } from 'context/AppContext';
import { ApiContext } from 'context/ApiContext';
import styled from 'styled-components/native';

//Components
import { COLOR } from 'constants/design';
import { SafeArea, Container, Row } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { SolidButton } from 'components/Button';

//Assets
import profileDefault from 'assets/icons/profile-default.png';
import profileSelected from 'assets/icons/profile-selected.png';

export default function ProfileListScreen({ navigation, route }) {

  useEffect(() => {
    navigation.setOptions({
      title: route.params?.headerTitle ?? '프로필 목록'
    });
  }, [navigation, route]);
  const { state: { bottomTabMenu }, dispatch } = useContext(AppContext);
  const { state: { userData } } = useContext(ApiContext);

  const [profileIndex, setProfileIndex] = useState(null);

  function Profile({ name, relationship, isSelected, action }) {
    return (
      <ProfileButton
        isSelected={isSelected} 
        onPress={action}
        underlayColor={bottomTabMenu==='MYPAGE' && COLOR.GRAY5}
      >
        <>
          <Image source={isSelected ? profileSelected : profileDefault} width={40} height={40} />
          <Text T5 bold marginTop={8} color={isSelected ? '#FFFFFF' : COLOR.GRAY1}>{name}</Text>
          <Text T7 medium color={isSelected ? '#FFFFFF' : COLOR.GRAY2}>{relationship}</Text>
        </>
      </ProfileButton>
    )
  }

  function handleSelectProfile(profileIndex) {
    if (profileIndex === 0) {
      dispatch({ type: 'TELEMEDICINE_RESERVATION_PROFILE', profileId: userData.name });
    } else {
      dispatch({ type: 'TELEMEDICINE_RESERVATION_PROFILE', profileId: 'else' });
    }
    navigation.navigate('ProfileDetail', { headerTitle: '프로필 정보' });
  }

  function handleProfileDetail() {
    navigation.navigate('ProfileDetail', { headerTitle: '프로필 상세보기' });
  }


  return (
    <SafeArea>
      <Container paddingHorizontal={20}>
        <Text T3 bold marginTop={30}>{route.params?.bodyTitle ?? '등록된 프로필 정보'}</Text>
        <Row marginTop={42} gap={10}>
          <Profile
            name={userData.name}
            relationship='본인'
            isSelected={profileIndex === 0}
            action={() => {
              bottomTabMenu==='HOME' && setProfileIndex(0)
              bottomTabMenu==='MYPAGE' && handleProfileDetail()
            }}
          />
          {
            bottomTabMenu==='HOME' && (<>
              <Profile
                name='기타'
                relationship='가족 /  지인'
                isSelected={profileIndex === 1}
                action={() => setProfileIndex(1)}
              />
            </>)
          }
        </Row>
      </Container>

      {
        bottomTabMenu === 'HOME' && (<>
          <BottomButtonContainer>
            <SolidButton
              disabled={profileIndex === null}
              text="다음"
              action={() => handleSelectProfile(profileIndex)}
            />
          </BottomButtonContainer>
        </>)
      }
    </SafeArea>
  );
}

const BottomButtonContainer = styled.View`
  width: 100%;
  padding: 20px;
`;

const ProfileButton = styled.TouchableHighlight`
  width: 100px;
  height: 116px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.isSelected ? COLOR.MAIN : COLOR.GRAY6};
`;