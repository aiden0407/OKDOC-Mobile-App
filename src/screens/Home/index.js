//React
import { useEffect, useContext, useRef, useCallback } from 'react';
import { ApiContext } from 'context/ApiContext';
import { AppContext } from 'context/AppContext';
import { useIsFocused } from '@react-navigation/native';
import styled from 'styled-components/native';

//Components
import * as Device from 'expo-device';
import { COLOR } from 'constants/design';
import { SYMPTOM, DEPARTMENT } from 'constants/service';
import { Alert, Linking, Animated, FlatList, useWindowDimensions, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StatusBarArea, SafeArea, ContainerTop, ContainerCenter } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { ExpandingDot } from 'react-native-animated-pagination-dots';

//Api
import { getProducts } from 'api/Home';

//Assets
import bannerImage1 from 'assets/images/banner_image1.png';
import bannerImage2 from 'assets/images/banner_image2.png';
import bannerImage3 from 'assets/images/banner_image3.png';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused && <StatusBar {...props} />;
}

const INTRO_DATA = [
  {
    key: '1',
    image: bannerImage1,
    link: 'https://insunginfo.notion.site/OK-DOC-ea3bd10f6dbf429389dfd924b29f989a?pvs=4'
  },
  {
    key: '2',
    image: bannerImage2,
    link: 'https://www.notion.so/insunginfo/OK-DOC-ea3bd10f6dbf429389dfd924b29f989a?pvs=4#a2e7573a0a494cb59dd2ed4e0a051f51'
  },
  {
    key: '3',
    image: bannerImage3,
    link: 'https://www.notion.so/insunginfo/OK-DOC-ea3bd10f6dbf429389dfd924b29f989a?pvs=4#10ef9357761648758dc19354c54a8558'
  }
];

export default function HomeScreen({ navigation }) {

  const { dispatch: apiContextDispatch } = useContext(ApiContext);
  const { dispatch: appContextDispatch } = useContext(AppContext);

  useEffect(() => {
    initProducts();
  }, []);

  const initProducts = async function () {
    try {
      const getProductsResponse = await getProducts();
      apiContextDispatch({ type: 'PRODUCT_LIST_UPDATE', productList: getProductsResponse.data.response });
      // appContextDispatch({ type: 'TELEMEDICINE_RESERVATION_PRODUCT', product: getProductsResponse.data.response[0] });
      appContextDispatch({ type: 'TELEMEDICINE_RESERVATION_PRODUCT', product: getProductsResponse.data.response[3] });
    } catch (error) {
      Alert.alert('네트워크 오류로 인해 정보를 불러오지 못했습니다.');
    }
  }

  function handleNextStep(category, name) {
    let department;
    if (category === 'symptom') {
      department = SYMPTOM[name]?.DEPARTMENT;
    } else {
      department = [name];
    }
    appContextDispatch({ type: 'TELEMEDICINE_RESERVATION_DEPARTMENT', department: department });
    appContextDispatch({ type: 'USE_SHORTCUT' });
    navigation.navigate('TelemedicineReservation', { screen: 'Reservation' });
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
            <Image source={SYMPTOM[name]?.ICON} marginTop={6} width={66} height={66} />
            <Text T6>{name}</Text>
          </>)}
          {category === 'medicalSubject' && (<>
            <Image source={DEPARTMENT[name]?.ICON} marginTop={6} width={66} height={66} />
            <Text T6>{name}</Text>
          </>)}
        </>
      </IconButton>
    )
  }

  const { width } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  const renderItem = useCallback(
    ({item}) => {
      return (
        <BannerTouchableOpacity
          key={`banner_${item.key}`}
          activeOpacity={0.8}
          onPress={() => Linking.openURL(item.link)}
        >
          <Image source={item.image} width={300} height={100} marginLeft={10}/>
        </BannerTouchableOpacity>
      );
    },
    [width],
  );
  const keyExtractor = useCallback((item) => item.key, []);

  return (
    <>
      <StatusBarArea backgroundColor={COLOR.MAIN}>
        <FocusAwareStatusBar animated style="light" />
      </StatusBarArea>

      <SafeArea backgroundColor={COLOR.MAIN}>
        <ContainerTop>

          <BannerContainer>
            <FlatList
              data={INTRO_DATA}
              keyExtractor={keyExtractor}
              showsHorizontalScrollIndicator={false}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                {
                  useNativeDriver: false,
                },
              )}
              style={styles.flatList}
              pagingEnabled
              horizontal
              decelerationRate={'normal'}
              renderItem={renderItem}
            />
            <ExpandingDot
              data={INTRO_DATA}
              expandingDotWidth={17}
              scrollX={scrollX}
              inActiveDotColor={COLOR.GRAY2}
              activeDotColor={'#FFFFFF'}
              dotStyle={styles.dotStyles}
              containerStyle={styles.constainerStyles}
            />
          </BannerContainer>

          <ContentsContainer>
            <Text T6 color={COLOR.GRAY1}>해외에서도 한국 대학병원 전문의에게</Text>
            <Text T3 bold marginTop={6}>비대면 의료 상담</Text>

            <ContainerCenter>
              <IconsWrapper>
                <Icon category="medicalSubject" name="가정의학과" />
                <Icon category="medicalSubject" name="소아청소년과" />
                <Icon category="medicalSubject" name="산부인과" />
                <Icon category="medicalSubject" name="이비인후과" />
                <Icon category="medicalSubject" name="외과" />
                <Icon category="medicalSubject" name="흉부외과" />
                <Icon category="medicalSubject" name="신장내과" />
                <Icon category="medicalSubject" name="소화기내과" />
                <Icon category="medicalSubject" name="정신건강의학과" />
              </IconsWrapper>

              <FullCategoryButton underlayColor={COLOR.GRAY5} onPress={() => handleFullCategory()}>
                <Text T5 medium>증상/상담과목 전체 보기 +</Text>
              </FullCategoryButton>
            </ContainerCenter>
          </ContentsContainer>
        </ContainerTop>
      </SafeArea>
    </>
  );
}

const styles = StyleSheet.create({
  flatList: {
    width: 360,
    height: 100,
    marginBottom: 20,
  },
  constainerStyles: {
    bottom: 20,
    left: 46
  },
  dotStyles: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 4,
  },
});

const BannerContainer = styled.View`
  width: 100%;
  height: ${Device.osName === 'Android' ? '180px' : '130px'};
  padding-top: ${Device.osName === 'Android' ? '35px' : '0px'};
  align-items: center;
  justify-content: center;
`;

const BannerTouchableOpacity = styled.TouchableOpacity`
  width: 360px;
  align-items: center;
`;

const ContentsContainer = styled.View`
  flex: 1;
  width: 100%;
  padding: 32px 24px 0px 24px;
  background-color: #FFFFFF;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

const IconsWrapper = styled.View`
  width: 324px;
  flex-flow: row wrap;
  gap: 12px;
`;

const IconButton = styled.TouchableHighlight`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: ${COLOR.GRAY6};
  align-items: center;
`;

const FullCategoryButton = styled.TouchableHighlight`
  margin-top: 20px;
  width: 324px;
  height: 56px;
  border-radius: 5px;
  background-color: ${COLOR.GRAY6};
  align-items: center;
  justify-content: center;
`;