//React
import { useEffect, useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProvider } from 'context/AppContext';
import { ApiProvider } from 'context/ApiContext';

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

//navigation
import BottomTapNavigation from 'navigation/BottomTapNavigation';
import TelemedicineReservation from 'navigation/Home/TelemedicineReservation';
import TelemedicineReservationPayment from 'navigation/Home/TelemedicineReservation/Payment';
import HistoryStackNavigation from 'navigation/History';
import MyPageStackNavigation from 'navigation/MyPage';
import LoginStackNavigation from 'navigation/LoginStackNavigation';
import NeedLoginNavigation from 'navigation/LoginStackNavigation/NeedLoginNavigation';

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function App() {

  const [isLoading, setIsLoading] = useState(true);

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
                  <Stack.Screen name="MyPageStackNavigation" component={MyPageStackNavigation} />
                  <Stack.Screen name="NeedLoginNavigation" component={NeedLoginNavigation} />
                </Stack.Group>

                <Stack.Group screenOptions={{ headerShown: false, presentation: 'transparentModal' }}>
                  <Stack.Screen name="TelemedicineReservationPayment" component={TelemedicineReservationPayment} options={{ gestureEnabled: false }} />
                  <Stack.Screen name="LoginStackNavigation" component={LoginStackNavigation} />
                </Stack.Group>
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </ApiProvider>
      </AppProvider>
    </RootSiblingParent>
  );
}