//Components
import { SafeArea } from 'components/Layout';
import { WebView } from 'react-native-webview';

export default function InquiryScreen() {
  return (
    <SafeArea>
      <WebView
        source={{ uri: 'http://localhost:5500/inquiry/?userName=%EC%97%90%EC%9D%B4%EB%93%A0&userEmail=aiden@insunginfo.co.kr' }}
      />
    </SafeArea>
  );
}