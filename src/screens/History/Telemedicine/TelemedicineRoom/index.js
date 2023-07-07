//Components
import { StatusBarArea, SafeArea } from 'components/Layout';
import { StatusBar } from 'expo-status-bar';
import { useIsFocused } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

export default function TelemedicineRoomScreen({ navigation, route }) {

  const telemedicineData = route.params.telemedicineData;

  function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();
    return isFocused && <StatusBar {...props} />;
  }

  function handleTelemedicineComplete() {
    navigation.navigate('TelemedicineWhetherFinished', {
      telemedicineData: telemedicineData,
    });
  }

  return (
    <>
      <StatusBarArea backgroundColor="#111111">
        <FocusAwareStatusBar animated style="light" />
      </StatusBarArea>
      <SafeArea>
        <WebView
          source={{ uri: `https://zoom.okdoc.app/meeting/patient/?meetingNumber=${telemedicineData.hospital_treatment_room.id}&userName=${telemedicineData.profileInfo.passport.user_name}&wishAt=${telemedicineData.wish_at}` }}
          originWhitelist={['*']}
          useWebkit
          bounces
          javaScriptEnabled
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          onNavigationStateChange={(navState) => {
            if (navState.url.includes("https://zoom.okdoc.app/meeting/end")) {
              handleTelemedicineComplete();
            }
          }}
          onError={(error) => {
            throw error;
          }}
        />
      </SafeArea>
      <StatusBarArea backgroundColor="#030303" />
    </>
  );
}