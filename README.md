# Deprecated

해당 프로젝트는 다른 프로젝트로 migration되어 archive 용으로 존재합니다.

자세한 사항은 https://github.com/aiden0407/OKDOC-Mobile-App-Bare 참고.

### OKDOC-Mobile-App

재외국민이 국내 대학병원 전문의에게 원격진료를 받을 수 있는 서비스를 제공하는 어플리케이션입니다. Expo-cli 기반 React Native 프로젝트이며 Expo Application Services(EAS)를 통해 버전 관리 및 배포를 진행하고 있습니다.

### OKDOC-Mobile-App 실행

#### `yarn install`

dependencies 다운로드

#### `npx expo start`

Expo 프로젝트 실행

#### `eas build -p ios`

ios 프로덕션 빌드

#### `eas submit -p ios`

ios App Store Connet 자동 배포

#### `eas build -p android`

android 프로덕션 빌드

#### `eas build -p android --profile preview`

android 시뮬레이터 .apk 파일 설치
