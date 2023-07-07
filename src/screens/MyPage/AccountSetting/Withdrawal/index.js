//React
import { useState, useContext } from 'react';
import { ApiContext } from 'context/ApiContext';

//Components
import { Alert } from 'react-native';
import { SafeArea, KeyboardAvoiding, Container } from 'components/Layout';
import { Text } from 'components/Text';
import { LineInput } from 'components/TextInput';
import { SolidButton } from 'components/Button';

//Api
import { deleteFamilyAccout } from 'api/Login';

export default function WithdrawalScreen({ navigation }) {

  const { state: { accountData }, dispatch } = useContext(ApiContext);
  const [currentPassword, setCurrentPassword] = useState();

  const handleWithdrawal = async function () {
    try {
      await deleteFamilyAccout(accountData.loginToken, accountData.email);
      dispatch({ type: 'LOGOUT' });
      try {
        await AsyncStorage.removeItem('accountData');
      } catch (error) {
        console.log(error);
      }
      navigation.popToTop();
      navigation.goBack();
      navigation.navigate('Home');
      Alert.alert('안내', '회원탈퇴가 정상적으로 완료되었습니다');
    } catch (error) {
      console.log(error);
    }
  }

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

  return (
    <SafeArea>
      <KeyboardAvoiding>
        <Container paddingHorizontal={20}>
          <Container>
          <Text T3 bold marginTop={30}>회원 탈퇴를 위해{'\n'}비밀번호를 입력해주세요</Text>
          <Text T5 medium marginTop={24}>이메일</Text>
          <LineInput
            marginTop={12}
            value={accountData.email}
            editable={false}
          />
          <Text T5 medium marginTop={24}>현재 비밀번호</Text>
          <LineInput
            marginTop={12}
            placeholder="비밀번호 입력"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry
            returnKeyType="done"
            onSubmitEditing={() => createWithdrawalAlert()}
          />
          </Container>

          <SolidButton
            text="탈퇴하기"
            marginBottom={20}
            disabled={!currentPassword}
            action={() => createWithdrawalAlert()}
          />
        </Container>
      </KeyboardAvoiding>
    </SafeArea>
  );
}