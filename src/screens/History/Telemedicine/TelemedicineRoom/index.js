//Components
import { SafeArea } from 'components/Layout';
import { WebView } from 'react-native-webview';

export default function TelemedicineRoomScreen() {

  const telemedicineData = route.params.telemedicineData;

  return (
    <SafeArea>
      <WebView
        source={{ uri: `https://zoom.okdoc.app/patient/?meetingNumber=${telemedicineData.hospital_treatment_room.pmi}&userName=${telemedicineData.profileInfo.passport.user_name}` }}
      />
    </SafeArea>
  );
}