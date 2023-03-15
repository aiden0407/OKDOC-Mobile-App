//React
import { useContext } from 'react';
import { AppContext } from 'context/AppContext';

//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoryScreen from 'screens/Home/Telemedicine/Category';
import ReservationScreen from 'screens/Home/Telemedicine/Reservation';
import DoctorProfileScreen from 'screens/Home/Telemedicine/DoctorProfile';

//Components
import NavigationBackArrow from 'components/NavigationBackArrow';

const Stack = createNativeStackNavigator();

export default function TelemedicineReservation({ navigation }) {

  const { state:{appStatus}, dispatch } = useContext(AppContext);

  function handleReservationBack() {
    if(appStatus.usedHomeShortcut){
      dispatch({ type: 'DELETE_SHORTCUT' });
      navigation.goBack();
    } else {
      navigation.navigate('Category');
    }
  }

  return (
    <Stack.Navigator>
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
          name="Reservation"
          component={ReservationScreen}
          options={() => ({
            title: '비대면 진료실',
            headerLeft: () => <NavigationBackArrow action={() => handleReservationBack()} />,
          })}
        />
        <Stack.Screen
          name="DoctorProfile"
          component={DoctorProfileScreen}
          options={() => ({
            title: '의사 프로필',
            headerLeft: () => <NavigationBackArrow action={() => navigation.navigate('Reservation')} />,
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}