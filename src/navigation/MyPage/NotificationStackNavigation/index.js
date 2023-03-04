//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotificationScreen from 'screens/MyPage/Notification';
import DetailsScreen from 'screens/MyPage/Notification/Details';

//Components
import NavigationBackArrow from 'components/NavigationBackArrow';

const Stack = createNativeStackNavigator();

export default function NotificationStackNavigation({ navigation }) {

  return (
    <Stack.Navigator initialRouteName="Notification" >
      <Stack.Group screenOptions={{ headerLargeTitleShadowVisible: false }}>
        
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={() => ({
            title: '공지사항',
            headerLeft: () => <NavigationBackArrow action={() => navigation.goBack()} />,
          })}
        />

        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={() => ({
            title: '공지사항',
            headerLeft: () => <NavigationBackArrow action={() => navigation.navigate('Notification')} />,
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}