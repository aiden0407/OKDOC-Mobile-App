//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from 'screens/Login';
import FindEmailPasswordScreen from 'screens/Login/FindEmailPassword';
import RegisterPolicyScreen from 'screens/Login/Register/RegisterPolicy';
import RegisterPolicyDetailScreen from 'screens/Login/Register/RegisterPolicy/Detail';
import EmailPasswordScreen from 'screens/Login/Register/EmailPassword';
// import PassportPhoneCertifiactionScreen from 'screens/Login/Register/PassportPhoneCertifiaction';
import PassportInformationScreen from 'screens/Login/Register/PassportInformation';
import PhoneInformationScreen from 'screens/Login/Register/PhoneInformation';
// import SearchCountryCodeScreen from 'screens/Login/Register/SearchCountryCode';
import RegisterCompleteScreen from 'screens/Login/Register/RegisterComplete';

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
            title: '이메일 / 비밀번호 찾기 문의',
            headerLeft: () => <NavigationBackArrow action={()=>navigation.navigate('Login')} />,
            //headerShown: false,
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
          name="RegisterPolicyDetail"
          component={RegisterPolicyDetailScreen}
          options={{
            title: '회원가입',
            headerLeft: () => <NavigationBackArrow action={()=>navigation.navigate('RegisterPolicy')} />,
          }}
        />
        <Stack.Screen
          name="EmailPassword"
          component={EmailPasswordScreen}
          options={{
            title: '회원가입',
            headerLeft: () => <NavigationBackArrow action={()=>navigation.navigate('RegisterPolicy')} />,
          }}
        />
        {/* <Stack.Screen
          name="PassportPhoneCertifiaction"
          component={PassportPhoneCertifiactionScreen}
          options={{
            title: '회원가입',
            headerLeft: () => <NavigationBackArrow action={()=>navigation.navigate('EmailPassword')} />,
          }}
        /> */}
        <Stack.Screen
          name="PassportInformation"
          component={PassportInformationScreen}
          options={{
            title: '회원가입',
            headerLeft: () => <NavigationBackArrow action={()=>navigation.navigate('EmailPassword')} />,
          }}
        />
        <Stack.Screen
          name="PhoneInformation"
          component={PhoneInformationScreen}
          options={{
            title: '회원가입',
            headerLeft: () => <NavigationBackArrow action={()=>navigation.navigate('PassportInformation')} />,
          }}
        />
        {/* <Stack.Screen
          name="SearchCountryCode"
          component={SearchCountryCodeScreen}
          options={{
            title: '회원가입',
            headerLeft: () => <NavigationBackArrow action={()=>navigation.navigate('PhoneInformation')} />,
          }}
        /> */}
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