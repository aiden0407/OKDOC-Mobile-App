//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FaqScreen from 'screens/MyPage/FAQ';

//Components
import NavigationBackArrow from 'components/NavigationBackArrow';

const Stack = createNativeStackNavigator();

export default function FaqStackNavigation({ navigation }) {

  return (
    <Stack.Navigator initialRouteName="FAQ" >
      <Stack.Group screenOptions={{ headerLargeTitleShadowVisible: false }}>
        <Stack.Screen
          name="FAQ"
          component={FaqScreen}
          options={() => ({
            title: '자주하는 질문',
            headerLeft: () => <NavigationBackArrow action={() => navigation.goBack()} />,
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}