//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from 'screens/Login';
import FindEmailPasswordScreen from 'screens/Login/FindEmailPassword';

//Components
import NavigationBackArrow from 'components/NavigationBackArrow';

const Stack = createNativeStackNavigator();

export default function LoginStackNavigation({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Login" >
      <Stack.Group screenOptions={{ headerLargeTitleShadowVisible: false }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: '로그인',
            headerLeft: () => <NavigationBackArrow action={()=>navigation.goBack()} />,
          }}
        />
        <Stack.Screen
          name="FindEmailPassword"
          component={FindEmailPasswordScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>

      

    </Stack.Navigator>
  );
}