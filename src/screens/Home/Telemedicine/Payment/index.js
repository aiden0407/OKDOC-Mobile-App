//React
import { useState, useEffect, useContext } from 'react';
import { ApiContext } from 'context/ApiContext';
import { AppContext } from 'context/AppContext';
import cheerio from 'cheerio';

//Components
import { SafeArea } from 'components/Layout';
import { Alert } from 'react-native';
import { WebView } from 'react-native-webview';

//Api
import { postPaymentRequest } from 'api/Home';

export default function PaymentScreen({ navigation }) {

  const { state: { accountData } } = useContext(ApiContext);
  const { state: { telemedicineReservationStatus } } = useContext(AppContext);
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    paymentRequest();
  }, []);

  const paymentRequest = async function () {
    try {
      const response = await postPaymentRequest(telemedicineReservationStatus, accountData.email);
      var htmlDecoded = decodeValues(response.data);
      setHtmlContent(htmlDecoded);
    } catch (error) {
      Alert.alert('결제 요청에 실패하였습니다. 다시 시도해주세요.');
      navigation.goBack();
    }
  }

  const decodeValues = (html) => {
    const $ = cheerio.load(html);

    const pUnameInput = $('input[name="P_UNAME"]');
    if (pUnameInput) {
      const decodedValue = decodeURIComponent(pUnameInput.attr('value'));
      pUnameInput.attr('value', decodedValue);
    }

    const pGoodsInput = $('input[name="P_GOODS"]');
    if (pGoodsInput) {
      const decodedValue = decodeURIComponent(pGoodsInput.attr('value'));
      pGoodsInput.attr('value', decodedValue);
    }

    return $.html();
  };
  

  return (
    <SafeArea>
      <WebView
        source={{ html: htmlContent }}
        originWhitelist={['*']}
        scalesPageToFit
        onError={() => {
          navigation.goBack();
          Alert.alert('결제 취소', '결제 중 문제가 발생했습니다. 다시 시도해 주시기 바랍니다.');
        }}
      />
    </SafeArea>
  );
}