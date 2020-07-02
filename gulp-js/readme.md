# gulp-js
* 일반 MPA + JQUERY 사이트에 ES6+와 MODULE 시스템을 적용하기

### 환경셋팅

1. node.js lts 버전 다운로드 후 설치
2. gulp-cli 전역 설치하기
```js
    //VSCode 터미널에서 다음 코드 입력
    npm i -g gulp-cli 
```
3. npm 의존성 설치
```js
    //vscode에서 좌측 폴더 우클릭 후 터미널에서 열기로 package.json이 있는 경로 열기
    //다음 코드 입력. 최초 1회만 하면 끝.
    npm i
```
4. 테스트 시작은 다음 코드 입력
```js
    //package.json이 있는 경로에서 다음 코드 입력
    gulp
    //혹은
    npm start
```
5. 배포할 코드 빌드는 다음 코드 입력
```js
    //package.json이 있는 경로에서 다음 코드 입력
    npm run build
```