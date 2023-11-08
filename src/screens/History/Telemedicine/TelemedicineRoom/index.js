//React
import { useEffect, useContext } from 'react';
import { ApiContext } from 'context/ApiContext';

//Components
import { StatusBarArea, Container } from 'components/Layout';
import { StatusBar } from 'expo-status-bar';
import { useIsFocused } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function TelemedicineRoomScreen({ navigation, route }) {

  const { state: { accountData } } = useContext(ApiContext);
  const telemedicineData = route.params.telemedicineData;
  const meetingNumber = telemedicineData.fullDocument.treatment_appointment.hospital_treatment_room.id;
  const userName = telemedicineData.profileInfo?.passport?.user_name ?? telemedicineData.profileInfo?.passapp_certification?.name;
  const wishAt = telemedicineData.wish_at;
  const biddingId = telemedicineData.bidding_id;
  const token = accountData.loginToken;

  useEffect(() => {
    changeScreenOrientation();
  }, []);

  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
  }

  // function FocusAwareStatusBar(props) {
  //   const isFocused = useIsFocused();
  //   return isFocused && <StatusBar {...props} />;
  // }

  async function handleTelemedicineComplete() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

    const originalTime = new Date(telemedicineData.wish_at);
    let addedTime;
    if(telemedicineData?.invoiceInfo){
      addedTime = new Date(originalTime.getTime() + 15 * 60 * 1000);
    } else {
      addedTime = new Date(originalTime.getTime() + 10 * 60 * 1000);
    }
    const currentTime = new Date();
    const remainingTime = Math.floor((addedTime - currentTime) / 1000);

    if(remainingTime > 0){
      setTimeout(() => {
        navigation.navigate('TelemedicineWhetherFinished', {
          telemedicineData: telemedicineData,
        });
      }, 500);
    } else {
      setTimeout(() => {
        navigation.navigate('TelemedicineComplete', {
          telemedicineData: telemedicineData,
        });
      }, 500);
    }
  }

  return (
    <>
      {/* <StatusBarArea backgroundColor="#111111">
        <FocusAwareStatusBar animated style="light" />
      </StatusBarArea> */}
      <Container>
        <WebView
          source={{ uri: `https://zoom.okdoc.app/meeting/patient/?meetingNumber=${meetingNumber}&userName=${userName}&wishAt=${wishAt}&biddingId=${biddingId}&token=${token}` }}
          // source={{ uri: `http://127.0.0.1:5500/meeting/patient/?meetingNumber=85440949682&userName=${userName}&wishAt=${wishAt}&id=${id}&token=${token}` }}
          // source={{ uri: `https://zoom.okdoc.app/meeting/end` }}
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
      </Container>
      <StatusBarArea backgroundColor="#000000" />
    </>
  );
}