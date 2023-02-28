

//Core Components
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
} from 'react-native';

//Constants
import COLOR from 'constants/color'

export default function HomePage({ route, navigation }) {
  const value = route?.params?.value;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>

        <Text style={styles.subtitle}>홈 스크린: {value}</Text>

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

});