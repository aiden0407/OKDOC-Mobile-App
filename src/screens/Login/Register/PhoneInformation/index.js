//React
import { useContext } from 'react';
import { ApiContext } from 'context/ApiContext';
import { AppContext } from 'context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IMP from 'iamport-react-native';

//Components
import { SafeArea } from 'components/Layout';
import { Alert } from 'react-native';

//Api
import { createFamilyAccount, createPatientByPassApp } from 'api/Login';

export default function EmailPasswordScreen({ navigation }) {

  const { dispatch: apiContextDispatch } = useContext(ApiContext);
  const { state: { registerStatus }, dispatch: appContextDispatch } = useContext(AppContext);

  const data = {
    merchant_uid: `mid_${new Date().getTime()}`,
    company: '인성정보',
  };

  const callback = async function (response) {
    if(response.success){
      try {
        const deviceType = await AsyncStorage.getItem('@device_type');
        const deviceToken = await AsyncStorage.getItem('@device_token');
        //const deviceToken = '961ae45edebaf891a146995cad67d1390d47b63b1867c42c93b6c405911ae241'
        const createFamilyAccountResponse = await createFamilyAccount(registerStatus.email, registerStatus.password, registerStatus.policy, deviceType, deviceToken);
        const loginToken = createFamilyAccountResponse.data.response.accessToken;
        //const loginToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ikluc3VuZ2luZm9fdXNlcl9jcmVkZW50aWFsIn0.eyJlbWFpbCI6ImFpZGVuQGluc3VuZ2luZm8uY28ua3IiLCJyb2xlIjoiZmFtaWx5IiwiaWF0IjoxNjk1Njk0ODU4LCJleHAiOjE2OTkyOTQ4NTgsImF1ZCI6ImxvY2FsaG9zdDozMDAwIiwiaXNzIjoibG9jYWxob3N0OjMwMDAiLCJzdWIiOiJhaWRlbkBpbnN1bmdpbmZvLmNvLmtyIiwianRpIjoiMTY5NTY5NDg1ODM0NSJ9.cfud3ygrsk8yl3l5Wd6vAQYzvqR8bnMSzfZLOkjPdYk'
        initPatient(loginToken, response.imp_uid);
      } catch (error) {
        Alert.alert('계정 생성에 실패하였습니다. 다시 시도해 주시기 바랍니다.');
      }
    }
  }

  const initPatient = async function (loginToken, imp_uid) {
    try {
      const createPatientByPassAppResponse = await createPatientByPassApp(loginToken, imp_uid);
      const mainProfile = createPatientByPassAppResponse.data.response;
      apiContextDispatch({ 
        type: 'LOGIN', 
        loginToken: loginToken,
        email: registerStatus.email, 
      });

      try {
        const accountData = {
          loginToken: loginToken,
          email: registerStatus.email,
        };
        await AsyncStorage.setItem('accountData', JSON.stringify(accountData));
      } catch (error) {
        console.log(error);
      }

      apiContextDispatch({
        type: 'PROFILE_CREATE_MAIN',
        id: mainProfile.id,
        name: mainProfile.passapp_certification.name,
        relationship: mainProfile.relationship,
        birth: mainProfile.passapp_certification.birthday.replaceAll('-', ''),
        gender: mainProfile.passapp_certification.gender.toUpperCase(),
      });
      appContextDispatch({type: 'REGISTER_COMPLETE'});
      navigation.navigate('RegisterComplete');
    } catch (error) {
      Alert.alert('프로필 정보 생성에 실패하였습니다. 다시 시도해 주시기 바랍니다.');
    }
  }

  return (
    <SafeArea>
      <IMP.Certification
        userCode={'imp64183758'}
        data={data}
        callback={callback}
        loading={<SafeArea />}
      />
    </SafeArea>
  );
}