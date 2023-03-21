//React
import { useContext } from 'react';
import { AppContext } from 'context/AppContext';

//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoryScreen from 'screens/Home/Telemedicine/Category';
import ReservationScreen from 'screens/Home/Telemedicine/Reservation';
import DoctorProfileScreen from 'screens/Home/Telemedicine/DoctorProfile';
import ProfileListScreen from 'screens/Home/Telemedicine/ProfileList';
import ProfileDetailScreen from 'screens/Home/Telemedicine/ProfileDetail';
import SymptomDetailScreen from 'screens/Home/Telemedicine/SymptomDetail';

//Components
import NavigationBackArrow from 'components/NavigationBackArrow';

const Stack = createNativeStackNavigator();

export default function TelemedicineReservation({ navigation }) {

  const { state: { isHomeShorcutUsed }, dispatch } = useContext(AppContext);

  function handleReservationBack() {
    if(isHomeShorcutUsed){
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
        <Stack.Screen
          name="ProfileList"
          component={ProfileListScreen}
          options={() => ({
            title: '프로필 선택',
            headerLeft: () => <NavigationBackArrow action={() => navigation.navigate('DoctorProfile')} />,
          })}
        />
        <Stack.Screen
          name="ProfileDetail"
          component={ProfileDetailScreen}
          options={() => ({
            title: '프로필 정보',
            headerLeft: () => <NavigationBackArrow action={() => navigation.navigate('ProfileList')} />,
          })}
        />
        <Stack.Screen
          name="SymptomDetail"
          component={SymptomDetailScreen}
          options={() => ({
            title: '증상 설명',
            headerLeft: () => <NavigationBackArrow action={() => navigation.navigate('ProfileDetail')} />,
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}