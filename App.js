//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Navigation
import BottomTapNavigation from 'navigation/BottomTapNavigation';
import LoginStackNavigation from 'navigation/LoginStackNavigation';
import NeedLoginSecondOpinion from 'navigation/LoginStackNavigation/NeedLoginSecondOpinion';
import NeedLoginMedicalQuestion from 'navigation/LoginStackNavigation/NeedLoginMedicalQuestion';
import PolicyStackNavigation from 'navigation/MyPage/PolicyStackNavigation';
import InquiryStackNavigation from 'navigation/MyPage/InquiryStackNavigation';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BottomTapNavigation" >

        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="BottomTapNavigation" component={BottomTapNavigation} />
          <Stack.Screen name="NeedLoginSecondOpinion" component={NeedLoginSecondOpinion} />
          <Stack.Screen name="NeedLoginMedicalQuestion" component={NeedLoginMedicalQuestion} />
          <Stack.Screen name="InquiryStackNavigation" component={InquiryStackNavigation} />
          <Stack.Screen name="PolicyStackNavigation" component={PolicyStackNavigation} />
        </Stack.Group>

        <Stack.Group screenOptions={{ headerShown: false, presentation: 'transparentModal' }}>
          <Stack.Screen name="LoginStackNavigation" component={LoginStackNavigation} />
        </Stack.Group>

      </Stack.Navigator>
    </NavigationContainer>
  );
}