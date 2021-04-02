import 'reflect-metadata'; // Required for typeorm
import http from 'http';
import debug from 'debug';
import server from './server';

const logger = debug('index');

logger('Creating server...');
http.createServer(server).listen(process.env.PORT);
logger('Server listening on port ' + process.env.PORT);
