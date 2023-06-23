//React
import { useContext } from 'react';
import { ApiContext } from 'context/ApiContext';

//Components
import { SafeArea } from 'components/Layout';
import { WebView } from 'react-native-webview';

export default function InquiryScreen() {

  const { state: ApiContextState } = useContext(ApiContext);

  return (
    <SafeArea>
      <WebView
        source={{ uri: `http://localhost:5500/inquiry/?userName=${ApiContextState.profileData[0].name}&userEmail=${ApiContextState.accountData.email}` }}
      />
    </SafeArea>
  );
}