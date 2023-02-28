import { useState, useRef } from 'react';

//Core Components
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
} from 'react-native';

//Constants
import COLOR from 'constants/color'

//Assets
import Logo from 'assets/main/main_logo.png';

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef();

  const LoginEvent = (email, password) => {
    if (email === 'test' && password === 'test') {
      navigation.navigate('Home', {value:'로그인 성공'});
    } else {
      Alert.alert('로그인 실패');
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Image source={Logo} style={{ width: 171, height: 40 }}/>
        <Text style={styles.subtitle}>해외에서도 <Text style={styles.bold}>대학병원 전문의</Text>를 만나보세요</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputBox}
            value={email}
            onChangeText={setEmail}
            placeholder="이메일"
            placeholderTextColor="#CDCFD7"
            autoCompleteType="email"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordRef.current.focus();
            }}
          />
          <TextInput
            style={styles.inputBox}
            value={password}
            onChangeText={setPassword}
            placeholder="비밀번호"
            placeholderTextColor="#CDCFD7"
            secureTextEntry
            onSubmitEditing={() => {
              LoginEvent(email, password);
            }}
            ref={passwordRef}
          />
        </View>

        <TouchableHighlight
          style={styles.loginButton}
          underlayColor={'#4E1794'}
          onPress={() => {
            LoginEvent(email, password);
          }}
        >
          <Text style={styles.loginButtonText}>로그인 하기</Text>
        </TouchableHighlight>
        <TouchableOpacity
          style={styles.registerButton}
          activeOpacity={0.8}
          onPress={() => Alert.alert('회원가입 이벤트')}
        >
          <Text style={styles.registerButtonText}>회원가입 하기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.findEmailPassword}
          activeOpacity={0.8}
          onPress={() => Alert.alert('이메일/비밀번호 찾기 이벤트')}
        >
          <Text style={styles.findEmailPasswordText}>이메일/비밀번호가 기억나지 않나요?</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bold: {
    fontWeight: '700',
  },

  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLOR.MAIN,
    marginTop: 20
  },

  inputContainer: {
    width: '100%',
    marginTop: 40,
    gap: 10,
  },

  inputBox: {
    width: '100%',
    padding: 15,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#CDCFD7',
    borderRadius: 5,
    fontSize: 16,
    fontWeight: '500',
  },

  loginButton: {
    width: '100%',
    height: 56,
    marginTop: 60,
    backgroundColor: COLOR.MAIN,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF'
  },

  registerButton: {
    width: '100%',
    height: 56,
    marginTop: 15,
    borderWidth: 1,
    borderColor: COLOR.MAIN,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  registerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLOR.MAIN
  },

  findEmailPassword: {
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD'
  },

  findEmailPasswordText: {
    marginTop: 40,
    fontSize: 13,
    fontWeight: '500',
    color: '#8B8E99',
  },

});