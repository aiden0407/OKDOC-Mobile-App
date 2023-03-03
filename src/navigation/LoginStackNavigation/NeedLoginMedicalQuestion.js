//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NeedLoginScreen from 'screens/Login/NeedLogin';

//Components
import NavigationBackArrow from 'components/NavigationBackArrow';

const Stack = createNativeStackNavigator();

export default function NeedLoginSecondOpinion({ navigation }) {

  return (
    <Stack.Navigator initialRouteName="NeedLogin" >
      <Stack.Group screenOptions={{ headerLargeTitleShadowVisible: false }}>
        <Stack.Screen
          name="NeedLogin"
          component={NeedLoginScreen}
          options={() => ({
            title: '의료 질문',
            headerLeft: () => <NavigationBackArrow action={() => navigation.goBack()} />,
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}