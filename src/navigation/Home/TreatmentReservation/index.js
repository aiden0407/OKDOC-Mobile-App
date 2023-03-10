//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoryScreen from 'screens/Home/Treatment/Category';
import BookingScreen from 'screens/Home/Treatment/Booking';

//Components
import NavigationBackArrow from 'components/NavigationBackArrow';

const Stack = createNativeStackNavigator();

export default function TreatmentReservation({ navigation }) {

  return (
    <Stack.Navigator initialRouteName="Category" >
      <Stack.Group screenOptions={{ headerLargeTitleShadowVisible: false }}>
        <Stack.Screen
          name="Category"
          component={CategoryScreen}
          options={() => ({
            title: '비대면 진료실',
            headerLeft: () => <NavigationBackArrow action={() => navigation.goBack()} />,
          })}
        />
        <Stack.Screen
          name="Booking"
          component={BookingScreen}
          options={() => ({
            title: '비대면 진료실',
            headerLeft: () => <NavigationBackArrow action={() => navigation.navigate('Category')} />,
          })}
        />
        <Stack.Screen
          name="BookingDirectly"
          component={BookingScreen}
          options={() => ({
            title: '비대면 진료실',
            headerLeft: () => <NavigationBackArrow action={() => navigation.goBack()} />,
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}