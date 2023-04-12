export const serverConfigs = {
  envs: {
    awsMqEndpoint: process.env.NEXT_PUBLIC_MQ_ENDPOINT ?? '',
    mqUsername: process.env.NEXT_PUBLIC_MQ_USERNAME ?? '',
    mqPw: process.env.NEXT_PUBLIC_MQ_PW ?? '',
  },
};
