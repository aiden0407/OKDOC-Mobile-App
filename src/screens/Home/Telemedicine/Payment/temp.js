//React
import { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from 'context/AppContext';
import styled from 'styled-components/native';

//Components
import { SafeArea, ContainerCenter } from 'components/Layout';
import { Text } from 'components/Text';

export default function PaymentScreen({ navigation }) {

  const [count, setCount] = useState(3);
  const savedCallback = useRef();

  const callback = () => {
    if(count === 1){
      navigation.navigate('PaymentComplete');
    }else{
      setCount(count-1);
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

  return (
    <SafeArea>
      <ContainerCenter>
        <Text T5 bold>PG사 결제창 스크린: {count}초</Text>
      </ContainerCenter>
    </SafeArea>
  );
}