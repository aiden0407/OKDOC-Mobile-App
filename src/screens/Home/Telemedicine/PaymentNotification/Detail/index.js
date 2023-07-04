//Components
import { SafeArea } from 'components/Layout';
import { WebView } from 'react-native-webview';

export default function PaymentPolicyDetailScreen({ route }) {

  const contentsText = route.params?.content;

  return (
    <SafeArea>
      <WebView
        //source={{ html: contentsText }}
        source={{ uri: contentsText }}
        onError={() => {
          navigation.goBack();
        }}
      />
    </SafeArea>
  );
}