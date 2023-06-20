//React
import { useEffect, useContext } from 'react';
import { ApiContext } from 'context/ApiContext';
import { AppContext } from 'context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import styled from 'styled-components/native';

//Components
import * as Device from 'expo-device';
import { COLOR } from 'constants/design';
import { SYMPTOM, DEPARTMENT } from 'constants/service';
import { StatusBar } from 'expo-status-bar';
import { StatusBarArea, SafeArea, ContainerTop, ContainerCenter } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';

//Api
import { getProducts } from 'api/Home';

//Assets
import bannerImage1 from 'assets/images/banner_image1.png';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused && <StatusBar {...props} />;
}

export default function HomeScreen({ navigation }) {

  const { state: { accountData }, dispatch: apiContextDispatch } = useContext(ApiContext);
  const { state: { registerStatus }, dispatch: appContextDispatch } = useContext(AppContext);

  useEffect(() => {
    autoLogin();
    initProducts();
  }, []);

  const autoLogin = async function () {
    try {
      console.log('실행');
      const jsonValue = await AsyncStorage.getItem('accountData');
      console.log(jsonValue);
      if (jsonValue !== null) {
        const accountData = JSON.parse(jsonValue);
        console.log(accountData);
        apiContextDispatch({
          type: 'LOGIN',
          loginToken: accountData.loginToken,
          email: accountData.email,
        });
      }
    } catch (error) {
      console.log('로그인하는 과정에서 문제가 발생했습니다.');
    }
  };

  const initProducts = async function () {
    try {
      const getProductsResponse = await getProducts();
      appContextDispatch({ type: 'TELEMEDICINE_RESERVATION_PRODUCT', product: getProductsResponse.data.response[0] });
    } catch (error) {
      Alert.alert('네트워크 오류로 인해 정보를 불러오지 못했습니다.');
    }
  }

  function handleNextStep(category, name) {
    let department;
    if(category==='symptom'){
      department = SYMPTOM[name]?.DEPARTMENT;
    } else {
      department = [name];
    }
    appContextDispatch({ type: 'TELEMEDICINE_RESERVATION_DEPARTMENT', department: department });
    appContextDispatch({ type: 'USE_SHORTCUT' });
    navigation.navigate('TelemedicineReservation', {screen: 'Reservation'});
  }

  function handleFullCategory() {
    appContextDispatch({ type: 'DELETE_SHORTCUT' });
    navigation.navigate('TelemedicineReservation', { screen: 'Category' });
  }

  function Icon({ category, name }) {
    return (
      <IconButton
        underlayColor={COLOR.GRAY5}
        onPress={() => handleNextStep(category, name)}
      >
        <>
          {category === 'symptom' && (<>
            <Image source={SYMPTOM[name]?.ICON} marginTop={6} width={48} height={48} />
            <Text T7 medium>{name}</Text>
          </>)}
          {category === 'medicalSubject' && (<>
            <Image source={DEPARTMENT[name]?.ICON} marginTop={6} width={48} height={48} />
            <Text T7 medium>{name}</Text>
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
                <Icon category="symptom" name="감기" />
                <Icon category="symptom" name="두통" />
                <Icon category="symptom" name="고열/미열" />
                <Icon category="symptom" name="복통" />
                <Icon category="symptom" name="소화불량" />
                <Icon category="symptom" name="몸살" />
                <Icon category="medicalSubject" name="내과" />
                <Icon category="medicalSubject" name="이비인후과" />
                <Icon category="medicalSubject" name="안과" />
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
  height: ${Device.osName==='Android' ? '180px' : '130px'};
  padding-top: ${Device.osName==='Android' ? '30px' : '0px'};;
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