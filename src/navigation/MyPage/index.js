//Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountSettingScreen from 'screens/MyPage/AccountSetting';
import ChangePasswordScreen from 'screens/MyPage/AccountSetting/ChangePassword';
import WithdrawalScreen from 'screens/MyPage/AccountSetting/Withdrawal';
import ProfileDetailScreen from 'screens/MyPage/Profile/ProfileDetail';
import InquiryScreen from 'screens/MyPage/Inquiry';
import PolicyScreen from 'screens/MyPage/Policy';
import PolicyDetailScreen from 'screens/MyPage/Policy/Detail';
import FaqScreen from 'screens/MyPage/FAQ';
import NotificationScreen from 'screens/MyPage/Notification';
import NotificationDetailScreen from 'screens/MyPage/Notification/Detail';

//Components
import NavigationBackArrow from 'components/NavigationBackArrow';

const Stack = createNativeStackNavigator();

export default function MyPageInnerStackNavigation({ navigation }) {

  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerLargeTitleShadowVisible: false,
          headerLeft: () => <NavigationBackArrow action={() => navigation.goBack()} />,
        }}
      >
        <Stack.Screen
          name="AccountSetting"
          component={AccountSettingScreen}
          options={{ title: '계정 설정' }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePasswordScreen}
          options={{ title: '비밀번호 변경' }}
        />
        <Stack.Screen
          name="Withdrawal"
          component={WithdrawalScreen}
          options={{ title: '회원탈퇴' }}
        />
        <Stack.Screen
          name="ProfileDetail"
          component={ProfileDetailScreen}
          options={{ title: '프로필 정보' }}
        />
        <Stack.Screen
          name="Inquiry"
          component={InquiryScreen}
          options={{ title: '1:1 문의' }}
        />
        <Stack.Screen
          name="Policy"
          component={PolicyScreen}
          options={{ title: '서비스 약관 & 정책' }}
        />
        <Stack.Screen
          name="FAQ"
          component={FaqScreen}
          options={{ title: '자주하는 질문' }}
        />
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{ title: '공지사항' }}
        />
      </Stack.Group>

      <Stack.Group screenOptions={{ headerLargeTitleShadowVisible: false }}>
        <Stack.Screen
          name="PolicyDetail"
          component={PolicyDetailScreen}
          options={{
            headerLeft: () => <NavigationBackArrow action={() => navigation.navigate('Policy')} />,
          }}
        />
        <Stack.Screen
          name="NotificationDetail"
          component={NotificationDetailScreen}
          options={{
            title: '공지사항',
            headerLeft: () => <NavigationBackArrow action={() => navigation.navigate('Notification')} />,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}