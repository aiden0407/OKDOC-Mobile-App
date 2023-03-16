//React
import { useContext } from 'react';
import { AppContext } from 'context/AppContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//Navigation
import HomeScreen from 'screens/Home';
import HistoryScreen from 'screens/History';
import AlarmScreen from 'screens/Alarm';
import MyPageScreen from 'screens/MyPage';

//Components
import { Ionicons } from '@expo/vector-icons';
import { COLOR } from 'constants/design'

const BottomTab = createBottomTabNavigator();

export default function BottomTapNavigation() {

  const { dispatch } = useContext(AppContext);

  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          paddingTop: 2,
          height: 84, //default: 79
        },
        tabBarActiveTintColor: COLOR.MAIN,
        tabBarInactiveTintColor: '#AAAAAA',
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused
              ? 'home-outline'
              : 'home-outline';
          }
          if (route.name === 'History') {
            iconName = focused
              ? 'newspaper-outline'
              : 'newspaper-outline';
          }
          if (route.name === 'Alarm') {
            iconName = focused
              ? 'notifications-outline'
              : 'notifications-outline';
          }
          if (route.name === 'MyPage') {
            iconName = focused
              ? 'person-outline'
              : 'person-outline';
          }
          return <Ionicons name={iconName} size={24} color={color} marginLeft={2}/>;
        },
      })}
    >
      <BottomTab.Group screenOptions={{ 
        headerTitleAlign: 'center',
        headerShadowVisible: false,
      }}>
        <BottomTab.Screen name="Home" component={HomeScreen} options={{ title: '홈', headerShown: false }}
          listeners={{ tabPress: () => dispatch({ type: 'BOTTOM_TAP_NAVIGATION', menu: 'HOME' }) }}
        />
        <BottomTab.Screen name="History" component={HistoryScreen} options={{ title: '진료 내역' }} 
          listeners={{ tabPress: () => dispatch({ type: 'BOTTOM_TAP_NAVIGATION', menu: 'HISTORY' }) }}
        />
        <BottomTab.Screen name="Alarm" component={AlarmScreen} options={{ title: '알림' }} 
          listeners={{ tabPress: () => dispatch({ type: 'BOTTOM_TAP_NAVIGATION', menu: 'ALARM' }) }}
        />
        <BottomTab.Screen name="MyPage" component={MyPageScreen} options={{ title: '마이페이지' }} 
          listeners={{ tabPress: () => dispatch({ type: 'BOTTOM_TAP_NAVIGATION', menu: 'MYPAGE' }) }}
        />
      </BottomTab.Group>
    </BottomTab.Navigator>
  );
}