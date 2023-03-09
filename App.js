//React
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Font
import { useFonts } from 'expo-font';
import { Text, TextInput } from 'react-native';
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

//BottomTap
import BottomTapNavigation from 'navigation/BottomTapNavigation';
//Home
import TreatmentReservation from 'navigation/Home/TreatmentReservation';
//Mypage
import MyPageStackNavigation from 'navigation/MyPage';
//Login
import LoginStackNavigation from 'navigation/LoginStackNavigation';
import NeedLoginNavigation from 'navigation/LoginStackNavigation/NeedLoginNavigation';

const Stack = createNativeStackNavigator();

export default function App() {

  const [loaded] = useFonts({
    "Pretendard-Bold" : require('assets/fonts/Pretendard-Bold.otf'),
    "Pretendard-Medium" : require('assets/fonts/Pretendard-Medium.otf'),
    "Pretendard-Regular" : require('assets/fonts/Pretendard-Regular.otf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BottomTapNavigation" >

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
  );
}