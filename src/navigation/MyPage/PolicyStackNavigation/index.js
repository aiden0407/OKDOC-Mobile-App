//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PolicyScreen from 'screens/MyPage/Policy';
import TermsOfServiceScreen from 'screens/MyPage/Policy/TermsOfService';
import PrivacyPolicyScreen from 'screens/MyPage/Policy/PrivacyPolicy';

//Components
import NavigationBackArrow from 'components/NavigationBackArrow';

const Stack = createNativeStackNavigator();

export default function PolicyStackNavigation({ navigation }) {

  return (
    <Stack.Navigator initialRouteName="Policy" >
      <Stack.Group screenOptions={{ headerLargeTitleShadowVisible: false }}>
        
        <Stack.Screen
          name="Policy"
          component={PolicyScreen}
          options={() => ({
            title: '서비스 약관 & 정책',
            headerLeft: () => <NavigationBackArrow action={() => navigation.goBack()} />,
          })}
        />

        <Stack.Screen
          name="TermsOfService"
          component={TermsOfServiceScreen}
          options={() => ({
            title: '서비스 이용약관',
            headerLeft: () => <NavigationBackArrow action={() => navigation.navigate('Policy')} />,
          })}
        />

        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicyScreen}
          options={() => ({
            title: '개인정보 보호정책',
            headerLeft: () => <NavigationBackArrow action={() => navigation.navigate('Policy')} />,
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}