//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from 'screens/Login';
import RegisterPolicyScreen from 'screens/Login/Register/RegisterPolicy';
import PassportPhoneCertifiactionScreen from 'screens/Login/Register/PassportPhoneCertifiaction';
import PassportInformationScreen from 'screens/Login/Register/PassportInformation';
import PersonalInformationScreen from 'screens/Login/Register/PersonalInformation';
import SearchCountryCodeScreen from 'screens/Login/Register/SearchCountryCode';
import EmailPasswordScreen from 'screens/Login/Register/EmailPassword';
import RegisterCompleteScreen from 'screens/Login/Register/RegisterComplete';
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
        <Stack.Screen
          name="RegisterPolicy"
          component={RegisterPolicyScreen}
          options={{
            title: '회원가입',
            headerLeft: () => <NavigationBackArrow action={()=>navigation.navigate('Login')} />,
          }}
        />
        <Stack.Screen
          name="PassportPhoneCertifiaction"
          component={PassportPhoneCertifiactionScreen}
          options={{
            title: '회원가입',
            headerLeft: () => <NavigationBackArrow action={()=>navigation.navigate('RegisterPolicy')} />,
          }}
        />
        <Stack.Screen
          name="PassportInformation"
          component={PassportInformationScreen}
          options={{
            title: '회원가입',
            headerLeft: () => <NavigationBackArrow action={()=>navigation.navigate('PassportPhoneCertifiaction')} />,
          }}
        />
        <Stack.Screen
          name="PersonalInformation"
          component={PersonalInformationScreen}
          options={{
            title: '회원가입',
            headerLeft: () => <NavigationBackArrow action={()=>navigation.navigate('PassportInformation')} />,
          }}
        />
        <Stack.Screen
          name="SearchCountryCode"
          component={SearchCountryCodeScreen}
          options={{
            title: '회원가입',
            headerLeft: () => <NavigationBackArrow action={()=>navigation.navigate('PersonalInformation')} />,
          }}
        />
        <Stack.Screen
          name="EmailPassword"
          component={EmailPasswordScreen}
          options={{
            title: '회원가입',
            headerLeft: () => <NavigationBackArrow action={()=>navigation.navigate('PersonalInformation')} />,
          }}
        />
        <Stack.Screen
          name="RegisterComplete"
          component={RegisterCompleteScreen}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
      </Stack.Group>

      

    </Stack.Navigator>
  );
}