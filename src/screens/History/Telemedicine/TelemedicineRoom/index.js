//Components
import { SafeArea } from 'components/Layout';
import { WebView } from 'react-native-webview';

export default function TelemedicineRoomScreen({ navigation, route }) {

  const telemedicineData = route.params.telemedicineData;

  function handleTelemedicineComplete() {
    navigation.replace('TelemedicineComplete', {
      telemedicineData: telemedicineData,
    });
  }

  return (
    <SafeArea>
      <WebView
        source={{ uri: `https://zoom.okdoc.app/meeting/patient/?meetingNumber=${telemedicineData.hospital_treatment_room.pmi}&userName=${telemedicineData.profileInfo.passport.user_name}` }}
        //source={{ uri: `https://schmich.github.io/instascan/` }}
        originWhitelist={['*']}
        useWebkit
        bounces
        javaScriptEnabled
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        onNavigationStateChange={(navState) => {
          if(navState.url.includes("https://zoom.okdoc.app/meeting/end")){
            handleTelemedicineComplete();
          }
        }}
        onError={(error) => {
          throw error;
        }}
      />
    </SafeArea>
  );
}