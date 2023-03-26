import assert from 'assert';

assert(process.env.QUEUE_NAME);
assert(process.env.AWS_MQ_ENDPOINT);

export const ServerConfigs = {
  envs: {
    queueName: process.env.QUEUE_NAME ?? '',
    awsMqEndpoint: process.env.AWS_MQ_ENDPOINT ?? '',
  },
};
