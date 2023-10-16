//React
import { useEffect, useState, useCallback, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProvider } from 'context/AppContext';
import { ApiProvider } from 'context/ApiContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Default Settings
import { COLOR } from 'constants/design'
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
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
import * as TaskManager from 'expo-task-manager';

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

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, async ({ data, error, executionInfo }) => {
  if (data) {
    const notification_history = [];

    AsyncStorage.getItem('@notification_history')
      .then(serializedArray => {
        if (serializedArray !== null) {
          notification_history = JSON.parse(serializedArray);
        }
      })
      .catch(error => {
        console.error(error);
      });

    notification_history.push(data);
    await AsyncStorage.setItem('@notification_history', JSON.stringify(notification_history));
  }
});

Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

export default function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  async function registerForPushNotificationsAsync() {
    let token;
  
    if (Device.osName==='Android') {
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
      await AsyncStorage.setItem('@device_token', '961ae45edebaf891a146995cad67d1390d47b63b1867c42c93b6c405911ae241');
    }
  
    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

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