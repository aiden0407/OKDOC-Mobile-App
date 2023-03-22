//React
import styled from 'styled-components/native';

//Components
import { COLOR } from 'constants/design'
import { Ionicons } from '@expo/vector-icons';
import { SafeArea, Container } from 'components/Layout';
import { Text } from 'components/Text';

export default function NotificationScreen({ navigation }) {

  function NotificationButton({ title, recent, date }) {
    return (
      <NotificationBox>
        <NotificationTouchable
          onPress={() => navigation.navigate('NotificationDetail', {
            title: title,
          })}
        >
          <SubtitleRow>
            <SubtitleTextRow>
              <Text T6 bold>{title}</Text>
              {recent && <SubtitleNew><Text T8 bold color="#FFFFFF">N</Text></SubtitleNew>}
            </SubtitleTextRow>
            <Ionicons name="chevron-forward" size={20} />
          </SubtitleRow>
          <Text T7 color={COLOR.GRAY1}>{date}</Text>
        </NotificationTouchable>
      </NotificationBox>
    )
  }

  return (
    <SafeArea>
      <Container>

        <Text T3 bold marginTop={30} marginLeft={20}>공지사항</Text>
        <NotificationButton
          title="[공지] 생일축하 쿠폰 지급정책 변경 안내3"
          recent
          date="2023.04.10"
        />
        <NotificationButton
          title="[공지] 생일축하 쿠폰 지급정책 변경 안내2"
          recent
          date="2023.04.08"
        />
        <NotificationButton
          title="[공지] 생일축하 쿠폰 지급정책 변경 안내"
          date="2023.04.07"
        />

      </Container>
    </SafeArea>
  );
}

const NotificationBox = styled.View`
  width: 100%;
  padding: 26px 24px;
  border-bottom-width: 2px;
  border-bottom-color: #F7F8FA;
`;

const NotificationTouchable = styled.TouchableOpacity`
  width: 100%;
  gap: 6px;
`;

const SubtitleRow = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SubtitleTextRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SubtitleNew = styled.View`
  margin-left: 6px;
  width: 15px;
  height: 15px;
  background-color: #FF334B;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;