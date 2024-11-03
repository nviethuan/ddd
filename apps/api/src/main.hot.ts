import { webpackHRMWrapper } from '@utils/hrm';
import { bootstrap } from './fastify.app';

webpackHRMWrapper(bootstrap);
