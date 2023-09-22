//React
import { useState, useContext, useRef } from 'react';
import { ApiContext } from 'context/ApiContext';
import { AppContext } from 'context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import IMP from 'iamport-react-native';

//Components
import { SafeArea } from 'components/Layout';

//Api
import { createFamilyAccount, createPatientByPassApp } from 'api/Login';

export default function EmailPasswordScreen({ navigation }) {

  const { dispatch: apiContextDispatch } = useContext(ApiContext);
  const { state: { registerStatus }, dispatch: appContextDispatch } = useContext(AppContext);

  const data = {
    merchant_uid: `mid_${new Date().getTime()}`,
    company: '인성정보',
  };

  function callback(response) {
    if(response.success){

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