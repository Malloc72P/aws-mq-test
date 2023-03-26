export const ServerConfigs = {
  envs: {
    queueName: process.env.NEXT_PUBLIC_QUEUE_NAME ?? '',
    awsMqEndpoint: process.env.NEXT_PUBLIC_MQ_ENDPOINT ?? '',
    awsMqttEndpoint: process.env.NEXT_PUBLIC_MQ_MQTT_ENDPOINT ?? '',
    mqHostname: process.env.NEXT_PUBLIC_MQ_HOSTNAME ?? '',
    mqPort: process.env.NEXT_PUBLIC_MQ_PORT ?? '',
    mqUsername: process.env.NEXT_PUBLIC_MQ_USERNAME ?? '',
    mqPw: process.env.NEXT_PUBLIC_MQ_PW ?? '',
  },
};
