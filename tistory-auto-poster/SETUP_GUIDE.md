# 티스토리 자동 포스터 설정 가이드

## 1. 티스토리 Open API 앱 등록

1. [티스토리 Open API](https://www.tistory.com/guide/api/manage/register) 페이지에 접속
2. "앱 등록" 버튼 클릭
3. 다음 정보 입력:
   - **서비스명**: `티스토리 자동 포스터` (원하는 이름)
   - **설명**: `AI 대화 내용을 자동으로 티스토리에 포스팅하는 도구`
   - **서비스 URL**: `http://localhost:3000`
   - **CallBack URL**: `http://localhost:3000/callback`

## 2. 환경변수 설정

앱 등록 후 받은 정보로 `.env` 파일을 수정하세요:

```env
REACT_APP_TISTORY_CLIENT_ID=발급받은_클라이언트_ID
REACT_APP_TISTORY_CLIENT_SECRET=발급받은_클라이언트_시크릿
REACT_APP_TISTORY_REDIRECT_URI=http://localhost:3000/callback
REACT_APP_TISTORY_BLOG_NAME=yumding
```

## 3. 프로젝트 실행

```bash
npm start
```

## 4. 사용 방법

1. 브라우저에서 `http://localhost:3000` 접속
2. "티스토리 연동하기" 버튼 클릭
3. 티스토리 로그인 및 권한 승인
4. "📝 대화 정리 템플릿 생성" 버튼으로 기본 템플릿 생성
5. 내용 수정 후 "포스트 작성하기" 클릭

## 5. 기능

- ✅ 티스토리 OAuth 인증
- ✅ 카테고리 자동 로드
- ✅ 대화 정리 템플릿 제공
- ✅ 마크다운/HTML 지원
- ✅ 공개 설정 (발행/보호/비공개)
- ✅ 태그 설정

## 주의사항

- `.env` 파일은 절대 Git에 커밋하지 마세요
- 클라이언트 시크릿은 외부에 노출되지 않도록 주의하세요
- 로컬 개발 환경에서만 사용하세요 (HTTPS 필요시 별도 설정)
