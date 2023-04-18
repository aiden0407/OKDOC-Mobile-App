//React
import { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from 'context/AppContext';
import styled from 'styled-components/native';

//Components
import { COLOR } from 'constants/design';
import { Ionicons } from '@expo/vector-icons';
import { StatusBarArea, ContainerTop } from 'components/Layout';
import { Image } from 'components/Image';
import { Text } from 'components/Text';

export default function PaymentScreen({ navigation, route }) {

  const telemedicineData = route.params.telemedicineData;
  const doctodImageUrl = 'https://paininjuryrelief.com/wp-content/uploads/2020/05/iStock-1219329116-1024x683.jpg';

  const [count, setCount] = useState(900);
  const savedCallback = useRef();

  const callback = () => {
    if (count === 1) {
      navigation.replace('TelemedicineComplete', {
        telemedicineData: telemedicineData,
      });
    } else {
      setCount(count - 1);
    }
  }

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  function handleEscapeTelemedicineRoom() {
    navigation.replace('TelemedicineComplete', {
      telemedicineData: telemedicineData,
    });
  }

  return (
    <>
      <ContainerTop backgroundColor="tomato">
        <Image source={{ uri: doctodImageUrl }} style={{ width: "100%", height: "111%" }} marginTop={-73} />
        <TextContainer>
          <Text T5 color={COLOR.GRAY3}>{telemedicineData.doctorInfo.name}</Text>
          <Text T5 color={COLOR.GRAY3}>{telemedicineData.doctorInfo.subject}</Text>
          <Text T5 color={COLOR.GRAY3}>{count / 60 < 10 ? '0' + parseInt(count / 60) : parseInt(count / 60)}:{count % 60 < 10 ? '0' + count % 60 : count % 60}</Text>
        </TextContainer>
        <ButtonContainer>
          <RedCircle underlayColor="#CC0000" onPress={() => handleEscapeTelemedicineRoom()}>
            <Ionicons name="call" size={24} color="#FFFFFF" style={{ transform: [{ rotate: '135deg' }] }} />
          </RedCircle>

        </ButtonContainer>
      </ContainerTop>


      <StatusBarArea backgroundColor={COLOR.MAIN} />
    </>
  );
}

const TextContainer = styled.View`
  position: absolute;
  bottom: 80px;
  width: 100%;
  height: 90px;
  z-index: 1;
  align-items: center;
  justify-content: center;
  background-color: #000000AA;
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80px;
  z-index: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${COLOR.MAIN};
`;

const RedCircle = styled.TouchableHighlight`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  align-items: center;
  justify-content: center;
  background-color: #FF0000;
`;