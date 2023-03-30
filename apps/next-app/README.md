# 앱 구성 방법

## 준비물

- ActiveMQ를 엔진으로 사용하는 AWS MQ
  - wss 엔드포인트에 대한 인터넷 인바운드를 허용 해야 합니다.
- 환경변수(`apps/next-app/.env`)
```
NEXT_PUBLIC_MQ_ENDPOINT=wss://<<AWS_MQ_HOST_NAME>>:61619
NEXT_PUBLIC_MQ_USERNAME=<<AWS_MQ_USERNAME>>
NEXT_PUBLIC_MQ_PW=<<AWS_MQ_PASSWORD>>
```

## 설치 및 실행

```shell
# 의존성 설치
yarn

# dev 서버 실행
yarn dev
```
