//React
import styled from 'styled-components/native';

//Components
import { Ionicons } from '@expo/vector-icons';
import { SafeArea, ContainerTop } from 'components/Common';

export default function NotificationScreen({ navigation }) {

  function NotificationButton({ title, recent, date }) {
    return (
      <NotificationBox>
        <NotificationTouchable
          activeOpacity={0.4}
          onPress={() => navigation.navigate('NotificationDetails', {
            title: title,
          })}
        >
          <SubtitleRow>
            <SubtitleTextRow>
              <SubtitleText>{title}</SubtitleText>
              {recent && <SubtitleNew><SubtitleNewN>N</SubtitleNewN></SubtitleNew>}
            </SubtitleTextRow>
            <Ionicons name="chevron-forward" size={20} />
          </SubtitleRow>
          <DateText>{date}</DateText>
        </NotificationTouchable>
      </NotificationBox>
    )
  }

  return (
    <SafeArea>
      <ContainerTop paddingTop={50}>
        <TitleContainer>
          <Title>공지사항</Title>
        </TitleContainer>

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

      </ContainerTop>
    </SafeArea>
  );
}

const TitleContainer = styled.View`
  width: 100%;
  margin-bottom: 10px;
`;

const Title = styled.Text`
  margin-left: 20px;
  font-weight: 500;
  font-size: 20px;
`;

const NotificationBox = styled.View`
  width: 100%;
  padding: 26px 24px;
  border-bottom-width: 2px;
  border-bottom-color: #F7F8FA;
`;

const NotificationTouchable = styled.TouchableOpacity`
  width: 100%;
  gap: 10px;
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

const SubtitleText = styled.Text`
  font-weight: 600;
  font-size: 14px;
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

const SubtitleNewN = styled.Text`
  font-weight: 600;
  font-size: 13px;
  color: #FFFFFF;
`;

const DateText = styled.Text`
  font-weight: 500;
  font-size: 12px;
  color: #8B8E99;
`;