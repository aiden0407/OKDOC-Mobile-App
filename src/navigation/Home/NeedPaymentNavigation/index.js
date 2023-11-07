//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NeedPaymentScreen from 'screens/Home/NeedPayment';
import TelemedicineDetailScreen from 'screens/History/Telemedicine/TelemedicineDetail';

const Stack = createNativeStackNavigator();

export default function NeedPaymentNavigation({ navigation }) {

  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerLargeTitleShadowVisible: false }}>
        <Stack.Screen
          name="NeedPayment"
          component={NeedPaymentScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="NeedPaymentDetail"
          component={TelemedicineDetailScreen}
          options={{
            title: '진료 내역',
            gestureEnabled: false,
            headerBackVisible: false
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}