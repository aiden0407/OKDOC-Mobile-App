//React
import { useState, useRef, useContext } from 'react';
import { ApiContext } from 'context/ApiContext';

//Components
import { COLOR } from 'constants/design';
import { Alert } from 'react-native';
import { SafeArea, KeyboardAvoiding, Container, DividingLine, PaddingContainer } from 'components/Layout';
import { Text } from 'components/Text';
import { LineInput } from 'components/TextInput';
import { SolidButton } from 'components/Button';

export default function ChangePasswordScreen({ navigation }) {

  const { state: { accountData } } = useContext(ApiContext);
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [newPasswordCheck, setNewPasswordCheck] = useState();
  const newPasswordRef = useRef();
  const newPasswordCheckRef = useRef();

  function handleChangePassword() {
    dispatch({ type: 'LOGOUT' });
    navigation.goBack();
    navigation.navigate('MyPageMain');
    navigation.navigate('Home');
  }

  function createChangePasswordAlert() {
    Alert.alert('비밀번호를 변경하시겠습니까?', '', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '확인',
        onPress: () => handleChangePassword()
      },
    ]);
  }

  return (
    <SafeArea>
      <KeyboardAvoiding>
        <Container>
          <Container>
            <PaddingContainer>
              <Text T3 bold marginTop={30}>비밀번호 변경</Text>
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
                returnKeyType="next"
                onSubmitEditing={() => {
                  newPasswordRef.current.focus();
                }}
              />
            </PaddingContainer>

            <DividingLine marginVertical={30} />

            <PaddingContainer>
              <Text T5 medium>비밀번호 변경</Text>
              {
                !newPassword && <Text T8 color={COLOR.GRAY1} style={{ position: 'absolute', top: 41, left: 112 }}>(영어, 숫자, 특수문자 포함 6자~14자 이내)</Text>
              }
              <LineInput
                marginTop={14}
                placeholder="비밀번호 입력"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                returnKeyType="next"
                ref={newPasswordRef}
                onSubmitEditing={() => {
                  newPasswordCheckRef.current.focus();
                }}
              />
              {
                newPassword && newPassword?.length < 6 && <Text T8 color='#FF0000CC' marginTop={6}>* 영어, 숫자, 특수문자 포함 6자~14자 이내를 충족하지 않습니다</Text>
              }
              <LineInput
                marginTop={24}
                placeholder="비밀번호 확인"
                value={newPasswordCheck}
                onChangeText={setNewPasswordCheck}
                secureTextEntry
                returnKeyType="done"
                ref={newPasswordCheckRef}
                onSubmitEditing={() => {
                  createChangePasswordAlert()
                }}
              />
              {
                newPassword && newPasswordCheck && newPassword !== newPasswordCheck && <Text T8 color='#FF0000CC' marginTop={6}>* 비밀번호가 일치하지 않습니다</Text>
              }
            </PaddingContainer>
          </Container>

          <PaddingContainer>
            <SolidButton
              text="저장"
              marginBottom={20}
              disabled={!currentPassword || !newPassword || !newPasswordCheck || newPassword !== newPasswordCheck}
              action={() => createChangePasswordAlert()}
            />
          </PaddingContainer>
        </Container>
      </KeyboardAvoiding>
    </SafeArea>
  );
}