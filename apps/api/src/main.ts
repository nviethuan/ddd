import { clusterizer } from '@utils/clusterizer';
import { bootstrap } from './fastify.app';

clusterizer(bootstrap);
