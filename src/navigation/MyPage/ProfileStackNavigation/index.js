//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileListScreen from 'screens/MyPage/Profile';
import MyPageProfileDetailScreen from 'screens/MyPage/Profile/MyPageDetail'
import ReservationProfileDetailScreen from 'screens/MyPage/Profile/ReservationDetail';

//Components
import NavigationBackArrow from 'components/NavigationBackArrow';

const Stack = createNativeStackNavigator();

export default function ProfileStackNavigation({ navigation }) {

  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerLargeTitleShadowVisible: false }}>

        <Stack.Screen
          name="ProfileList"
          component={ProfileListScreen}
          options={() => ({
            title: '프로필 목록',
            headerLeft: () => <NavigationBackArrow action={() => navigation.goBack()} />,
          })}
        />
        <Stack.Screen
          name="MyPageProfileDetail"
          component={MyPageProfileDetailScreen}
          options={() => ({
            title: '프로필 정보',
            headerLeft: () => <NavigationBackArrow action={() => navigation.goBack()} />,
          })}
        />
        <Stack.Screen
          name="ReservationProfileDetail"
          component={ReservationProfileDetailScreen}
          options={() => ({
            title: '프로필 정보',
            headerLeft: () => <NavigationBackArrow action={() => navigation.navigate('ProfileList')} />,
          })}
        />

      </Stack.Group>
    </Stack.Navigator>
  );
}