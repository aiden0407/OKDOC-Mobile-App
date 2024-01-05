//React
import { useEffect, useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProvider } from 'context/AppContext';
import { ApiProvider } from 'context/ApiContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Default Settings
import Constants from 'expo-constants';
import { COLOR } from 'constants/design'
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Alert, Linking, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
TextInput.defaultProps.placeholderTextColor = COLOR.GRAY2;
TouchableOpacity.defaultProps = TouchableOpacity.defaultProps || {};
TouchableOpacity.defaultProps.activeOpacity = 0.6;

//Notifications
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

//navigation
import BottomTapNavigation from 'navigation/BottomTapNavigation';
import TelemedicineReservation from 'navigation/Home/TelemedicineReservation';
import TelemedicineReservationPayment from 'navigation/Home/TelemedicineReservation/Payment';
import HistoryStackNavigation from 'navigation/History';
import TelemedicineRoomNavigation from 'navigation/History/TelemedicineRoom';
import MyPageStackNavigation from 'navigation/MyPage';
import LoginStackNavigation from 'navigation/Login';
import NeedLoginNavigation from 'navigation/Login/NeedLoginNavigation';
import InquiryStackNavigation from 'navigation/Inquiry';
import PaymentStackNavigation from 'navigation/Home/NeedPaymentNavigation';

// GraphQL 쿼리 정의
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://si5b3rxuzvda5el6ismrh3by7u.appsync-api.ap-northeast-2.amazonaws.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    'x-api-key': 'da2-3imr5kbeg5edlaxbgjiipgdpt4',
  },
});

const GET_APP_VERSION_MODEL = gql`
  query GetApp_version_model {
    getApp_version_model(tag: "current") {
      apple
      android
      tag
    }
  }
`;

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppComponent />
    </ApolloProvider>
  );
}

function AppComponent() {

  const { loading, error, data } = useQuery(GET_APP_VERSION_MODEL);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data) {
      if (Device.osName === 'Android') {
        const latestVersion = data.getApp_version_model.android.split('.').map(Number);
        const currentVersion = Constants.manifest.version.split('.').map(Number);

        for (let ii = 0; ii < latestVersion.length; ii++) {
          if (latestVersion[ii] > currentVersion[ii]) {
            // Andriod 최신 버전이 아닌 경우
            Alert.alert('안내', '서비스를 이용하기 위해 앱을 최신 버전으로 업데이트 해주세요.', [
              {
                text: '확인',
                onPress: () => Linking.openURL('https://play.google.com/store/apps/details?id=kr.co.insunginfo.okdoc')
              },
            ]);
            return;

          } else if (latestVersion[ii] < currentVersion[ii]) {
            // Andriod 릴리즈 되지 않은 최신 버전
            const timer = setTimeout(() => {
              setIsLoading(false);
            }, 1500);
            return () => clearTimeout(timer);
          }
        }

        // Andriod 최신 버전
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);

      } else {
        const latestVersion = data.getApp_version_model.apple.split('.').map(Number);
        const currentVersion = Constants.manifest.version.split('.').map(Number);
        // iOS 최신 버전이 아닌 경우
        for (let ii = 0; ii < latestVersion.length; ii++) {
          if (latestVersion[ii] > currentVersion[ii]) {
            Alert.alert('안내', '서비스를 이용하기 위해 앱을 최신 버전으로 업데이트 해주세요.', [
              {
                text: '확인',
                onPress: () => Linking.openURL('https://apps.apple.com/us/app/%EC%98%A4%EC%BC%80%EC%9D%B4%EB%8B%A5/id6463086824')
              },
            ]);
            return;

          } else if (latestVersion[ii] < currentVersion[ii]) {
            // iOS 릴리즈 되지 않은 최신 버전
            const timer = setTimeout(() => {
              setIsLoading(false);
            }, 1500);
            return () => clearTimeout(timer);
          }
        }

        // iOS 최신 버전
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [data]);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Device.osName === 'Android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
      await AsyncStorage.setItem('@device_type', 'GCM');
    } else {
      await AsyncStorage.setItem('@device_type', 'APNS');
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        //alert('알림 허용을 거절하셨습니다.');
        return;
      }
      token = (await Notifications.getDevicePushTokenAsync()).data;
      await AsyncStorage.setItem('@device_token', token);
    } else {
      //Aiden's @device_token
      await AsyncStorage.setItem('@device_token', '7af2918322215934ebb1c265340c190f1c503d9a81c303d32cd308b0ae72ce3e');
    }

    return token;
  }

  const [fontsLoaded] = useFonts({
    "Pretendard-Bold": require('assets/fonts/Pretendard-Bold.otf'),
    "Pretendard-Medium": require('assets/fonts/Pretendard-Medium.otf'),
    "Pretendard-Regular": require('assets/fonts/Pretendard-Regular.otf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  if (isLoading) {
    return null;
  }

  return (
    <RootSiblingParent>
      <AppProvider>
        <ApiProvider>
          <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
            <StatusBar animated style="dark" />

            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Group screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="BottomTapNavigation" component={BottomTapNavigation} />
                  <Stack.Screen name="TelemedicineReservation" component={TelemedicineReservation} />
                  <Stack.Screen name="HistoryStackNavigation" component={HistoryStackNavigation} />
                  <Stack.Screen name="TelemedicineRoomNavigation" component={TelemedicineRoomNavigation} options={{ gestureEnabled: false }} />
                  <Stack.Screen name="MyPageStackNavigation" component={MyPageStackNavigation} />
                  <Stack.Screen name="NeedLoginNavigation" component={NeedLoginNavigation} />
                </Stack.Group>

                <Stack.Group screenOptions={{ headerShown: false, presentation: 'transparentModal' }}>
                  <Stack.Screen name="TelemedicineReservationPayment" component={TelemedicineReservationPayment} options={{ gestureEnabled: false }} />
                  <Stack.Screen name="LoginStackNavigation" component={LoginStackNavigation} />
                  <Stack.Screen name="InquiryStackNavigation" component={InquiryStackNavigation} />
                  <Stack.Screen name="PaymentStackNavigation" component={PaymentStackNavigation} />
                </Stack.Group>
              </Stack.Navigator>
            </NavigationContainer>

            {/* <Button title="Copy device push token" onPress={() => {
              Clipboard.setString(expoPushToken);
            }} /> */}

          </View>
        </ApiProvider>
      </AppProvider>
    </RootSiblingParent>
  );
}