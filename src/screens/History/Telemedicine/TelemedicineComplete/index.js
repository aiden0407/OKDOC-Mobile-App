//React
import { useState, useEffect, useContext } from 'react';
import { ApiContext } from 'context/ApiContext';
import useHistoryUpdate from 'hook/useHistoryUpdate';
import useAlarmUpdate from 'hook/useAlarmUpdate';

//Components
import { COLOR } from 'constants/design'
import { Alert } from 'react-native';
import { SafeArea, Container, ContainerCenter } from 'components/Layout';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { SolidButton, OutlineButton } from 'components/Button';

//Assets
import checkIcon from 'assets/icons/circle-check.png';

//Api
import { treatmentComplete, getCCTVInformation, patchCCTVPatientBye, getInvoiceInformation } from 'api/History';

export default function TelemedicineCompleteScreen({ navigation, route }) {

  const { refresh } = useHistoryUpdate();
  const { refreshAlarm } = useAlarmUpdate();
  const { state: { accountData } } = useContext(ApiContext);
  const [invoiceInformation, setInvoiceInformation] = useState();
  const telemedicineData = route.params.telemedicineData;

  useEffect(() => {
    letCCTVStatusChange()
  }, []);

  const letCCTVStatusChange = async function () {
    try {
      await treatmentComplete(accountData.loginToken, telemedicineData.id);
      refresh();
      refreshAlarm();
      checkInvoice();
    } catch (error) {
      //Alert.alert('네트워크 오류로 인해 정보를 불러오지 못했습니다.');
    }

    // try {
    //   const response = await getCCTVInformation(accountData.loginToken, telemedicineData.id);

    //   try {
    //     await patchCCTVPatientBye(accountData.loginToken, response.data.response[0].id);
    //     dispatch({ type: 'HISTORY_DATA_ID_DELETE' });
    //     checkInvoice();
    //   } catch (error) {
    //     console.log("1"+error.data.response);
    //     Alert.alert('네트워크 오류로 인해 정보를 불러오지 못했습니다.');
    //   }

    // } catch (error) {
    //   console.log("2"+error.data.response);
    //   Alert.alert('네트워크 오류로 인해 정보를 불러오지 못했습니다.');
    // }
  }

  const checkInvoice = async function () {
    try {
      const response = await getInvoiceInformation(accountData.loginToken, telemedicineData.bidding_id);
      telemedicineData.invoiceInfo = response.data.response?.[0];
      setInvoiceInformation(response.data.response?.[0]);
    } catch (error) {
      if (error.data.statusCode !== 404) {
        Alert.alert('네트워크 오류로 인해 정보를 불러오지 못했습니다.');
      }
    }
  }

  function handleFeedback() {
    navigation.navigate('InquiryStackNavigation', { 
      screen: 'Inquiry',
      params: { headerTitle: '진료 후기 작성 / 문의하기' },
    });
  }

  function handleNextScreen() {
    if (invoiceInformation) {
      navigation.navigate('Payment', { 
        telemedicineData: telemedicineData
      });
    } else {
      navigation.navigate('HistoryStackNavigation', { 
        screen: 'TelemedicineDetail',
        params: { telemedicineData: telemedicineData }
      });
    }
  }

  return (
    <SafeArea>
      <Container paddingHorizontal={20}>
        <ContainerCenter>

          <Image source={checkIcon} width={70} height={70} />
          <Text T2 bold marginTop={18}>진료가 종료되었습니다</Text>
          <Text T6 center color={COLOR.GRAY1} marginTop={18}>진료 중 좋았던 점이나{'\n'}불편한 점이 있었다면  알려주세요</Text>
          <OutlineButton
            large
            marginTop={24}
            text="진료 후기 남기기"
            action={() => handleFeedback()}
          />

        </ContainerCenter>

        <SolidButton
          text={invoiceInformation?"추가요금 결제하기":"다음으로"}
          marginBottom={20}
          disabled={false}
          action={() => handleNextScreen()}
        />
      </Container>
    </SafeArea>
  );
}