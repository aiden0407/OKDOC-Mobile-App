//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InquiryScreen from 'screens/MyPage/Inquiry';

//Components
import NavigationBackArrow from 'components/NavigationBackArrow';

const Stack = createNativeStackNavigator();

export default function PolicyStackNavigation({ navigation }) {

  return (
    <Stack.Navigator initialRouteName="Policy" >
      <Stack.Group screenOptions={{ headerLargeTitleShadowVisible: false }}>
        <Stack.Screen
          name="Inquiry"
          component={InquiryScreen}
          options={() => ({
            title: '1:1 문의',
            headerLeft: () => <NavigationBackArrow action={() => navigation.goBack()} />,
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}