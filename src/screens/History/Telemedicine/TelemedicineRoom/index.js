//React
import { useContext } from 'react';
import { ApiContext } from 'context/ApiContext';

//Components
import { StatusBarArea, SafeArea } from 'components/Layout';
import { StatusBar } from 'expo-status-bar';
import { useIsFocused } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

export default function TelemedicineRoomScreen({ navigation, route }) {

  const { state: { accountData } } = useContext(ApiContext);
  const telemedicineData = route.params.telemedicineData;
  const meetingNumber = telemedicineData.hospital_treatment_room.id;
  const userName = telemedicineData.profileInfo.passport.user_name;
  const wishAt = telemedicineData.wish_at;
  const id = telemedicineData.id;
  const token = accountData.loginToken;

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
          source={{ uri: `https://zoom.okdoc.app/meeting/patient/?meetingNumber=${meetingNumber}&userName=${userName}&wishAt=${wishAt}&id=${id}&token=${token}` }}
          //source={{ uri: `http://127.0.0.1:5500/meeting/patient/?meetingNumber=${meetingNumber}&userName=${userName}&wishAt=${wishAt}&id=${id}&token=${token}` }}
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