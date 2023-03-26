import Connection from 'rabbitmq-client';
import { ServerConfigs } from '../../server/config';

const { awsMqEndpoint } = ServerConfigs.envs;

export const mqConnection = new Connection({
  url: awsMqEndpoint,
});
