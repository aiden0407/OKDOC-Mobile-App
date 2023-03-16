//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileListScreen from 'screens/MyPage/Profile';
import ProfileDetailScreen from 'screens/MyPage/Profile/Detail';

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
            headerLeft: () => <NavigationBackArrow action={() => navigation.goBack()} />,
          })}
        />
        <Stack.Screen
          name="ProfileDetail"
          component={ProfileDetailScreen}
          options={() => ({
            title: '비대면 진료실',
            headerLeft: () => <NavigationBackArrow action={() => navigation.navigate('ProfileList')} />,
          })}
        />

      </Stack.Group>
    </Stack.Navigator>
  );
}