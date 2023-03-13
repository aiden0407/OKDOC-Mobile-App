//React
import { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Default Settings
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text, TextInput } from 'react-native';
import { COLOR } from 'constants/design'
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
TextInput.defaultProps.placeholderTextColor = COLOR.GRAY2;

//BottomTap
import BottomTapNavigation from 'navigation/BottomTapNavigation';
//Home
import TreatmentReservation from 'navigation/Home/TreatmentReservation';
//Mypage
import MyPageStackNavigation from 'navigation/MyPage';
//Login
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
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BottomTapNavigation" component={BottomTapNavigation} />
            {/* Home Components */}
            <Stack.Screen name="TreatmentReservation" component={TreatmentReservation} />
            {/* MyPage Components */}
            <Stack.Screen name="MyPageStackNavigation" component={MyPageStackNavigation} />
            {/* Etc. */}
            <Stack.Screen name="NeedLoginNavigation" component={NeedLoginNavigation} />
          </Stack.Group>

          <Stack.Group screenOptions={{ headerShown: false, presentation: 'transparentModal' }}>
            <Stack.Screen name="LoginStackNavigation" component={LoginStackNavigation} />
          </Stack.Group>

        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}