//React
import { useContext } from 'react';
import { ApiContext } from 'context/ApiContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';

//Components
import { COLOR } from 'constants/design'
import { Alert } from 'react-native';
import { SafeArea, KeyboardAvoiding, Container, Row } from 'components/Layout';
import { Text } from 'components/Text';
import { LineInput } from 'components/TextInput';
import { SolidButton } from 'components/Button';

//Api
import { deleteFamilyAccout } from 'api/MyPage';

export default function WithdrawalScreen({ navigation }) {

  const { state: { accountData, profileData }, dispatch } = useContext(ApiContext);
  const mainProfile = profileData?.[0]

  function createWithdrawalAlert() {
    Alert.alert('정말 탈퇴하시겠습니까?', '\n회원탈퇴 시 모든 정보가 삭제되며,\n예약하신 진료는 환불 규정에 따라\n취소 처리됩니다.', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '확인',
        onPress: () => handleWithdrawal()
      },
    ]);
  }

  const handleWithdrawal = async function () {
    try {
      await deleteFamilyAccout(accountData.loginToken, accountData.email);
      dispatch({ type: 'LOGOUT' });
      try {
        await AsyncStorage.removeItem('@account_data');
      } catch (error) {
        console.log(error);
      }
      navigation.popToTop();
      navigation.goBack();
      navigation.navigate('Home');
      Alert.alert('안내', '회원탈퇴가 정상적으로 완료되었습니다.');
    } catch (error) {
      Alert.alert('네트워크 오류로 인해 정보를 불러오지 못했습니다.');
    }
  }

  function formatDate(date) {
    const year = date.toString().slice(0, 4);
    const month = date.toString().slice(4, 6);
    const day = date.toString().slice(6, 8);
    return `${year}-${month}-${day}`;
  }

  return (
    <SafeArea>
      <KeyboardAvoiding>
        <Container paddingHorizontal={20}>
          <Container>
            <Text T3 bold marginTop={30}>회원 탈퇴를 위해{'\n'}아래 내용을 확인해주세요</Text>
            <Text T6 color={COLOR.GRAY2} marginTop={12}>이 작업은 실행 취소할 수 없습니다.{'\n'}취급하고 있는 개인정보 데이터는 영구적으로 삭제됩니다.</Text>

            <Text T5 medium marginTop={24}>이메일</Text>
            <LineInput
              marginTop={12}
              value={accountData.email}
              editable={false}
            />
            {
              mainProfile?.name && (<>
                <Text T5 medium marginTop={24}>이름</Text>
                <LineInput
                  marginTop={12}
                  value={mainProfile?.name}
                  editable={false}
                />
              </>)
            }
            {
              mainProfile?.birth && (<>
                <Text T5 medium marginTop={24}>생년월일</Text>
                <LineInput
                  marginTop={12}
                  value={formatDate(mainProfile?.birth)}
                  editable={false}
                />
              </>)
            }
          </Container>

          <SolidButton
            text="탈퇴하기"
            marginBottom={20}
            action={() => createWithdrawalAlert()}
          />
        </Container>
      </KeyboardAvoiding>
    </SafeArea>
  );
}

const AgreeRow = styled.Pressable`
  flex-direction: row;
  align-items: center;
`;