//React
import { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProvider } from "context/AppContext";
import { ApiProvider } from 'context/ApiContext';

//Default Settings
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { COLOR } from 'constants/design'
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
import MyPageStackNavigation from 'navigation/MyPage';
import LoginStackNavigation from 'navigation/LoginStackNavigation';
import NeedLoginNavigation from 'navigation/LoginStackNavigation/NeedLoginNavigation';

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function App() {

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

  return (
    <AppProvider>
      <ApiProvider>
        <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
          <NavigationContainer>
            <Stack.Navigator>

              <Stack.Group screenOptions={{ headerShown: false }}>
                <Stack.Screen name="BottomTapNavigation" component={BottomTapNavigation} />
                <Stack.Screen name="TelemedicineReservation" component={TelemedicineReservation} />
                <Stack.Screen name="MyPageStackNavigation" component={MyPageStackNavigation} />
                <Stack.Screen name="NeedLoginNavigation" component={NeedLoginNavigation} />
              </Stack.Group>

              <Stack.Group screenOptions={{ headerShown: false, presentation: 'transparentModal' }}>
                <Stack.Screen name="LoginStackNavigation" component={LoginStackNavigation} />
              </Stack.Group>

            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </ApiProvider>
    </AppProvider>
  );
}