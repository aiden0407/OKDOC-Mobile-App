//Components
import { SafeArea } from 'components/Layout';
import { WebView } from 'react-native-webview';

export default function BusinessInfoScreen({ route }) {

  const contentsText = route.params?.content;

  return (
    <SafeArea>
      <WebView
        source={{ uri: contentsText }}
        onError={() => {
          navigation.goBack();
        }}
      />
    </SafeArea>
  );
}