//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from 'screens/Login';

//Components
import NavigationBackArrow from 'components/NavigationBackArrow';

const Stack = createNativeStackNavigator();

export default function LoginStackNavigation({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Login" >

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: '로그인',
          headerLargeTitleShadowVisible: false,
          headerLeft: () => <NavigationBackArrow action={()=>navigation.goBack()} />,
        }}
      />

    </Stack.Navigator>
  );
}