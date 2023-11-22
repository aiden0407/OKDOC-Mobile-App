//React
import { useState, useEffect, useContext } from 'react';
import { ApiContext } from 'context/ApiContext';

//Components
import { StatusBarArea, Container } from 'components/Layout';
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function TelemedicineRoomScreen({ navigation, route }) {

  const { state: { accountData } } = useContext(ApiContext);
  const [isReplaced, setIsReplaced] = useState(false);
  const telemedicineData = route.params.telemedicineData;
  const meetingNumber = telemedicineData.fullDocument.treatment_appointment.hospital_treatment_room.id;
  const userName = telemedicineData.profileInfo?.passport?.user_name ?? telemedicineData.profileInfo?.passapp_certification?.name;
  const wishAt = telemedicineData.wish_at;
  const biddingId = telemedicineData.bidding_id;
  const token = accountData.loginToken;

  useEffect(() => {
    setTimeout(() => {
      changeScreenOrientation();
    }, 500);
  }, []);

  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
  }

  async function handleTelemedicineComplete() {
    setIsReplaced(true);
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
        navigation.replace('TelemedicineWhetherFinished', {
          telemedicineData: telemedicineData,
        });
      }, 1000);
    } else {
      setTimeout(() => {
        navigation.replace('TelemedicineComplete', {
          telemedicineData: telemedicineData,
        });
      }, 1000);
    }
  }

  return (
    <>
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
            if (navState.url.includes("https://zoom.okdoc.app/meeting/end") && !isReplaced) {
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