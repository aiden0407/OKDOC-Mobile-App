//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelemedicineRoomScreen from 'screens/History/Telemedicine/TelemedicineRoom';
import TelemedicineWhetherFinishedScreen from 'screens/History/Telemedicine/TelemedicineWhetherFinished';
import TelemedicineCompleteScreen from 'screens/History/Telemedicine/TelemedicineComplete';

const Stack = createNativeStackNavigator();

export default function HistoryInnerStackNavigation({ navigation }) {

  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerLargeTitleShadowVisible: false }}>
        <Stack.Screen
          name="TelemedicineRoom"
          component={TelemedicineRoomScreen}
          options={{ 
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="TelemedicineWhetherFinished"
          component={TelemedicineWhetherFinishedScreen}
          options={{ 
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="TelemedicineComplete"
          component={TelemedicineCompleteScreen}
          options={{ 
            headerShown: false,
            gestureEnabled: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}