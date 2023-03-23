//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyPageScreen from 'screens/MyPage';
import AccountSettingScreen from 'screens/MyPage/AccountSetting';

//Components
import NavigationBackArrow from 'components/NavigationBackArrow';

const Stack = createNativeStackNavigator();

export default function MyPageInnerStackNavigation({ navigation }) {

  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerLargeTitleShadowVisible: false }}>
        <Stack.Screen
          name="MyPageMain"
          component={MyPageScreen}
          options={{
            title: '마이페이지',
            headerLeft: () => <NavigationBackArrow action={() => navigation.goBack()} />,
        }}
        />
        <Stack.Screen
          name="AccountSetting"
          component={AccountSettingScreen}
          options={{
            title: '계정 설정',
            headerLeft: () => <NavigationBackArrow action={() => navigation.navigate('MyPageMain')} />,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}